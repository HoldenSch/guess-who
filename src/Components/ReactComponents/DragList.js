import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  // if dragged to other box, switch the item to other box
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    // otherwise, keep the box in same box
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DragList() {
  // sets up exclude and include arrays
  let tasks = [];
  let taskStatus = {
    requested: {
      name: "Exclude",
      items: tasks,
    },
    toDo: {
      name: "Include",
      items: [],
    },
  };
  window.onload = function() {
    // retrieve all friends from previous login sessions
    axios.post('http://localhost:8081/retrieve')
    .then(res => {
      if (res.data === "Not Logged In") {
        alert('please log in')
      }
      else {
        // add friends to array with loop
        for (let i = 0; i < res.data.length; i++) {
          tasks.push({id: res.data[i].id.toString(), content: res.data[i].name, image: res.data[i].image})
        }
        taskStatus = {
          requested: {
            name: "Exclude",
            items: tasks,
          },
          toDo: {
            name: "Include",
            items: [],
          },
        };
        setColumns(taskStatus)
      }
    })
  // catches any error
  .catch(err => console.log(err));

  };

  const [columns, setColumns] = useState(taskStatus);
  const [newTask, setNewTask] = useState({ content: "", image: null });
  const [codes, setCodes] = useState([]);

  // handles user input with name and image
  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "content") {
        setNewTask({ ...newTask, content: e.target.value });
    } else if (name === "image" && files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]); // Reads the file as Data URL (Base64 encoded)
        fileReader.onload = (event) => {
            setNewTask({ ...newTask, image: event.target.result }); // The result is a Base64 encoded string (Blob data)
        };
    }
};

  // after submitting, set task to submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let task = {
        id: "",
        content: newTask.content,
        image: newTask.image // This is now a Base64 encoded string
    };

    // insert submission into database
    axios.post('http://localhost:8081/insert', task)
    .then(res => {
        // if invalid insert, prompt the user to retype
        if (res.data === "Error") {
            alert('failed to add friend, please retry');
        }
        else if (res.data === "Not Logged In") {
          alert('please log in')
        }
        else {
            // set the id of submission
            task.id = res.data.toString();
            setColumns({
              ...columns,
              requested: {
                ...columns.requested,
                items: [...columns.requested.items, task],
              },
            });
        
            setNewTask({ content: "", image: null });
        }
      })
      // catches any error
      .catch(err => console.log(err));
  };

  // handles user deleting a friend
  const handleDelete = (columnId, itemId) => {
    axios.post('http://localhost:8081/delete', {id: itemId})
    .then(res => {
        // if invalid delete, prompt the user to retype
        if (res.data === "Error") {
            alert('failed to delete friend, please retry');
        }
        else if (res.data === "Not Logged In") {
          alert('please log in')
        }
        else {
          // remove friend from array
          const column = columns[columnId];
          const filteredItems = column.items.filter((item) => item.id !== itemId);
          setColumns({
            ...columns,
            [columnId]: {
              ...column,
              items: filteredItems,
            },
          });
        }
      })
      // catches any error
      .catch(err => console.log(err));
  };

  // generates a random join code with capital and undercase letters and numbers
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // handles when user clicks play
  const handlePlayClick = (event) => {
    event.preventDefault();
    // generates code and ids
    const newCode = generateRandomCode();
    const ids = getIncludeColumnIds();
    setCodes([...codes, newCode]);
    // checks that user is ready to play
    axios.post('http://localhost:8081/play', {code: newCode, friends: ids})
    .then(res => {
        // if invalid play, prompt the user to retype
        if (res.data === "Error") {
            alert('failed to create game, please retry');
        }
        else if (res.data === "Not Logged In") {
          alert('please log in')
        }
        else {
          axios.post('http://localhost:8081/host_join', {code1: newCode})
          .then(res => {
              // if invalid delete, prompt the user to retype
              if (res.data === "Error") {
                  alert('failed to create game, please retry');
              }
              else if (res.data === "Not Logged In") {
                alert('please log in')
              }
              else {
                // sets up the board
                 let cards = res.data[0]
                 let code = res.data[1]
                 let character = res.data[2]
                 localStorage.setItem('cards', JSON.stringify(cards));
                 localStorage.setItem('code', JSON.stringify(code));
                 localStorage.setItem('character', JSON.stringify(character));
                  window.location.href = '/Board';
              }
            })
            // catches any error
            .catch(err => console.log(err));
          
        }
      })
      // catches any error
      .catch(err => console.log(err));
  };

  const getIncludeColumnIds = () => {
    const includeColumn = columns['toDo'];
  
    // check if the column exists and has items
    if (includeColumn && includeColumn.items) {
      // map over the items for ids
      return includeColumn.items.map(item => item.id);
    } else {
      return [];
    }
  };
  



  return (
    <div style={{ marginTop: "10vh" }}>
      <h1 style={{ fontFamily: "Gilroy-Bold, sans-serif", fontSize: "5.8vw", marginBottom: "60px", textAlign:"center" }}>
        Create Your Board
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "8px",
          }}
        >
          <h2
            style={{
              fontFamily: "Gilroy-Bold, sans-serif",
              fontSize: "30px",
              marginBottom: "10px",
              color: "#363838", 
              marginTop: "7px"
            }}
          >
            Add
          </h2>
          <div
            style={{
              width: "18vw",
              backgroundColor: "rgba(242, 242, 242, 0.7)",
              borderRadius: "20px",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                name="content"
                value={newTask.content}
                onChange={handleChange}
                placeholder="Enter new character"
                style={{
                  marginBottom: "10px",
                  width: "92%",
                  border: "none",
                  textIndent: "10px",
                  fontFamily: "Gilroy-Medium, sans-serif",
                  height: "50px",
                  borderRadius: "8px",
                  marginTop: "13px",
                }}
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                style={{ marginBottom: "10px", width: "92%", border: "none", color: "grey"}}
              />
              <button
                type="submit"
                style={{
                  width: "92%",
                  background: "rgb(190,224,211)",
                  borderRadius: "8px",
                  border: "none",
                  height: "50px",
                  fontFamily: "Gilroy-Medium, sans-serif",
                  marginBottom: "13px",
                  color:"white"
                }}
              >
                Add Character
              </button>
            </form>
          </div>
          <div>
          <button
        onClick={handlePlayClick}
        type="submit"
        style={{
          marginTop: "15px",
          width: "18vw",
          background: "#C6a9f9",
          borderRadius: "20px",
          border: "none",
          height: "60px",
          fontFamily: "Gilroy-Bold, sans-serif",
          marginBottom: "13px",
          color: "white",
          fontSize: "20px",
        }}
      >
        Play!
      </button>

      {/* Optional: Display generated codes */}
      <div>
        {codes.map((code, index) => (
          <div key={index}>{code}</div>
        ))}
      </div>
          </div>
        </div>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2
                  style={{
                    fontFamily: "Gilroy-Bold, sans-serif",
                    fontSize: "30px",
                  }}
                >
                  {column.name}
                </h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "rgb(190,224,211)"
                              : "rgba(242, 242, 242, 0.7)",
                            padding: 4,
                            width: "32vw",
                            minHeight: 200,
                            borderRadius: "20px",
                            fontFamily: "Gilroy-Medium, sans-serif",
                            fontSize:"20px",
                            color: "#363838"
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 10,
                                        margin: "8px 8px 8px 8px",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "rgb(183,206,119)"
                                          : "rgb(183,206,119)",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                        borderRadius: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        {item.image && (
                                          <img
                                            src={item.image}
                                            alt={`${item.content}'s`}
                                            style={{ width: "60px", height: "60px",marginRight:"16px",  borderRadius: "5px", objectFit:"cover"}}
                                          />
                                        )}
                                        {item.content}
                                      </div>
                                      <button
                                        onClick={() =>
                                          handleDelete(columnId, item.id)
                                        }
                                        style={{
                                          marginLeft: "10px",
                                          backgroundColor: "transparent",
                                          border: "none",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <i
                                          class="bi bi-x-circle"
                                          style={{ color: "white" }}
                                        ></i>
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default DragList;

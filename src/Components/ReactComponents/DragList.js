import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';

axios.post('http://localhost:8081/retrieve')
.then(res => {
    if (res.data === "Not Logged In") {
      alert('please log in')
    }
    else {
      let tasks = [];
      for (let i = 0; i < res.data.length; i++) {
        tasks.push(res.data[i])
      }
    }
  })
  // catches any error
  .catch(err => console.log(err));
const tasks = [{id: "0", content:"holden"}];

const taskStatus = {
  requested: {
    name: "Exclude",
    items: tasks,
  },
  toDo: {
    name: "Include",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

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
  const [columns, setColumns] = useState(taskStatus);
  const [newTask, setNewTask] = useState({ content: "", image: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") {
      setNewTask({ ...newTask, content: value });
    } else if (name === "image") {
      setNewTask({ ...newTask, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let task = {
      id: "",
      content: newTask.content,
      image: newTask.image ? URL.createObjectURL(newTask.image) : null,
    };
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
                type="submit"
                style={{
                  marginTop:"15px",
                  width: "18vw",
                  background: " #C6a9f9",
                  borderRadius: "20px",
                  border: "none",
                  height: "60px",
                  fontFamily: "Gilroy-Bold, sans-serif",
                  marginBottom: "13px",
                  color:"white",
                  fontSize: "20px",
                }}
              >
                Play!
              </button>
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

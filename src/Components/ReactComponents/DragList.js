import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap-icons/font/bootstrap-icons.css";

const tasks = [
  { id: "1", content: "Holden Schermer" },
  { id: "2", content: "Sunny Liu" },
  { id: "3", content: "Rahm Bharara" },
  { id: "4", content: "Luke Chung" },
  { id: "5", content: "Sabrina Zhu" },
];

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
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleChange = (e) => {
    setNewTaskContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `${columns.requested.items.length + 1}`,
      content: newTaskContent,
    };
    setColumns({
      ...columns,
      requested: {
        ...columns.requested,
        items: [...columns.requested.items, newTask],
      },
    });
    setNewTaskContent("");
  };

  const handleDelete = (columnId, itemId) => {
    const column = columns[columnId];
    const filteredItems = column.items.filter((item) => item.id !== itemId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: filteredItems,
      },
    });
  };

  return (
    <div style={{ marginTop: "15vh" }}>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "8px", // If you want the entire block to have a margin on the right
          }}
        >
          <h2
            style={{
              fontFamily: "Gilroy-Bold, sans-serif",
              fontSize: "30px",
              marginBottom: "10px", // Optional, adds space between the title and the box
            }}
          >
            Add
          </h2>

          <div
            style={{
              width: "18vw",
              minHeight: "200px",
              backgroundColor: "rgba(242, 242, 242, 0.7)",
              borderRadius: "20px",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <input
    type="text"
    value={newTaskContent}
    onChange={handleChange}
    placeholder="Enter new task"
    style={{ marginBottom: '10px', width: '80%' }} // Adjust width as needed
  />
  <button type="submit" style={{ width: '80%' }}>Add Task</button>
</form>
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
                                        padding: 16,
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
                                      {item.content}
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
                                        <i class="bi bi-x-circle" style={{color:"white"}}></i>
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

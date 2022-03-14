import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import './todo.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // Getting Data
  useEffect(async () => {
    try {
      const dbref = collection(db, "todos");
      
      let getTodo = [];
      onSnapshot(dbref, (snapShot) => {
        const getData = snapShot.forEach( (docs) => {
          getTodo.push({
            key: docs.id,
            todo: docs.data().todo
          })
        });
        // console.log(getTodo);
        setTodos(getTodo);
      })
    } catch (error) {
      console.log(error);
    }
  }, [inputValue])


  // Adding Data
  const addTodo = async () => {
    if (inputValue !== "") {
      try {
        const dbref = collection(db, "todos")
        const addData = await addDoc(dbref, {
          todo: inputValue,
        });
        setInputValue("");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`Add Something First`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const editTodo = async (key) => {
    const editValue = prompt("enter value");
    const dbRef = doc(db, "todos", key);
    const updateData = await updateDoc(dbRef, {
      todo: editValue,
    });
  };

  const deleteTodo = async (key) => {
    const dbRef = doc(db, "todos", key);
    const delTodo = await deleteDoc(dbRef);
  };
  return (
    <div className="mainBox container">
      <div className="title">
        <h1>Awesome Todo</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-todo-input-wrap">
            <form onSubmit={(e) => { e.preventDefault() }} className="main-todo-input fl-wrap">
              <div className="main-todo-input-item">
                <input
                  type="text"
                  id="todo-list-item"
                  placeholder="What will you do today?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <button
                onClick={addTodo}
                className="add-items main-search-button"
              >ADD</button>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="main-todo-input-wrap">
            <div className="main-todo-input fl-wrap todo-listing">
              {todos.map((val, ind) => {
                return (
                  <div key={ind} className="card myCard border-info mb-3">
                    <div className="card-header bg-transparent border-info">
                      <h5 className="card-title">Todo: {ind + 1}</h5>
                    </div>
                    <div className="card-body text-info">
                      <p className="card-text">{val.todo}</p>
                    </div>
                    <div className="card-footer bg-transparent border-info">
                      <button onClick={() => editTodo(val.key)}><FaEdit /></button>
                      <button onClick={() => deleteTodo(val.key)}><FaTrashAlt /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Using Toast */}
      <ToastContainer closeButton={{
        display: "none"
      }} toastStyle={{
        height: 70,
        fontFamily: "monospace",
        fontStyle: "oblique",
        fontSize: 24,
        color: "red",
      }} />
    </div>
  );
};

export default Todo;

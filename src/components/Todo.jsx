import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc, } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import './todo.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Todo = () => {
  // Variables
  const currentUserUid = localStorage.getItem("currentUser");

  // States

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [indexValue, setIndexValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [todoUpdate, setTodoUpdate] = useState(false);
  const [isPrivatePost, setIsPrivatePost] = useState(false);

  // Getting Data
  useEffect(async () => {
    try {
      const dbref = collection(db, "todos");

      let getTodo = [];
      onSnapshot(dbref, (snapShot) => {
        const getData = snapShot.forEach((docs) => {
          getTodo.push({
            key: docs.id,
            todo: docs.data().todo,
            userId: docs.data().uId,
            private: docs.data().privatePost,
          })
        });
        // console.log(getTodo);
        setTodos(getTodo);
      })
    } catch (error) {
      console.log(error);
    }
  }, [todoUpdate, inputValue])


  // Adding Data
  const addTodo = async () => {
    if (inputValue !== "") {
      try {
        const dbref = collection(db, "todos")
        const addData = await addDoc(dbref, {
          todo: inputValue,
          uId: currentUserUid,
          privatePost: isPrivatePost,
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
    setIndexValue(key);
  };

  // Update Todo

  const updateValue = async (key) => {
    console.log(editInputValue);
    // todos.splice(indexValue, 1, editInputValue);
    // setTodos([...todos]);
    setIndexValue("");
    setEditInputValue("");

    const data = editInputValue;
    const dbRef = doc(db, "todos", key)
    await updateDoc(dbRef, {
      todo: data
    })
    setTodoUpdate(!todoUpdate);
  };

  // Delete Todo
  const deleteTodo = async (key) => {
    const dbRef = doc(db, "todos", key);
    await deleteDoc(dbRef);
    setTodoUpdate(!todoUpdate);
  };

  // PrivatePost Function

  const setPrivateValue = (checkbox) => {
    console.log(checkbox.checked);
    setIsPrivatePost(checkbox.checked);
  };

  return (
    <div className="mainBox container-fluid">
      <div className="title container">
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
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  onClick={(e) => setPrivateValue(e.target)}
                  autoComplete="off" />
                <label className="checkBoxInput btn btn-outline-primary" htmlFor="btncheck1">Private</label>              </div>
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
                return val.private ? (
                  val.userId === currentUserUid ? (

                    ind === indexValue ? (
                      <div key={ind} className="card myCard border-info mb-3">
                        <div className="card-header bg-transparent border-info">
                          <h5 className="card-title">Todo: {ind + 1}</h5>
                        </div>
                        <div className="card-body editBox">
                          <textarea
                            placeholder="Edit Value"
                            value={editInputValue}
                            className="input-group"
                            onChange={(e) => setEditInputValue(e.target.value)}
                          />
                        </div>
                        <div className="card-footer bg-transparent border-info">
                          <button onClick={() => updateValue(val.key)}>Update</button>
                        </div>
                      </div>
                    ) : (
                      <div key={ind} className="card myCard border-info mb-3">
                        <div className="card-header bg-transparent border-info">
                          <h5 className="card-title">Todo: {ind + 1}</h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">{val.todo}</p>
                        </div>
                        <div className="card-footer bg-transparent border-info">
                          <button onClick={() => editTodo(ind)}><FaEdit size={30} /></button>
                          <button onClick={() => deleteTodo(val.key)}><FaTrashAlt size={30} /></button>
                        </div>
                      </div>)
                  ) : null
                ) : (

                  ind === indexValue ? (
                    <div key={ind} className="card myCard border-info mb-3">
                      <div className="card-header bg-transparent border-info">
                        <h5 className="card-title">Todo: {ind + 1}</h5>
                      </div>
                      <div className="card-body editBox">
                        <textarea
                          placeholder="Edit Value"
                          value={editInputValue}
                          className="input-group"
                          onChange={(e) => setEditInputValue(e.target.value)}
                        />
                      </div>
                      <div className="card-footer bg-transparent border-info">
                        <button onClick={() => updateValue(val.key)}>Update</button>
                      </div>
                    </div>
                  ) : (
                    <div key={ind} className="card myCard border-info mb-3">
                      <div className="card-header bg-transparent border-info">
                        <h5 className="card-title">Todo: {ind + 1}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{val.todo}</p>
                      </div>
                      <div className="card-footer bg-transparent border-info">
                        <button onClick={() => editTodo(ind)}><FaEdit size={30} /></button>
                        <button onClick={() => deleteTodo(val.key)}><FaTrashAlt size={30} /></button>
                      </div>
                    </div>)
                );
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

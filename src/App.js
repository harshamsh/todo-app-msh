import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase_config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import TodoListItem from "./TodoRel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setTodoList } from "./redux/todo/actions";

function App() {
  // const [todos, setTodos] = useState([])

  // here todos are being accessed from the global state
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch(); // helper function to update redux global state

  const [tdInput, tdInputFunc] = useState("");

  const setTodos = (todosFromDB) => {
    // here todos form DB are updated to the global state
    dispatch(setTodoList(todosFromDB));
  };

  useEffect(() => {
    getTodo();
  }, []);

  function getTodo() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      let fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        working_on_it: doc.data().working_on_it,
        timestamp: doc.data().timestamp,
      }));
      fetchedTodos = sortByTimestamp(fetchedTodos);
      console.log(fetchedTodos);
      setTodos(fetchedTodos);
    });
  }

  const sortByTimestamp = (array) => {
    let sortedArray = [...array];
    sortedArray.sort(function (x, y) {
      return y.timestamp - x.timestamp;
    });
    return sortedArray;
  };

  function addTodo(e) {
    e.preventDefault();
    db.collection("todos").add({
      working_on_it: true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: tdInput,
      timestamp: new Date(),
    });
    tdInputFunc("");
    getTodo();
  }

  return (
    <div className="App">
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2>Harsha's Todo List</h2>
        <form onSubmit={addTodo}>
          <TextField
            id="standard-basic"
            label="Enter your Todo here"
            variant="standard"
            value={tdInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => tdInputFunc(e.target.value)}
          />
          <Button type="submit" variant="contained" style={{ display: "none" }}>
            Contained
          </Button>
        </form>
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {todos.map((todo) => (
            <TodoListItem
              refresh={getTodo}
              todo={todo.todo}
              working_on_it={todo.working_on_it}
              id={todo.id}
              style={{ width: "70%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

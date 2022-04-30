import { Button, TextField } from '@mui/material'; 
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase_config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import TodoListItem from './TodoRel';

function App() {
  const [todos, setTodos] =useState([]);

  const [tdInput, tdInputFunc] = useState("");
  useEffect(() => {
    getTodo();
 
  }, []);
  
  function getTodo(){
    db.collection("todos").onSnapshot(function (querySnapshot){
      setTodos(
        querySnapshot.docs.map((doc)=>({

          id:doc.id,
          todo:doc.data().todo,
          working_on_it: doc.data().working_on_it,
  
        }))
    );
    });
  }


  function addTodo(e){
    e.preventDefault();
    db.collection("todos").add({
      working_on_it : true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: tdInput,
    });
    tdInputFunc("");
  }

  return (
    <div className="App" >
      <div 
       style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
      <h1>Harsha</h1>
      <form>
      <TextField 
      id="standard-basic" 
      label="Standard" 
      variant="standard" 
      value={tdInput}
      style={{ width: "90vw", maxWidth: "500px" }}
      onChange={(e) =>tdInputFunc(e.target.value)}
      
      />
      <Button type="submit"
      variant="contained" 
      onClick={addTodo} 
      style={{display :"none"}}>Contained</Button>
      </form>
      <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}  
       >{todos.map((todo) => (
        <TodoListItem 
        todo={todo.todo} 
        working_on_it={todo.working_on_it} 
        id={todo.id}
        style={{width:"70%"}}/>
      ))}</div>
      </div>
    </div>
  );
}

export default App;

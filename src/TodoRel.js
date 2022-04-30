import { Button, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { db } from './firebase_config'

export default function TodoListItem({todo, working_on_it, id}) {
  function changeProgress(){
      db.collection("todos").doc(id).update({ 
          working_on_it : !working_on_it,
      });
  }
  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }
   return (
    <div style={{display:"flex"}} >
    <ListItem>
        <ListItemText 
        primary={todo} 
        secondary={working_on_it ? "Not done yet":"Lesgoo!"}/>
    </ListItem>
    <Button 
    onClick={changeProgress}
    >
        {working_on_it ? "Done That":"On it"}
    </Button>
    <Button onClick={deleteTodo}>DEL</Button>
    </div>
  )
}

import { Button, CircularProgress, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import "./TodoRel.css";
import { toast } from "react-toastify";

export default function TodoListItem(props) {
  const { todo, working_on_it, id } = props;

  const [todoItem, setTodoItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // do something
    setTodoItem({ todo, working_on_it, id });
  }, []);

  async function changeProgress() {
    try {
      await db.collection("todos").doc(id).update({
        working_on_it: !todoItem?.working_on_it,
      });
      setTodoItem((prev) => ({ ...prev, working_on_it: !prev?.working_on_it }));
    } catch (err) {
      console.log(err);
    }
    props.refresh();
  }
  async function deleteTodo() {
    try {
      db.collection("todos").doc(id).delete();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateToBackend(event) {
    console.log("submit function called");
    // prevent page refresh on submission
    event.preventDefault();
    setLoading(true);
    try {
      await db.collection("todos").doc(id).update({
        todo: todoItem?.todo,
      });
      toast("Successfully updated", { position: "top-right", type: "success" });
    } catch (err) {
      console.log(err);
      toast("Failed to update Details", {
        position: "top-right",
        type: "error",
      });
    }
    setLoading(false);
    props.refresh();
  }

  function updateLocalState(event) {
    const value = event.target.value;
    setTodoItem((prev) => ({ ...prev, todo: value }));
  }

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
    >
      <ListItem>
        {/* <ListItemText
          primary={todoItem?.todo}
          secondary={working_on_it ? "Not done yet" : "Lesgoo!"}
        /> */}
        <form onSubmit={updateToBackend} className="todo-item-text-container">
          <input value={todoItem?.todo} onChange={updateLocalState} key={id} />
          <small>{todoItem?.working_on_it ? "Not done yet" : "Lesgoo!"}</small>
        </form>
      </ListItem>
      <Button onClick={changeProgress}>
        {todoItem?.working_on_it ? "Done That" : "On it"}
      </Button>
      <Button onClick={deleteTodo}>DEL</Button>
      {loading ? <CircularProgress /> : null}
    </div>
  );
}

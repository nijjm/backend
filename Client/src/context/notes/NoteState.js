import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesinit = []
  const [notes, setnotes] = useState(notesinit)

  //Get all notes
  const getNotes = async () => {
   
//API call
const response = await fetch(`${host}/api/notes/fetchnotes`, {
  method: 'GET', 
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')

    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});
const json = await response.json();
console.log('json')
console.log(json)
setnotes(json)
   }

  //Add a new note
  const addNote = async (title, description, tag) => {
    console.log("New note added")
    //TODO: API Call
//API call
const response = await fetch(`${host}/api/notes/addnote`, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
});
const note= await response.json(); // parses JSON response into native JavaScript objects
setnotes(notes.concat(note))
  }
  //Delete a new note
  const deleteNote = async (id) => {
    console.log("deleteNote " + id)
    //TODO: API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)

  }
  //Edit a new note
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
  console.log(json)

  let newNotes= JSON.parse(JSON.stringify(notes));
  //Logic to edit in client side
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
  setnotes(newNotes);
}
return (
  <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;
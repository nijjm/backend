import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useState } from 'react';
import { useContext } from 'react';

const AddNote = (props) => {
    const context= useContext(NoteContext);
  const{addNote}= context;
  const [note, setnote] = useState({
    title:"",
    description: "",
    tag:"",
  })
  const handleClick=(e)=>{
    e.preventDefault();        // prevents reloading the page
    addNote(note.title, note.description, note.tag);
    setnote({title:"", description: "", tag:""});
    props.showalert("Note added successfully", "success")

}

  const onChange=(e)=>{
    setnote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div>
       <div className='container my-3'>
      <h1>Add A Note</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
  </div>
 
  <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
</form>
    </div>

    </div>
  )
}

export default AddNote

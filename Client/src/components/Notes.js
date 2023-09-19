import { useContext, useEffect, useState, useRef } from "react";
import NoteContext from '../context/notes/NoteContext.js';
import AddNote from "./AddNote.js";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate(); // Use navigate to handle redirection
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login"); // Redirect to the login page
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setnote] = useState({
    id:"",
    etitle:"",
    edescription: "",
    etag:""
  })

  const updateNote = (currnote) => {
    ref.current.click();
    setnote({id: currnote._id, etitle: currnote.title, edescription:currnote.description, etag:currnote.tag})
  };

  const handleClick=(e)=>{
    console.log("Upadating...");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showalert("Updated note successfully", "success")


    e.preventDefault();        // prevents reloading the page
}

  const onChange=(e)=>{
    setnote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div>
      <AddNote showalert={props.showalert}/>
      <button ref={ref} type="button" className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" value={note.etag}>Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<3||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-3 my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length ===0 && ' Nothing to display here'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes

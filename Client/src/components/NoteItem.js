import React from 'react'
import NoteContext from '../context/notes/NoteContext.js';
import { useContext } from 'react';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>



            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {
                        deleteNote(note._id);
                        props.showalert("Note deleted successfully", "success")

                    }}></i>
                    <i className="fa-solid fa-user-pen" onClick={() => {
                        updateNote(note);
                    }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem

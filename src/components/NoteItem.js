import React from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
const NoteItem = ({ note, updateNote, showAlert }) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    return (
        <>
            <div className="card col-md-3 my-3">
                <div className="card-body ">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }} className="fa-solid fa-trash mx-2"></i>
                        <i onClick={() => updateNote(note)} className="fa-solid fa-file-pen mx-2"></i>
                    </div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div >
        </>
    )
}

export default NoteItem
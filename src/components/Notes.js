import React, { useEffect, useRef, useState } from 'react'
import { AddNote } from './AddNote'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem'
import { useNavigate } from "react-router-dom"

const Notes = ({ showAlert }) => {
    const navigate = useNavigate();

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [note, setNote] = useState({

        id: "",
        etitle: "",
        edescription: "",
        etag: "default"
    })
    const handelSubmit = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        showAlert("Note updated successfully", "success")

    }
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        }
        else {
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNote showAlert={showAlert} />
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input minLength={5} required value={note.etitle} onChange={onChange} type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input minLength={5} required value={note.edescription} onChange={onChange} type="text" className="form-control" id="edescription" name='edescription' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input value={note.etag} onChange={onChange} type="text" className="form-control" id="etag" name='etag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handelSubmit} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='row my-3'>
                    <h2>Your notes</h2>
                    <div className='container mx-2'>
                        {notes.length === 0 && "No notes to display"}
                    </div>
                    {notes.map(note => {
                        return <NoteItem showAlert={showAlert} updateNote={updateNote} key={note._id} note={note} />
                    })}</div>
            </div>
        </>
    )
}

export default Notes
//ref={refClose}
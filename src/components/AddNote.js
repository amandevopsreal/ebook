import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
export const AddNote = ({ showAlert }) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })
    const handelSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({
            title: "",
            description: "",
            tag: ""
        })
        showAlert("Note added successfully", "success")
    }
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='container my-3'>
            <h2>
                Write a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} minLength={5} required onChange={onChange} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} minLength={5} required onChange={onChange} type="text" className="form-control" id="description" name='description' />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} onChange={onChange} type="text" className="form-control" id="tag" name='tag' />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} onClick={handelSubmit} type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

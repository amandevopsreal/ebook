import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        console.log("Adding a new note")
        const note = response.json()
        setNotes(notes.concat(note))
    }
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(notes.filter(function (note) {
            return note._id !== id;
        }))
    }

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json()
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < notes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title
                newNotes[i].description = description
                newNotes[i].tag = tag
                break
            }

        }
        setNotes(newNotes)

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
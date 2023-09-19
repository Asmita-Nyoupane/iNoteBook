import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesIntial = [];
  const [notes, setNotes] = useState(notesIntial);

  //Get all notes
  const getNotes = async () => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYWM2NmM1MjAwZDg2NDU5MTJmNThmIn0sImlhdCI6MTY5NDMyNTg3NH0.K8v9i7f1gTXJkTM8GfB_jPdZA7f6yTqtcHhytzfvSmQ",
      },
    });
    // Logic to get all notes
    const json = await response.json();
    setNotes(json);
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYWM2NmM1MjAwZDg2NDU5MTJmNThmIn0sImlhdCI6MTY5NDMyNTg3NH0.K8v9i7f1gTXJkTM8GfB_jPdZA7f6yTqtcHhytzfvSmQ",
      },

      body: JSON.stringify({ title, description, tag }),
    });
   
    const json = await response.json();
    console.log(json);
    // Logic to add a new note
    const note = {
      _id: "64fo790ba940e69367e3ab59",
      user: "64fac66c5200d8645912f58f",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-10T08:06:35.036Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //  Delete a note
  const deleteNote = async (id) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYWM2NmM1MjAwZDg2NDU5MTJmNThmIn0sImlhdCI6MTY5NDMyNTg3NH0.K8v9i7f1gTXJkTM8GfB_jPdZA7f6yTqtcHhytzfvSmQ",
      },
    });

    // Logic to delete note
    console.log("Delete an note using id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const json = await response.json();
    console.log(json)
    setNotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmYWM2NmM1MjAwZDg2NDU5MTJmNThmIn0sImlhdCI6MTY5NDMyNTg3NH0.K8v9i7f1gTXJkTM8GfB_jPdZA7f6yTqtcHhytzfvSmQ",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    // create a copy of note
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes.title = title;
        newNotes.description = description;
        newNotes.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
   
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

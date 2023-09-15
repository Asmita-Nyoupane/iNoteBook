import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    
    const notesIntial= [
        {
          "_id": "64fd790ba940e69367e0ab59",
          "user": "64fac66c5200d8645912f58f",
          "title": "Coding",
          "description": "learn daily ",
          "tag": "developer",
          "date": "2023-09-10T08:06:35.036Z",
          "__v": 0
        },
        {
            "_id": "64fd790ba940e69367e1ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          },
          {
            "_id": "64fd790ba940e69367e2ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          },
          {
            "_id": "64fd790ba940e69367e8ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          },
          {
            "_id": "64fd790ba940e69367e5ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          },
          {
            "_id": "64fd790ba940e69367e4ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          },
          {
            "_id": "64fd790ba940e69367e3ab59",
            "user": "64fac66c5200d8645912f58f",
            "title": "Coding",
            "description": "learn daily ",
            "tag": "developer",
            "date": "2023-09-10T08:06:35.036Z",
            "__v": 0
          }
      ]
       const [notes, setNotes] = useState(notesIntial);
       //Add a note
       const addNote=(title,description,tag)=>{
        
        // TODO: API call
        const note={
          "_id": "64fo790ba940e69367e3ab59",
          "user": "64fac66c5200d8645912f58f",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-09-10T08:06:35.036Z",
          "__v": 0
        }
        setNotes(notes.concat(note))

       }
      //  Delete a note
      const deleteNote=(id)=>{
         // TODO: API call
        console.log("Delete an note using id" +id)
        const  newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
        
      }
      // Edit a note
      const editNote=()=>{
        
      }
       
     return(
        <NoteContext.Provider value ={ {notes,addNote,deleteNote,editNote}}>
            { props.children }
        </NoteContext.Provider>
     )
};
export default NoteState;
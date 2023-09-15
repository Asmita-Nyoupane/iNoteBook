import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    
    const notesIntial= [
        {
          "_id": "64fd790ba940e69367e3ab59",
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
          },
          {
            "_id": "64fd790ba940e69367e3ab59",
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
          },
          {
            "_id": "64fd790ba940e69367e3ab59",
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
       const [notes, setnotes] = useState(notesIntial)
     return(
        <NoteContext.Provider value ={ {notes,setnotes}}>
            { props.children }
        </NoteContext.Provider>
     )
};
export default NoteState;
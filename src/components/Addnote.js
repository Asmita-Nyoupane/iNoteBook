import React,{useState,useContext} from 'react';
import noteContext from "../context/notes/noteContext";
const Addnote = () => {
    const context = useContext(noteContext);
  const { addNote} = context;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handelClick=(e)=>{
    e.preventDefault();
   addNote(note.title,note.description,note.tag);
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }

  return (
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="title"
          className="form-control"
          id="title"
          name="title"
        //   aria-describedby="emailHelp"
          placeholder="Enter title of your note"
          onChange={onChange}
        />
        
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder=" Enter your description"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          placeholder=" Enter tag of your note"
          onChange={onChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary my-2" onClick={handelClick}> 
       Add Note
      </button>
    </form>
  </div>
  )
}

export default Addnote
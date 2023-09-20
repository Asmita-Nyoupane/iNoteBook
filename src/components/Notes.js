import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({  id:"", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
   const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };


  const handelClick = () => {
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <button
        type="button" ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="etitle"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref = {refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handelClick} type="button" className="btn btn-primary">
               Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
        {notes.length === 0 && 'No note to display' }
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;

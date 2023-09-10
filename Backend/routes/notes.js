const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch all the notes using: GET "/api/notes/fetchnote". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new  notes using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Enter a title having atleast 3 letter"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must have 5 character"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3: Update notes using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create newNote object
    const newNote = {};
    // if user want to update then the corresponding value of newNote is equal to the user's requested updation
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // retrive the note's id of user from request
    let note = await Notes.findById(req.params.id);
    // if the request doest not contain  note's id for update
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // check wether the user owns the note or ot
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // allow note to be updated
    // here new:true means if new content is add then it will bw created
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Delete notes using: PUT "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // retrive the note's id of user from request
    let note = await Notes.findById(req.params.id);
    // if the request doest not contain  note's id for deletion
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion only if  user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

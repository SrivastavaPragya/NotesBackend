const express=require('express')
const router=new express.Router()
const { Note, User } = require("../db/models/Schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET = 'SECr3mm'; 

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };




  router.post('/users/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "User created successfully", token });
    }
  });
  
  router.post('/users/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "User logged in successfully", token });
    } else {
        res.status(403).json({ message: "Invalid username or password" });
    }
  });



  router.post("/users/Note",authenticateJwt,async(req,res)=>{
    const{title, description}=req.body
    const note=await Note.findOne({title})
    if(note){
        res.status(403).json({ message: "Note already exists" });
    }
    else{
        const NewNote= new Note({title,description})
        await NewNote.save();
        res.status(200).json({ message: "Note created successfully", NoteId: NewNote._id });// in mongodb course id is automatically generated we jut have to retrieve it
    }
    
    
    

  })

  router.get('/notes/:id',authenticateJwt, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.status(200).json({ message: "Required note found", note });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving note', error: error.message });
    }
});

router.put('/notes/:id',authenticateJwt, async (req, res) => {
  try {
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (note) {
          res.json({ message: 'Note updated successfully', note });
      } else {
          res.status(404).json({ message: 'Note not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error updating note', error: error.message });
  }
});

router.delete('/notes/:id', authenticateJwt,async (req, res) => {
  try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (note) {
          res.json({ message: 'Note deleted successfully' });
      } else {
          res.status(404).json({ message: 'Note not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});
  
  module.exports = router;
const express = require('express');
const Model = require('../model/model');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv/config');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  Model.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ items: items });
    }
  });
});

//Post Method
// localhost:8000/
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = new Model({
      title: req.body.title,
      briefDesc: req.body.briefDesc,
      resultDesc: req.body.resultDesc,
      github: req.body.github,
      demoLink: req.body.demoLink,
      tech: req.body.tech,
      image: result.secure_url,
    });
    await data.save();
    res.json(data);
  } catch (error) {}
});

//Get all Method
// localhost:8000/
router.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
// localhost:8000/:id
router.get('/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
// localhost:8000/:id
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
// localhost:8000/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.title} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

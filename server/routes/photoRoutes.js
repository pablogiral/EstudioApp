const express = require("express");
const router = express.Router();
const uploader = require('../configs/cloudinary');


router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
})

module.exports = router;
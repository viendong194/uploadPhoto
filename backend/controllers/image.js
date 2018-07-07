// var express = require('express'),
//     router = express.Router(),
//     schema = require('../models/book'),
//     Picture = schema.models.Picture,
//     cloudinary = require('cloudinary').v2,
//     fs = require('fs'),
//     multipart = require('connect-multiparty'),
//     multipartMiddleware = multipart();
import Image from '../models/Image';
import cloudinary from 'cloudinary';
import fs from 'fs';

export function getImages(req, res, next) {
  Image.find((err, images) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ images });
    }
  })
}
export function postImage(req, res, next) {
  let imageFile = req.files.image.path;
  let photo = new Image(req.body);
  cloudinary.v2.uploader
    .upload(imageFile, {
      tags: 'photobook',
      folder: 'misc/',
      public_id: req.files.image.originalFilename
    })
    .then(function(image) {
      photo.url = image.url;
      photo.id = image.signature;
      return photo.save();
    })
    .then(function() {
      let filePath = req.files.image.path;
      fs.unlinkSync(filePath);
    })
    .finally(function() {
      res.json(photo);
    });
}

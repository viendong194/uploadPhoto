import mongoose from 'mongoose';

let ImageSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  id: String
});

export default mongoose.model('Image',ImageSchema);
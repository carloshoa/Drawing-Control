import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const drawingSchema = new Schema({
  drawingNumber: {
    type: String, required: true, minlength: 3, maxlength: 150,
  },
  title: {
    type: String, required: true, minlength: 3, maxlength: 150,
  },
  pages: {
    type: Number, required: true, min: 1, max: 100,
  },
  revision: [{
    type: Schema.Types.ObjectId, ref: 'file',
  }],
}, {
  timestamps: true,
});

const Drawing = model('drawing', drawingSchema);

export default Drawing;

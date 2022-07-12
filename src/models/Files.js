import { model, Schema } from 'mongoose';

const FileSchema = new Schema({
  drawingNumber: [{
    type: Schema.Types.ObjectId, ref: 'drawings', required: true, minlength: 3, maxlength: 150,
  }],
  pages: {
    type: Number, required: true, min: 1, max: 100,
  },
  revision: {
    type: Number, required: true, min: 0, max: 100,
  },
  status: {
    type: String, required: true, enum: ['aproved', 'approved with comments', 'reproved', 'initial'],
  },
}, {
  timestamps: true,
});

const File = model('file', FileSchema);

export default File;

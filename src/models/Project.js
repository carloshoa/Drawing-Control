import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String, required: true, minlength: 3, maxlength: 150,
  },
  drawings: [{
    type: Schema.Types.ObjectId, ref: 'drawings',
  }],
}, {
  timestamps: true,
});

const Project = model('project', projectSchema);

export default Project;

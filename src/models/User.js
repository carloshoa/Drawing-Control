import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String, required: true, minlength: 3, maxlength: 150,
  },
  email: {
    type: String, required: true,
  },
  password: {
    type: String, required: true,
  },
  role: {
    type: String, default: 'user', enum: ['user', 'adim'],
  },
  active: {
    type: Boolean, default: true,
  },
}, {
  timestamps: true,
});

const User = model('user', userSchema);

export default User;

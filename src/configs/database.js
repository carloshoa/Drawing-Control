import mongoose from 'mongoose';

const initDbConnection = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Mongo Database'))
    .catch((err) => console.log(err));
};

export default initDbConnection;

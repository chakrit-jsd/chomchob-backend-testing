import mongoose from 'mongoose';

export default async () => {

  const url = process.env.MONGO_DB_URL;

  try {
    if (url) {
      await mongoose.connect(url);
    } else {
      throw new Error('Require MongoDB URI')
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

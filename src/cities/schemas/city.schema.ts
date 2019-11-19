import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
  name: {
    type:String,
    unique:true
  },
});

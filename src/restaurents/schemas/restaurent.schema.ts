import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.ObjectId
export const RestaurentSchema = new mongoose.Schema({
  cityId: {
    type:ObjectId,
    required:true,
  },
  name:{
    type:String,
    unique:true,
    required:true
  },
  
});

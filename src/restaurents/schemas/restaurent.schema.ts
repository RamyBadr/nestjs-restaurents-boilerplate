import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.ObjectId;
const Schema = new mongoose.Schema({
  cityId: {
    type: ObjectId,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
  // test: String
});
Schema.index({ location: '2dsphere' });
Schema.index({ location: 1 }, { required: true });
export const RestaurentSchema = Schema;

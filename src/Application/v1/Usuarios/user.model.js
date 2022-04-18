import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('Users');

const schema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    DUI: {
      type: String,
    },
    password: {
      type: String,
    },
    tel: {
      type: String,
    },
    address: {
      type: String,
    },
    typeUser: {
      type: String,
      enum: ['admin', 'user', 'company'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, schema);

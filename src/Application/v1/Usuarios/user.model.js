import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('moneyBiller');

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
    profileId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    created_at: {
      type: Date,
      default: Date.now,
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
export default mongoose.models[singularName]
  || mongoose.model(pluralName, schema);

import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';

const { Schema } = mongoose;

const { singularName, pluralName } = getModelName('Buys');

const schema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    buyAmount: {
      type: String
    },
    idUser: {
      type: String
    },
    numbersCard: {
      type: String
    }
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

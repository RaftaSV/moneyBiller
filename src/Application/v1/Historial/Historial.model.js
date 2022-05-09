import mongoose from 'mongoose';
import getModelName from '../../../Utils/getModelName';

const { Schema } = mongoose;

const { singularName, pluralName } = getModelName('recors');

const schema = new Schema(
  {
    numbersInvoice: {
      type: String
    },
    amount: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    idUser: {
      type: String
    },
    cardNumber: {
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

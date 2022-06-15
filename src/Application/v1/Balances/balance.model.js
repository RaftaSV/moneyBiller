import mongoose from 'mongoose';
import getModelName from '../../../Utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('Balances');

const schema = new Schema(
  {
    balance: {
      type: String
    },
    idUser: {
      type: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active'
    },
  },
  {
    versionKey: false
  }
);
// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

// rename name example to singular Model

export default mongoose.model[singularName]
|| mongoose.model(pluralName, schema);

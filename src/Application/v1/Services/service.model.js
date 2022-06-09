import mongoose from 'mongoose';
import getModelName from 'utils/getModelName';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('services');

const schema = new Schema(
  {
    serviceName: {
      type: String,
    },
    invoiceUrl: {
      type: String,
    },
    invoiceMethod: {
      type: String,
    },
    numberInvoice: {
      type: String,
    },
    nameInvoiceJSON: {
      type: String,
    },
    nameInvoiceDateJSON: {
      type: String,
    },
    nameInvoiceTotalJSON: {
      type: String,
    },
    payInvoiceUrl: {
      type: String,
    },
    payInvoiceMethod: {
      type: String,
    },
    DocumentInvoice: {
      type: String,
    },
    companyId: {
      type: String,
    },
    image: {
      type: String,
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
export default mongoose.models[singularName]
  || mongoose.model(pluralName, schema);

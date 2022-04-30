import serviceModule from './servicios.model';

export const getAllServices = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await serviceModule.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getServiceByCompany = async (req, res) => {
  const { offset, limit } = req.params;
  const { companyId } = req.params;
  try {
    const data = await serviceModule.find({ companyId, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createService = async (req, res) => {
  const {
    serviceName,
    invoiceUrl,
    invoiceMethod,
    numberInvoice,
    nameInvoiceJSON,
    nameInvoiceDateJSON,
    nameInvoiceTotalJSON,
    payInvoiceUrl,
    payInvoiceMethod,
    DocumentInvoice,
    companyId,
    status
  } = req.body;
  if (!serviceName
    || !invoiceUrl
    || !invoiceMethod
    || !numberInvoice
    || !nameInvoiceJSON
    || !nameInvoiceDateJSON
    || !nameInvoiceTotalJSON
    || !payInvoiceUrl
    || !payInvoiceMethod
    || !DocumentInvoice
    || !companyId
    || !status
  ) {
    return res.status(400).json({
      message: 'Faltan datos, la consulta debe contener',
      code: 400,
    });
  }

  try {
    const data = await serviceModule.create({
      serviceName,
      invoiceUrl,
      invoiceMethod,
      numberInvoice,
      nameInvoiceJSON,
      nameInvoiceDateJSON,
      nameInvoiceTotalJSON,
      payInvoiceUrl,
      payInvoiceMethod,
      DocumentInvoice,
      companyId,
      status
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

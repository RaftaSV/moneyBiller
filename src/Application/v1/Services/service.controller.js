import { moveFile, uploadFile } from 'Utils/dirFileMulter';
import serviceModule from './service.model';

export const getAllServices = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const data = await serviceModule.find({ status, }).skip(offset).limit(limit);
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
  const currUpload = uploadFile();
  (await currUpload)(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
    }
    const createNewService = async () => {
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
        try {
          const idService = data.id;
          await moveFile(`${req.file.originalname}`, `${idService}`, 'Services');
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json(data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: 'Error al obtener los datos',
          code: 500,
        });
      }
    };
    createNewService();
  });
};

export const updateService = async (req, res) => {
  const currUpload = uploadFile();
  (await currUpload)(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    const updateServices = async () => {
      const { body, params } = req;
      const { idService } = params;

      if (!body) {
        return res.status(400).json({
          message: 'Faltan datos, la consulta debe contener',
          code: 400,
        });
      }
      try {
        const data = await serviceModule.findOneAndUpdate(
          { _id: idService },
          {
            serviceName: body.serviceName,
            invoiceUrl: body.invoiceUrl,
            invoiceMethod: body.invoiceMethod,
            numberInvoice: body.numberInvoice,
            nameInvoiceJSON: body.nameInvoiceJSON,
            nameInvoiceDateJSON: body.nameInvoiceDateJSON,
            nameInvoiceTotalJSON: body.nameInvoiceTotalJSON,
            payInvoiceUrl: body.payInvoiceUrl,
            payInvoiceMethod: body.payInvoiceMethod,
            DocumentInvoice: body.DocumentInvoice,
            companyId: body.companyId,
            status: body.status
          }
        );
        try {
          await moveFile(`${req.file.originalname}`, `${idService}`, 'Services');
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json(Object.assign(data, body));
      } catch (error) {
        return res.status(500).json({
          code: 500,
          message: 'No se pudo actualizar el registro',
        });
      }
    };
    updateServices();
  });
};

export const deleteService = async (req, res) => {
  const { params } = req;
  const { idService } = params;
  try {
    const data = await serviceModule.findOneAndUpdate(
      { _id: idService },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive'
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el servicio',
    });
  }
};

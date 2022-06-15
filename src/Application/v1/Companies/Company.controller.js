import { uploadFile, moveFile, removeFile } from 'Utils/dirFileMulter';
import companiesModule from './Company.model';

const SHA1 = require('crypto-js/sha1');

export const getAllCompanies = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;
  try {
    const data = await companiesModule.find({ status, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getCompanyById = async (req, res) => {
  const { idCompany } = req.params;
  try {
    const data = await companiesModule.findById(idCompany);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo obtener el registro',
    });
  }
};

export const CreateCompaniesWithImage = async (req, res) => {
  const currUpload = uploadFile();
  (await currUpload)(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
    }
    const createCompany = async () => {
      const {
        name,
        email,
        passwords,
        NIT,
        tel,
        address,
        status,
      } = req.body;
      if (
        !name || !email || !NIT
        || !passwords || !tel || !address
      ) {
        return res.status(400).json({
          message:
            `${'Faltan datos, la consulta debe contener name, email,  DUI, password,'
            + ' tel, address, status'}`,
          code: 400,
        });
      }
      try {
        const password = await SHA1(passwords);
        const image = req.file.originalname;
        const data = await companiesModule.create({
          name,
          email,
          NIT,
          password,
          tel,
          address,
          status,
          image
        });
        try {
          await moveFile(req.file.originalname, `${data.id}${image}`, 'Companies');
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
    createCompany();
  });
};

export const updateCompany = async (req, res) => {
  const currUpload = uploadFile();
  (await currUpload)(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
    }
    const updateCompanies = async () => {
      const { body, params } = req;
      const { idCompany } = params;

      if (!body) {
        return res.status(400).json({
          message: 'Hacen faltan campos',
        });
      }
      try {
        const passwordHash = SHA1(body.passwords);
        const dataOld = await companiesModule.findById(idCompany);
        const data = await companiesModule.findOneAndUpdate(
          { _id: idCompany },
          {
            name: body.name,
            email: body.email,
            NIT: body.NIT,
            password: passwordHash.toString(),
            tel: body.tel,
            address: body.address,
            status: body.status,
            image: req.file.originalname
          }
        );
        try {
          await removeFile(`Companies/${dataOld.id}${dataOld.image}`);
          await moveFile(`${req.file.originalname}`, `${idCompany}${req.file.originalname}`, 'Companies');
        } catch (error) {
          console.log(error);
        }
        res.status(200).json(Object.assign(data, body));
      } catch (error) {
        res.status(500).json({
          code: 500,
          message: `No se pudo actualizar el registro ${error}`,
        });
      }
    };
    updateCompanies();
  });
};

export const deleteCompany = async (req, res) => {
  const { params } = req;
  const { idCompany } = params;
  try {
    const data = await companiesModule.findOneAndUpdate(
      { _id: idCompany },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el registro',
    });
  }
};

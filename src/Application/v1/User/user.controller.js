import UserModule from './user.model';
import { createBalance } from '../Balances/balance.controller';

const SHA1 = require('crypto-js/sha1');

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;
  try {
    const data = await UserModule.find({ status: 'active', typeUser: 'user', }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getAllMember = async (req, res) => {
  const { offset, limit } = req.params;
  try {
    const data = await UserModule.find({ status: 'active', typeUser: 'member', }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const data = await UserModule.findById(idUser);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo obtener el registro',
    });
  }
};

export const createUser = async (req, res) => {
  const {
    name,
    lastName,
    email,
    company,
    DUI,
    passwords,
    tel,
    address,
    typeUser,
    status,
  } = req.body;
  if (!name || !lastName || !email || !DUI
        || !passwords || !tel || !address || !typeUser
  ) {
    return res.status(400).json({
      message: `${'Faltan datos, la consulta debe contener name, lastName, email, company, DUI, password,'
        + ' tel, address, typeUser, status'}`,
      code: 400,
    });
  }
  const password = await SHA1(passwords);
  try {
    const data = await UserModule.create({
      name,
      lastName,
      email,
      company,
      DUI,
      password,
      tel,
      address,
      typeUser,
      status,
    });
    if (data.typeUser === 'member') {
      await createBalance(data._id);
    }
    return res.status(200).json({
      message: 'Registro exitoso'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const updateUser = async (req, res) => {
  const { body, params } = req;
  const { idUser } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }

  try {
    const passwordHash = SHA1(body.pass);
    await UserModule.findOneAndUpdate({ _id: idUser }, {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      DUI: body.DUI,
      password: passwordHash.toString(),
      tel: body.tel,
      address: body.address,
      typeUser: body.typeUser,
      status: body.status
    });
    const data = await UserModule.findById(idUser);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'No se pudo actualizar el registro',
    });
  }
};

export const deleteUser = async (req, res) => {
  const { params } = req;
  const { idUser } = params;

  try {
    const data = await UserModule.findOneAndUpdate({ _id: idUser }, { status: 'inactive' });

    return res.status(200).json({
      ...data,
      status: 'inactive',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el registro',
    });
  }
};

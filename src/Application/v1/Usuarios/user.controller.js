import UserModule from './user.model';

export const getAllUsers = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;
  try {
    const data = await UserModule.find({ status, }).skip(offset).limit(limit);
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
    password,
    tel,
    address,
    typeUser,
    status,
  } = req.body;
  if (!name || !lastName || !email || !DUI
        || !password || !tel || !address || !typeUser
  ) {
    return res.status(400).json({
      message: `${'Faltan datos, la consulta debe contener name, lastName, email, company, DUI, password,'
        + ' tel, address, typeUser, status'}`,
      code: 400,
    });
  }

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
    return res.status(200).json(data);
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
    const data = await UserModule.findOneAndUpdate({ _id: idUser }, {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      company: body.company,
      DUI: body.DUI,
      pass: body.pass,
      tel: body.tel,
      address: body.address,
      typeUser: body.typeUser,
      status: body.status
    });
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
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

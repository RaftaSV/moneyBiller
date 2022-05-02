import userServiceModule from './serviciosUsuario.model';

export const getAllServicesUser = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;

  try {
    const data = await userServiceModule.find({ status, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};
export const getServicesByUser = async (req, res) => {
  const { offset, limit } = req.params;
  const { idUser } = req.params;
  try {
    const data = await userServiceModule.find({ idUser, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createUserService = async (req, res) => {
  const {
    idUser,
    idService,
    status
  } = req.body;
  if (!idUser
    || !idService
    || !status
  ) {
    return res.status(400).json({
      message: 'Faltan datos, la consulta debe contener',
      code: 400,
    });
  }
  try {
    const data = await userServiceModule.create({
      idUser,
      idService,
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

export const deleteUserService = async (req, res) => {
  const { params } = req;
  const { idServiceUser } = params;
  try {
    const data = await userServiceModule.findOneAndUpdate(
      { _id: idServiceUser },
      { status: 'inactive' }
    );

    return res.status(200).json({
      ...data,
      status: 'inactive'
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo eliminar el servicio del usuario',
    });
  }
};

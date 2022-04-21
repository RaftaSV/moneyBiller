import EmpresaModule from './Empresa.model';

export const getAllEmpresa = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;
  try {
    const data = await EmpresaModule.find({ status, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getEmpresaById = async (req, res) => {
  const { idCompany } = req.params;
  try {
    const data = await EmpresaModule.findById(idCompany);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo obtener el registro',
    });
  }
};

export const createEmpresa = async (req, res) => {
  const {
    name,
    email,
    NIT,
    password,
    tel,
    address,
    status,
  } = req.body;
  console.log(req.body);
  if (
    !name || !email || !NIT
    || !password || !tel || !address
  ) {
    return res.status(400).json({
      message:
        `${'Faltan datos, la consulta debe contener name, email,  DUI, password,'
        + ' tel, address, status'}`,
      code: 400,
    });
  }

  try {
    const data = await EmpresaModule.create({
      name,
      email,
      NIT,
      password,
      tel,
      address,
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

export const updateEmpresa = async (req, res) => {
  const { body, params } = req;
  const { idCompany } = params;

  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }
  try {
    const data = await EmpresaModule.findOneAndUpdate(
      { _id: idCompany },
      {
        name: body.name,
        email: body.email,
        NIT: body.NIT,
        password: body.password,
        tel: body.tel,
        address: body.address,
        status: body.status
      }
    );
    return res.status(200).json(Object.assign(data, body));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'No se pudo actualizar el registro',
    });
  }
};

export const deleteEmpresa = async (req, res) => {
  const { params } = req;
  const { idCompany } = params;
  try {
    const data = await EmpresaModule.findOneAndUpdate(
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

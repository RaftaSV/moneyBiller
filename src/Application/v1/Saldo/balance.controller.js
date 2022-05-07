import balanceModule from './balance.model';

export const getAllBalances = async (req, res) => {
  const { offset, limit } = req.params;
  const { status = 'active' } = req.query;
  try {
    const data = await balanceModule.find({ status, }).skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getBalanceByIdUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const data = await balanceModule.find({ idUser, });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'No se pudo obtener el registro',
    });
  }
};

export const createBalance = async (req, res) => {
  const balance = 0;
  const status = 'active';
  const {
    idUser
  } = req.body;
  if (!idUser) {
    return res.status(400)
      .json({
        message: 'Faltan datos para hacer un registro exitoso',
        code: 400,
      });
  }
  try {
    const data = await balanceModule.create({
      idUser,
      balance,
      status
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500)
      .json({
        message: 'Error al obtener los datos',
        code: 500,
      });
  }
};

export const updateBalance = async (req, res) => {
  const { body, params } = req;
  const { idBalance } = params;
  if (!body) {
    return res.status(400).json({
      message: 'Hacen faltan campos',
    });
  }
  try {
    const data = await balanceModule.findOneAndUpdate({ _id: idBalance }, {
      balance: body.balance
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'No se pudo actualizar el registro',
    });
  }
};

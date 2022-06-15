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

export const createBalance = async (idUser) => {
  const balance = 0;
  const status = 'active';
  if (!idUser) {
    console.log('Faltan datos para hacer un registro exitoso');
  }
  try {
    await balanceModule.create({
      idUser,
      balance,
      status
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateBalance = async (idBalance, balance) => {
  if (!idBalance || !balance) {
    console.log('Hacen faltan campos');
  }
  try {
    await balanceModule.findOneAndUpdate({ _id: idBalance }, {
      balance: balance.toFixed(2).toString()
    });
    console.log('Registro exitoso');
  } catch (error) {
    console.log(error);
  }
};

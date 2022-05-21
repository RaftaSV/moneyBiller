import balanceModel from '../Balances/balance.model';
import { updateBalance } from '../Balances/balance.controller';
import buysModel from './Buy.model';

export const getAllBuys = async (req, res) => {
  try {
    const data = await buysModel.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const getBuyByIdUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const data = await buysModel.find({ idUser: `${idUser}` });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

export const createBuy = async (req, res) => {
  let idBalance = '';
  let balance;
  const {
    buyAmount,
    numberCard
  } = req.body;
  if (!buyAmount
    || !numberCard
    || !req.session.idUser) {
    console.log(req.session.idUser);
    return res.status(400)
      .json({
        message: 'Faltan datos',
        code: 400,
      });
  }
  try {
    const { idUser } = req.session;
    const numbersCard = `${numberCard.substring(0, 4)}********${numberCard.substring(11, 15)}`;
    const dataBuy = await buysModel.create({
      idUser,
      buyAmount,
      numbersCard
    });
    const data = await (balanceModel.find({ idUser: `${idUser}`, }));
    // eslint-disable-next-line no-restricted-syntax
    for (const i of data) {
      idBalance = (i.id);
      balance = (parseFloat(i.balance) + parseFloat(buyAmount));
    }
    await updateBalance(idBalance, balance);
    return res.status(200).json(dataBuy);
  } catch (error) {
    console.log(error);
    return res.status(500)
      .json({
        message: 'Error al insertar los datos',
        code: 500,
      });
  }
};

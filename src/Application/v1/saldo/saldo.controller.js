import ExampleModule from './saldo.model';

export const getAllsaldo = async (req, res) => {
  const { offset, limit } = req.params;

  try {
    const data = await ExampleModule.find().skip(offset).limit(limit);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500,
    });
  }
};

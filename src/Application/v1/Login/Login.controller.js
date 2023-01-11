import UserModule from '../User/user.model';

const SHA1 = require('crypto-js/sha1');

export const login = async (req, res) => {
  const {
    user,
    pass
  } = req.body;
  if (!user || !pass) {
   // console.log(`Se deben de llenar todos los campos ${user} ${pass}`);
    res.status(400)
      .json({
        message: 'Se deben de llenar todos los campos',
        code: 400,
      });
  }
  const data = await UserModule.findOne({ DUI: `${user}`, password: `${SHA1(pass)}`, });
  try {
    if (data.toString().length > 1) {
   //   console.log('session correcta');
      req.session.idUser = data.id;
      // console.log(req.session.idUser);
      res.status(200).json(data);
    }
  } catch (error) {
   // console.log('Usuario o contraseña invalidos');
    res.status(400)
      .json({
        message: 'Usuario o contraseña invalidos',
        code: 400,
      });
  }
};

export const sessionDestroy = async (req, res) => {
  console.log(req.session.idUser);
  req.session.destroy();
  res.status(200).json({
    message: 'Sesion destruida',
    code: 200,
  });
};

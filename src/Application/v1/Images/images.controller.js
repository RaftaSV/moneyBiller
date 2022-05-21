import { uploadFile } from 'Utils/dirFileMulter';

export const uploadFiles = async (req, res) => {
  const currUpload = uploadFile('Companies');
  (await currUpload)(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null, filename: req.file.encoding });
  });
};

export const renderImage = async (req, res) => {
  const { image, dir } = req.params;
  res.sendFile(`${image}`, { root: `public/uploads/${dir}/` });
};

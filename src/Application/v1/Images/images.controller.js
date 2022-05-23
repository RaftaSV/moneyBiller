export const renderImage = async (req, res) => {
  const { image, dir } = req.params;
  res.sendFile(`${image}`, { root: `public/uploads/${dir}/` });
};

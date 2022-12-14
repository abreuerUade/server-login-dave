const User = require("../model/User");

const handleLogout = async (req, res) => {
  // En el cliente hay que borrar el accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //204 =  Sin contenido
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  console.log(foundUser);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none" }); //secure: true
    return res.sendStatus(204);
  }
  // Borrar el token en la BD
  foundUser.refreshToken = "";
  const resultado = await foundUser.save();
  console.log(foundUser);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none" }); // agregar secure: true en produccion
  res.sendStatus(204);
};

module.exports = { handleLogout };

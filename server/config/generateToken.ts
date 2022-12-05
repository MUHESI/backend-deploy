import jwt from "jsonwebtoken";

export const generateActiveToken = (pyload: object) => {
  return jwt.sign(pyload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "5m"
  });
};

export const generateAccessToken = (pyload: object) => {
  return jwt.sign(pyload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m"
  });
};
export const generateRefreshToken = (pyload: object) => {
  return jwt.sign(pyload, `${process.env.REFRRESH_TOKEN_SECRET}`, {
    expiresIn: "30d"
  });
};

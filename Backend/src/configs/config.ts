import dotenv from "dotenv";

dotenv.config();
// написати інтерфейс
export const config = {
  port: process.env.PORT || 5000,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "30 h",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "default_access_secret",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30m",
};

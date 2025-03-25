import BaseModel from "#models/base";
import { DataTypes } from "sequelize";
import httpStatus from "#utils/httpStatus";
import { session } from "#middlewares/session";

class Banner extends BaseModel {}

Banner.initialize({
  title: {
    type: DataTypes.STRING,
  },
  subtitle: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
    file: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mobile: {
    type: DataTypes.BOOLEAN,
  },
});

export default Banner;

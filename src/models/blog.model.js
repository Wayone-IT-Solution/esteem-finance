import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Blog extends BaseModel {}

Blog.initialize({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING(500),
  },
});

export default Blog;

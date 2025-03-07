import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Blog extends BaseModel {}

Blog.initialize({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING(500),
    file: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  metaTitle: {
    type: DataTypes.STRING(1000),
  },
  metaDescription: {
    type: DataTypes.TEXT,
  },
  metaKeywords: {
    type: DataTypes.JSON,
    validate: {
      customValidator(value) {
        if (!Array.isArray(value)) {
          throw {
            status: false,
            message: "meta keywords should be in an array",
            httpStatus: httpStatus.BAD_REQUEST,
          };
        }
        value.forEach((ele, index) => {
          value[index] = ele?.toString();
          if (!ele.length || typeof ele !== "string") {
            throw {
              status: false,
              message: "each item should be a valid keyword",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }
        });
      },
    },
  },
});

export default Blog;

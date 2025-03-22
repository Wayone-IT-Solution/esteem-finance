import bcrypt from "bcryptjs";
import User from "#models/user";
import httpStatus from "http-status";
import Service from "#services/base";
import { createToken } from "#utils/jwt";

class UserService extends Service {
  static Model = User;

  static async get(id, filters) {
    let userData = await super.get(id, filters);
    if (id) {
      userData = userData.toJSON();
      delete userData.password;
    } else {
      userData.result.forEach((ele, index) => {
        console.log(ele);
        userData.result[index] = ele.toJSON();
        delete userData.result[index].password;
      });
    }
    return userData;
  }

  static async create(userData) {
    const { role } = userData;
    if (!role) {
      userData.role = "user";
    }
    const user = await super.create(userData);
    return user;
  }

  static async login(userData) {
    const { email, password } = userData;
    let user = await this.Model.findOne({ where: { email } });
    if (!user) {
      throw {
        status: false,
        message: "User not found",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }
    const verification = await bcrypt.compare(password, user.password);
    if (!verification) {
      throw {
        status: false,
        message: "Invalid password",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    user = user.toJSON();
    delete user.password;
    return {
      token: createToken({ email, id: user.id }),
      userData: {
        ...user,
      },
    };
  }
}

export async function defaultUser() {
  const existing = await User.findAll({});
  if (existing.length) return;
  const user = {
    role: "admin",
    title: "Mr",
    firstName: "John",
    middleName: "A",
    lastName: "Doe",
    mobileNo: "+64211234567",
    email: "johndoe@example.com",
    dob: "1990-05-15",
    password: "password",
    nzCitizen: true,
    citizenshipDetails: ["New Zealand"],
    birthCountry: "New Zealand",
    address: "123 Example Street",
    city: "Auckland",
    postalCode: "1010",
    timeAtCurrentAddressInYears: 2,
    timeAtCurrentAddressInMonths: 6,
    residentType: "Renting",
  };

  await User.create(user);
}

export default UserService;

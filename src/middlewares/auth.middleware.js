import { verifyToken } from "#utils/jwt";
import { session } from "#middlewares/session";
import UserService from "#services/user";

export default async function (req, res, next) {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      throw {
        status: false,
        message: "Token expired please login",
        httpStatus: 401,
      };
    }

    token = token.split(" ")[1];

    const payload = verifyToken(token);

    const { id } = payload;

    const user = await UserService.get(id);
    session.set("user", user);

    next();
  } catch (err) {
    next(err);
  }
}

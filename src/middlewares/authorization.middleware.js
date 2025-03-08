import { session } from "#middlewares/session";

export default async function authorization(req, res, next) {
  try {
    const user = session.get("user");

    if (role === "admin") return next();
  } catch (err) {
    next(err);
  }
}

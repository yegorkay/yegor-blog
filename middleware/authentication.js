import { verify } from "jsonwebtoken";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const authenticated = (fn) => async (req, res) => {
  verify(
    req.headers.authorization,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(401).send({ message: "you are not authenticated" });
    }
  );
  return await fn(req, res);
};

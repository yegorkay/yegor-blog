import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, password } = req.body;
  const emailQuery = new RegExp(email, "i");

  const user = await req.db
    .collection(process.env.MONGO_COLLECTION)
    .find({ email: { $regex: emailQuery } })
    .toArray();

  const match = await compare(password, user[0].password);

  if (!match) {
    res.status(400).send({ message: "invalid credentials" });
  } else {
    const claims = { sub: user[0]._id };
    const authToken = sign(claims, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ authToken });
  }
});

export default handler;

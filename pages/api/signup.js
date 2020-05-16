/* eslint-disable @typescript-eslint/explicit-function-return-type */
import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { hash } from "bcrypt";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  await req.db
    .collection(process.env.MONGO_COLLECTION)
    .insertOne({ email, password: hashedPassword });

  res.json({ text: `inserted ${email}` });
});

export default handler;

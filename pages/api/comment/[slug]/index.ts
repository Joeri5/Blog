import { fetchBlogComments } from "@/data/comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug != "string") {
    return res.status(400).json({ statusCode: 400, message: "Bad Request" });
  }

  const comment = await fetchBlogComments(slug);
  res.status(200).json(comment);
};

export default handler;

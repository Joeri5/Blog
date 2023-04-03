import {NextApiRequest, NextApiResponse} from "next";
import {fetchBlogs} from "@/data/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const blog = await fetchBlogs();
    res.status(200).json(blog);
}

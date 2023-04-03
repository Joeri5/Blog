import {NextApiRequest, NextApiResponse} from "next";
import {fetchBlog} from "../../../data/blog";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {slug} = req.query;
    if (!slug || typeof slug != "string") {
        return res.status(400).json({statusCode: 400, message: "Bad Request"});
    }

    const post = await fetchBlog(slug);
    res.status(200).json(post);
}

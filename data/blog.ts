import {fetcher} from "@/data/fetcher";
import {request} from "graphql-request";
import useSWR from "swr"

export type Blog = {
    id: string;
    title: string;
    blogImage: {
        url: string;
    };
    content: string;
    slug: string;
    timeCreated: string;
}

type BlogsResponse = {
    blogs: Blog[];
};

type BlogResponse = {
    blogs: Blog[] | undefined;
};

export async function fetchBlogs(): Promise<Blog[]> {
    const req = await request<BlogsResponse>(process.env.HYGRAPH_API_URL!,
        `query BlogsRetrievalQuery {
            blogs {
                id
                title
                blogImage {
                    url
                }
                content
                slug
                timeCreated
            }
        }
    `
    )

    return req.blogs
}

export async function fetchBlog(slug: string): Promise<Blog[] | undefined> {
    const req = await request<BlogResponse>(process.env.HYGRAPH_API_URL!,
        `query BlogRetrievalQuery {
            blogs(where:{slug: "${slug}"}, first: 1) {
                id
                title
                blogImage {
                    url
                }
                content
                slug
                timeCreated
            }
        }
    `)

    return req.blogs
}

export function useBlog() {
    return useSWR<Blog[]>("/api/blog", fetcher);
}

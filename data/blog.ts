import {fetcher} from "@/data/fetcher";
import request from "graphql-request";
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

export async function fetchBlogs(): Promise<Blog[]> {
    return (await request(process.env.HYGRAPH_API_URL!!,
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
    ).blogs;
}

export async function fetchBlog(slug: string): Promise<Blog[] | undefined> {
    return (await request(process.env.HYGRAPH_API_URL!!,
            `query BlogsRetrievalQuery {
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
    `
        )
    ).blogs[0];
}

export function useBlog() {
    return useSWR<Blog[]>("/api/blog", fetcher);
}

import { fetcher } from "@/data/fetcher";
import { request } from "graphql-request";
import useSWR from "swr";

export type Blog = {
  id: string;
  title: string;
  blogImage: {
    url: string;
  };
  content: string;
  codeSnippet: string;
  codeLanguage: string;
  slug: string;
  timeCreated: string;
  tags: string[];
};

type BlogsResponse = {
  blogs: Blog[];
};

type BlogResponse = {
  blogs: Blog[] | undefined;
};

export async function fetchBlogs(): Promise<Blog[]> {
  const req = await request<BlogsResponse>(
    process.env.HYGRAPH_API_URL!,
    `query BlogsRetrievalQuery {
            blogs(first: 100) {
                id
                title
                blogImage {
                    url
                }
                content
                codeSnippet
                codeLanguage
                slug
                tags
                timeCreated
            }
        }
    `
  );

  return req.blogs;
}

export async function fetchBlog(slug: string): Promise<Blog[] | undefined> {
  const req = await request<BlogResponse>(
    process.env.HYGRAPH_API_URL!,
    `query BlogRetrievalQuery {
            blogs(where:{slug: "${slug}"}, first: 1) {
                id
                title
                blogImage {
                    url
                }
                content
                codeSnippet
                codeLanguage
                slug
                tags
                timeCreated
            }
        }
    `
  );

  return req.blogs;
}

export function useBlogs() {
  return useSWR<Blog[]>("/api/blog", fetcher);
}

export function useBlog(slug: string) {
  return useSWR<Blog[]>(`/api/blog/${slug}`, fetcher);
}

import { fetcher } from "@/data/fetcher";
import { gql, request } from "graphql-request";
import useSWR from "swr";

export type Comment = {
  id: string;
  username: string;
  message: string;
  creation: string;
};

type CommentsResponse = {
  comments: Comment[];
};

export async function fetchComments(): Promise<Comment[]> {
  const req = await request<CommentsResponse>(
    process.env.HYGRAPH_API_URL!,
    `query CommentsRetrievalQuery {
            comments(first: 1000) {
                id
                username
                message
                creation
            }
        }
    `
  );

  return req.comments;
}

export async function fetchBlogComments(
  slug: string
): Promise<Comment[] | undefined> {
  const query = gql`
    query BlogCommentsRetrievalQuery($slug: String!) {
      comments(first: 100, where: { blog: { slug: $slug } }) {
        id
        username
        message
        creation
      }
    }
  `;

  const req = await request<CommentsResponse>(
    process.env.HYGRAPH_API_URL!,
    query,
    { slug }
  );

  return req.comments;
}

export function useComments() {
  return useSWR<Comment[]>("/api/comment", fetcher);
}

export function useBlogComments(slug: string) {
  return useSWR<Comment[]>(`/api/comment/${slug}`, fetcher);
}

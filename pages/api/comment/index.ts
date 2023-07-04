import { fetchComments } from "@/data/comment";
import { GraphQLClient, gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateResult {
  createComment: {
    id: string;
  };
}

interface PublishResult {
  publishComment: {
    id: string;
  };
}

const graphqlAPI = process.env.HYGRAPH_READ_WRITE_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!graphqlAPI) {
      res.status(500).json({ error: "HYGRAPH_READ_WRITE_URL not set" });
      return;
    }

    const graphqlClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
    });

    const createQuery = gql`
      mutation CreateComment(
        $username: String!
        $message: String!
        $creation: DateTime!
        $slug: String!
      ) {
        createComment(
          data: {
            username: $username
            message: $message
            creation: $creation
            blog: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;

    const publishQuery = gql`
      mutation PublishComment($where: CommentWhereUniqueInput!) {
        publishComment(where: $where) {
          id
        }
      }
    `;

    const createVariables = {
      username: req.body.username,
      message: req.body.message,
      creation: new Date().toISOString(),
      slug: req.body.slug,
    };

    try {
      const createResult: CreateResult =
        await graphqlClient.request<CreateResult>(createQuery, createVariables);

      // After creating the comment, publish it.
      const publishVariables = {
        where: {
          id: createResult.createComment.id,
        },
      };

      const publishResult: PublishResult =
        await graphqlClient.request<PublishResult>(
          publishQuery,
          publishVariables
        );

      res.status(200).json({ createResult, publishResult });
    } catch (error: any) {
      res.status(500).json({ error: error.toString() });
    }
  } else {
    const comment = await fetchComments();
    res.status(200).json(comment);
  }
};

export default handler;

import { writeFileSync } from "fs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { resolve } from "path";
import { v4 } from "uuid";
import { readDatabase } from "../../utils/load";
import { PostEdge } from "./post.type";

export const CreatePostMutation = mutationWithClientMutationId({
  name: "CreatePost",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, body }) => {
    const source = resolve(__dirname, "..", "..", "..");
    const data = await readDatabase();
    const post = {
      id: v4(),
      title,
      body,
    };

    let posts = [];

    if (data.posts) {
      posts = data.posts;
    }

    posts.push(post);

    writeFileSync(`${source}/data.json`, JSON.stringify({ posts }));

    return { post };
  },
  outputFields: {
    postEdge: {
      type: PostEdge,
      resolve: async (data) => {
        const { post } = await data;
        if (!post) return null;

        return {
          cursor: toGlobalId("Post", post.id),
          node: post,
        };
      },
    },
  },
});

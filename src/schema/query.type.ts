import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { nodeField } from "../graphql/node.interface";
import * as PostLoader from "../graphql/post/post.loader";
import { PostConnection } from "../graphql/post/post.type";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Query type root",
  fields: () => ({
    node: nodeField,
    post: {
      type: new GraphQLNonNull(PostConnection),
      args: connectionArgs,
      resolve: async (_, args, ctx) => {
        const data = await PostLoader.loadAll();
        return connectionFromArray(data, args);
      },
    },
  }),
});

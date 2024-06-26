import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node.interface";

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type properties",
  fields: () => ({
    id: globalIdField("Posts"),
    title: {
      type: GraphQLString,
      resolve: (post) => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: (post) => post.body,
    },
  }),
  interfaces: [nodeInterface],
});

export const { connectionType: PostConnection, edgeType: PostEdge } = connectionDefinitions({
  nodeType: PostType,
});

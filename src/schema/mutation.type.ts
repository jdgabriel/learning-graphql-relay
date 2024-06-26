import { GraphQLObjectType } from "graphql";
import { CreatePostMutation } from "../graphql/post/post.mutation";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation types",
  fields: () => ({
    CreatePostMutation,
  }),
});

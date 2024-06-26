import { GraphQLSchema } from "graphql";
import { MutationType } from "./mutation.type";
import { QueryType } from "./query.type";

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import data from "../../data.json";

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    var { type, id } = fromGlobalId(globalId);
    const result: any[] = data[type.toLowerCase() as never];
    return result.filter((post) => post.id === id)[0];
  },
  (obj) => {
    return "Post";
  }
);

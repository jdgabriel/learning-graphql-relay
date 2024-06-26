# API GraphQL with Relay

Learning graphql relay in NodeJS basic properties, non database connection

## Post Type

```ts
export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type properties",
  fields: () => ({
    id: globalIdField("Posts"), // <-- Global id for use in relay
    title: {
      type: GraphQLString,
      resolve: (post) => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: (post) => post.body,
    },
  }),
  interfaces: [nodeInterface], // <- Node Interface
});

// Relay connection and edge
export const { connectionType: PostConnection, edgeType: PostEdge } = connectionDefinitions({
  nodeType: PostType,
});
```

## Node Interface

```ts
export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    /**
     * type -> Type of global id (e.g: Post)
     * id   -> Identification id (e.g: uuid)
     * Search for data where contains equal id in database or local array
     */
  },
  (obj) => {
    /**
     * obj    -> Contains all properties returned from globalId function
     * return -> Return type of data (e.g: Post)
     */
    return "Post";
  }
);
```

## Query

```ts
export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Query type root",
  fields: () => ({
    node: nodeField // <-- Add Node Resolver query,
    post: {
      type: new GraphQLNonNull(PostConnection), // <-- PostConnection Relay
      args: connectionArgs,
      resolve: async (_, args, ctx) => {
        const data = await PostLoader.loadAll();
        return connectionFromArray(data, args); // <-- Pagination Relay
      },
    },
  }),
});
```

## Mutation

```ts
export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation types",
  fields: () => ({
    // Add all mutations functions
  }),
});
```

## Server Schema

```ts
export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  // subscription: SubscriptionType
});
```

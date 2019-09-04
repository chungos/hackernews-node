const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `hola vato, este es un clon de hackernews`,
    feed: () => links,
    link: (parent, args) => {
      return links.find(links => links.id === args.id)
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Servin it live n' kickin on http://localhost:4000`))
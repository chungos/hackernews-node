const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')



const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote,
}

    // TODO: Update to use prisma
    // updateLink: (parent, args) => {
    //   const index = links.findIndex(links => links.id === args.id)
    //   const newlink = {
    //     id: args.id,
    //     description: args.description,
    //     url: args.url
    //   }
    //   const update = links.splice(index, 1, newlink)
    //   return newlink
    // },
    // deleteLink: (parent, args) => {
    //   const deleteLink = links.find(links => links.id === args.id)
    //   const index = links.findIndex(links => links.id === args.id)
    //   const deleteArray = links.splice(index, 1)
    //   return deleteLink
    // }

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => console.log(`Servin it live n' kickin on http://localhost:4000`))
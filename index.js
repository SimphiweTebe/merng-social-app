const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const Post = require('./models/Post')

const typeDefs = gql`

    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query{
       getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find()
                return posts
            }catch(err){
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('Connected to DB')
    return server.listen({ port: 5000 })
})
.then(res => console.log(`Server running at ${res.url}`))
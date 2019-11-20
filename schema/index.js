const graphql = require('graphql');
const Bet = require('../model/bet');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} = graphql;

const BetType = new GraphQLObjectType({
    name: 'Bet',
    fields: ( ) => ({
        id: { type: GraphQLID },
        teams: { type: GraphQLList(GraphQLString) },
        quotation: { type: GraphQLList(GraphQLFloat) },
        competition: { type: GraphQLString },
        country: { type: GraphQLString },
        result: { type: GraphQLString },
        score: { type: GraphQLList(GraphQLInt) },
        dateOfMatch: { type: GraphQLString },
        createdOn: { type: GraphQLString },


        
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        bet: {
            type: BetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Bet.findById(args.id);
            }
        },
        bets: {
            type: new GraphQLList(BetType),
            resolve(parent, args){
                return Bet.find({});
            }
        },
      
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBet: {
            type: BetType,
            args: {
                teams: { type: GraphQLList(GraphQLString) },
                quotation: { type: GraphQLList(GraphQLFloat) }
            },
            resolve(parent, args){
                let bet = new Bet({
                    teams: args.teams,
                    quotation: args.quotation
                });
                return bet.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
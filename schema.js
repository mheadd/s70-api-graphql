const graphql = require('graphql');
const request = require('request');
const config = require('./config').config;

let ContractorType = new graphql.GraphQLObjectType({
  name: 'contractor',
  fields: () => ({
    Category: {
      type: graphql.GraphQLString
    },
    Contractor_Name: {
      type: graphql.GraphQLString
    },
    Contractor_Details_URL: {
      type: graphql.GraphQLString
    },
    Contract_Number: {
      type: graphql.GraphQLString
    },
    Phone: {
      type: graphql.GraphQLString
    },
    Contractor_TC_Price_List: {
      type: graphql.GraphQLString
    },
    View_Catalog: {
      type: graphql.GraphQLString
    },
    State_Local: {
      type: graphql.GraphQLBoolean
    },
    Small_Business: {
      type: graphql.GraphQLBoolean
    },
    Other_Than_Small_Business: {
      type: graphql.GraphQLBoolean
    },
    Women_Owned_Small_Business: {
      type: graphql.GraphQLBoolean
    },
    Economically_Disadvantaged_Women_Owned_Small_Business: {
      type: graphql.GraphQLBoolean
    },
    Woman_Owned_Business: {
      type: graphql.GraphQLBoolean
    },
    Service_Disabled_Veteran_Owned_Small_Business: {
      type: graphql.GraphQLBoolean
    },
    Veteran_Owned_Small_Business: {
      type: graphql.GraphQLBoolean
    },
    SBA_Certified_Small_Disadvantaged_Business: {
      type: graphql.GraphQLBoolean
    },
    SBA_Certified_8a_Firm: {
      type: graphql.GraphQLBoolean
    },
    SBA_Certified_HUBZone_Firm: {
      type: graphql.GraphQLBoolean
    },
    State: {
      type: graphql.GraphQLString
    },
    City: {
      type: graphql.GraphQLString
    }
  })
});

let QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
      all_contractors: {
        type: new graphql.GraphQLList(ContractorType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            makeApiCall(config.api_url, resolve, reject);
          });
        }
      },
      contractors_by_state: {
        type: new graphql.GraphQLList(ContractorType),
        args: {
          state: {
            name: 'state',
            type: graphql.GraphQLString
          }
        },
        resolve: (parent, args) => {
          return new Promise((resolve, reject) => {
            makeApiCall(config.api_url + 'state/' + args.state, resolve, reject);
          });
        }
      }
  })
});

function makeApiCall(url, resolve, reject) {
  request(url, (error, response, body) => {
    if(error) {
      reject(error);
    }
    else {
      resolve(JSON.parse(body).data);
    }
  });
}

module.exports = new graphql.GraphQLSchema({
  query: QueryType
});

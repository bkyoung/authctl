const { GraphQLClient } = require('graphql-request');
const {
  GET_USER,
  CREATE_USER,
  DELETE_USER,
  LIST_USERS,
  SUSPEND_USER,
  UPDATE_USER
} = require('./api');
const { configure } = require('../config')
const { readAppToken } = require('../access')

const { ADMIN_API_ENDPOINT } = configure()

const requestMiddleware = async request => {
  const token = await readAppToken(ADMIN_API_ENDPOINT)
  return {
    ...request,
    headers: { ...request.headers, 'cf-access-token': token },
  }
}

exports.newAdminClient = async (endpoint = ADMIN_API_ENDPOINT) => {
  const client = new GraphQLClient(endpoint, { requestMiddleware });
  client.setHeader('accept', 'application/json');

  const performQuery = async (client, query, vars) => client.request(query, vars)

  return {
    getUser: async (key) => performQuery(client, GET_USER, { userKey: { key } }),
    createUser: async ({ email, givenName, familyName }) => performQuery(client, CREATE_USER, { email, givenName, familyName }),
    deleteUser: async (key) => performQuery(client, DELETE_USER, { userKey: { key } }),
    listUsers: async () => performQuery(client, LIST_USERS, {}),
    suspendUser: async (key) => performQuery(client, SUSPEND_USER, { userKey: { key } }),
    updateUser: async (key, userInfo) => performQuery(client, UPDATE_USER, { userKey: { key }, userInfo }),
  }
};

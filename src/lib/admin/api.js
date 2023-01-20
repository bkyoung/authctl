const { gql } = require('graphql-request')

exports.GET_USER = gql`
query getUser($userKey: UserSearchKey!) {
  user(userKey: $userKey) {
    id
    primaryEmail
    name {
      fullName
      givenName
      familyName
    }
    groups {
      id
      name
      email
      description
    }
    isAdmin
    isDelegatedAdmin
    creationTime
    agreedToTerms
    changePasswordAtNextLogin
    isMailboxSetup
    suspended
    suspensionReason
    sshPublicKeys {
      key
      fingerprint
      expirationTimeUsec
    }
    additionalData {
      github {
        username
      }
    }
  }
}
`;

exports.CREATE_USER = gql`
mutation CREATE_NEW_USER($email: Email!, $givenName: String!, $familyName: String!) {
  create(user: {primaryEmail: $email, name: {givenName: $givenName, familyName: $familyName}}) {
    id
    primaryEmail
    name {
      fullName
    }
  }
}
`;

exports.DELETE_USER = gql`
mutation DELETE_USER($userKey: UserKey!) {
  delete(userKey: $userKey)
}
`;

exports.LIST_USERS = gql`
query listUsers {
  users {
    id
    primaryEmail
    name {
      fullName
      givenName
      familyName
    }
    groups {
      id
      name
      email
      description
    }
    isAdmin
    isDelegatedAdmin
    creationTime
    agreedToTerms
    changePasswordAtNextLogin
    isMailboxSetup
    suspended
    suspensionReason
    sshPublicKeys {
      key
      fingerprint
      expirationTimeUsec
    }
    additionalData {
      github {
        username
      }
    }
  }
}
`;

exports.SUSPEND_USER = gql`
mutation SUSPEND_USER($userKey: UserKey!) {
  update(userKey: $userKey, userInfo: { suspended: true }) {
    id
    primaryEmail
    name {
      fullName
    }
    suspended
  }
}
`;

exports.UPDATE_USER = gql`
mutation UPDATE_USER($userKey: UserKey!, $userInfo: UpdateUserInput!) {
  update(userKey: $userKey, userInfo: $userInfo) {
    id
    primaryEmail
    name {
      fullName
    }
  }
}
`;

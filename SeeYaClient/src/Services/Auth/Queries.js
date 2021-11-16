export default class Queries {

  static AUTH_STATE_QUERY = `mutation CheckUserAuthStatus($input: CheckAuthStatusInput!) {
    CheckAuthStatus(input: $input) {
      clientMutationId
      error
      token
      user {
        id
        serverID
        name
        email
        verified
        image
      }
    }
  }
  `;

  static LOGIN_QUERY = `mutation LoginUser($input: LoginInput!) {
    Login(input: $input) {
      clientMutationId
      token
      error
      user {
        id
        serverID
        name
        email
        verified
        image
      }
    }
  }
`;
  static CREATE_ACCOUNT_QUERY = `mutation CreateNewAccount($input: CreateAccountInput!) {
    CreateAccount(input: $input) {
      clientMutationId
      token
      error
      user {
        id
        serverID
        name
        email
        verified
        image
      }
    }
  }`
}
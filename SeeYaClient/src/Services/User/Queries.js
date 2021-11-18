export default class Queries {

  static UPDATE_USER = `mutation UpdateUserQuery($input: UpdateUserInput!) {
    UpdateUser(input: $input) {
      clientMutationId
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

}
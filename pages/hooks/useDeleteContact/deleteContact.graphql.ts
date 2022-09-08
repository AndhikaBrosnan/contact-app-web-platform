import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
  mutation DeleteMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export { useMutation, MUTATION };

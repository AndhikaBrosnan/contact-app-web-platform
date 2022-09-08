import { useQuery, QUERY } from "./contactList.graphql";
import { QueryInput, QueryOutput } from "./types";

const useGetContactList = (variables: QueryInput) => {
  const data = useQuery<QueryOutput, QueryInput>(QUERY, {
    variables,
  });

  if (!data) {
    return {
      success: false,
      message: "Bad Request",
      data: { contact: [] },
    };
  }

  return data;
};

export default useGetContactList;

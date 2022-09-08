import { useMutation, MUTATION } from "./deleteContact.graphql";
import { MutationInput, MutationOutput } from "./types";

type RequestValue = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

const config = (req: any) => {
  return { variables: req };
};

const useDeleteContact = () => {
  const [doMutate, { error }] = useMutation<MutationOutput, MutationOutput>(
    MUTATION
  );

  const mutateDeleteContact = async (req: any) => {
    try {
      const res = await doMutate(config(req));
      console.log("res delete: ", res);
      return res;
    } catch (err: any) {
      return {
        success: false,
        message: "Bad Requests",
      };
    }
  };

  return [mutateDeleteContact];
};

export default useDeleteContact;

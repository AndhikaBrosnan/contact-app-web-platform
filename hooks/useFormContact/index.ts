import { useMutation, MUTATION } from "./formContact.graphql";
import { MutationInput, MutationOutput } from "./types";

type RequestValue = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

const config = (req: any) => {
  return { variables: req };
};

const useFormContact = () => {
  const [doMutate] = useMutation<MutationOutput>(MUTATION);

  const mutateFormContact = async (req: any) => {
    try {
      const res = await doMutate(config(req));
      return res;
    } catch (err: any) {
      return {
        success: false,
        message: "Bad Requests",
        refetch: () => {},
      };
    }
  };

  return [mutateFormContact];
};

export default useFormContact;

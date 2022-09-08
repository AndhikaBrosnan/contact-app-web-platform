import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobileHandler } from "../../../helpers/utils";
import CreatableSelect from "react-select/creatable";
import type { NextPage } from "next";
import { ContactList } from "../../hooks/useGetContactList/types";
import useFormContact from "../../hooks/useFormContact";

type ContactState = {
  first_name: string;
  last_name: string;
  phones: string[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activeContact: ContactList | undefined;
};

const FormContact: any = ({ isOpen, onClose, activeContact }: any) => {
  const toast = useToast();
  const isMobile = isMobileHandler();

  const [formValues, setFormValues] = useState<ContactState>({
    first_name: "",
    last_name: "",
    phones: [],
  });

  const [mutateFormContact] = useFormContact();

  useEffect(() => {
    if (activeContact) {
      let currPhones: string[] = [];
      let tempContact: ContactState;

      activeContact.phones.forEach((item: { number: string }) =>
        currPhones.push(item.number)
      );
      tempContact = {
        first_name: activeContact.first_name,
        last_name: activeContact.last_name,
        phones: currPhones,
      };

      setFormValues(tempContact);
    }
  }, [activeContact]);

  useEffect(() => {
    return () => {
      setFormValues({ first_name: "", last_name: "", phones: [] });
    };
  }, []);

  const onSubmit = async () => {
    const requests = {
      ...formValues,
      phones: formValues.phones.map((item: any) => {
        return { number: item?.label };
      }),
    };

    const { success }: any = await mutateFormContact(requests);

    if (success === false) {
      toast({
        title: `Failed Add Contact`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: `Contact Added`,
        status: "success",
        position: "top",
        isClosable: true,
      });

      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "full" : "xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              value={formValues.first_name}
              type="text"
              onChange={(e) =>
                setFormValues({ ...formValues, first_name: e.target.value })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={formValues.last_name}
              type="text"
              onChange={(e) =>
                setFormValues({ ...formValues, last_name: e.target.value })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <CreatableSelect
              isMulti
              onChange={(option: any) =>
                setFormValues({ ...formValues, phones: option })
              }
              options={[]}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" size="md" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default FormContact;

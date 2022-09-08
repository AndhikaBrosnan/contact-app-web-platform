import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import Head from "next/head";
import useGetContactList from "./hooks/useGetContactList";
import { isMobileHandler } from "../helpers/utils";
import { AddIcon, DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import FormContact from "./components/formContact";
import { ContactList, Phones } from "./hooks/useGetContactList/types";
import moment from "moment";
import { useEffect, useState } from "react";
import useDeleteContact from "./hooks/useDeleteContact";

const Home: NextPage = () => {
  const toast = useToast();
  const isServerRendered = typeof window !== "undefined";
  moment.locale();
  const isMobile = isMobileHandler();

  const [mutateDeleteContact] = useDeleteContact();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeContact, setActiveContact] = useState<ContactList>();
  const [favContact, setFavContact] = useState<ContactList | null>(null);

  const variables = {
    limit: 10,
    offset: 1,
  };

  useEffect(() => {
    if (isServerRendered)
      setFavContact(JSON.parse(localStorage.getItem("favorite") || "null"));
  }, []);

  useEffect(() => {
    refetch();
  }, [isOpen]);

  const { data, refetch } = useGetContactList(variables);

  const onHandleEdit = (contact: ContactList | undefined) => {
    setActiveContact(contact);
    onOpen();
  };

  const onHandleFav = (contact: ContactList, isUnfavorite: boolean) => {
    if (isUnfavorite) {
      setFavContact(null);
      localStorage.removeItem("favorite");
    } else {
      setFavContact(contact);
      localStorage.setItem("favorite", JSON.stringify(contact));
    }
  };

  const onHandleDelete = async (contact: ContactList) => {
    const requests = {
      id: contact.id,
    };

    const { success }: any = await mutateDeleteContact(requests);

    refetch();

    toast({
      title: `Delete Contact Success`,
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <div>
      <Head>
        <title>Contact App</title>
        <meta name="description" content="Contact list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Heading
          as="h1"
          size="lg"
          p={3}
          backgroundColor="#034521"
          color="white"
        >
          Contact List
        </Heading>

        <Box mt={2} p={isMobile ? 1 : 5}>
          <TableContainer>
            <Table variant="simple" size={isMobile ? "sm" : "md"}>
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Phones</Th>
                  <Th>Created At</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {favContact && (
                  <Tr backgroundColor="yellow.100">
                    <Td>{favContact?.first_name}</Td>
                    <Td>{favContact?.last_name}</Td>
                    <Td>
                      {favContact?.phones?.map((phone: Phones) => (
                        <Text>{phone.number}</Text>
                      ))}
                    </Td>
                    <Td>
                      {moment(favContact?.created_at).format(
                        "D MMMM YYYY, hh:mm:ss"
                      )}
                    </Td>
                    <Td>
                      <Flex justifyContent="flex-start" alignItems="center">
                        <Button
                          onClick={() => onHandleEdit(favContact)}
                          m={1}
                          rightIcon={<EditIcon />}
                          colorScheme="teal"
                          variant="outline"
                        >
                          Edit
                        </Button>
                        <Button
                          m={1}
                          rightIcon={<DeleteIcon color="red" />}
                          colorScheme="red"
                          variant="outline"
                        >
                          Delete
                        </Button>
                        <Button
                          m={1}
                          rightIcon={<StarIcon color="orange" />}
                          colorScheme="yellow"
                          variant="outline"
                          onClick={() => onHandleFav(favContact, true)}
                        >
                          Unfavorite
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                )}
                {data?.contact?.map((item: ContactList) => {
                  if (item.id !== favContact?.id) {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>
                          {item.phones?.map((phone: Phones) => (
                            <Text>{phone.number}</Text>
                          ))}
                        </Td>
                        <Td>
                          {moment(item.created_at).format(
                            "D MMMM YYYY, hh:mm:ss"
                          )}
                        </Td>
                        <Td>
                          <Flex justifyContent="flex-start" alignItems="center">
                            <Button
                              onClick={() => onHandleEdit(item)}
                              m={1}
                              rightIcon={<EditIcon />}
                              colorScheme="teal"
                              variant="outline"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => onHandleDelete(item)}
                              m={1}
                              rightIcon={<DeleteIcon color="red" />}
                              colorScheme="red"
                              variant="outline"
                            >
                              Delete
                            </Button>
                            <Button
                              m={1}
                              rightIcon={<StarIcon color="yellow" />}
                              colorScheme="yellow"
                              variant="outline"
                              onClick={() => onHandleFav(item, false)}
                            >
                              Favorite
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={styles["floating-button"]}>
          <IconButton
            onClick={onOpen}
            colorScheme="teal"
            borderRadius="28px"
            boxSize="50px"
            size="lg"
            aria-label="Search database"
            icon={<AddIcon />}
          />
        </Box>
      </Box>
      <FormContact
        isOpen={isOpen}
        onClose={onClose}
        activeContact={activeContact}
      />
    </div>
  );
};

export default Home;

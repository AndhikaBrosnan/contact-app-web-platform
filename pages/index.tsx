import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
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
import useGetContactList from "../hooks/useGetContactList";
import { isMobileHandler } from "../helpers/utils";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  Search2Icon,
  StarIcon,
} from "@chakra-ui/icons";
import FormContact from "./components/formContact";
import { ContactList, Phones } from "../hooks/useGetContactList/types";
import moment from "moment";
import { useEffect, useState } from "react";
import useDeleteContact from "../hooks/useDeleteContact";

const Home: NextPage = () => {
  const toast = useToast();
  const isServerRendered = typeof window !== "undefined";
  moment.locale();
  const isMobile = isMobileHandler();

  const [mutateDeleteContact] = useDeleteContact();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeContact, setActiveContact] = useState<ContactList>();
  const [favContact, setFavContact] = useState<ContactList | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [renderedData, setRenderedData] = useState<any>();

  const variables = {
    limit: 10,
    offset: offset,
  };
  const { data, refetch } = useGetContactList(variables);

  useEffect(() => {
    if (isServerRendered)
      setFavContact(JSON.parse(localStorage.getItem("favorite") || "null"));
  }, []);

  useEffect(() => {
    refetch();
  }, [isOpen]);

  useEffect(() => {
    setRenderedData(data?.contact);
  }, [data]);

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

    await mutateDeleteContact(requests);

    refetch();

    toast({
      title: `Delete Contact Success`,
      status: "success",
      position: "top",
      isClosable: true,
    });
  };

  const onHandlePage = (numb: number) => {
    setOffset(numb);

    refetch();
  };

  const onHandleSearch = (searchVal: string) => {
    if (searchVal === "") {
      setRenderedData(data?.contact);
      return;
    }
    const filterBySearch = renderedData.filter((item: any) =>
      item.first_name.concat(item.last_name).includes(searchVal)
    );
    setRenderedData(filterBySearch);
  };

  return (
    <div data-test="component-contactlist">
      <Head>
        <title>Contact App</title>
        <meta name="description" content="Contact list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Flex
          justifyContent="space-between"
          textAlign="center"
          p={3}
          backgroundColor="#034521"
        >
          <Heading as="h1" size="lg" color="white">
            Contact List
          </Heading>
          <Spacer />
          <InputGroup w="20%">
            <Input
              type="tel"
              placeholder="Search by Name"
              color="white"
              onChange={(e) => onHandleSearch(e.target.value)}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
          </InputGroup>
        </Flex>

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
                      {favContact?.phones?.map((phone: Phones, i: number) => (
                        <Text key={i}>{phone.number}</Text>
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
                          onClick={() => onHandleDelete(favContact)}
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
                {renderedData
                  ?.filter((item: ContactList) => item.id !== favContact?.id)
                  .map((item: ContactList) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>
                          {item.phones?.map((phone: Phones, i: number) => (
                            <Text key={i}>{phone.number}</Text>
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
        <Flex
          m={1}
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <Text textAlign="center" alignItems="center">
            Page:{" "}
          </Text>
          {[0, 1, 2].map((item: number) => (
            <Button
              onClick={() => onHandlePage(item)}
              m={1}
              colorScheme="teal"
              variant="ghost"
              key={item}
              borderRadius="28px"
            >
              {item + 1}
            </Button>
          ))}
        </Flex>
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

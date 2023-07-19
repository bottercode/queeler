import React from "react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <Heading>Queeler</Heading>
        <Text fontSize="1.5rem">Chat Better, Chat with Queeler</Text>
        <Stack direction="row" justifyContent="space-around">
          <Button
            as="a"
            target="_blank"
            href="https://github.com/bottercode"
            variant="outline"
            color="#D7DF23"
            backgroundColor={"black"}
          >
            Follow On Github
          </Button>
          <Button
            as={Link}
            to="/signup"
            color="#D7DF23"
            backgroundColor={"black"}
          >
            Register
          </Button>
        </Stack>
      </Layout>
    </>
  );
};

export default Home;

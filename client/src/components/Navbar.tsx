import React from "react";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  MenuDivider,
} from "@chakra-ui/react";
const Navbar = () => {
  return (
    <div>
      <Flex
        px={3}
        align="center"
        height="16"
        transition="all .2s ease"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Text fontSize="x-large">Chat</Text>
        <Spacer />
        <Stack direction="row" align="center">
          {" "}
        </Stack>
      </Flex>
    </div>
  );
};

export default Navbar;

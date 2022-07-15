import { Box, Flex, Show, Text } from "@chakra-ui/react";
import React from "react";
export const Sidebar = () => {
  return (
    <Show above="md">
      <Flex width="220px" direction="column">
        <Box height="100%" pos="fixed" p="12px" width="100%" maxW="220px">
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.50",
              cursor: "pointer"
            }}
          >
            {" "}
            <Text>Home</Text>
          </Box>
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.50",
              cursor: "pointer"
            }}
          >
            {" "}
            <Text>Questions</Text>
          </Box>
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.50",
              cursor: "pointer"
            }}
          >
            {" "}
            <Text>Tags</Text>
          </Box>
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.50",
              cursor: "pointer"
            }}
          >
            {" "}
            <Text>Users</Text>
          </Box>
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.50",
              cursor: "pointer"
            }}
          >
            {" "}
            <Text>Unanswered</Text>
          </Box>
        </Box>
      </Flex>
    </Show>
  );
};

import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
export const RelatedQuestion = () => {
  return (
    <Flex align="center">
      <Box bg="green.500" color="#fff" px="8px" py="4px" borderRadius="4px">
        <Text>278</Text>
      </Box>
      <Box ml="12px">
        <Link fontSize="sm">
          What are the tax implications of owning an Airbnb rental?
        </Link>
      </Box>
    </Flex>
  );
};

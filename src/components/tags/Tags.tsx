import { Box, Flex, Text } from "@chakra-ui/react";

export const Tags = () => {
  return (
    <Flex gap="12px">
      <Box className="tag" maxW="fit-content" p="4px">
        <Text fontSize="small">{`india`}</Text>
      </Box>
      <Box className="tag" maxW="fit-content" p="4px">
        <Text fontSize="small">{`stock market`}</Text>
      </Box>

      <Box
        p="4px"
        ml="auto"
        className="tag"
        bg="transparent"
        border="1px"
        borderColor="blue.500"
        color="black"
        cursor="pointer"
        _active={{ transform: "scale(1.1)" }}
      >
        <Text fontSize="small">Share</Text>
      </Box>
    </Flex>
  );
};

import { Box, Flex, Text } from "@chakra-ui/react";

export const Tag = ({ tag }: { tag: string }) => {
  return (

    <Box className="tag" maxW="fit-content" p="4px">
      <Text fontSize="small">{tag}</Text>
    </Box>
  );
};

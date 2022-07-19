import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Link,
  Text,
  Tooltip
} from "@chakra-ui/react";
import React from "react";
export const CommentInput = () => {
  return (
    <Box my="12px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Flex gap="12px" my="12px" wrap={["wrap", "wrap", "nowrap"]}>
          <Tooltip
            label="you need at least 5 reputations to add a comment"
            hasArrow
            placement="top"
          >
            <Input placeholder="Add a comment" flexGrow="1" />
          </Tooltip>
          <Button
            colorScheme="telegram"
            type="submit"
            w={["100%", "100%", "inherit"]}
          >
            Comment
          </Button>
        </Flex>
        <Divider />
        
      </form>
    </Box>
  );
};

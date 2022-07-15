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
        <Flex gap="12px" my="12px" direction="column">
          <Box>
            <Text fontSize="sm">
              "I think that without using useEffect an api call would block the
              render." - no, an async api call just doesn't work in the render
              method. The problem with calling it directly, i.e. without
              useEffect, is that it would fire the call on every render run, and
              even recursively when it sets state with the result.</Text>
            <Box color="gray.500" fontSize="sm">
              <Flex justify="end">
                <Link color="blue">- Prajwal</Link>
                <Text ml="8px"> {new Date(Date.now()).toDateString()}</Text>
              </Flex>
            </Box>

          </Box>

          {/*  */}
          <Box>
            <Text fontSize="sm">
              "I think that without using useEffect an api call would block the
              render." - no, an async api call just doesn't work in the render
              method. The problem with calling it directly, i.e. without
              useEffect, is that it would fire the call on every render run, and
              even recursively when it sets state with the result. </Text>
              <Box color="gray.500" fontSize="sm">
                <Flex justify="end">
                  <Link color="blue">- Prajwal</Link>
                  <Text ml="8px"> {new Date(Date.now()).toDateString()}</Text>
                </Flex>
              </Box>
           
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

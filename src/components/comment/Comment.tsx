import { Box, Flex, Link, Text } from "@chakra-ui/react";

export const Comment = () => {
    return (
        <Box>
            <Text fontSize="sm">
                "I think that without using useEffect an api call would block the
                render." - no, an async api call just doesn't work in the render method.
                The problem with calling it directly, i.e. without useEffect, is that it
                would fire the call on every render run, and even recursively when it
                sets state with the result.</Text>
            <Box color="gray.500" fontSize="sm">
                <Flex justify="end">
                    <Link color="blue">- Prajwal</Link>
                    <Text ml="8px"> {new Date(Date.now()).toDateString()}</Text>
                </Flex>
            </Box>

        </Box>
    );
};

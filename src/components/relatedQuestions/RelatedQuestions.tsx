import { Box, Flex, Text } from "@chakra-ui/react";
import { RelatedQuestion } from "../relatedQuestion/RelatedQuestion";
import React from "react";
export const RelatedQuestions = () => {
    return (
        <Flex direction="column" p="12px" maxW="340px" gap="12px">
            <Box my="12px">
                <Text textAlign="center" fontSize="larger">
                    Related Questions
                </Text>
            </Box>
            <RelatedQuestion />

            <RelatedQuestion />
            <RelatedQuestion />

            <RelatedQuestion />
        </Flex>
    );
};

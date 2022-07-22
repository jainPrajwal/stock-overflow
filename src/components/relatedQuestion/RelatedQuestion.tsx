import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Question } from "../../constants";
export const RelatedQuestion = ({
  question
}: {
  question: Question
}) => {
  return (
    <Flex align="center">
      <Box bg={question.isAcceptedAnswerPresent ? "green.500" : undefined} color={question.isAcceptedAnswerPresent ? "#fff" : undefined} px="8px" py="4px" borderRadius="4px"
        border={`1px`}
        borderColor={`green.500`}
      >
        <Text>{question.totalAnswers}</Text>
      </Box>
      <Box ml="12px">
        <Link fontSize="sm">
          {question.title}
        </Link>
      </Box>
    </Flex>
  );
};

import {
  Divider,
  Flex,
} from "@chakra-ui/react";
import { AnswerSection } from "../../answer/AnswerSection";
import { QuestionSection } from "../QuestionSection";


export const SingleQuestionSection = () => {
  
  return (
    <Flex
      flexGrow="1"
      direction="column"
      flexBasis="calc(50% - 1rem)"
      maxW="700px"
      paddingBlock={`12px`}

    >
      <QuestionSection />
      <Divider />
      <AnswerSection />
    </Flex>
  );
};

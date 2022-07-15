import { Box, Flex, Text } from "@chakra-ui/react";

import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getTotalVotes } from "../../utils/getTotalVotes";
import { CommentInput } from "../commentInput/CommentInput";
import { Flair } from "../flair/Flair";
import { SectionHeading } from "../heading/SectionHeading";
import { CustomIconButton } from "../icon/CustomIconButton";
import { Tags } from "../tags/Tags";


import { QuestionDescription } from "./QuestionDescription";

export const QuestionSection = () => {
  const { questionId } = useParams();
  const { questions } = useAppSelector(state => state.question);
  console.log(`questionid`, questionId);

  const question = questions.find(question => question._id === questionId);

  if (question) {
    return (
      <>
        <SectionHeading
          heading={`${question.title}`}
        />
        <Flex pt="2rem" width="100%" gap={["12px", "2rem"]} >

          <Flex direction="column" justify="start" align="center" gap="8px">
            <CustomIconButton icon={IoIosArrowDropup} />
            <Box>
              <Text fontSize="larger">{getTotalVotes({ questionOrAnswer: question }).totalPoints}</Text>
            </Box>
            <CustomIconButton icon={IoIosArrowDropdown} />
          </Flex>

          <Flex direction="column">
            <QuestionDescription description={question.description} />
            <Tags />
            <Flex
              justify="end"
              py="12px"
              gap="12px"
              wrap={["wrap", "wrap", "nowrap"]}
            >
              <Flair cardBackgroundColor="blue.50" isEdited />
              <Flair cardBackgroundColor="blue.100" />
            </Flex>
            <CommentInput />
          </Flex>
        </Flex>
      </>
    );
  }

  return <>Invalid ID..!</>

};

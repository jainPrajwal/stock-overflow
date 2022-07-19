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
import { ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants";

import { QuestionDescription } from "./QuestionDescription";
import { checkIfTheQuestionIsAlreadyDownVoted, checkIfTheQuestionIsAlreadyUpvoted, getQuestionFromQuestionId } from "../../utils/question";
import { Comment } from "../comment/Comment";

export const QuestionSection = () => {
  const { questionId } = useParams();
  const { questions } = useAppSelector(state => state.question);
  const activity = useAppSelector(state => state.activity);




  if (questionId) {
    const question = getQuestionFromQuestionId(questions, questionId);
    if (question) {
      const isAlreadyUpvoted = checkIfTheQuestionIsAlreadyUpvoted({ upvotedQuestions: activity.questions.upvoted, questionId: question._id });
      const isAlreadyDownvoted = checkIfTheQuestionIsAlreadyDownVoted({
        downVotedQuestions: activity.questions.downvoted,
        questionId: question._id
      });
      return (
        <>
          <SectionHeading
            heading={`${question.title}`}
          />
          <Flex pt="2rem" width="100%" gap={["12px", "2rem"]} >

            <Flex direction="column" justify="start" align="center" gap="8px">
              <CustomIconButton icon={isAlreadyUpvoted ? ICON_ALREADY_UPVOTED : ICON_UPVOTE} questionId={questionId} answer={null}

              />
              <Box>
                <Text fontSize="larger">{question.votes.count}</Text>
              </Box>
              <CustomIconButton icon={isAlreadyDownvoted ? ICON_ALREADY_DOWNVOTED : ICON_DOWNVOTE} questionId={questionId}
                answer={null}
              />
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
              <Comment questionId={`${questionId}`} answerId={null} />



            </Flex>
          </Flex>
        </>
      );
    }
    return <>Invalid ID..!</>

  }

  return <>Invalid ID..!</>

};

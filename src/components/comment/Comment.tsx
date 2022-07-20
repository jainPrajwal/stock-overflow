import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Answer, Comment as CommentType } from "../../constants";
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";
import { getTimeAgo } from "../../utils/common/getTimeAgo";

export const Comment = ({
    questionId,
    answer,
    commentsOnSpecifiedAnswer,
    commentsOnSpecifiedQuestion
}: {
    questionId: string | null;
    answer: Answer | null;
    commentsOnSpecifiedAnswer: Array<CommentType>;
    commentsOnSpecifiedQuestion: Array<CommentType>;
}) => {
    console.log(`answer `, answer?._id)
    const answerId = answer?._id;





    if (questionId && answerId) {


        return <>
            {
                commentsOnSpecifiedAnswer?.map(commentOnSpecifiedAnswer => {
                    return (
                        <Box key={commentOnSpecifiedAnswer._id}>
                            <Text fontSize="sm">
                                {commentOnSpecifiedAnswer.comment}</Text>
                            <Box color="gray.500" fontSize="sm">
                                <Flex justify="end">
                                    <Link color="blue">- {commentOnSpecifiedAnswer.commenter.name}</Link>
                                    <Text ml="8px"> {`${getTimeAgo(commentOnSpecifiedAnswer)} ago`}</Text>
                                </Flex>
                            </Box>
                        </Box>
                    );
                })
            }</>
    }
    if (questionId) {

        return <>
            {

                commentsOnSpecifiedQuestion?.map(commentOnSpecifiedQuestion => {
                    return (
                        <Box key={commentOnSpecifiedQuestion._id}>
                            <Text fontSize="sm">
                                {commentOnSpecifiedQuestion.comment}</Text>
                            <Box color="gray.500" fontSize="sm">
                                <Flex justify="end">
                                    <Link color="blue">- {commentOnSpecifiedQuestion.commenter.name}</Link>
                                    <Text ml="8px"> {getTimeAgo(commentOnSpecifiedQuestion)}</Text>
                                </Flex>
                            </Box>
                        </Box>
                    );
                })

            }
        </>
    }

    return <>Somehting is wrong..!</>
};

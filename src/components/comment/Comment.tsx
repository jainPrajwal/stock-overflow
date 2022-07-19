import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";

export const Comment = ({
    questionId,
    answerId
}: {
    questionId: string | null;
    answerId: string | null;
}) => {
    console.log(`answer `, answerId)
    const { comments } = useAppSelector(state => state.comment);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (comments.questionsMeta.loadingStatus === `idle`) {
            if (questionId) {
                console.log(`getting comments on question`)
                dispatch(getCommentsOnQuestionService({
                    questionId
                }))
            }

        }
    }, [comments.questionsMeta.loadingStatus, dispatch, questionId]);

    useEffect(() => {
        if (comments.answersMeta.loadingStatus === `idle`) {
            if (questionId && answerId) {
                dispatch(getCommentsOnAnswerService({
                    questionId,
                    answerId
                }))
            }
        }
    }, [comments.answersMeta.loadingStatus, answerId, questionId, dispatch]);



    const commentsOnSpecifiedQuestion = comments.questionsMeta.questions.filter(commentOnQuestion => commentOnQuestion.question === questionId)
    const commentsOnSpecifiedAnswer = comments.answersMeta.answers.filter(commentOnAnswer => commentOnAnswer.answer === answerId)

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
                                    <Text ml="8px"> {new Date(commentOnSpecifiedAnswer.createdAt).toDateString()}</Text>
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
                                    <Text ml="8px"> {new Date(commentOnSpecifiedQuestion.createdAt).toDateString()}</Text>
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

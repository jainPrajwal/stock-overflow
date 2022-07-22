import { Box, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Answer, Comment as CommentType } from "../../constants";
import { ICON_DELETE, ICON_EDIT } from "../../constants/common.types";


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
    
    const answerId = answer?._id;
    const { isOpen: isCommentModalOpen, onClose: onCommentModalClose, onOpen: onCommentModalOpen } = useDisclosure();
    const { profile } = useAppSelector(state => state.profile)



    if (questionId && answerId) {


        return <>

            {

                commentsOnSpecifiedAnswer?.map(commentOnSpecifiedAnswer => {
                    return (
                        <Box key={commentOnSpecifiedAnswer._id}>
                            {/* {
                                isCommentModalOpen && <EditCommentModal
                                    comment={commentOnSpecifiedAnswer}
                                    onClose={onCommentModalClose}
                                />
                            } */}
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
                            {/* {
                                isCommentModalOpen && <EditCommentModal
                                    comment={commentOnSpecifiedQuestion}
                                    onClose={onCommentModalClose}
                                />
                            } */}
                            <Text fontSize="sm">
                                {commentOnSpecifiedQuestion.comment}</Text>
                            <Box color="gray.500" fontSize="sm">
                                <Flex justify="end">
                                    <Link color="blue">- {commentOnSpecifiedQuestion.commenter.name}</Link>
                                    <Text ml="8px"> {getTimeAgo(commentOnSpecifiedQuestion)}</Text>
                                    {profile?._id === commentOnSpecifiedQuestion.commenter._id &&
                                        <Flex gap="8px">
                                            <Icon as={ICON_EDIT} />
                                            <Icon as={ICON_DELETE}></Icon>
                                        </Flex>}
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

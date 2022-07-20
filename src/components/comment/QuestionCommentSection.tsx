import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import {  Comment as CommentType } from "../../constants";
import { getTimeAgo } from "../../utils/common/getTimeAgo";


export const QuestionCommentSecion = ({
    questionId,
    commentsOnSpecifiedQuestion
}: {
    questionId: string | null;
    commentsOnSpecifiedQuestion: Array<CommentType>;
}) => {
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
                                    <Text ml="8px"> {`${getTimeAgo(commentOnSpecifiedQuestion)} ago`}</Text>
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

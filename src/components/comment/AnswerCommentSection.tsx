import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React  from "react";
import { Answer, Comment as CommentType } from "../../constants";
import { getTimeAgo } from "../../utils/common/getTimeAgo";

export const AnswerCommentSecion = ({
    answer,
    commentsOnSpecifiedAnswer,
}: {
    answer: Answer | null;
    commentsOnSpecifiedAnswer: Array<CommentType>;
}) => {
    console.log(`answer `, answer?._id)
    const answerId = answer?._id;
    if ( answerId) {
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

    return <>Somehting is wrong..!</>
};

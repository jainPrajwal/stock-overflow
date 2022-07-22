import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Answer, Comment as CommentType } from "../../constants";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
import { CommentComponent } from "./CommentComponent";

export const AnswerCommentSecion = ({
    answer,
    commentsOnSpecifiedAnswer,
}: {
    answer: Answer | null;
    commentsOnSpecifiedAnswer: Array<CommentType>;
}) => {
    
    const answerId = answer?._id;
    if (answerId) {
        return <>
            {
                commentsOnSpecifiedAnswer?.map(commentOnSpecifiedAnswer => {
                    return commentOnSpecifiedAnswer.isDeleted ? null :
                        <CommentComponent key={commentOnSpecifiedAnswer._id} comment={commentOnSpecifiedAnswer}
                            answer={answer}
                        />
                })
            }</>
    }

    return <>Somehting is wrong..!</>
};

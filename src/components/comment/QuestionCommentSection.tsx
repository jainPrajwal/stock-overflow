
import React, { useEffect } from "react";
import { Comment as CommentType } from "../../constants";
import { CommentComponent } from "./CommentComponent";



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
                    return commentOnSpecifiedQuestion.isDeleted ? null :
                        <CommentComponent key={commentOnSpecifiedQuestion._id} comment={commentOnSpecifiedQuestion} />
                })
            }
        </>
    }

    return <>Somehting is wrong..!</>
};

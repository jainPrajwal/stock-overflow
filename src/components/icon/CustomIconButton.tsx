import { Box, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import React from "react";
import { ActivityResponseType as Activity, Answer, ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_DOWNVOTE, ICON_UPVOTE, Question } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateQuestionService } from "../../services/question/updateQuestionService";
import { updateActivityQuestionService } from "../../services/activity/updateActivityQuestionService";
import { addQuestionToDownvotes, addQuestionToUpvotes, checkIfTheQuestionIsAlreadyDownVoted, checkIfTheQuestionIsAlreadyUpvoted, removeQuestionFromDownvotes, removeQuestionFromUpvotes } from "../../utils/question";
import { handleQuestionActivity } from "../../services/activity/handleQuestionActivity";


export const CustomIconButton = ({ icon, question }: { icon: IconType, question: Question }) => {
    const dispatch = useAppDispatch();
    const activity = useAppSelector(state => state.activity);


    return (
        <Box>
            <Button

                isDisabled={activity.loadingStatus === `loading`}
                bg="transparent"
                borderRadius="full"
                p={["4px", "4px", "12px"]}
                width={["24px", "48px", "64px"]}
                minW="none"
                height={["24px", "48px", "64px"]}
                onClick={() => {
                    handleQuestionActivity({
                        icon,
                        question,
                        activity,
                        dispatch
                    })
                }}
            >
                {

                }
                <Icon as={icon} width="100%" height="100%" />
            </Button>
        </Box>
    );
};

import { Box, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Answer } from "../../constants";
import { handleAnswerActivity, handleQuestionActivity } from "../../utils/activity";
import { getQuestionFromQuestionId } from "../../utils/question";
import { toast } from "react-toastify";


export const CustomIconButton = ({ icon, answer, questionId }: { icon: IconType, answer: Answer | null, questionId: string }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const activity = useAppSelector(state => state.activity);
    const { questions } = useAppSelector(state => state.question)

    const question = getQuestionFromQuestionId(questions, questionId);
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
                    if ((profile ? profile.reputation < 3 : false)) {
                        toast.error(`You need at least 3 reputation to upvote or downvote!`)
                    } else {
                        if (answer && question) {

                            handleAnswerActivity({
                                icon,
                                activity,
                                answer,
                                dispatch,
                                questionId: question._id
                            })
                        }
                        else if (question && !answer) {

                            handleQuestionActivity({
                                icon,
                                question,
                                activity,
                                dispatch
                            })
                        }

                    }



                }}
            >
                {

                }
                <Icon as={icon} width="100%" height="100%" />
            </Button>
        </Box>
    );
};

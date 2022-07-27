import { Box, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Answer } from "../../constants";
import { handleAnswerActivity, handleQuestionActivity } from "../../utils/activity";
import { getQuestionFromQuestionId } from "../../utils/question";
import { toast } from "react-toastify";


export const CustomIconButton = ({ icon, answer, questionId }: { icon: IconType, answer: Answer | null, questionId: string }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const activity = useAppSelector(state => state.activity);
    const { questions } = useAppSelector(state => state.question);
    const [hasActivityOccured, setHasActivityOccured] = useState(false);

    useEffect(() => {
        if (hasActivityOccured) {
            if (activity.loadingStatus === `success`) {
                toast.success(`${activity.message}`);
                setHasActivityOccured(false)
            } else if (activity.loadingStatus === `error`) {
                toast.error(`${activity.message}`)
            }
        }

    }, [activity, hasActivityOccured])

    const question = getQuestionFromQuestionId(questions, questionId);
    return (
        <Box>
            <Button
                isDisabled={activity.loadingStatus === `loading`}
                bg="transparent"
                borderRadius="full"
                p={["4px", "4px", "12px"]}
                width={["36px", "48px", "64px"]}
                minW="none"
                height={["36px", "48px", "64px"]}
                onClick={() => {
                    if (!profile) {
                        toast.error(`Please login to avail these features`)
                        return;
                    }
                    if ((profile ? profile.reputation < 3 : false)) {
                        toast.error(`You need at least 3 reputation to upvote or downvote!`)
                    } else {
                        if (answer && question) {
                            setHasActivityOccured(true);
                            handleAnswerActivity({
                                icon,
                                activity,
                                answer,
                                dispatch,
                                questionId: question._id,
                                profile
                            })
                        }
                        else if (question && !answer) {
                            setHasActivityOccured(true)
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

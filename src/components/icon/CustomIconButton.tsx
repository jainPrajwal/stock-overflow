import { Box, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleQuestionActivity } from "../../services/activity/handleQuestionActivity";
import { Answer, Question } from "../../constants";


export const CustomIconButton = ({ icon, question, answer }: { icon: IconType, question: Question | null, answer: Answer | null }) => {
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
                    if (question) {
                        handleQuestionActivity({
                            icon,
                            question,
                            activity,
                            dispatch
                        })
                    }
                    if (answer) {

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

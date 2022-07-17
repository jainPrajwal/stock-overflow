import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { Comment } from "../comment/Comment"
import { CommentInput } from "../commentInput/CommentInput"
import { Flair } from "../flair/Flair"
import { CustomIconButton } from "../icon/CustomIconButton"

import { AnswerFilters } from "./AnswerFilters"

import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadAnswersOfTheQuestion } from "../../features/answer/AnswerSlice"
import React from "react"
import { Answer, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants"
import { AnswerDescription } from "./AnswerDescription"



export const AnswerSection = () => {
    const { loadingStatus, answers } = useAppSelector(state => state.answer);
    const { questionId } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (loadingStatus === `idle`) {

            if (questionId) {
                dispatch(loadAnswersOfTheQuestion({
                    questionId
                }))
            }
        }
    }, [loadingStatus, questionId, dispatch]);

    return (
        <>
            {
                answers?.length > 0 ? answers.map((answer: Answer) => {
                    return <> <Flex align="center" my="12px">
                        <Text as="h4" fontSize="larger">
                            {answers.length} Answers
                        </Text>
                        <AnswerFilters />
                    </Flex>
                        <Flex pt="1rem" width="100%" gap={["2px", "12px", "2rem"]}>
                            <Flex direction="column" justify="start" align="center" gap="8px">
                                <CustomIconButton icon={ICON_UPVOTE} answer={answer}
                                    question={null}
                                />
                                <Box>
                                    <Text fontSize="larger">2</Text>
                                </Box>
                                <CustomIconButton icon={ICON_DOWNVOTE} answer={answer}
                                    question={null}
                                />

                                <Box>
                                    <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657557176/correct_axe2hj.png" />
                                </Box>
                            </Flex>
                            <Flex direction="column">
                                <AnswerDescription
                                    description={answer.answer}
                                />
                                <Flex
                                    justify="end"
                                    py="12px"
                                    gap="12px"
                                    wrap={["wrap", "wrap", "nowrap"]}
                                >
                                    <Flair cardBackgroundColor={`gray.100`} />
                                </Flex>
                                <CommentInput />
                                <Divider />
                                <Flex gap="12px" my="12px" direction="column">
                                    <Comment />

                                    {/*  */}
                                    <Comment />
                                </Flex>
                            </Flex>
                        </Flex>
                    </>
                }) : <>No Answers Yet..!</>
            }
        </>
    )




}
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { Comment } from "../comment/Comment"
import { CommentInput } from "../commentInput/CommentInput"
import { Flair } from "../flair/Flair"
import { CustomIconButton } from "../icon/CustomIconButton"
import { AnswerDescription } from "./AnswerDescription"
import { AnswerFilters } from "./AnswerFilters"
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadAnswersOfTheQuestion } from "../../features/answer/AnswerSlice"
import React from "react"
import { ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants"



export const AnswerSection = () => {

    const { questions } = useAppSelector(state => state.question)
    const { loadingStatus } = useAppSelector(state => state.answer);
    const { questionId } = useParams();
    const dispatch = useAppDispatch();


    const question = questions.find(question => question._id === questionId);
    useEffect(() => {
        if (loadingStatus === `idle`) {
            console.log(`answer section `, questionId);
            if (questionId) {
                dispatch(loadAnswersOfTheQuestion({
                    questionId
                }))
            }
        }
    }, [])
    if(question) {
        return <> <Flex align="center" my="12px">
        <Text as="h4" fontSize="larger">
            {/* {question?.totalAnswers} Answers */}
        </Text>
        <AnswerFilters />
    </Flex>
        <Flex pt="1rem" width="100%" gap={["2px", "12px", "2rem"]}>
            <Flex direction="column" justify="start" align="center" gap="8px">
                <CustomIconButton icon={ICON_UPVOTE} question={question} />
                <Box>
                    <Text fontSize="larger">2</Text>
                </Box>
                <CustomIconButton icon={ICON_DOWNVOTE} question={question} />

                <Box>
                    <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657557176/correct_axe2hj.png" />
                </Box>
            </Flex>
            <Flex direction="column">
                {/* <AnswerDescription /> */}
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
    } 
    return <>Question Not Found..!</>
    
}
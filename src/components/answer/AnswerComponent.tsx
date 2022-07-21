import { Box, Button, Divider, Flex, Image, Text, Tooltip } from "@chakra-ui/react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Answer, ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants"
import { markAsCorrectAnswerClicked } from "../../features/question/QuestionSlice"
import { updateAnswerService, updateQuestionService } from "../../services"
import { getCommentsOnAnswerService } from "../../services/comment/getCommentsOnAnswerService"
import { updateProfileService } from "../../services/profile/updateProfileService"
import { checkIfTheAnswerIsAlreadyDownVoted, checkIfTheAnswerIsAlreadyUpvoted } from "../../utils/answer"
import { getQuestionFromQuestionId } from "../../utils/question"
import { AnswerCommentSecion } from "../comment/AnswerCommentSection"
import { CommentInput } from "../commentInput/CommentInput"
import { Flair } from "../flair/Flair"
import { CustomIconButton } from "../icon/CustomIconButton"
import { AnswerDescription } from "./AnswerDescription"

export const AnswerComponent = ({
    answer,
    questionId,
    isThereAnAnswerWhichIsAlreadyMarkedAsCorrect
}: {
    answer: Answer;
    questionId: string;
    isThereAnAnswerWhichIsAlreadyMarkedAsCorrect: boolean;
}) => {
    const activity = useAppSelector(state => state.activity);
    const { comments } = useAppSelector(state => state.comment);
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile)
    const { questions } = useAppSelector(state => state.question)

    const isAlreadyDownvoted = checkIfTheAnswerIsAlreadyDownVoted({
        downvotedAnswers: activity.answers.downvoted,
        answerId: answer._id,

    });

    const answerId = answer._id;
    const question = getQuestionFromQuestionId(questions, questionId);


    useEffect(() => {
        console.log(`staaaaaaaaaaaaaaaatys`, comments.answersMeta.loadingStatus)

        if (questionId && answerId) {
            dispatch(getCommentsOnAnswerService({
                questionId,
                answerId
            }))

        }
    }, [comments.answersMeta.loadingStatus, answerId, questionId, dispatch]);

    const commentsOnSpecifiedAnswer = comments.answersMeta.answers.filter(commentOnAnswer => commentOnAnswer.answer === answerId)

    const isAlreadyUpvoted = checkIfTheAnswerIsAlreadyUpvoted({ upvotedAnswers: activity.answers.upvoted, answerId: answer._id });


    console.log(`TESTINGGG `, profile?._id)

    return <Box key={answer._id}>
        <Flex pt="1rem" width="100%" gap={["2px", "12px", "2rem"]} >
            <Flex direction="column" justify="start" align="center" gap="8px">

                <CustomIconButton
                    icon={isAlreadyUpvoted ? ICON_ALREADY_UPVOTED : ICON_UPVOTE}
                    answer={answer}
                    questionId={questionId}
                />

                <Box>
                    <Text fontSize="larger">{answer.votes.count}</Text>
                </Box>
                <CustomIconButton icon={isAlreadyDownvoted ? ICON_ALREADY_DOWNVOTED : ICON_DOWNVOTE} answer={answer}
                    questionId={questionId}
                />



                < Box >
                    {
                        answer.isMarkedAsCorrectAnswer ?
                            <Box
                                bg="transparent"
                                borderRadius="full"
                                p={["4px", "4px", "12px"]}
                                width={["24px", "48px", "64px"]}
                                minW="none"
                                height={["24px", "48px", "64px"]}
                                display="flex"
                                justifyContent={`center`}
                                onClick={() => {
                                    if (profile) {
                                        dispatch(updateAnswerService({
                                            answer: {
                                                ...answer, isMarkedAsCorrectAnswer: true,
                                                answerer: {
                                                    ...answer.answerer,
                                                    reputation: answer.answerer.reputation + 3
                                                }
                                            },
                                            answerId: answer._id,
                                            questionId
                                        }))
                                        // dispatch(markAsCorrectAnswerClicked(question!))
                                        if (question) {
                                            dispatch(updateQuestionService({
                                                question: {
                                                    ...question,
                                                    isAcceptedAnswerPresent: true
                                                },
                                                questionId
                                            }))
                                        }
                                        dispatch(updateProfileService({
                                            profile: {
                                                reputation: profile.reputation + 1
                                            }
                                        }))
                                    } else {
                                        toast.error(`Please login to comment`)
                                    }

                                }}
                            >
                                <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657557176/correct_axe2hj.png" width={`32px`} height={`32px`}
                                    m="0"
                                />
                            </Box>
                            :
                            profile?._id === question?.questioner._id && <Tooltip
                                label={`mark this as correct answer`}>
                                <Button
                                    isDisabled={activity.loadingStatus === `loading`}
                                    bg="transparent"
                                    borderRadius="full"
                                    p={["4px", "4px", "12px"]}
                                    width={["24px", "48px", "64px"]}
                                    minW="none"
                                    height={["24px", "48px", "64px"]}
                                    onClick={() => {
                                        if (!profile) {
                                            toast.error(`Please login to avail these features`)
                                        } else {
                                            if (!isThereAnAnswerWhichIsAlreadyMarkedAsCorrect) {
                                                dispatch(updateAnswerService({
                                                    answer: { ...answer, isMarkedAsCorrectAnswer: true },
                                                    answerId: answer._id,
                                                    questionId
                                                }))
                                            } else {
                                                toast.error(`Some Answer Has Already Been Marked As Correct`)
                                            }
                                        }


                                    }}
                                >

                                    <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1658323486/check_cm3r8w.svg" width={`32px`} height={`32px`}
                                        cursor={`pointer`} m="0"
                                    />
                                </Button>
                            </Tooltip>
                    }
                </Box>
            </Flex>
            <Flex direction="column" flexGrow={1}>
                <AnswerDescription
                    description={answer.answer}
                />
                <Flex
                    justify="end"
                    py="12px"
                    gap="12px"
                    wrap={["wrap", "wrap", "nowrap"]}
                >
                    {question && <Flair
                        question={question}
                        cardBackgroundColor={`gray.100`} />}
                </Flex>
                <CommentInput
                    questionId={questionId}
                    answerId={answer._id}
                />
                <Divider />
                <Flex gap="12px" my="12px" direction="column">
                    <AnswerCommentSecion
                        commentsOnSpecifiedAnswer={commentsOnSpecifiedAnswer}
                        answer={answer} />
                </Flex>
            </Flex>
        </Flex>
    </Box >
}
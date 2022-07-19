import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../app/hooks"
import { Answer, ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants"
import { checkIfTheAnswerIsAlreadyDownVoted, checkIfTheAnswerIsAlreadyUpvoted } from "../../utils/answer"
import { Comment } from "../comment/Comment"
import { CommentInput } from "../commentInput/CommentInput"
import { Flair } from "../flair/Flair"
import { CustomIconButton } from "../icon/CustomIconButton"
import { AnswerDescription } from "./AnswerDescription"

export const AnswerComponent = ({
    answers,
    answer,
    questionId
}: {
    answers: Array<Answer>,
    answer: Answer;
    questionId: string;
}) => {
    const activity = useAppSelector(state => state.activity);
    const isAlreadyDownvoted = checkIfTheAnswerIsAlreadyDownVoted({
        downvotedAnswers: activity.answers.downvoted,
        answerId: answer._id,

    });
    console.log(`ANSWQWER ID `, answer._id)

    const isAlreadyUpvoted = checkIfTheAnswerIsAlreadyUpvoted({ upvotedAnswers: activity.answers.upvoted, answerId: answer._id });
    return <Box key={answer._id}><Flex align="center" my="12px">

    </Flex>
        <Flex pt="1rem" width="100%" gap={["2px", "12px", "2rem"]}>
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
                    <Comment questionId={questionId} answerId={`${answer._id}`} />

                    {/*  */}

                </Flex>
            </Flex>

        </Flex>


    </Box>
}
import {
  Box,
  Button,
  Flex,
  Icon,
  Tag,
  Text,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import "./Question.css";


import { useLocation, useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import { ICON_ALREADY_BOOKMARKED, ICON_BOOKMARK, Question } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateQuestionService } from "../../services/question/updateQuestionService";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
import { toast } from "react-toastify";
import { checkIfTheQuestionIsAlreadyBookmarked } from "../../utils/question";
import { updateActivityQuestionService } from "../../services";

export const QuestionComponent = ({ question, setIsBookmarked }: { question: Question, setIsBookmarked?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activity = useAppSelector(state => state.activity);
  const { profile } = useAppSelector(state => state.profile)
  const { token } = useAppSelector(state => state.auth);
  const location = useLocation();



  const isQuestionAlreadyBookmarked = checkIfTheQuestionIsAlreadyBookmarked({
    bookmarkedQuestions: activity.questions.bookmarked,
    questionId: question._id
  })


  return (
    <Flex
      wrap={[`wrap`, `unset`]}
      marginBlock="1rem"
      padding="12px"
      borderBottom="1px"
      borderBottomColor="gray.100"
      key={question._id}
      cursor={`pointer`}
      onClick={() => {
        navigate(`/questions/${question._id}`);
        if (!token) {

          return;
        }

        dispatch(updateQuestionService({
          questionId: question._id,
          question: { views: question.views + 1 }
        }))
      }}
      pos={`relative`}
    >
      {location.pathname === `/user/bookmarks` && <Box pos={`absolute`} right={`10px`} top={`10px`} >
        <Button
          isDisabled={activity.loadingStatus === `loading`}
          bg="transparent"

          borderRadius="full"
          p={["4px", "4px", "8px"]}
          width={["24px", "48px", "48px"]}
          minW="none"
          height={["24px", "48px", "48px"]}
          onClick={(e) => {
            e.stopPropagation();

            if (!profile) {
              toast.error(`Please login to avail these features`)
              return;
            }
            if (!isQuestionAlreadyBookmarked) {
              setIsBookmarked && setIsBookmarked(true);
              dispatch(updateActivityQuestionService({
                activity: {
                  activity: {
                    ...activity,
                    questions: {
                      ...activity.questions,
                      bookmarked: activity.questions.bookmarked.concat(question),
                    },
                  }

                },
                questionId: question._id
              }))
            } else {
              setIsBookmarked && setIsBookmarked(true);
              dispatch(updateActivityQuestionService({
                activity: {
                  activity: {
                    ...activity,
                    questions: {
                      ...activity.questions,
                      bookmarked: activity.questions.bookmarked.filter(bookmarkedQuestion => bookmarkedQuestion._id !== question._id),
                    },
                  }

                },
                questionId: question._id
              }))
            }

          }}
        >

          <Icon width="60%" height="60%" as={!isQuestionAlreadyBookmarked ? ICON_BOOKMARK : ICON_ALREADY_BOOKMARKED} />
        </Button>
      </Box>}
      <Flex
        direction="column"
        justify="center"
        gap="24px"
        flexGrow="1"
      >
        <Text >
          {question.title}
        </Text>
        <Flex align="center" gap="12px" wrap="wrap">
          <Text fontSize="sm">asked {getTimeAgo(question)} ago</Text>

          <Text fontSize="sm">
            by{" "}
            <span style={{ fontWeight: `bold` }}>
              {question.questioner.name}
            </span>
          </Text>
        </Flex>
        <Flex gap="8px" align="center" flexGrow="1">
          {
            question.tags.map(tag => {
              return (
                <Tag
                  size={`md`}
                  variant="solid"
                  bg="blue.400"
                  key={`${tag}`}
                >
                  {tag}
                </Tag>
              )
            })
          }
        </Flex>

      </Flex>

      <Flex align="center" mt="1rem" gap="12px" wrap="wrap">
        <Flex gap="8px" ml="auto">
          <Flex
            justify="center"
            align="center"
            fontSize="sm"
            p="12px"
            w="100px"
          >
            <Text>{question.votes.count}</Text>
            <Text ml="2px">votes</Text>
          </Flex>
          <Flex
            justify="center"
            align="center"
            fontSize="sm"
            p="12px"
            border="1px"
            borderColor="green.500"
            background={
              question.isAcceptedAnswerPresent ? `green.500` : `transparent`
            }
            color={
              question.isAcceptedAnswerPresent ? `#fff` : `inherit`
            }
            borderRadius="4px"
          >
            <Text>{question.totalAnswers}</Text>
            <Text ml="2px">answers</Text>
          </Flex>
          <Flex
            justify="center"
            align="center"
            fontSize="sm"
            p="12px"
            w="100px"
          >
            <Text>{question.views}</Text>
            <Text ml="2px">views</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

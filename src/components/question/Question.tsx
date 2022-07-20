import {
  Flex,
  Tag,
  Text,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import "./Question.css";


import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Question } from "../../constants";
import { useAppDispatch } from "../../app/hooks";
import { updateQuestionService } from "../../services/question/updateQuestionService";
import { getTimeAgo } from "../../utils/common/getTimeAgo";

export const QuestionComponent = ({ question }: { question: Question }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        dispatch(updateQuestionService({
          questionId: question._id,
          question: { views: question.views + 1 }
        }))
      }}
    >
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
                  colorScheme="blue"
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

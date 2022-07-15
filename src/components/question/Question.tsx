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

export const QuestionComponent = ({ question }: { question: Question }) => {
  const navigate = useNavigate();

  return (
    <Flex
      wrap={[`wrap`, `unset`]}
      marginBlock="1rem"
      padding="12px"
      borderBottom="1px"
      borderBottomColor="gray.100"
      key={question._id}
      cursor={`pointer`}
      onClick={() => navigate(`/questions/${question._id}`)}
    >
      <Flex
        direction="column"
        justify="center"
        gap="24px"
        flexGrow="1"
      >
        <Text>
          {question.title}
        </Text>
        <Flex align="center" gap="12px" wrap="wrap">
          <Text fontSize="sm">asked {formatDistance(new Date(), new Date(question.createdAt))} ago</Text>

          <Text fontSize="sm">
            by{" "}
            <span style={{ fontWeight: `bold` }}>
              {question.questioner.name}
            </span>
          </Text>
        </Flex>
        <Flex gap="8px" align="center" flexGrow="1">
          <Tag
            size={`md`}
            variant="solid"
            colorScheme="blue"
          >
            finance
          </Tag>
          <Tag
            size={`md`}
            variant="solid"
            colorScheme="blue"
          >
            smallcase
          </Tag>
          <Tag
            size={`md`}
            variant="solid"
            colorScheme="blue"
          >
            stocks
          </Tag>
        </Flex>

      </Flex>

      <Flex align="center" mt="1rem" gap="12px" wrap="wrap">
        <Flex gap="8px" ml="auto">
          <Flex
            justify="center"
            align="center"
            fontSize="sm"
            p="12px"
          >
            <Text>{question.votes.upvotes.count + question.votes.downvotes.count}</Text>
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
          >
            <Text>{question.views}</Text>
            <Text ml="2px">views</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

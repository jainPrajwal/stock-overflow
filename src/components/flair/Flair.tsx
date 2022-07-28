import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Question } from "../../constants";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
export const Flair = ({
  cardBackgroundColor,
  isEdited = false,
  question
}: {
  cardBackgroundColor: string;
  isEdited?: boolean;
  question: Question
}) => {
  const { profile } = useAppSelector(state => state.profile)
  if (question) {
    return (
      <>
        <Flex
          justify="center"
          p={["4px", "4px", "12px"]}
          bg={`${cardBackgroundColor}`}
          direction="column"
          minW={["160px", "160px", "220px"]}
          borderRadius="4px"
        >
          <Text fontSize="sm">{`${isEdited ? `edited` : `added`
            } ${getTimeAgo(question)}  ago`}</Text>
          <Flex
            align={`center`}
            _hover={{
              cursor: "pointer"
            }}
            width={`fit-content`}
          >
            <Image
              src={`${profile?.profileImageUrl}`}
              width={`36px`}
              height={`36px`}
            ></Image>
            <Box ml="4px">
              <Text fontSize={`xs`}>{question.questioner.name}</Text>
              <Text fontSize={`xs`}>
                <Text as="span">{question.questioner.reputation}</Text>

                <Text as="span" ml="8px">
                  {
                    question.questioner.reputation > 7 ? `gold` : `silver`
                  }
                </Text>

              </Text>
            </Box>
          </Flex>
        </Flex>
      </>
    );
  }

  return <>Profile Not Found</>

};

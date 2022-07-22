import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Answer } from "../../constants";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
export const AnswerFlair = ({
  cardBackgroundColor,
  isEdited = false,
  answer
}: {
  cardBackgroundColor: string;
  isEdited?: boolean;
  answer: Answer
}) => {

  if (answer) {
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
            } ${getTimeAgo(answer)}  ago`}</Text>
          <Flex
            align={`center`}
            _hover={{
              cursor: "pointer"
            }}
            width={`fit-content`}
          >
            <Image
              src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1657350555/unitag_qrcode_standard_srgab6.png`}
              width={`36px`}
              height={`36px`}
            ></Image>
            <Box ml="4px">
              <Text fontSize={`xs`}>{answer.answerer.name}</Text>
              <Text fontSize={`xs`}>
                <Text as="span">{answer.answerer.reputation}</Text>

                <Text as="span" ml="8px">
                  {
                    answer.answerer.reputation > 7 ? `gold` : `silver`
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

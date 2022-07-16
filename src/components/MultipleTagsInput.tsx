import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import React from "react";
import { UserDefinedQuestionsType } from "../constants";
const checkIfTagIsAlreadyPresent = (
  array: Array<string>,
  input: string
): boolean => {
  console.log(`called`)
  return array?.includes(input);
};

const deleteTag = (array: Array<string>, tag: string) => {
  return array.filter((tagInArray) => tagInArray !== tag);
};

export const MultipleTagsInput = ({ questionDetails, setQuestionDetails }: {
  questionDetails: UserDefinedQuestionsType,
  setQuestionDetails: React.Dispatch<React.SetStateAction<UserDefinedQuestionsType>>
}) => {


  const [isKeyReleased, setIsKeyReleased] = useState<boolean>(false);
  const { inputTag } = questionDetails;

  return (
    <div>
      <Box className="container" padding="4px">
        {inputTag?.tags?.map((tag) => {
          return (
            <Box id={`${tag}`} gap="12px" key={`${tag}`} className="tag">
              <button
                style={{
                  display: `flex`,
                  alignItems: `center`
                }}
                onClick={(e) => {
                  console.log(`clicked`, e.currentTarget);
                  const finalTags = deleteTag(inputTag!.tags!, tag);
                  setQuestionDetails(prevState => {
                    return {
                      ...prevState,
                      inputTag: {
                        ...prevState.inputTag,
                        tags: finalTags
                      }
                    }
                  })
                }}
              >
                <Text fontSize="small">{`${tag}`}</Text>
                <Text fontSize="small" as="span" ml="8px">
                  <MdClose size={16} />
                </Text>
              </button>
            </Box>
          );
        })}
        <Flex flexGrow="1">
          <input
            placeholder="Enter a tag"
            value={`${inputTag.input}`}
            onChange={(e) => {
              setQuestionDetails(prevState => {
                return {
                  ...prevState,
                  inputTag: {
                    ...prevState.inputTag,
                    input: e.target.value
                  }
                }
              })
            }}
            onKeyDown={(e) => {
           
              if (e.key === `Enter`) {
                e.preventDefault();
              }
              if (
                e.key === `Enter` &&
                (inputTag?.input?.trim() && inputTag?.input?.trim()?.length > 0) && !checkIfTagIsAlreadyPresent(inputTag.tags!, inputTag?.input)
              ) {
                e.preventDefault();
               

                setQuestionDetails(prevState => {
                
                  return {
                    ...prevState,
                    inputTag: {
                      ...prevState.inputTag,
                      input: ``,
                      tags: prevState.inputTag.tags.concat(inputTag.input!)
                    }
                  }
                })


              }

              if (
                e.key === `Backspace` &&
                inputTag?.input && inputTag?.input?.length <= 0 &&
                isKeyReleased
              ) {
                console.log(`deleting`);
                setQuestionDetails(prevState => {
                  return {
                    ...prevState,
                    inputTag: {
                      ...prevState.inputTag,
                      tags: prevState.inputTag.tags && prevState.inputTag.tags.filter((tag, index: number) => {
                        return index !== (inputTag.tags && inputTag.tags.length - 1)
                      })
                    }
                  }
                })
              } else {
                setIsKeyReleased(false);
                return;
              }
            }}
            onKeyUp={(e) => {
              console.log(`key released`, e.key);
              setIsKeyReleased(true);
            }}
          />
        </Flex>
      </Box>
    </div>
  );
};

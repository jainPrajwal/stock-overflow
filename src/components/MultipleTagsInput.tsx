import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const checkIfTagIsAlreadyPresent = (
  array: Array<string>,
  input: string
): boolean => {
  return array.includes(input);
};

const deleteTag = (array: Array<string>, tag: string) => {
  return array.filter((tagInArray) => tagInArray !== tag);
};

export const MultipleTagsInput = () => {
  const [inputTag, setInputTag] = useState({
    input: ``,
    tags: [] as Array<string>
  });

  const [isKeyReleased, setIsKeyReleased] = useState<boolean>(false);

  return (
    <div>
      <Box className="container" padding="4px">
        {inputTag.tags.map((tag) => {
          return (
            <Box id={`${tag}`} gap="12px" key={`${tag}`} className="tag">
              <button
                style={{
                  display: `flex`,
                  alignItems: `center`
                }}
                onClick={(e) => {
                  console.log(`clicked`, e.currentTarget);
                  const finalTags = deleteTag(inputTag.tags, tag);
                  setInputTag((prevState) => ({
                    ...prevState,
                    tags: finalTags
                  }));
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
              setInputTag((prevState) => {
                return { ...prevState, input: e.target.value };
              });
            }}
            onKeyDown={(e) => {
              console.log(`key down`, e.key);

              if (e.key === `Enter`) {
                e.preventDefault();
              }
              if (
                e.key === `Enter` &&
                inputTag.input.trim().length > 0 &&
                !checkIfTagIsAlreadyPresent(inputTag.tags, inputTag.input)
              ) {
                e.preventDefault();
                console.log(`ye to add hona chaiye`);
                setInputTag((prevState) => ({
                  ...prevState,
                  tags: [...prevState.tags, inputTag.input],
                  input: ``
                }));
              }

              if (
                e.key === `Backspace` &&
                inputTag.input.length <= 0 &&
                isKeyReleased
              ) {
                console.log(`deleting`);
                setInputTag((prevState) => ({
                  ...prevState,
                  tags: prevState.tags.filter(
                    (tag, index) => index !== prevState.tags.length - 1
                  )
                }));
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

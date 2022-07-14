import { Box, Flex, Text } from "@chakra-ui/react";

import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { CommentInput } from "../commentInput/CommentInput";
import { Flair } from "../flair/Flair";
import { CustomIconButton } from "../icon/CustomIconButton";
import { Tags } from "../tags/Tags";


import { QuestionDescription } from "./QuestionDescription";



// const endOfASentence = new RegExp(`[!?.:]+(?=$)`, `g`);
const desc = ` A way to remember this is -m is for "move" (or mv), which is how you
rename files. Adding an alias could also help. To do so, run the following: git config --global alias.rename 'branch -m' If you are on
Windows or another case-insensitive filesystem, and there are only
capitalization changes in the name, you need to use -M, otherwise, git
will throw branch already exists error:`;

export const QuestionSection = () => {
  return (
    <Flex pt="2rem" width="100%" gap={["12px", "2rem"]}>
      <Flex direction="column" justify="start" align="center" gap="8px">
        <CustomIconButton icon={IoIosArrowDropup} />
        <Box>
          <Text fontSize="larger">2</Text>
        </Box>
        <CustomIconButton icon={IoIosArrowDropdown} />
      </Flex>

      <Flex direction="column">
        <QuestionDescription description={desc} />
        <Tags />
        <Flex
          justify="end"
          py="12px"
          gap="12px"
          wrap={["wrap", "wrap", "nowrap"]}
        >
          <Flair cardBackgroundColor="blue.50" isEdited />
          <Flair cardBackgroundColor="blue.100" />
        </Flex>
        <CommentInput />
      </Flex>
    </Flex>
  );
};

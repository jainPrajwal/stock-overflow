import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Link,
  Select,
  Text,
  Tooltip
} from "@chakra-ui/react";

import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";



import { AnswerFilters } from "./AnswerFilters";

import { AnswerDescription } from "./AnswerDescription";
import { SectionHeading } from "../heading/SectionHeading";
import { QuestionSection } from "../question/QuestionSection";
import { CustomIconButton } from "../icon/CustomIconButton";
import { Flair } from "../flair/Flair";
import { CommentInput } from "../commentInput/CommentInput";
import { Comment } from "../comment/Comment";



// const endOfASentence = new RegExp(`[!?.:]+(?=$)`, `g`);
const desc = ` A way to remember this is -m is for "move" (or mv), which is how you
  rename files. Adding an alias could also help. To do so, run the following: git config --global alias.rename 'branch -m' If you are on
  Windows or another case-insensitive filesystem, and there are only
  capitalization changes in the name, you need to use -M, otherwise, git
  will throw branch already exists error:`;

export const AnswerSection = () => {
  return (
    <Flex
      flexGrow="1"
      direction="column"
      flexBasis="calc(50% - 1rem)"
      maxW="700px"
      paddingBlock={`12px`}
    >
      <SectionHeading
        heading={` What are the tax implications of owning an Airbnb rental?`}
      />
      <Flex direction="column">
        <QuestionSection />
        <Divider />

        <Flex align="center" my="12px">
          <Text as="h4" fontSize="larger">
            1 Answer
          </Text>
          <AnswerFilters />
        </Flex>
        <Flex pt="1rem" width="100%" gap={["2px", "12px", "2rem"]}>
          <Flex direction="column" justify="start" align="center" gap="8px">
            <CustomIconButton icon={IoIosArrowDropup} />
            <Box>
              <Text fontSize="larger">2</Text>
            </Box>
            <CustomIconButton icon={IoIosArrowDropdown} />

            <Box>
              <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657557176/correct_axe2hj.png" />
            </Box>
          </Flex>
          <Flex direction="column">
            <AnswerDescription />
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
              <Comment />

              {/*  */}
              <Comment />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

import {
    Box,

    Flex,

    Show,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import "./Question.css";
import {  useState } from "react";

import { Sidebar } from "./sidebar/Sidebar";
import { AnswerSection } from "./answer/AnswerSection";
import { RelatedQuestions } from "./relatedQuestions/RelatedQuestions";

export const Question = () => {
    const [question, setQuestion] = useState<string | null>(null);
    
    return (
        <Box
          padding={`12px`}
          marginTop={`4rem`}
          marginInline="auto"
          maxW="1340"
          overflowY="auto"
        >
          <Flex gap="0">
            <Sidebar />
            <AnswerSection />
            <Show above="lg">
              <RelatedQuestions />
            </Show>
          </Flex>
        </Box>
      );
};

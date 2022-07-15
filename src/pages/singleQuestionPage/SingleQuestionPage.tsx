import { Box, Flex, Show } from "@chakra-ui/react";
import { SingleQuestionSection } from "../../components/question/singleQuestionSection/SingleQuestionSection";
import { RelatedQuestions } from "../../components/relatedQuestions/RelatedQuestions";
import { Sidebar } from "../../components/sidebar/Sidebar";
import React from "react";
export const SingleQuestionPage = () => {
    

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
                <SingleQuestionSection />
                <Show above="lg">
                    <RelatedQuestions />
                </Show>
            </Flex>
        </Box>
    );
}

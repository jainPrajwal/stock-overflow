import { Box, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { SectionHeading } from "../../components/heading/SectionHeading";
import { QuestionComponent } from "../../components/question/Question";


import { Sidebar } from "../../components/sidebar/Sidebar";

export const TaggedQuestionPage = () => {
    const { tag } = useParams();
    const { questions } = useAppSelector(state => state.question)
    if (tag) {

        const questionsWithTag = questions.filter(question => question.tags.includes(tag));

        return (
            <Box
                padding={`12px`}
                marginTop={`4rem`}
                marginInline="auto"
                maxW="1340"
                overflowY="auto"
            >
                <Flex gap="12px">
                    <Sidebar />
                    <Flex gap="12px" direction={`column`} flexGrow={1}>
                        <SectionHeading heading="Tagged Questions" />

                        <Flex direction={`column`} gap="12px">
                            {
                                questionsWithTag.length > 0 ? questionsWithTag.map(question => {
                                    return <QuestionComponent
                                        question={question}
                                        key={question._id}
                                    />
                                }) : <>
                                    <Text textAlign={`center`} fontSize={`md`} >No tags found..!</Text>

                                </>
                            }
                        </Flex>
                    </Flex>

                </Flex>
            </Box>
        );
    }

    return <></>
}
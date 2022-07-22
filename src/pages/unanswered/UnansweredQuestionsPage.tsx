import { Flex,  Text } from "@chakra-ui/react"
import { useAppSelector } from "../../app/hooks"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { QuestionComponent } from "../../components/question/Question"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const UnansweredQuestionsPage = () => {
    const { questions } = useAppSelector(state => state.question);

    return <Flex
        padding={`12px`}
        marginTop={`4rem`}
        marginInline="auto"
        maxW="1340"
        overflowY="auto"
    >
        <Sidebar />
        <Flex gap="12px" direction={`column`} flexGrow={1}>

            <SectionHeading heading="Unanswered Questions" />
            <Flex direction={`column`} gap="12px">
                {
                    questions.length > 0 ? questions.map(question => {
                        if (question.totalAnswers <= 0) {

                            return <QuestionComponent
                                question={question}
                                key={question._id}
                            />
                        }
                        return null;
                    }) : <>
                        <Text textAlign={`center`} fontSize={`md`} >No bookmarks found..!</Text>

                    </>
                }
            </Flex>
        </Flex>
    </Flex>
}
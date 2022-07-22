import { Button, Flex, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { QuestionComponent } from "../../components/question/Question"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const Bookmarks = () => {
    const { questions } = useAppSelector(state => state.activity);
    const navigate = useNavigate();
    return <Flex
        padding={`12px`}
        marginTop={`4rem`}
        marginInline="auto"
        maxW="1340"
        overflowY="auto"
    >
        <Sidebar />
        <Flex gap="12px" direction={`column`} flexGrow={1}>

            <SectionHeading heading="Bookmarks" />
            <Flex direction={`column`} gap="12px">
                {
                    questions.bookmarked.length > 0 ? questions.bookmarked.map(question => {
                        return <QuestionComponent
                            question={question}
                            key={question._id}
                        />
                    }) : <>
                        <Text textAlign={`center`} fontSize={`md`} >No bookmarks found..!</Text>
                        <Button
                            colorScheme={`telegram`}
                            size={`md`}
                            maxW={`280px`}
                            margin={`0 auto`}
                            onClick={() => navigate(`/`)}

                        >Explore more questions</Button>
                    </>
                }
            </Flex>
        </Flex>
    </Flex>

}
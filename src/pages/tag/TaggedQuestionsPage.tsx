import { Flex, Tag, } from "@chakra-ui/react"
import { useAppSelector } from "../../app/hooks"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Question } from "../../constants"

export const TaggedQuestionsPage = () => {
    const { questions } = useAppSelector(state => state.question)

    const allTags = [...new Set(questions.reduce((acc: Array<string>, current: Question) => {
        return [...acc, ...current.tags.map(tag => tag)]
    }, []))]

    return <Flex
        padding={`12px`}
        marginTop={`4rem`}
        marginInline="auto"
        maxW="1340"
        overflowY="auto"
    >
        <Sidebar />
        <Flex gap="12px" direction={`column`} flexGrow={1}>

            <SectionHeading heading="Tags"></SectionHeading>
            <Flex gap="12px" flexWrap={`wrap`}>
                {
                    allTags.map(tag => {
                        return (
                            <Tag
                                size={`md`}
                                variant="solid"
                                bg="blue.400"
                                key={`${tag}`}
                            >
                                {tag}
                            </Tag>
                        )
                    })
                }
            </Flex>
        </Flex>
    </Flex>

}
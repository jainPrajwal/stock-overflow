import { Flex, Tag, } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { Question } from "../../constants"

export const TaggedQuestionsPage = () => {
    const { questions } = useAppSelector(state => state.question)

    const allTags = [...new Set(questions.reduce((acc: Array<string>, current: Question) => {
        return [...acc, ...current.tags.map(tag => tag)]
    }, []))]

    console.log(`all Tags `, allTags)

    const navigate = useNavigate();

    return <Flex gap="12px" direction={`column`} flexGrow={1}>

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
                            onClick={() => {
                                navigate(`/questions/tagged/${tag}`)
                            }}

                            cursor={`pointer`}
                        >
                            {tag}
                        </Tag>
                    )
                })
            }
        </Flex>
    </Flex>


}
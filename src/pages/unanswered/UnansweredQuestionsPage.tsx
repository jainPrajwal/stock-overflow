import {  Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { ErrorFallback } from "../../components/errorBoundary/ErrorFallback"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { Loader } from "../../components/loader/Loader"
import { QuestionComponent } from "../../components/question/Question"
import { loadQuestions } from "../../services"

export const UnansweredQuestionsPage = () => {
    const { questions, loadingStatus } = useAppSelector(state => state.question);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (questions.length <= 0 && loadingStatus === `idle`) {
            dispatch(loadQuestions())
        }
    }, [loadingStatus, dispatch, questions]);

    return <Flex gap="12px" direction={`column`} flexGrow={1}>

                <SectionHeading heading="Unanswered Questions" />
                {loadingStatus === `success` ? <Flex direction={`column`} gap="12px">
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
                </Flex> : loadingStatus === `loading` ? <Loader /> : <ErrorFallback />}
            </Flex>
       

}
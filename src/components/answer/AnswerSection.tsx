import { Box, Button, Divider, Flex, FormControl, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { AnswerFilters } from "./AnswerFilters"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadAnswersOfTheQuestion } from "../../features/answer/AnswerSlice"
import React from "react"
import { Answer } from "../../constants"
import { CustomQuillToolbar, formats, modules } from "../CustomToolbar"
import ReactQuill from "react-quill"
import { addAnswerService, updateQuestionService } from "../../services"
import { AnswerComponent } from "./AnswerComponent"
import { checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect } from "../../utils/answer/checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect"
import { getQuestionFromQuestionId } from "../../utils/question"






export const AnswerSection = () => {
    const { loadingStatus, answers } = useAppSelector(state => state.answer);
    const { questionId } = useParams();
    const answersOnSpecifiedQuestion = answers.filter(answer => answer.question === questionId);
    const { questions } = useAppSelector(state => state.question)
    const isThereAnAnswerWhichIsAlreadyMarkedAsCorrect = checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect(answers);


    const dispatch = useAppDispatch();

    const [answer, setAnswer] = useState<{ text: string | null }>({
        text: null
    })




    useEffect(() => {
        if (questionId) {
            dispatch(loadAnswersOfTheQuestion({
                questionId
            }))
        }
    }, [loadingStatus, questionId, dispatch]);

    if (questionId) {
        const question = getQuestionFromQuestionId(questions, questionId);
        return (
            <>
                <Flex justify={`space-between`} mt="12px">
                    <Text as="h4" fontSize="larger">
                        {answersOnSpecifiedQuestion.length} Answers
                    </Text>

                    <AnswerFilters />
                </Flex>
                {
                    answersOnSpecifiedQuestion?.length > 0 ? answersOnSpecifiedQuestion.map((answer: Answer) => {

                        return <AnswerComponent answer={answer} key={answer._id}
                            questionId={questionId}
                            isThereAnAnswerWhichIsAlreadyMarkedAsCorrect={isThereAnAnswerWhichIsAlreadyMarkedAsCorrect}
                        />
                    }) : <>No Answers Yet..!</>
                }
                <Divider />
                <Flex direction={`column`} gap={`12px`} my="12px">
                    <Box>
                        <Text fontSize={`x-large`}>Your Answer</Text>
                    </Box>
                    <Box>
                        <Tabs>
                            <TabList justifyContent="start">
                                <Tab>Write</Tab>
                                <Tab>Preview</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Box>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (answer.text) {
                                                    dispatch(addAnswerService({
                                                        answer: answer.text,
                                                        questionId
                                                    }));
                                                    if (question) {

                                                        dispatch(updateQuestionService({
                                                            questionId: question._id,
                                                            question: { totalAnswers: question.totalAnswers + 1, isAcceptedAnswerPresent: true }
                                                        }))
                                                    }
                                                    setAnswer(prevState => ({ text: null }))
                                                }

                                            }}
                                            style={{ display: `flex`, flexDirection: `column`, gap: `12px` }}>
                                            <FormControl>
                                                <CustomQuillToolbar toolbarId={"t2"} />
                                                <ReactQuill
                                                    theme="snow"
                                                    onChange={(value) => {
                                                        console.log(`value `, value);
                                                        setAnswer(() => ({ text: value }));

                                                    }}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules("t2")}
                                                    formats={formats}
                                                />
                                            </FormControl>
                                            <FormControl >
                                                <Button
                                                    colorScheme="telegram"
                                                    height={`32px`}
                                                    borderRadius={`2px`}
                                                    fontSize={`sm`}
                                                    fontWeight={`normal`}
                                                    type="submit"
                                                >
                                                    Post Answer
                                                </Button>
                                            </FormControl>
                                        </form>

                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    <Box
                                        minH={`40vh`}
                                        dangerouslySetInnerHTML={{ __html: answer.text || `` }}></Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>

                </Flex>

            </>
        )
    }



    return <>No Answers Yet..!</>




}
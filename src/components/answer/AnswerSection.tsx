import { Box, Button, Divider, Flex, FormControl, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { AnswerFilters } from "./AnswerFilters"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import React from "react"
import { Answer, HIGHEST_SCORE, NEWEST_FIRST, OLDEST_FIRST } from "../../constants"
import { CustomQuillToolbar, formats, modules } from "../CustomToolbar"
import ReactQuill from "react-quill"
import { addAnswerService, loadAnswersOfTheQuestionService, updateQuestionService } from "../../services"
import { AnswerComponent } from "./AnswerComponent"
import { checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect } from "../../utils/answer/checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect"
import { getQuestionFromQuestionId } from "../../utils/question"
import { toast } from "react-toastify"
import { Loader } from "../loader/Loader"






export const AnswerSection = () => {
    const { loadingStatus, answers, sortBy, message } = useAppSelector(state => state.answer);
    const { questionId } = useParams();
    const answersOnSpecifiedQuestion = answers.filter(answer => answer.question === questionId && !answer.isDeleted);
    const { questions } = useAppSelector(state => state.question);
    const { profile } = useAppSelector(state => state.profile)
    const isThereAnAnswerWhichIsAlreadyMarkedAsCorrect = checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect(answers);
    const [isAnswerAdded, setIsAnswerAdded] = useState(false);

    const dispatch = useAppDispatch();

    const [answer, setAnswer] = useState<{ text: string | null }>({
        text: null
    })



    let sortedData = [...answersOnSpecifiedQuestion];

    if (sortBy) {
        switch (sortBy) {
            case HIGHEST_SCORE: sortedData = [...sortedData].sort((answer1, answer2) => answer2.votes.count - answer1.votes.count);
                break;
            case NEWEST_FIRST: sortedData = [...sortedData].sort((answer1, answer2) => new Date(answer2.updatedAt).getMilliseconds() - new Date(answer1.updatedAt).getMilliseconds());

                break;

            case OLDEST_FIRST: sortedData = [...sortedData].sort((answer1, answer2) => new Date(answer1.createdAt).getMilliseconds() - new Date(answer2.createdAt).getMilliseconds());

                break;

            default:
        }
    }

    useEffect(() => {
        if (questionId) {
            dispatch(loadAnswersOfTheQuestionService({
                questionId
            }))
        }
    }, [questionId, dispatch]);

    useEffect(() => {
        if (isAnswerAdded) {

            if (loadingStatus === `success` || loadingStatus === `error`) {
                toast.success(`${message}`)
            }

        }
    }, [isAnswerAdded, loadingStatus, message])

    if (questionId) {
        const question = getQuestionFromQuestionId(questions, questionId);
        return (
            <>
                <Flex justify={`space-between`} my="12px">
                    <Text as="h4" fontSize="larger">
                        {answersOnSpecifiedQuestion.length} Answers
                    </Text>

                    {sortedData?.length > 0 && <AnswerFilters />}
                </Flex>
                {
                    sortedData?.length > 0 ? sortedData.map((answer: Answer) => {
                        if (!answer.isDeleted) {
                            return <AnswerComponent answer={answer} key={answer._id}
                                questionId={questionId}
                                isThereAnAnswerWhichIsAlreadyMarkedAsCorrect={isThereAnAnswerWhichIsAlreadyMarkedAsCorrect}
                            />
                        }
                        return null;

                    }) : <Box p="1rem">{loadingStatus === `loading` ? <Loader /> : `No Answers Yet..!`}</Box>
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
                                                if (!profile) {
                                                    toast.error(`Please login to avail these features`)
                                                    return;
                                                }
                                                if (answer.text && answer.text.length > 0) {
                                                    setIsAnswerAdded(true);
                                                    dispatch(addAnswerService({
                                                        answer: answer.text,
                                                        questionId
                                                    }));
                                                    if (question) {

                                                        dispatch(updateQuestionService({
                                                            questionId: question._id,
                                                            question: {
                                                                totalAnswers: question.totalAnswers + 1,

                                                            }
                                                        }))


                                                    }
                                                    let element = document.getElementsByClassName("ql-editor");
                                                    element[0].innerHTML = "";
                                                    console.log(`elemt`, element)
                                                } else {
                                                    toast.error(`Answer cannot be empty`)
                                                }

                                            }}
                                            style={{ display: `flex`, flexDirection: `column`, gap: `12px` }}>
                                            <FormControl>
                                                <CustomQuillToolbar toolbarId={"t2"} />
                                                <ReactQuill
                                                    theme="snow"

                                                    onChange={(value) => {

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
                                                    isLoading={loadingStatus === `loading`}
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




    return <Box p="1rem">{loadingStatus === `loading` ? <Loader /> : `No Answers Yet..!`}</Box>



}
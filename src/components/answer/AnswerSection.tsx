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
import { addAnswerService } from "../../services"
import { AnswerComponent } from "./AnswerComponent"



export const AnswerSection = () => {
    const { loadingStatus, answers } = useAppSelector(state => state.answer);
    const { questionId } = useParams();

    const dispatch = useAppDispatch();

    const [answer, setAnswer] = useState<{ text: string | null }>({
        text: null
    })

    useEffect(() => {
        if (loadingStatus === `idle`) {

            if (questionId) {
                dispatch(loadAnswersOfTheQuestion({
                    questionId
                }))
            }
        }
    }, [loadingStatus, questionId, dispatch]);

    if (questionId) {
        return (
            <>
                <Flex justify={`space-between`} mt="12px">
                    <Text as="h4" fontSize="larger">
                        {answers.length} Answers
                    </Text>
                    
                    <AnswerFilters />
                </Flex>
                {
                    answers?.length > 0 ? answers.map((answer: Answer) => {
                       
                        return <AnswerComponent answers={answers} answer={answer} key={answer._id}
                            questionId={questionId}
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
                                                    }))
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
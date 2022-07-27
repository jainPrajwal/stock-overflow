import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    ListItem,
    OrderedList,
    Show,
    Tag,
    Text,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import "./AskQuestion.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { MultipleTagsInput } from "../../components/MultipleTagsInput";
import { CustomQuillToolbar, formats, modules } from "../../components/CustomToolbar";
import React from "react";
import { UserDefinedQuestionsType } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addQuestionService } from "../../services/question/addQuestionService";
import { toast } from "react-toastify";
import { SectionHeading } from "../../components/heading/SectionHeading";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

export const AskQuestion = () => {
    const [questionDetails, setQuestionDetails] = useState<UserDefinedQuestionsType>({
        title: null,
        description: null,

        inputTag: {
            input: ``,
            tags: []
        }
    });

    const { loadingStatus, message } = useAppSelector(state => state.question);
    const [isQuestionAdded, setIsQuestionAdded] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const { token } = useAppSelector(state => state.auth)
    const navigate = useNavigate();
    useScrollToTop();

    useEffect(() => {
        if (isQuestionAdded) {
            if (loadingStatus === `success`) {
                toast.success(`Question Added Successfully`)
            }
            if (loadingStatus === `error`) {
                toast.error(`${message}`)
            }
        }

    }, [loadingStatus, isQuestionAdded, message])

    const dispatch = useAppDispatch();
    return (
        <>


            <Flex gap="24px" flexGrow={`1`} >
                <Box flexGrow={`1`}>
                    <SectionHeading
                        heading="Ask a Public Question"
                    />
                    <Flex flexGrow="1" maxW="870px" direction={`column`}>
                        <form
                            onSubmit={(e) => {

                                e.preventDefault();


                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "12px",
                                flexGrow: `1`,
                                minHeight: `71vh`

                            }}
                        >
                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="title">
                                    Title
                                </FormLabel>
                                {!showPreview ?
                                    <>
                                        <FormHelperText marginBlock="8px">
                                            Be specific and imagine you’re asking a question to another
                                            person
                                        </FormHelperText>
                                        <Input variant="outline" placeholder="Title" id="title"
                                            onChange={(e) => {
                                                setQuestionDetails(prevState => ({ ...prevState, title: e.target.value }));
                                            }}
                                        />
                                    </> : <Box><Text>{questionDetails.title}</Text></Box>
                                }
                            </FormControl>

                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="description">
                                    Description
                                </FormLabel>
                                {!showPreview ? <>
                                    <FormHelperText marginBlock="8px">
                                        Include all the information someone would need to answer your
                                        question
                                    </FormHelperText>
                                    <CustomQuillToolbar toolbarId={"t1"} />
                                    <ReactQuill
                                        theme="snow"
                                        onChange={(value) => {

                                            setQuestionDetails(prevState => ({ ...prevState, description: value }));

                                        }}
                                        placeholder={"Write something awesome..."}
                                        modules={modules("t1")}
                                        formats={formats}
                                    />
                                </> : <Box dangerouslySetInnerHTML={{ __html: questionDetails.description || `` }}></Box>}
                            </FormControl>

                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="tags">
                                    Tags
                                </FormLabel>
                                {!showPreview ?
                                    <>
                                        <FormHelperText marginBlock="8px">
                                            Add up to 5 tags to describe what your question is about
                                        </FormHelperText>

                                        <MultipleTagsInput setQuestionDetails={setQuestionDetails}
                                            questionDetails={questionDetails}
                                        />
                                    </> : <Flex gap="8px" align="center" flexGrow="1" py={`0.5rem`}>
                                        {
                                            questionDetails.inputTag.tags.map(tag => {
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
                                    </Flex>}
                            </FormControl>



                        </form>
                        <Box paddingBlock="12px">
                            <ButtonGroup gap="4" w={`100%`} justifyContent={`flex-end`}>
                                <Button
                                    height={`32px`}
                                    borderRadius={`2px`}
                                    fontSize={`sm`}
                                    fontWeight={`normal`}
                                    onClick={() => setShowPreview(prevState => !prevState)}
                                >
                                    {showPreview ? `Close Preview` : `Show Preview`}
                                </Button>
                                <Button
                                    colorScheme="telegram"
                                    height={`32px`}
                                    borderRadius={`2px`}
                                    fontSize={`sm`}
                                    fontWeight={`normal`}
                                    onClick={() => {
                                        if (!token) {
                                            toast.error(`Please login to avail these features`)
                                            return;
                                        }
                                        if (questionDetails.description === null || questionDetails.title === null || questionDetails.inputTag.tags.length <= 0) {
                                            toast.error(`All the fields are mandatory`);
                                            return;
                                        }
                                        setIsQuestionAdded(true);
                                        dispatch(addQuestionService({
                                            question: questionDetails
                                        }))
                                        navigate(`/`)
                                    }}
                                    isLoading={loadingStatus === `loading` && isQuestionAdded}
                                >
                                    Post Question
                                </Button>

                            </ButtonGroup>
                        </Box>


                    </Flex>
                </Box>


                <Show above="md">
                    <Box border="1px" borderColor="gray.200" w="320px" p={`0.8rem`}>
                        <Heading fontSize="large" my="1rem">
                            Draft Your Question
                        </Heading>
                        <Box>
                            <Box my="1rem">
                                The community is here to help you with questions about money or personal finance. Provide details and share research with your question.
                            </Box>
                            <Accordion allowToggle>
                                <AccordionItem >

                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                Summarize the Question
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} >
                                        <OrderedList display={`flex`} gap={`12px`} flexDirection={`column`}>
                                            <ListItem> Include details about your goal</ListItem>
                                            <ListItem> Describe expected and actual results</ListItem>
                                            <ListItem> Include any references that can be helpful</ListItem>

                                        </OrderedList>





                                    </AccordionPanel>

                                </AccordionItem>

                                <AccordionItem >

                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                Describe the Quetion in Detail
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} >
                                        <OrderedList display={`flex`} gap={`12px`} flexDirection={`column`}>
                                            <ListItem> Be clear with the description</ListItem>
                                            <ListItem> Describe expected and actual results</ListItem>
                                            <ListItem> Include any references that can be helpful</ListItem>

                                        </OrderedList>





                                    </AccordionPanel>

                                </AccordionItem>

                            </Accordion>
                        </Box>
                    </Box>

                </Show>
            </Flex>

        </>
    );
}
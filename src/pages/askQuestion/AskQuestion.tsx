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
    Show,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import "./AskQuestion.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import { MultipleTagsInput } from "../../components/MultipleTagsInput";
import { CustomQuillToolbar, formats, modules } from "../../components/CustomToolbar";



export const AskQuestion = () => {
    const [question, setQuestion] = useState<string | null>(null);
    return (
        <>
            <Box mt="4rem" p="12px">
                <Heading fontSize="xx-large" m="1rem">
                    Ask a Public Question
                </Heading>
                <Flex gap="24px">
                    <Box flexGrow="1" maxW="870px">
                        <form
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "12px"
                            }}
                        >
                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="title">
                                    Title
                                </FormLabel>
                                <FormHelperText marginBlock="8px">
                                    Be specific and imagine you’re asking a question to another
                                    person
                                </FormHelperText>
                                <Input variant="outline" placeholder="Title" id="title" />
                            </FormControl>
                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormHelperText marginBlock="8px">
                                    Include all the information someone would need to answer your
                                    question
                                </FormHelperText>
                                <CustomQuillToolbar toolbarId={"t1"} />
                                <ReactQuill
                                    theme="snow"
                                    onChange={(value) => {
                                        console.log(`value `, value);
                                        setQuestion(value);

                                    }}
                                    placeholder={"Write something awesome..."}
                                    modules={modules("t1")}
                                    formats={formats}
                                />
                            </FormControl>
                            <FormControl paddingBlock="12px">
                                <FormLabel margin="0" htmlFor="tags">
                                    Tags
                                </FormLabel>
                                <FormHelperText marginBlock="8px">
                                    Add up to 5 tags to describe what your question is about
                                </FormHelperText>

                                <MultipleTagsInput />
                            </FormControl>

                            <FormControl>
                                <ButtonGroup gap="4">
                                    <Button
                                        colorScheme="telegram"
                                        height={`32px`}
                                        borderRadius={`2px`}
                                        fontSize={`sm`}
                                        fontWeight={`normal`}
                                        type="submit"
                                    >
                                        Post Question
                                    </Button>
                                    <Button
                                        height={`32px`}
                                        borderRadius={`2px`}
                                        fontSize={`sm`}
                                        fontWeight={`normal`}
                                    >
                                        Save Draft
                                    </Button>
                                </ButtonGroup>
                            </FormControl>
                        </form>
                        <Box>

                            <Box dangerouslySetInnerHTML={{ __html: question || "" }}></Box>
                        </Box>
                    </Box>

                    <Show above="md">
                        <Box border="1px" borderColor="gray.200" w="320px">
                            <Heading fontSize="large" m="1rem">
                                Draft Your Question
                            </Heading>
                        </Box>
                    </Show>
                </Flex>
            </Box>
        </>
    );
}
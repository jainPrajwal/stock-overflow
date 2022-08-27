import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormHelperText,

    ButtonGroup,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Answer, } from '../../../constants';
import { updateAnswerService } from '../../../services';

import { CustomQuillToolbar, formats, modules } from '../../CustomToolbar';




export const EditAnswerModal = ({ isOpen, onClose, answer }: {
    isOpen: boolean;
    onClose: () => void;
    answer: Answer;

}) => {

    const [answerDetails, setAnswerDetails] = useState<{ answer: string }>({
        answer: answer.answer
    });
    const dispatch = useAppDispatch();
    const { questionId } = useParams();
    const { profile } = useAppSelector(state => state.profile);
    const { loadingStatus, message } = useAppSelector(state => state.answer);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        if (isEdited) {
            if (loadingStatus === `success` || loadingStatus === `error`) {
                onClose();
                toast.success(`${message}`)
            }
        }
    }, [loadingStatus, message, onClose, isEdited])
    return <>
        <Modal onClose={onClose} isOpen={isOpen} size={`3xl`}
            variant={`dark`}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Answer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs>
                        <TabList justifyContent="start">
                            <Tab>Write</Tab>
                            <Tab>Preview</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Flex gap="24px">
                                    <Box flexGrow="1" maxW="870px">
                                        <form
                                            onSubmit={(e) => {

                                                e.preventDefault();
                                                
                                                if (!profile) {
                                                    toast.error(`Please login to avail these features`)
                                                    return;
                                                }
                                                if (questionId) {
                                                    setIsEdited(true);
                                                    dispatch(updateAnswerService({
                                                        answer: {
                                                            ...answer,
                                                            answer: answerDetails.answer
                                                        },
                                                        answerId: answer._id,
                                                        questionId,
                                                    }))

                                                }

                                            }}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                padding: "12px"
                                            }}
                                        >

                                            <FormControl paddingBlock="12px">
                                                <FormLabel margin="0" htmlFor="description">
                                                    Description
                                                </FormLabel>
                                                <FormHelperText marginBlock="8px">
                                                    Include all the information someone would need to answer your
                                                    answer
                                                </FormHelperText>
                                                <CustomQuillToolbar toolbarId={"t4"} />
                                                <ReactQuill
                                                    defaultValue={answer.answer}
                                                    theme="snow"
                                                    onChange={(value) => {
                                                        setAnswerDetails(prevState => ({ ...prevState, answer: value }));
                                                    }}
                                                    placeholder={"Write something awesome..."}
                                                    modules={modules("t4")}
                                                    formats={formats} />
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
                                                        isLoading={loadingStatus === `loading`}
                                                    >
                                                        Edit Answer
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



                                    </Box>
                                </Flex>
                            </TabPanel>
                            <TabPanel>
                                <Box dangerouslySetInnerHTML={{ __html: answerDetails.answer }}></Box>

                            </TabPanel>
                        </TabPanels>
                    </Tabs>



                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal></>
}

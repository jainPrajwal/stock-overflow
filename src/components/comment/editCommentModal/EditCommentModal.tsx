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
    Input,
    ButtonGroup,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,

} from '@chakra-ui/react'
import { useState } from 'react';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Comment } from "../../../constants";
import { updateCommentonQuestionService } from '../../../services/comment/updateCommentonQuestionService';

export const EditCommentModal = ({
    comment,
    onClose,
    isOpen
}: {
    comment: Comment,
    onClose: () => void,
    isOpen: boolean
}) => {
    const { profile } = useAppSelector(state => state.profile);
    const [commentText, setCommentText] = useState<{ text: string }>({
        text: comment.comment
    });
    const dispatch = useAppDispatch();
    return <>
        <Modal onClose={onClose} size={`2xl`} isOpen={isOpen} variant={`dark`}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={(e) => {

                    e.preventDefault();
                    if (!profile) {
                        toast.error(`Please login to avail these features`)
                        return;
                    }
                    if (comment.comment !== commentText.text && comment.question) {
                        dispatch(updateCommentonQuestionService({
                            questionId: comment.question,
                            comment: {comment: commentText.text},
                            commentId: comment._id
                            
                        }))
                        console.log(`comment `, commentText.text)
                    }
                    onClose();
                }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "12px"
                    }}>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex gap="24px">
                            <Box flexGrow="1" maxW="870px">
                                <FormControl paddingBlock="12px">
                                    <FormLabel margin="0" htmlFor="title">
                                        Comment
                                    </FormLabel>

                                    <Input variant="outline" placeholder="Title" id="title"
                                        defaultValue={comment.comment}
                                        onChange={(e) => {
                                            setCommentText(prevState => ({ text: e.target.value }))

                                        }}
                                    />
                                </FormControl>

                            </Box>
                        </Flex>
                    </ModalBody>
                    <FormControl>
                        <ModalFooter gap={`12px`}>


                            <Button onClick={onClose}>Close</Button>



                            <Button
                                colorScheme="telegram"
                                fontSize={`sm`}
                                type="submit"
                            >
                                Edit Comment
                            </Button>

                        </ModalFooter>
                    </FormControl>
                </form>

            </ModalContent>
        </Modal>

    </>
}
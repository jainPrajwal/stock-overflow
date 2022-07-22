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
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { Comment } from '../../../../constants'
import { deleteCommentonAnswerService, deleteCommentOnQuestionService } from '../../../../services'
export const DeleteCommentModal = ({
    isOpen,
    onClose,
    comment,
    questionId
}: {
    isOpen: boolean,
    onClose: () => void,
    comment: Comment,
    questionId?: string;
}) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile)
    return <>
        <Modal onClose={onClose} size={`xl`} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete the Question..?

                </ModalBody>
                <ModalFooter>
                    <Flex gap="12px">
                        <Button
                            variant={`solid`}
                            colorScheme={`red`}
                            onClick={() => {
                                if (!profile) {
                                    toast.error(`Please login to avail these features`)
                                    return;
                                }
                                if (comment.answer && questionId) {
                                    dispatch(deleteCommentonAnswerService({
                                        answerId: comment.answer,
                                        questionId: questionId,
                                        commentId: comment._id

                                    }));
                                    toast.success(`Comment Deleted Successfully`)
                                }
                                else if (comment.question) {
                                    dispatch(deleteCommentOnQuestionService({
                                        commentId: comment._id,
                                        questionId: comment.question
                                    }))
                                    toast.success(`Comment Deleted Successfully`)
                                }
                                onClose();

                            }}
                        >Yes</Button>
                        <Button onClick={onClose}>No</Button>
                    </Flex>

                </ModalFooter>
            </ModalContent>
        </Modal></>
}
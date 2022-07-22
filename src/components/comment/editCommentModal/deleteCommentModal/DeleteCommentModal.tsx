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
import { deleteCommentOnQuestionService } from '../../../../services'
export const DeleteCommentModal = ({
    isOpen,
    onClose,
    comment
}: {
    isOpen: boolean,
    onClose: () => void,
    comment: Comment
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
                                if (comment.question) {
                                    dispatch(deleteCommentOnQuestionService({
                                        commentId: comment._id,
                                        questionId: comment.question
                                    }))
                                }

                                toast.success(`Question Deleted Successfully`)
                            }}
                        >Yes</Button>
                        <Button onClick={onClose}>No</Button>
                    </Flex>

                </ModalFooter>
            </ModalContent>
        </Modal></>
}
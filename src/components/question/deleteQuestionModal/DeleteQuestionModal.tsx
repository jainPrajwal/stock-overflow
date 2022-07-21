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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Question } from '../../../constants';
import { deleteQuestionService } from '../../../services';
export const DeleteQuestionModal = ({ onClose, isOpen, question }: {
    isOpen: boolean,
    onClose: () => void,
    question: Question
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
                                navigate(`/`);
                                dispatch(deleteQuestionService({
                                    questionId: question._id
                                }))
                                toast.success(`Question Deleted Successfully`)
                            }}
                        >Yes</Button>
                        <Button onClick={onClose}>No</Button>
                    </Flex>

                </ModalFooter>
            </ModalContent>
        </Modal></>
}
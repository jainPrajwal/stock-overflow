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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Answer } from '../../../constants';
import { deleteAnswerService } from '../../../services/answer/deleteAnswerService';
export const DeleteAnswerModal = ({ onClose, isOpen, answer }: {
    isOpen: boolean,
    onClose: () => void,
    answer: Answer
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector(state => state.profile);
    const { questionId } = useParams();


    return <>
        <Modal onClose={onClose} size={`xl`} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete the Answer..?

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

                                if (questionId) {
                                    dispatch(deleteAnswerService({
                                        answerId: answer._id,
                                        questionId
                                    }))
                                }

                                toast.success(`Answer Deleted Successfully`)
                            }}
                        >Yes</Button>
                        <Button onClick={onClose}>No</Button>
                    </Flex>

                </ModalFooter>
            </ModalContent>
        </Modal></>
}
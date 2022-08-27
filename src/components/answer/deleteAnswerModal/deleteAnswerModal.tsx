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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Answer } from '../../../constants';
import { updateQuestionService } from '../../../services';
import { deleteAnswerService } from '../../../services/answer/deleteAnswerService';
import { getQuestionFromQuestionId } from '../../../utils/question';
export const DeleteAnswerModal = ({ onClose, isOpen, answer }: {
    isOpen: boolean,
    onClose: () => void,
    answer: Answer,

}) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const { questions } = useAppSelector(state => state.question)
    const { questionId } = useParams();
    const [isDeleted, setIsDeleted] = useState(false);
    const { loadingStatus, message } = useAppSelector(state => state.answer);

    useEffect(() => {

        if (isDeleted && (loadingStatus === `success` || loadingStatus === `error`)) {
            onClose();

            toast.success(`${message}`)
        }
    }, [loadingStatus, isDeleted, message, onClose])


    if (questionId) {

        const question = getQuestionFromQuestionId(questions, questionId);
        if (question) {
            return <>
                <Modal onClose={onClose} size={`xl`} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Answer</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to delete the Answer..?

                        </ModalBody>
                        <ModalFooter>
                            <Flex gap="12px">
                                <Button
                                    variant={`solid`}
                                    colorScheme={`red`}
                                    isLoading={loadingStatus === `loading`}
                                    onClick={() => {
                                        if (!profile) {
                                            toast.error(`Please login to avail these features`)
                                            return;
                                        }
                                        
                                        if (questionId) {
                                            setIsDeleted(true)
                                            dispatch(deleteAnswerService({
                                                answerId: answer._id,
                                                questionId
                                            }))
                                            dispatch(updateQuestionService({
                                                question: {
                                                    ...question,
                                                    totalAnswers: question.totalAnswers - 1
                                                },
                                                questionId
                                            }))

                                        }


                                    }}
                                >Yes</Button>
                                <Button onClick={onClose}>No</Button>
                            </Flex>

                        </ModalFooter>
                    </ModalContent>
                </Modal></>
        }
        return <></>
    }
    return <></>




}
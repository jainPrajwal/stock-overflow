import { Box, Button, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Answer, Comment } from "../../constants";
import { ICON_DELETE, ICON_EDIT } from "../../constants/common.types";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
import { DeleteCommentModal } from "./editCommentModal/deleteCommentModal/DeleteCommentModal";
import { EditCommentModal } from "./editCommentModal/EditCommentModal";
export const CommentComponent = ({
    comment,
    answer
}: {
    comment: Comment,
    answer?: Answer
}) => {
    const { isOpen: isCommentModalOpen, onClose: onCommentModalClose, onOpen: onCommentModalOpen } = useDisclosure();
    const { isOpen: isDeleteCommentModalOpen, onClose: onCommentDeleteModalClose, onOpen: onCommentDeleteModalOpen } = useDisclosure();
    const { profile } = useAppSelector(state => state.profile)
    return (
        <>
            {
                isCommentModalOpen && <EditCommentModal
                    comment={comment}
                    onClose={onCommentModalClose}
                    isOpen={isCommentModalOpen}
                    questionId={answer?.question}
                />
            }
            {
                isDeleteCommentModalOpen && <DeleteCommentModal
                    isOpen={isDeleteCommentModalOpen}
                    onClose={onCommentDeleteModalClose}
                    comment={comment}
                    questionId={answer?.question}
                />
            }



            <Box color="gray.500" fontSize="sm" key={comment._id}>
                <Flex justifyContent={`center`} gap="8px" direction={`column`}>
                    <Box>
                        <Text fontSize="sm">
                            {comment.comment}</Text>
                    </Box>
                    <Box ml={`auto`}>

                        <Flex gap="8px" align={`center`}>
                            <Link color="blue">- {comment.commenter.name}</Link>
                            <Text > {`${getTimeAgo(comment)} ago`}</Text>
                            {profile?._id === comment.commenter._id &&
                                <Box>
                                    <Button
                                        bg="transparent"
                                        borderRadius="full"
                                        p={["4px", "4px", "8px"]}
                                        width={["24px", "36px", "36px"]}
                                        minW="none"
                                        height={["24px", "36px", "36px"]}
                                        onClick={onCommentModalOpen}
                                    >
                                        <Icon as={ICON_EDIT} />
                                    </Button>
                                    <Button

                                        bg="transparent"

                                        borderRadius="full"
                                        p={["4px", "4px", "8px"]}
                                        width={["24px", "36px", "36px"]}
                                        minW="none"
                                        height={["24px", "36px", "36px"]}
                                        onClick={onCommentDeleteModalOpen}
                                    >

                                        <Icon as={ICON_DELETE} />
                                    </Button>
                                </Box>
                            }

                        </Flex>
                    </Box>

                </Flex>
            </Box>

        </>
    );
}
import { Box, Flex, Text } from "@chakra-ui/react";
import { RelatedQuestion } from "../relatedQuestion/RelatedQuestion";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { getQuestionFromQuestionId } from "../../utils/question";
import { Question } from "../../constants";
export const RelatedQuestions = () => {
    const { questions } = useAppSelector(state => state.question);
    const { questionId } = useParams();
    if (questionId) {


        const questionDisplayed = getQuestionFromQuestionId(questions, questionId);
        if (questionDisplayed) {

            const relatedQuestions = [...questions.map(question => {
                const questionTags = question.tags;
                const arrayOfRelatedQuestions = questionDisplayed.tags.map(tag => {
                    return questionTags.includes(tag) && question._id !== questionDisplayed._id ? question : null
                })

                const new2 = arrayOfRelatedQuestions.filter(one => one !== null)


                return new2.map(new1 => new1);
            })].flat()

            // map through questions
            // find all those questions which has at least one tag of the opened question
            if (relatedQuestions) {
                return (

                    <Flex direction="column" p="12px" maxW="340px" gap="12px" flexGrow={`1`}>

                        <Box my="12px">
                            <Text textAlign="center" fontSize="x-large">
                                Related Questions
                            </Text>
                        </Box>
                        {
                            relatedQuestions.length > 0 ? relatedQuestions.map(relatedQuestion => {
                                if (relatedQuestion) {

                                    return <RelatedQuestion
                                        question={relatedQuestion}
                                    />
                                }
                                return <></>
                            }) : <Text textAlign="center" fontSize="larger">
                                No Related Questions Found..
                            </Text>
                        }



                    </Flex>
                );
            }

            return <></>




        }

    }
    return <></>
};

import {
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getActivitiesService, getProfileService, loadQuestions } from "../../../services";
import { AnswerSection } from "../../answer/AnswerSection";
import { QuestionSection } from "../QuestionSection";


export const SingleQuestionSection = () => {
  const activity = useAppSelector(state => state.activity)
  const { questions, loadingStatus } = useAppSelector(state => state.question);
  const {profile} = useAppSelector(state => state.profile);
  const { token } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (activity.loadingStatus === `idle` && token) {
      dispatch(getActivitiesService());
    }
  }, [activity.loadingStatus, dispatch, token]);

  useEffect(() => {
    if (questions.length <= 0 && loadingStatus === `idle` && token) {
      dispatch(loadQuestions())
    }
  }, [loadingStatus, dispatch, questions, token]);


  useEffect(() => {
    
    if (!profile) {

      dispatch(getProfileService())
    }
  }, [loadingStatus, profile, dispatch, token])

  return (
    <Flex
      flexGrow="1"
      direction="column"
      flexBasis="calc(50% - 1rem)"
      maxW="700px"
      paddingBlock={`12px`}

    >
      <QuestionSection />
      <Divider />
      <AnswerSection />
    </Flex>
  );
};

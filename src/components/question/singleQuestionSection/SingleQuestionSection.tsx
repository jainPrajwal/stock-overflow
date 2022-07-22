import {
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getActivitiesService, getProfileService, loadQuestions } from "../../../services";
import { AnswerSection } from "../../answer/AnswerSection";
import { QuestionSection } from "../QuestionSection";


export const SingleQuestionSection = () => {
  const activity = useAppSelector(state => state.activity)
  const { questions, loadingStatus } = useAppSelector(state => state.question);
  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (activity.loadingStatus === `idle`) {
      dispatch(getActivitiesService());
    }
  }, [activity.loadingStatus, dispatch]);

  useEffect(() => {
    if (questions.length <= 0 && loadingStatus === `idle`) {
      dispatch(loadQuestions())
    }
  }, [loadingStatus, dispatch, questions]);


  useEffect(() => {
    if (profile.loadingStatus === `idle` && profile.profile === null) {
      
      dispatch(getProfileService())
    }
  }, [loadingStatus, profile, dispatch])

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

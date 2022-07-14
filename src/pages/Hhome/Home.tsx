import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadQuestions } from "../../features/question/QuestionSlice";
import { AskQuestion } from "../askQuestion/AskQuestion";

export const Home = () => {
    const question = useAppSelector(state => {
        console.log(`state.question`, state.question)
        return state.question
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (question.loadingStatus === `idle`) {

            dispatch(loadQuestions())
            console.log(`question `, question)
        }
    }, [])

    return (
        <>
            <div>
                 
            </div>
        </>
    )
}
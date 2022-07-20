import { Answer } from "../../constants";

export const checkIfThereIsAnAnswerWhichIsAlreadyMarkedAsCorrect = (answers: Array<Answer>) => {
    return answers.some(answer => answer.isMarkedAsCorrectAnswer);
}
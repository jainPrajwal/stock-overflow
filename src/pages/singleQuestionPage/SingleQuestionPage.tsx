import {  Show } from "@chakra-ui/react";
import { SingleQuestionSection } from "../../components/question/singleQuestionSection/SingleQuestionSection";
import { RelatedQuestions } from "../../components/relatedQuestions/RelatedQuestions";

import React from "react";
import { useScrollToTop } from "../../hooks/useScrollToTop";
export const SingleQuestionPage = () => {
    useScrollToTop();

    return (
        <>
            <SingleQuestionSection />
            <Show above="lg">
                <RelatedQuestions />
            </Show>
        </>
    );
}

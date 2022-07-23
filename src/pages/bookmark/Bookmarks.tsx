import { Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { ErrorFallback } from "../../components/errorBoundary/ErrorFallback"
import { SectionHeading } from "../../components/heading/SectionHeading"
import { Loader } from "../../components/loader/Loader"
import { QuestionComponent } from "../../components/question/Question"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { getActivitiesService } from "../../services"

export const Bookmarks = () => {
    const activity = useAppSelector(state => state.activity);
    const { questions, loadingStatus, message } = activity;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {

        if (isBookmarked) {
            if (loadingStatus === `success`) {
                toast.success(`${message}`);
                setIsBookmarked(false)
            } else if (loadingStatus === `error`) {
                toast.error(`${message}`)
            }
        }

    }, [loadingStatus, isBookmarked, message]);

    useEffect(() => {
        if (loadingStatus === `idle` && activity.questions.bookmarked.length <= 0) {
            dispatch(getActivitiesService());
        }
    }, [loadingStatus, dispatch, activity]);


    return <Flex
        padding={`12px`}
        marginTop={`4rem`}
        marginInline="auto"
        maxW="1340"
        overflowY="auto"
    >
        <Sidebar />
        <Flex gap="12px" direction={`column`} flexGrow={1}>

            <SectionHeading heading="Bookmarks" />
            {loadingStatus === `success` ? <Flex direction={`column`} gap="12px">
                {
                    questions.bookmarked.length > 0 ? questions.bookmarked.map(question => {
                        return <QuestionComponent
                            question={question}
                            key={question._id}
                            setIsBookmarked={setIsBookmarked}
                        />
                    }) : <>
                        <Text textAlign={`center`} fontSize={`md`} >No bookmarks found..!</Text>
                        <Button
                            colorScheme={`telegram`}
                            size={`md`}
                            maxW={`280px`}
                            margin={`0 auto`}
                            onClick={() => navigate(`/`)}

                        >Explore more questions</Button>
                    </>
                }
            </Flex> : loadingStatus === `loading` ? <Loader /> : <ErrorFallback />}
        </Flex>
    </Flex>

}
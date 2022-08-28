import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Flex, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Show, Link, Icon, Spinner } from "@chakra-ui/react";
import { MdOutlineComment, } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import React from "react";
import { default as homeStyles } from "./Home.module.css";
import { getProfileService, loadQuestions } from "../../services";
import { Question } from "../../constants";
import { QuestionComponent } from "../../components/question/Question";
import { toast } from "react-toastify";
import { filterTabClicked } from "../../features/question/QuestionSlice";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { getAllVideos } from "../../services/videos/getAllVideos";
import { Video } from "../../constants/videos.types";
import { ErrorFallback } from "../../components/errorBoundary/ErrorFallback";
import { Loader } from "../../components/loader/Loader";


const TABS = [`All`, `Hot`];

export const Home = () => {
    const { questions, loadingStatus, error, message } = useAppSelector(state => {

        return state.question
    });
    const dispatch = useAppDispatch();
    const { loading: videosLoadingStatus, videos } = useAppSelector(state => state.video);
    const { profile } = useAppSelector(state => state.profile);

    useScrollToTop();
    useEffect(() => {
        if (loadingStatus === `idle`) {
            dispatch(loadQuestions());
        } else if (loadingStatus === `error`) {
            toast.error(`${message}`)
        }

    }, [loadingStatus, dispatch, message]);


    const hotQuestions = [...questions].sort((question1, question2) => {
        return question2.views - question1.views
    });

    const {



        card,
        cardWrapper,
        cardImageWrapper,
        cardContent,
        cardImage,
        cardTitle,


    } = homeStyles;


    useEffect(() => {
        if (videosLoadingStatus === `idle`) {
            dispatch(getAllVideos())
        }
    }, []);

    useEffect(() => {

        if (!profile) {

            dispatch(getProfileService())
        }
    }, [dispatch, profile])


    let mostWatched: Video[] = [];
    if (videos) {
        mostWatched = [...videos].sort((video1, video2) => {
            const totalLikes1 = video1.views.male + video1.views.female + video1.views.others;
            const totalLikes2 = video2.views.male + video2.views.female + video2.views.others;
            return totalLikes2 - totalLikes1
        }).slice(0, 4)
    }




    if (questions) {
        return (
            <>

                <Flex
                    flexGrow="1"
                    direction="column"
                    flexBasis="calc(50% - 1rem)"
                    maxW="820px"
                    paddingBlock={`12px`}
                >
                    <Heading as="h3" size="lg">
                        Top Questions
                    </Heading>
                    <Box pt="2rem" width="100%">
                        <Tabs>
                            <TabList justifyContent="space-around">
                                {
                                    TABS.map(tab => {
                                        return <Tab key={tab} w={`100%`}
                                            onClick={() => {

                                                if (tab) {
                                                    dispatch(filterTabClicked({
                                                        tab: tab
                                                    }))
                                                }
                                            }}
                                        >{tab}</Tab>
                                    })
                                }
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Flex flexBasis="calc(50% - 1rem)" maxWidth="100%">
                                        {loadingStatus === `success` && <Box

                                            flexGrow="1">

                                            {
                                                questions.map((question: Question) => {
                                                    return question.isDeleted ? null :
                                                        <QuestionComponent question={question} key={question._id} />

                                                })
                                            }

                                        </Box>}
                                        {
                                            loadingStatus === `loading` ? <Flex justify="center" w="100%"><Spinner
                                                thickness='4px'
                                                speed='0.65s'
                                                emptyColor='gray.200'
                                                color='blue.500'
                                                size='xl'

                                            /></Flex> : loadingStatus === `error` && <><ErrorFallback /></>
                                        }
                                    </Flex>
                                </TabPanel>
                                <TabPanel>
                                    <Flex flexBasis="calc(50% - 1rem)" maxWidth="100%">
                                        {loadingStatus === `success` && <Box

                                            flexGrow="1">

                                            {
                                                hotQuestions.map((question: Question) => {
                                                    return question.isDeleted ? null :
                                                        <QuestionComponent question={question} key={question._id} />
                                                })
                                            }

                                        </Box>}
                                        {
                                            loadingStatus === `loading` ? <Flex justify="center" w="100%"><Spinner
                                                thickness='4px'
                                                speed='0.65s'
                                                emptyColor='gray.200'
                                                color='blue.500'
                                                size='xl'

                                            /></Flex> : <>{error}</>
                                        }
                                    </Flex>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>

                <Show above="lg">
                    <Flex width="310px" direction="column">
                        <Box
                            height="calc(100% - 4rem)"
                            pos="fixed"
                            p="12px"
                            width="100%"
                            maxW="310px"
                            overflowY="auto"
                        >
                            <Flex
                                direction="column"
                                gap="12px"
                                padding="12px"
                                margin="4px"
                            >
                                <Heading as={`h6`} fontSize={`lg`}>Blogs</Heading>
                                <Flex direction="column" gap="12px" mt="12px">
                                    <Flex align="start">
                                        <span style={{ position: "relative", top: "6px" }}>
                                            <MdOutlineComment />
                                        </span>
                                        <Text ml="5">
                                            <Link href=" https://www.ibef.org/blogs/rbi-s-digital-currency-and-its-significance" isExternal>
                                                RBI’S DIGITAL CURRENCY AND ITS SIGNIFICANCE <Icon as={FiExternalLink} mx="2px" />
                                            </Link>
                                        </Text>
                                    </Flex>

                                    <Flex align="start">
                                        <span style={{ position: "relative", top: "6px" }}>
                                            <MdOutlineComment />
                                        </span>
                                        <Text ml="5">
                                            <Link href="https://www.ibef.org/blogs/opportunity-for-fintech-in-the-indian-insurance-industry" isExternal>
                                                OPPORTUNITY FOR FINTECH IN THE INDIAN INSURANCE INDUSTRY <Icon as={FiExternalLink} mx="2px" />
                                            </Link>
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                direction="column"
                                gap="12px"
                                padding="12px"
                                margin="4px"
                            >
                                <Heading as={`h6`} fontSize={`lg`}>Helpful Videos</Heading>
                                <Flex direction="column" gap="1rem" mt="12px">
                                    {
                                        videosLoadingStatus === `success` ? mostWatched.map(video => {
                                            return <a
                                                key={video._id}
                                                className={`${cardWrapper} cursor-pointer`} role={`button`}
                                                href={`https://financyy.vercel.app/videos/${video._id}`}
                                                target={`_blank`}
                                            >

                                                <div className={`${card} w-100`}>
                                                    <div className={`${cardImageWrapper}`}>
                                                        <img
                                                            className={`${cardImage}`}
                                                            src={`${video.thumbnails[0].standard.url}`}
                                                            alt={`noice`}
                                                        />

                                                    </div>
                                                    <div className={`${cardContent} p-md`}>


                                                        <div className={`${cardTitle} text-white text-bold`}>
                                                            {video.title}
                                                        </div>
                                                        <div
                                                            className={`${"cardFooter"} d-flex tube-text-secondary-color jc-space-between mt-lg`}
                                                        >
                                                            <div>{video.views.male + video.views.female + video.views.others} views</div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        }) : videosLoadingStatus === `loading` ? <Loader /> : videosLoadingStatus === `error` && <ErrorFallback />
                                    }
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </Show>



            </>
        )
    }
    return <>No Questions found.</>
}

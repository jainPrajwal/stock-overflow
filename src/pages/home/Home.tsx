import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Flex, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Show, Link, Icon, Spinner } from "@chakra-ui/react";
import { MdOutlineComment, } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import React from "react";

import { Sidebar } from "../../components/sidebar/Sidebar";
import { loadQuestions } from "../../services";
import { Question } from "../../constants";
import { QuestionComponent } from "../../components/question/Question";
import { toast } from "react-toastify";
import { filterTabClicked } from "../../features/question/QuestionSlice";


const TABS = [`All`, `Hot`];

export const Home = () => {
    const { questions, loadingStatus, error, message } = useAppSelector(state => {

        return state.question
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loadingStatus === `idle`) {
            dispatch(loadQuestions());
        } else if (loadingStatus === `error`) {
            toast.error(`${message}`)
        }

    }, [loadingStatus, dispatch, message]);


    const hotQuestions = [...questions].sort((question1, question2) => {
        return question2.views - question1.views
    })

    return (
        <>
            <Box
                padding={`12px`}
                marginTop={`4rem`}
                marginInline="auto"
                maxW="1340"
                overflowY="auto"
            >
                <Flex gap="0"> 
                    <Sidebar />
                    <Flex
                        flexGrow="1"
                        direction="column"
                        flexBasis="calc(50% - 1rem)"
                        maxW="700px"
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

                                                /></Flex> : <>{error}</>
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
                                    margin="12px"
                                >
                                    <Text fontSize="md">Blogs</Text>
                                    <Flex direction="column" gap="12px" mt="12px">
                                        <Flex align="start">
                                            <span style={{ position: "relative", top: "6px" }}>
                                                <MdOutlineComment />
                                            </span>
                                            <Text ml="5">
                                                <Link href="https://chakra-ui.com" isExternal>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing
                                                    elit. Magni voluptatem neque deserunt error at
                                                    voluptatum qui? <Icon as={FiExternalLink} mx="2px" />
                                                </Link>
                                            </Text>
                                        </Flex>

                                        <Flex align="start">
                                            <span style={{ position: "relative", top: "6px" }}>
                                                <MdOutlineComment />
                                            </span>
                                            <Text ml="5">
                                                <Link href="https://chakra-ui.com" isExternal>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing
                                                    elit. Magni voluptatem neque deserunt error at
                                                    voluptatum qui? <Icon as={FiExternalLink} mx="2px" />
                                                </Link>
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex
                                    direction="column"
                                    gap="12px"
                                    padding="12px"
                                    margin="12px"
                                >
                                    <Text fontSize="md">Featured Questions</Text>
                                    <Flex direction="column" gap="12px" mt="12px">
                                        <Flex align="start">
                                            <span style={{ position: "relative", top: "6px" }}>
                                                <MdOutlineComment />
                                            </span>
                                            <Text ml="5">
                                                <Link href="https://chakra-ui.com" isExternal>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing
                                                    elit. Magni voluptatem neque deserunt error at
                                                    voluptatum qui? <Icon as={FiExternalLink} mx="2px" />
                                                </Link>
                                            </Text>
                                        </Flex>

                                        <Flex align="start">
                                            <span style={{ position: "relative", top: "6px" }}>
                                                <MdOutlineComment />
                                            </span>
                                            <Text ml="5">
                                                <Link href="https://chakra-ui.com" isExternal>
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing
                                                    elit. Magni voluptatem neque deserunt error at
                                                    voluptatum qui? <Icon as={FiExternalLink} mx="2px" />
                                                </Link>
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                    </Show>
                </Flex>

            </Box>
        </>
    )
}

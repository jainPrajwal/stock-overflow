import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Flex, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Tag, Show, Link, Icon, Spinner } from "@chakra-ui/react";
import { MdOutlineComment, } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

import { loadQuestions, Question } from "../../features/question/QuestionSlice";
import { Sidebar } from "../../components/sidebar/Sidebar";
import formatDistance from "date-fns/formatDistance";
import { useNavigate } from "react-router-dom";

const TABS = [`All`, `Hot`, `Week`, `Month`];

export const Home = () => {
    const { questions, loadingStatus, error } = useAppSelector(state => {
        console.log(`state.question`, state.question)
        return state.question
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loadingStatus === `idle`) {
            dispatch(loadQuestions());
        }
    }, []);



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
                                            return <Tab key={tab}>{tab}</Tab>
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
                                                        return <Flex
                                                            wrap={[`wrap`, `unset`]}
                                                            marginBlock="1rem"
                                                            padding="12px"
                                                            borderBottom="1px"
                                                            borderBottomColor="gray.100"
                                                            key={question._id}
                                                            cursor={`pointer`}
                                                            onClick={() => navigate(`/questions/${question._id}`)}
                                                        >
                                                            <Flex
                                                                direction="column"
                                                                justify="center"
                                                                gap="24px"
                                                                flexGrow="1"
                                                            >
                                                                <Text>
                                                                    {question.title}
                                                                </Text>
                                                                <Flex align="center" gap="12px" wrap="wrap">
                                                                    <Text fontSize="sm">asked {formatDistance(new Date(), new Date(question.createdAt))} ago</Text>

                                                                    <Text fontSize="sm">
                                                                        by{" "}
                                                                        <span style={{ fontWeight: `bold` }}>
                                                                            {question.questioner.name}
                                                                        </span>
                                                                    </Text>
                                                                </Flex>
                                                                <Flex gap="8px" align="center" flexGrow="1">
                                                                    <Tag
                                                                        size={`md`}
                                                                        variant="solid"
                                                                        colorScheme="blue"
                                                                    >
                                                                        finance
                                                                    </Tag>
                                                                    <Tag
                                                                        size={`md`}
                                                                        variant="solid"
                                                                        colorScheme="blue"
                                                                    >
                                                                        smallcase
                                                                    </Tag>
                                                                    <Tag
                                                                        size={`md`}
                                                                        variant="solid"
                                                                        colorScheme="blue"
                                                                    >
                                                                        stocks
                                                                    </Tag>
                                                                </Flex>

                                                            </Flex>

                                                            <Flex align="center" mt="1rem" gap="12px" wrap="wrap">
                                                                <Flex gap="8px" ml="auto">
                                                                    <Flex
                                                                        justify="center"
                                                                        align="center"
                                                                        fontSize="sm"
                                                                        p="12px"
                                                                    >
                                                                        <Text>-1</Text>
                                                                        <Text ml="2px">votes</Text>
                                                                    </Flex>
                                                                    <Flex
                                                                        justify="center"
                                                                        align="center"
                                                                        fontSize="sm"
                                                                        p="12px"
                                                                        border="1px"
                                                                        borderColor="green.500"
                                                                        background="green.500"
                                                                        color="#fff"
                                                                        borderRadius="4px"
                                                                    >
                                                                        <Text>2</Text>
                                                                        <Text ml="2px">answers</Text>
                                                                    </Flex>
                                                                    <Flex
                                                                        justify="center"
                                                                        align="center"
                                                                        fontSize="sm"
                                                                        p="12px"
                                                                    >
                                                                        <Text>{question.views}</Text>
                                                                        <Text ml="2px">views</Text>
                                                                    </Flex>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
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
                                        <p>two!</p>
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
    );
}
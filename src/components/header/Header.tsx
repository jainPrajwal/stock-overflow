import {
    background,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
    Text,
    Tooltip
} from "@chakra-ui/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import React from "react";
import { IoMdMenu } from "react-icons/io"
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutButtonPressed } from "../../features/auth/AuthSlice";

const Header = () => {
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile)

    return (
        <>
            <Flex
                boxSize="sm"
                height={`4rem`}
                w={`100%`}
                align={`center`}
                bg="var(--chakra-colors-gray-50)"
                pos="fixed"
                top={0}
                gap={[`8px`, `12px`]}
                justify="space-between"
                p={`12px`}
                zIndex={2}
            >
                <Flex align="center" gap="8px">
                    <Show below="md">
                        <Menu isLazy>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<IoMdMenu />}
                                variant="outline"
                            />
                            <MenuList>
                                {/* <MenuItem icon={<AddIcon />} command="⌘T">
                    New Tab
                  </MenuItem>
                  <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                    New Window
                  </MenuItem>
                  <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                    Open Closed Tab
                  </MenuItem>
                  <MenuItem icon={<EditIcon />} command="⌘O">
                    Open File...
                  </MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Show>

                    <Flex align="center">
                        <Box w="48px" h="48px">
                            <Image
                                src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657353864/layers_1_gil6bz.png"
                                height="100%"
                            />
                        </Box>

                        <Show above="md">
                            <Heading size="md" ml="0.5" fontSize="larger">
                                stock
                            </Heading>
                            <Text pos="relative" ml="1" top="-1px" fontSize="larger">
                                overflow
                            </Text>
                        </Show>
                    </Flex>
                </Flex>

                <Input
                    variant="outline"
                    placeholder="Search on stock overflow..."
                    size="sm"
                    width={[`80%`, `80%`, `50%`, `60%`]}
                />
                <Show above="md">
                    <Button
                        colorScheme="telegram"
                        height={`32px`}
                        borderRadius={`2px`}
                        fontSize={`sm`}
                        fontWeight={`normal`}
                        onClick={() => {
                            token ? navigate(`/questions/ask`) : navigate(`/login`);
                        }}
                    >
                        Ask Question
                    </Button>
                </Show>
                <Flex align="center" gap="10px">
                    <Popover>
                        <PopoverTrigger>
                            <Flex
                                align={`center`}
                                _hover={{
                                    cursor: "pointer"
                                }}
                                width={`fit-content`}
                            >

                                <Image
                                    src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1657350555/unitag_qrcode_standard_srgab6.png`}
                                    width={`24px`}
                                    height={`24px`}
                                ></Image>
                                <Text fontSize={`xs`} padding={`0.5`}>
                                    {profile?.reputation}
                                </Text>



                            </Flex>
                        </PopoverTrigger>
                        <PopoverContent width={`fit-content`}>
                            <PopoverArrow />


                            <PopoverBody justifyContent={`center`}><Button size={`sm`}
                                onClick={() => {
                                    localStorage.clear();
                                    dispatch(logoutButtonPressed());
                                    navigate(`/`)
                                }}
                            >
                                Logout
                            </Button></PopoverBody>
                        </PopoverContent>
                    </Popover>


                    {
                    /*
                    <Tooltip
                        label={`achievements`}
                        hasArrow
                        textAlign="center"
                        fontSize={`sm`}
                        padding={`4px`}
                        arrowSize={8}
                    >
                        <svg
                            aria-hidden="true"
                            style={{ paddingInline: `2px`, cursor: `pointer` }}
                            width="24"
                            height="24"
                            viewBox="0 0 18 18"
                        >
                            <path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3ZM3 7c-.5 0-1-.5-1-1V4h1v3Zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1ZM16 6c0 .5-.5 1-1 1V4h1v2Z"></path>
                        </svg>
                    </Tooltip>
                    <Tooltip
                        label={`help`}
                        hasArrow
                        textAlign="center"
                        fontSize={`sm`}
                        padding={`4px`}
                        arrowSize={8}
                    >
                        <svg
                            aria-hidden="true"
                            style={{ paddingInline: `2px`, cursor: `pointer` }}
                            width="24"
                            height="24"
                            viewBox="0 0 18 18"
                        >
                            <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8Zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23ZM11.77 8c-.59.66-1.78 1.09-2.05 1.97a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.06-1.35.66-2.2 1.83-2.88.39-.29.7-.75.7-1.24.01-1.24-1.64-1.82-2.35-.72-.21.33-.18.73-.18 1.1H5.75c0-1.97 1.03-3.26 3.03-3.26 1.75 0 3.47.87 3.47 2.83 0 .57-.2 1.05-.48 1.44Z"></path>
                        </svg>
                    </Tooltip>

                    */}
                </Flex>
            </Flex>
        </>
    );
};

export { Header };

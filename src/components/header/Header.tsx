import {

    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Image,

    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
    Text,

} from "@chakra-ui/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,

    PopoverBody,

    PopoverArrow,


} from '@chakra-ui/react'
import React, {  useState } from "react";
import { IoMdMenu } from "react-icons/io"
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutButtonPressed } from "../../features/auth/AuthSlice";
import { SearchBar } from "../searchbar/SearchBar";
import { resetProfileOnLogout } from "../../features/profile/ProfileSlice";
const toggleActive = ({ isActive }: { isActive: boolean }) => isActive ? `nav-link nav-link-active` : `nav-link`


const Header = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    const {token} = auth;
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const [searchbar, setSearchbar] = useState(true);


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
                justify="space-around"
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
                                <MenuItem display={`block`} _hover={{ background: `transparent` }} >
                                    <NavLink
                                        to={`/`} className={toggleActive}>Home</NavLink>
                                </MenuItem>
                                <MenuItem display={`block`} _hover={{ background: `transparent` }}   >
                                    <NavLink

                                        to={`/questions/tagged`} className={toggleActive}>Tags</NavLink>
                                </MenuItem>
                                <MenuItem display={`block`} _hover={{ background: `transparent` }}  >
                                    <NavLink

                                        to={`/user/bookmarks`} className={toggleActive}>Bookmarks</NavLink>
                                </MenuItem>

                                <MenuItem display={`block`} _hover={{ background: `transparent` }}  >
                                    <NavLink

                                        to={`/questions/unanswered`} className={toggleActive}>Unanswered</NavLink>
                                </MenuItem>

                            </MenuList>
                        </Menu>
                    </Show>

                    <Flex align="center">
                        <Box w={["28px", "28px", "48px"]} h={["28px", "28px", "48px"]}>
                            <Image
                                src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657353864/layers_1_gil6bz.png"
                                height="100%"
                            />
                        </Box>

                        <Show above="md">
                            <Box>
                                <Link to="/" style={{ display: `flex`, alignItems: `center` }}>

                                    <Heading size="md" ml="0.5" fontSize="larger">
                                        stock
                                    </Heading>
                                    <Text pos="relative" ml="1" top="-1px" fontSize="larger">
                                        overflow
                                    </Text>

                                </Link>
                            </Box>
                        </Show>
                    </Flex>
                </Flex>

                <SearchBar
                    searchbar={searchbar}
                    setSearchbar={setSearchbar}
                />
                {token && <Show above="md">
                    <Button
                        colorScheme="telegram"
                        height={`32px`}
                        borderRadius={`2px`}
                        fontSize={`sm`}
                        fontWeight={`normal`}
                        onClick={() => {
                            navigate(`/questions/ask`)
                        }}
                    >
                        Ask Question
                    </Button>
                </Show>}
                <Flex align="center" gap="10px">
                    {token ? <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <Flex
                                align={`center`}
                                _hover={{
                                    cursor: "pointer"
                                }}
                                width={`fit-content`}
                            >

                                <Image
                                    src={`${profile?.profileImageUrl}`}
                                    width={`28px`}
                                    height={`28px`}
                                ></Image>
                                <Text fontSize={`xs`} padding={`0.5`}>
                                    {profile?.reputation}
                                </Text>



                            </Flex>
                        </PopoverTrigger>
                        <PopoverContent width={`fit-content`}>
                            <PopoverArrow />


                            <PopoverBody justifyContent={`center`}>
                                <Flex direction={`column`} gap={`12px`}>
                                    <Button size={`sm`}
                                        onClick={() => {

                                            navigate(`/user/profile`)
                                        }}
                                    >
                                        Profile
                                    </Button>
                                    <Button size={`sm`}
                                        onClick={() => {
                                            localStorage.clear();
                                            dispatch(logoutButtonPressed());
                                            dispatch(resetProfileOnLogout())
                                            navigate(`/`)
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Flex></PopoverBody>
                        </PopoverContent>
                    </Popover>
                        : <Show above="md">
                            <>
                                <Button
                                    colorScheme="telegram"
                                    height={`32px`}
                                    borderRadius={`2px`}
                                    fontSize={`sm`}
                                    fontWeight={`normal`}
                                    onClick={() => {
                                        navigate(`/signup`)
                                    }}
                                >
                                    Signup
                                </Button>
                                <Button
                                    colorScheme="telegram"
                                    height={`32px`}
                                    borderRadius={`2px`}
                                    fontSize={`sm`}
                                    variant={`outline`}
                                    fontWeight={`normal`}
                                    onClick={() => {
                                        navigate(`/login`);
                                    }}
                                >
                                    Login
                                </Button>
                            </>
                        </Show>

                    }

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

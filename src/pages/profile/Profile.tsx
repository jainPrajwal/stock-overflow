import { Box, Button, Flex, Icon, Image, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SectionHeading } from "../../components/heading/SectionHeading";

import { Sidebar } from "../../components/sidebar/Sidebar";
import { ICON_MEMBER_FOR } from "../../constants";
import { ICON_EDIT } from "../../constants/common.types";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { getProfileService } from "../../services";
import { getTimeAgo } from "../../utils/common/getTimeAgo";
import { EditProfileModal } from "./EditProfileModal";


export const Profile = () => {
    const { profile, loadingStatus } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    useScrollToTop();
    useEffect(() => {
        if (!profile && loadingStatus === `idle`) {
            dispatch(getProfileService())
        }
        if (loadingStatus === `success` && isProfileUpdated) {
            toast.success(`Profile updated successfully`);
        }
    }, [loadingStatus, dispatch, profile, isProfileUpdated])

    if (profile) {
        return <Flex
            padding={`12px`}
            marginTop={`4rem`}
            marginInline="auto"
            maxW="1340"
            overflowY="auto"
            flexGrow={`1`}
        >
            {
                isOpen && <EditProfileModal
                    isOpen={isOpen}
                    onClose={onClose}
                    key={profile._id}
                    setIsProfileUpdated={setIsProfileUpdated}
                />
            }
            <Sidebar />
            <Flex gap="12px" direction={`column`} flexGrow={`1`}>

                <SectionHeading heading="Profile" />
                {loadingStatus === `loading` ? <Flex justify={`center`}>

                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Flex> : <Flex gap="12px" align={`center`} pos={`relative`}>
                    <Box pos={`absolute`} right={`10px`} top={`10px`}>
                        <Button leftIcon={<Icon as={ICON_EDIT} />} colorScheme='gray'
                            onClick={onOpen}
                            variant='solid'>
                            Edit Profile
                        </Button>


                    </Box>
                    <Box maxW={`160px`}>
                        <Image
                            src={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1657350555/unitag_qrcode_standard_srgab6.png`}

                        ></Image>
                    </Box>
                    <Box>
                        <Text fontSize={`2xl`}>{profile.name}</Text>
                        <Flex align={`center`} color={`gray.500`}>

                            <Box >
                                <Icon as={ICON_MEMBER_FOR} width={`24px`} height={`24px`} />

                            </Box>
                            <Text fontSize={`sm`} ml={`4px`}> {`Member for ${getTimeAgo(profile)}`}</Text>
                        </Flex>
                    </Box>
                </Flex>}
            </Flex>
        </Flex>
    }
    return <></>
}
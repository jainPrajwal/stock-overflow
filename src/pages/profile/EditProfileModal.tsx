import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    ButtonGroup,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProfileService } from '../../services/profile/updateProfileService';


export const EditProfileModal = ({

    onClose,
    isOpen,
    setIsProfileUpdated
}: {

    onClose: () => void,
    isOpen: boolean,
    setIsProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>

}) => {
    const { profile } = useAppSelector(state => state.profile);

    const dispatch = useAppDispatch();
    const [editProfile, setEditProfile] = useState<{ name: string | null }>({
        name: null,

    });



    if (profile) {
        return <>
            <Modal onClose={onClose} size={`2xl`} isOpen={isOpen} variant={`dark`}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={(e) => {

                        e.preventDefault();
                        if (!profile) {
                            toast.error(`Please login to avail these features`)
                            return;
                        }
                        if (editProfile.name) {
                            setIsProfileUpdated(true)
                            dispatch(updateProfileService({
                                profile: {
                                    ...profile,
                                    name: editProfile.name,

                                }
                            }));

                        }

                        onClose();
                    }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "12px"
                        }}>
                        <ModalHeader>Edit Profile</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>

                            <Flex gap="24px">
                                <Box flexGrow="1" maxW="870px">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl >
                                        <Input variant="outline" placeholder="Name" id="name"
                                            defaultValue={profile.name || ``}
                                            onChange={(e) => {
                                                setEditProfile(prevState => ({ ...prevState, name: e.target.value }))
                                            }}
                                        />
                                    </FormControl>

                                </Box>
                            </Flex>
                        </ModalBody>
                        <FormControl>
                            <ModalFooter gap={`12px`}>


                                <Button onClick={onClose}>Close</Button>



                                <Button
                                    colorScheme="telegram"
                                    fontSize={`sm`}
                                    type="submit"
                                >
                                    Edit Profile
                                </Button>

                            </ModalFooter>
                        </FormControl>
                    </form>

                </ModalContent>
            </Modal>

        </>
    }
    return <></>

}
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

    Input,

    Image,
    Icon,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICON_UPLOAD_IMAGE } from '../../constants';
import { updateProfileService } from '../../services/profile/updateProfileService';
import { uploadProfileImageService } from '../../services/profile/uploadProfileImage';

const uploadImage = (image: File | null, dispatch: any) => {

    if (image) {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "stock-overflow-preset")
        data.append("cloud_name", "dmk11fqw8");
        dispatch(uploadProfileImageService({
            data
        }))
    }

}
export const EditProfileModal = ({

    onClose,
    isOpen,
    setIsProfileUpdated
}: {

    onClose: () => void,
    isOpen: boolean,
    setIsProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>

}) => {
    const { profile, loadingStatus, message } = useAppSelector(state => state.profile);

    const dispatch = useAppDispatch();
    const [editProfile, setEditProfile] = useState<{ name: string | null }>({
        name: null,

    });
    const [image, setImage] = useState<File | null>(null);
    const { profileImage, loadingStatus: uploadProfileImageLoadingStatus } = useAppSelector(state => state.profileImage);
    const [preview, setPreview] = useState<string | null>(null);
    

    useEffect(() => {

        if (uploadProfileImageLoadingStatus === `success` && profileImage?.secure_url) {
            dispatch(updateProfileService({
                profile: {
                    ...profile,
                    profileImageUrl: profileImage.secure_url
                }
            }))
        }
    }, [uploadProfileImageLoadingStatus, profileImage]);




    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!image) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

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
                        if (editProfile.name && editProfile.name !== profile.name) {
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
                            <Flex direction={`column`} align={`center`} >
                                <Flex pos={`relative`} maxW={`120px`} direction={`column`} align={`center`}>
                                    <Box pos={`relative`}>
                                        <Image
                                            src={`${preview || profile?.profileImageUrl}`}
                                            minW={`60px`}
                                        ></Image>
                                        <Box pos={`absolute`} bottom={`0px`}
                                            right={`-14px`} width={`28px`} height={`28px`}>
                                            <Icon as={ICON_UPLOAD_IMAGE} height={`100%`} width={`100%`}
                                            />
                                        </Box>

                                    </Box>

                                    <Box >
                                        <input type="file" onChange={(e) => {
                                            if (e.target.files) {
                                                setImage(e.target.files[0]);
                                            }

                                        }}
                                            accept="image/*"
                                            style={{
                                                position: `absolute`,
                                                top: `0px`,
                                                maxWidth: `120px`,
                                                height: `100%`,
                                                left: 0,
                                                opacity: `0`,
                                                cursor: `pointer`
                                            }}
                                        />
                                    </Box>


                                    <Button
                                        variant={`solid`}
                                        colorScheme={`telegram`}
                                        size={`sm`}
                                        my={`0.8rem`}
                                        isLoading={uploadProfileImageLoadingStatus === `loading`}
                                        onClick={() => {
                                            setIsProfileUpdated(true)
                                            uploadImage(image, dispatch);

                                        }}>Upload</Button>
                                </Flex>

                            </Flex>
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
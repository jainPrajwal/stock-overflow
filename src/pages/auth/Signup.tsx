

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { loginUserService } from "../../services";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Icon, Image, Input, Spinner, Tooltip, Text } from "@chakra-ui/react";
import { useAppDispatch } from "../../app/hooks";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { getActivitiesService } from "../../services/activity/getActivitiesService";
import { signupUserService } from "../../services/auth/signupUserService";


const Signup = () => {

    const [showPassword, setShowPassword] = useState({
        initial: false,
        confirm: false
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();


    const [form, setForm] = useState({
        name: "",
        email: "",
        initialPassword: "",
        confirmPassword: "",
        touched: {
            name: false,
            email: false,
            initialPassword: false,
            confirmPassword: false
        },
        validations: {
            validateName: function (name: string) {
                if (name.length <= 0) {
                    return `Name cannot be blank`;
                } else if (!name.match(/^[A-Za-z]+$/))
                    return `Name can only contain alphabets`;

                return ``;
            },
            validateEmail: function (email: string) {
                if (email.length <= 0) {
                    return `Email cannot be blank`;
                }
                if (
                    !email.match(
                        /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)(\.[a-zA-Z]{2,5})?$/
                    )
                ) {
                    return `Invalid Email Format.`;
                }
                return ``;
            },
            validateIndividualPassword: function (password: string) {
                if (password.length <= 0) {
                    return `Password cannot be blank`;
                } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/g.test(password)) {
                    return `Password should contain atleast 8 characters (atleast one number & one letter)`
                }

                return ``;
            },
            validateBothPasswords: function (initial: string, confirm: string) {
                if (initial !== confirm) {
                    
                    return `Passwords do not match!`;
                }

                return ``;
            }
        },
        isFormValid: {
            isNameValid: false,
            isEmailValid: false,
            isInitialPasswordValid: false,
            isConfirmPasswordValid: false,
            isPasswordsEqual: false
        }
    });

    const { signupLoadingStatus: loadingStatus, toastMessage, email, token } = useAuth();

    useEffect(() => {
        if (loadingStatus === `success`) {
            toast.success(`${toastMessage}`);
            const user = { token, email }

            localStorage.setItem(`user`, JSON.stringify(user));

            dispatch(getActivitiesService());
            const from = ((state) as { from: string })?.from;
            from ? navigate(`${from}`) : navigate(`/`)

        }
        else if (loadingStatus === `error`) {
            toast.error(`${toastMessage}`)
        }
    }, [loadingStatus, toastMessage, email, token, dispatch, navigate, state]);




    return (
        <Box p="1rem"
            backgroundImage={`https://res.cloudinary.com/dmk11fqw8/image/upload/v1658839811/finance-bg-2_hogybc.svg`}
            backgroundRepeat={`no-repeat`}
            backgroundSize={`cover`}
            minHeight={`100vh`}
            backgroundColor={`blue.50`}
        >


            <Flex align={`center`} mt="48px" p="12px" justify={`center`} >
                <Box w={["36px", "48px"]} h={["36px", "48px"]}>
                    <Image
                        src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1657353864/layers_1_gil6bz.png"
                        height="100%"
                    />
                </Box>
                <Box>
                    <Heading
                        ml="1rem"
                        textAlign={`center`}
                    >
                        <span style={{
                            background: `linear-gradient(90deg, #0a369d, #4472ca, #5e7ce2)`, WebkitBackgroundClip: "text",
                            WebkitTextFillColor: `transparent`
                        }}>
                            Ask. Learn. Invest.
                        </span>
                    </Heading>
                </Box>
            </Flex>

            <Box
                py="2rem" px="1rem"
                maxW="420px"
                margin={`0 auto`}
                bg={`white`}
            >

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (form.isFormValid) {
                            dispatch(signupUserService({
                                name: form.name,
                                email: form.email,
                                password: form.confirmPassword
                            }))


                        }
                    }}

                >

                    <Flex direction={`column`} >
                        <Text
                            textAlign={`center`}
                            textTransform={`uppercase`}
                            fontSize="3xl"

                        >
                            sign up
                        </Text>


                        {/* Name */}
                        <FormControl p="8px" isInvalid={!form?.isFormValid?.isNameValid && form?.touched["name"]}>
                            <FormLabel>Name</FormLabel>
                            <Tooltip
                                label={form.validations.validateName(form?.name)}
                                placement={`top-end`}
                                hasArrow
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter Name"
                                    padding="8px"
                                    value={form?.name}
                                    onChange={(e) => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                            isFormValid:
                                                form.validations.validateName(e.target.value)
                                                    ?.length > 0
                                                    ? { ...prevState.isFormValid, isNameValid: false }
                                                    : { ...prevState.isFormValid, isNameValid: true }
                                        }));
                                    }}
                                    onBlur={() => {
                                        setForm((prevState) => ({
                                            ...prevState,
                                            touched: { ...prevState.touched, name: true }
                                        }));
                                    }}
                                />
                            </Tooltip>
                            <FormErrorMessage>{form.validations.validateName(form?.name)}</FormErrorMessage>
                        </FormControl>

                        {/* Email */}

                        <FormControl p="8px" isInvalid={!form?.isFormValid?.isEmailValid && form?.touched["email"]}>

                            <FormLabel>Email</FormLabel>
                            <Tooltip
                                label={form.validations.validateEmail(form?.email)}
                                placement={`top-end`}
                                hasArrow
                            >
                                <Box>
                                    <Input
                                        type="email"
                                        value={form?.email}
                                        placeholder="Enter Email"
                                        w="100%"
                                        padding="8px"

                                        required
                                        onChange={(e) => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                email: e.target.value,
                                                isFormValid:
                                                    form.validations.validateEmail(e.target.value)
                                                        ?.length > 0
                                                        ? { ...prevState.isFormValid, isEmailValid: false }
                                                        : { ...prevState.isFormValid, isEmailValid: true }
                                            }));
                                        }}
                                        onBlur={() => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                touched: { ...prevState.touched, email: true }
                                            }));
                                        }}
                                    />
                                </Box>
                            </Tooltip>
                            <FormErrorMessage>{form.validations.validateEmail(form?.email)}</FormErrorMessage>

                        </FormControl>


                        {/* Initial Password */}
                        <FormControl p="8px" isInvalid={!form?.isFormValid?.isInitialPasswordValid && form?.touched["initialPassword"]}>
                            <FormLabel>Initial Password</FormLabel>
                            <Tooltip
                                label={form.validations.validateIndividualPassword(
                                    form?.initialPassword)}
                                placement={`top-end`}
                                hasArrow
                            >
                                <Box pos="relative" >
                                    <Input
                                        value={form?.initialPassword}
                                        type={`${showPassword.initial ? `text` : `password`}`}
                                        placeholder="Enter Password"
                                        p="8px"
                                        className={`w-100`}
                                        required
                                        onChange={(e) => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                initialPassword: e.target.value,
                                                isFormValid:
                                                    form.validations.validateIndividualPassword(
                                                        e.target.value
                                                    )?.length > 0
                                                        ? {
                                                            ...prevState.isFormValid,
                                                            isInitialPasswordValid: false
                                                        }
                                                        : form.validations.validateBothPasswords(
                                                            e.target.value,
                                                            form?.confirmPassword
                                                        ).length > 0
                                                            ? {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: false,
                                                                isInitialPasswordValid: true
                                                            }
                                                            : {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: true,
                                                                isInitialPasswordValid: true
                                                            }
                                            }));
                                        }}
                                        onBlur={() => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                touched: {
                                                    ...prevState.touched,
                                                    initialPassword: true
                                                }
                                            }));
                                        }}
                                    />
                                    {showPassword?.initial ? (
                                        <Icon
                                            onClick={() =>
                                                setShowPassword((prevState) => ({
                                                    ...prevState,
                                                    initial: !prevState.initial
                                                }))
                                            }
                                            pos="absolute" translateY={`-50%`} right="10px" height="100%" w={"20px"} zIndex="12" cursor={`pointer`} >
                                            <svg

                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                                fill={"#718096"}


                                            >
                                                <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                                            </svg>
                                        </Icon>
                                    ) : (
                                        <Icon
                                            onClick={() =>
                                                setShowPassword((prevState) => ({
                                                    ...prevState,
                                                    initial: !prevState.initial
                                                }))
                                            }
                                            pos="absolute" translateY={`-50%`} right="10px" height="100%" w={"20px"} zIndex="12" cursor={`pointer`} >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                                fill={"#718096"}


                                            >
                                                <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
                                            </svg>
                                        </Icon>
                                    )}
                                </Box>

                            </Tooltip>
                            <FormErrorMessage>  {form.validations.validateIndividualPassword(
                                form.initialPassword
                            )}</FormErrorMessage>

                        </FormControl>


                        {/* Confirm Password */}
                        <FormControl p="8px" isInvalid={form?.touched["confirmPassword"] && (!form?.isFormValid?.isConfirmPasswordValid || form.validations.validateBothPasswords(
                            form.initialPassword,
                            form.confirmPassword
                        ).length > 0)}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Tooltip
                                label={form.validations.validateIndividualPassword(
                                    form?.confirmPassword)}
                                placement={`top-end`}
                                hasArrow
                            >
                                <Box pos={`relative`}>
                                    <Input
                                        value={form?.confirmPassword}
                                        type={`${showPassword?.confirm ? `text` : `password`}`}
                                        placeholder="Confirm Password"
                                        p="8px"
                                        w="100%"
                                        required
                                        onChange={(e) => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                confirmPassword: e.target.value,
                                                isFormValid:
                                                    form.validations.validateIndividualPassword(
                                                        e.target.value
                                                    )?.length > 0
                                                        ? {
                                                            ...prevState.isFormValid,
                                                            isConfirmPasswordValid: false
                                                        }
                                                        : form.validations.validateBothPasswords(
                                                            form?.initialPassword,
                                                            e.target.value
                                                        ).length > 0
                                                            ? {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: false,
                                                                isConfirmPasswordValid: true
                                                            }
                                                            : {
                                                                ...prevState.isFormValid,
                                                                isPasswordsEqual: true,
                                                                isConfirmPasswordValid: true
                                                            }
                                            }));
                                        }}
                                        onBlur={() => {
                                            setForm((prevState) => ({
                                                ...prevState,
                                                touched: {
                                                    ...prevState.touched,
                                                    confirmPassword: true
                                                }
                                            }));
                                        }}
                                    />
                                    {showPassword?.confirm ? (
                                        <Icon
                                            onClick={() =>
                                                setShowPassword((prevState) => ({
                                                    ...prevState,
                                                    confirm: !prevState.confirm
                                                }))
                                            }
                                            pos="absolute" translateY={`-50%`} right="10px" height="100%" w={"20px"} zIndex="12" cursor={`pointer`} >
                                            <svg

                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                                fill={"#718096"}


                                            >
                                                <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                                            </svg>
                                        </Icon>
                                    ) : (
                                        <Icon
                                            onClick={() =>
                                                setShowPassword((prevState) => ({
                                                    ...prevState,
                                                    confirm: !prevState.confirm
                                                }))
                                            }
                                            pos="absolute" translateY={`-50%`} right="10px" height="100%" w={"20px"} zIndex="12" cursor={`pointer`} >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                                fill={"#718096"}


                                            >
                                                <path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z" />
                                            </svg>
                                        </Icon>
                                    )}
                                </Box>
                            </Tooltip>
                            <FormErrorMessage> {form.validations.validateIndividualPassword(
                                form.confirmPassword
                            ) || form.validations.validateBothPasswords(
                                form.initialPassword,
                                form.confirmPassword)}</FormErrorMessage>

                        </FormControl>


                        <Box py="8px">
                            <Button
                                type="submit"
                                disabled={Object.values(form?.isFormValid).includes(false)}
                                variant="solid"
                                w="100%"
                                colorScheme="telegram"
                            >
                                {`continue`.toUpperCase()}
                            </Button>
                        </Box>

                    </Flex>
                </form>

                <Box pt="12px" textAlign={`center`}>
                    Already have an account with us?
                    <NavLink to="/login" className={`activeLink`}>
                        Click here to Login
                    </NavLink>
                </Box>

            </Box>
            <div className="pt-lg">
                {loadingStatus === `loading` && <Flex justify={`center`} align={`center`}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /></Flex>}
            </div>

        </Box >
    );
};

export { Signup };


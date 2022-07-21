import { Button, Flex, Image, Text } from "@chakra-ui/react";

export function ErrorFallback() {
  return <><Flex justify={`center`} p="24px" maxW={`320px`} direction={`column`} align={`center`} margin={`0 auto`} h={`100vh`}>
    <Image src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1658391680/undraw_cancel_re_pkdm_stuj0p.svg" />
    <Text p="12px" >Something Went Wrong..!</Text>
    <Button variant={`link`} colorScheme={`telegram`}
      p="12px"
    > Try Again</Button>
  </Flex></>
}
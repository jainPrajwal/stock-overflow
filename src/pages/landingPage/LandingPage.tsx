import { Box, Flex, Show } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const LandingPage = () => {
    return <Box
        marginTop={`4rem`}
        marginInline="auto"
        maxW="1360"
        overflowY="auto"
    >
        <Show above="md">
            <Sidebar />
        </Show>
        <Flex gap="0" marginLeft={[`0px`, `0px`, `220px`]} p="12px">
            <Outlet />
        </Flex>
    </Box>

}
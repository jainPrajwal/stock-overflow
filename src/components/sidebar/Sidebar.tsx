import { Box, Flex, Show, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const toggleActive = ({ isActive }: { isActive: boolean }) => isActive ? `nav-link nav-link-active` : `nav-link`
export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Show above="md">
      <Flex minWidth="220px" height={`100vh`}>
        <Box height="100%" pos="fixed" p="12px" width="100%" maxW="220px" top={`4rem`} left={`0px`}
          bg={`#f0f9ff`}
        >
          <Box
            p="12px"
            m="8px"
            _hover={{
              background: "blue.100",
              cursor: "pointer"
            }}
            onClick={() => {
              navigate(`/`)
            }}
          >
            {" "}
            Home
          

            <Box
              p="12px"
              m="8px"
              _hover={{
                background: "blue.100",
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/questions/tagged`);
              }}
            >
              {" "}
              <Text>Tags</Text>
            </Box>
            <Box
              p="12px"
              m="8px"
              _hover={{
                background: "blue.100",
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/user/bookmarks`)
              }}
            >
              {" "}
              Bookmarks
            </Box>
            <Box
              p="12px"
              m="8px"
              _hover={{
                background: "blue.100",
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/questions/unanswered`);
              }}
            >
              {" "}
              <Text>Unanswered</Text>
            </Box>

          </Box>



        </Box>
      </Flex>
    </Show>
  );
};

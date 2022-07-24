import { Box, Flex, Show, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
const toggleActive = ({ isActive }: { isActive: boolean }) => isActive ? `nav-link nav-link-active` : `nav-link`
export const Sidebar = () => {
  
  return (
   
      <Box height="100%" pos="fixed" p="12px" width="220px"  top={`4rem`} left={`0px`}
        bg={`#f0f9ff`}  margin={`0`} >

        <UnorderedList  listStyleType={`none`} display={`flex`} flexDirection={`column`} gap={`12px`}
        >
          <ListItem

            m="8px"


          >
            <NavLink to={`/`} className={toggleActive}>Home</NavLink>


          </ListItem>
          <ListItem

            m="8px"


          >
            <NavLink to={`/questions/tagged`} className={toggleActive}>Tags</NavLink>


          </ListItem>

          <ListItem

            m="8px"


          >
            <NavLink to={`/user/bookmarks`} className={toggleActive}>Bookmarks</NavLink>


          </ListItem>

          <ListItem

            m="8px"


          >
            <NavLink to={`/questions/unanswered`} className={toggleActive}>Unanswered</NavLink>


          </ListItem>



        </UnorderedList>



      </Box>
   
  );
};

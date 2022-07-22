import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const Tag = ({ tag }: { tag: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTaggedPage = location.pathname === `/questions/tagged`;
  return (

    <Box className="tag" maxW="fit-content" p="4px" cursor={isTaggedPage ? `pointer` : `inherit`} onClick={() => {
      isTaggedPage && navigate(`/questions/tagged/${tag}`);
    }}>
      <Text fontSize="small">{tag}</Text>
    </Box>
  );
};

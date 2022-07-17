import { Box, Code, Text } from "@chakra-ui/react";
import React from "react";

export const AnswerDescription = ({ description }: {
    description: string
}) => {
    return (
        <Box my="12px">

            <Box dangerouslySetInnerHTML={{ __html: description || "" }}></Box>
        </Box>
    );
};

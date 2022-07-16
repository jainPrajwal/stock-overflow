import { Box, Text } from "@chakra-ui/react";

export const QuestionDescription = ({
    description
}: {
    description: string;
}) => {
    return (
        <Box my="12px">

            <Box dangerouslySetInnerHTML={{ __html: description || "" }}></Box>
        </Box>
    );
};

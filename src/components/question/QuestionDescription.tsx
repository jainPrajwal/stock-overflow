import {  Text } from "@chakra-ui/react";

export const QuestionDescription = ({
    description
}: {
    description: string;
}) => {
    return (
        <Text lineHeight={`28px`}>
            {description}
        </Text>
    );
};

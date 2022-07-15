import { Box, Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import React from "react";
export const CustomIconButton = ({ icon }: { icon: IconType }) => {
    return (
        <Box>
            <Button
                bg="transparent"
                borderRadius="full"
                p={["4px", "4px", "12px"]}
                width={["24px", "48px", "64px"]}
                minW="none"
                height={["24px", "48px", "64px"]}
            >
                <Icon as={icon} width="100%" height="100%" />
            </Button>
        </Box>
    );
};

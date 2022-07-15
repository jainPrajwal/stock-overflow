import { Heading } from "@chakra-ui/react";
import React from "react";
export const SectionHeading = ({ heading }: { heading: string }) => {
    return (
        <Heading as="h3" size="lg">
            {heading}
        </Heading>
    );
};

import { Box, Select } from "@chakra-ui/react";
import React from "react";

export const AnswerFilters = () => {
  return (
    <Box ml="auto">
      <Select placeholder="Select option">
        <option value="option1">Highest Score</option>
        <option value="option2">Date modified (newest first)</option>
        <option value="option3">Date created (oldest first)</option>
      </Select>
    </Box>
  );
};

import { Box, Select } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { HIGHEST_SCORE, NEWEST_FIRST, OLDEST_FIRST } from "../../constants";
import { sortyByDrowpdownClicked } from "../../features/answer/AnswerSlice";

export const AnswerFilters = () => {
  const dispatch = useAppDispatch();
  return (
    <Box ml="auto">
      <Select placeholder="Select option" onChange={(e) => {
        
        dispatch(sortyByDrowpdownClicked({
          sortBy: e.target.value
        }))
      }}>
        <option value={`${HIGHEST_SCORE}`}>Highest Score</option>
        <option value={`${NEWEST_FIRST}`}>Date modified (newest first)</option>
        <option value={`${OLDEST_FIRST}`}>Date created (oldest first)</option>
      </Select>
    </Box >
  );
};

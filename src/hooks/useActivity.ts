import { useAppSelector } from "../app/hooks";

export const useActivity = () => {
  return useAppSelector((state) => state.activity);
};

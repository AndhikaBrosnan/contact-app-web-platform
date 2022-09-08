import { useMediaQuery } from "react-responsive";

export const isMobileHandler = () => {
  return useMediaQuery({ query: "(max-width: 768px)" });
};

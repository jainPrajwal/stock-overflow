import { toast } from "react-toastify";

export const handleLinkShare = async () => {
  try {
    await window.navigator.clipboard.writeText(`${window.location.href}`);
    toast.success(`Link Copied Successfully`);
  } catch (error) {
    toast.error(`Some error occured while copying the link!`);
  }
};

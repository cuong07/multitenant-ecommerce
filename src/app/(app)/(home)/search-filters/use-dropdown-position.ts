import { RefObject } from "react";

export const useDropdownPosition = (
  dropdownRef: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!dropdownRef.current) return { top: 0, left: 0 };

    const rect = dropdownRef.current.getBoundingClientRect();
    const width = 240; // width of the dropdown

    const top = rect.bottom + window.scrollY;
    let left = rect.left + window.scrollX;

    if (rect.left + width > window.innerWidth) {
      left = rect.right + window.scrollX - width;
      if (left < 0) {
        left = window.innerWidth - width - 16;
      }
    }
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };
  return { getDropdownPosition };
};

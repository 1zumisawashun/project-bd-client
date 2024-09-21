import { RefObject, useCallback, useEffect } from "react";

export const useOuterClick = (
  refs: RefObject<HTMLElement>[],
  cb: (e: MouseEvent) => void
) => {
  const outerClick = useCallback(
    (e: MouseEvent) => {
      if (refs.some((ref) => isEventIncludedParent(e, ref.current))) return;
      cb(e);
    },
    [refs, cb]
  );

  useEffect(() => {
    window.addEventListener("click", outerClick);
    return () => {
      window.removeEventListener("click", outerClick);
    };
  }, [outerClick]);
};

const isEventIncludedParent = (
  e: MouseEvent,
  parent: Element | null
): boolean => {
  const path = e.composedPath();
  if (!parent) return false;
  return path.includes(parent);
};

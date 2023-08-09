import { useEffect, useRef } from "react";

export const usePageTransition = () => {

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current && ref.current.classList.add('active-page');
  }, [])

  return { ref }
}

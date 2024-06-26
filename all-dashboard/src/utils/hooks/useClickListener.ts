import React from "react";

export default function useClickListener(handler: (e: MouseEvent) => void) {
  React.useEffect(() => {
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
}

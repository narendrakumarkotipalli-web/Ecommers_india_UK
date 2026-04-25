import { useEffect } from "react";

const useDocumentTitle = (title: string, suffix: string = "Kavya Clothing") => {
  useEffect(() => {
    document.title = `${title} | ${suffix}`;

    // Clean up or reset if needed (optional)
    return () => {
      document.title = `${suffix} | US | India`;
    };
  }, [title, suffix]);
};

export default useDocumentTitle;

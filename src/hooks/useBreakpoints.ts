import { useState, useEffect } from "react";

// Device types: xs, md, lg
export default function useBreakPoints() {
  const [width, setWidth] = useState(window.innerWidth);
  const [type, setType] = useState("md");

  useEffect(() => {
    const onWidthChange = () => setWidth(window.innerWidth);

    window.addEventListener("resize", onWidthChange);
    return () => window.removeEventListener("resize", onWidthChange);
  }, []);

  useEffect(() => {
    if (width < 550) setType("xs");
    if (width > 550 && width < 1200) setType("md");
    if (width > 1200) setType("lg");
  }, [width]);

  return { width, type };
}

// Usage
// const { width, type } = useBreakpoints()

import { useEffect, useState } from "react";
import LeftMenuTablet from "@/components/LeftMenuSection/LeftMenuTablet";
import LeftMenuDesktop from "@/components/LeftMenuSection/LeftMenuDesktop";

const LeftMenuSection = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopScreen(window.matchMedia("(min-width: 1024px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktopScreen ? <LeftMenuDesktop /> : <LeftMenuTablet />;
};

export default LeftMenuSection;

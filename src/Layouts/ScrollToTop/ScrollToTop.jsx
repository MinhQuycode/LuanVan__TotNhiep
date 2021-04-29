import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(function () {
    window.scroll(0, 0);
  }, []);
  return null;
}

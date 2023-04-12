import { useState } from "react"

export const useIsHovering = () => {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return [
    isHovering,
    handleMouseOver,
    handleMouseOut
  ]
}

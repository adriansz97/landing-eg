import { useState } from "react"

export const useIsFocused = () => {

  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  return {
    isFocused,
    handleOnFocus,
    handleOnBlur
  }
}

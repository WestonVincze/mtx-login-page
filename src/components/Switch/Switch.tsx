import React, { useState } from "react";

export const Switch: React.FC<SwitchProps> = ({ labelLeft, labelRight }) => {
  const [on, setOn] = useState(false);
  // onClick will flip the state and issue a callback
  // labelLeft, labelRight
  return <></>;
};

interface SwitchProps {
  labelLeft?: string;
  labelRight?: string;
}

import { useState, useEffect } from "react";
import * as zxcvbn from "zxcvbn";

export function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (password.length === 0) return;
    const { score } = zxcvbn(password);
    setScore(score);
  }, [password]);

  return [password, setPassword, score];
}

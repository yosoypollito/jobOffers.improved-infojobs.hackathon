import { useEffect, useState } from "react";

export default function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error])

  return {
    errorMessage,
    setError
  }
}
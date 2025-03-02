import React, { useEffect, useState } from "react";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  const [flag, setFlag] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {flag && (
        <div className="bg-red-300 pl-3 py-1 rounded my-3 text-white font-medium">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;

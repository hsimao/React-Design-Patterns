import { useState, useEffect } from "react";

function useDataSource(getResourceFunc) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getResourceFunc();
      setResource(result);
    })();
  }, []);

  return resource;
}

export default useDataSource;

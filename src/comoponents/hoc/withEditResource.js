import { useState, useEffect } from "react";
import axios from "axios";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function withEditResource(Component, resourcePath, resourceName) {
  return (props) => {
    const [originData, setOriginData] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(resourcePath);
        setOriginData(response.data);
        setData(response.data);
      })();
    }, []);

    const onChange = (change) => {
      setData((data) => ({ ...data, ...change }));
    };

    const onSave = async () => {
      const response = await axios.post(resourcePath, {
        [resourceName]: data
      });
      setOriginData(response.data);
      setData(response.data);
    };

    const onReset = () => {
      setData(originData);
    };

    // 依據 resourceName, 客製化回傳 props 名稱
    // resourceName: 'user', onChange => onChangeUser
    const resourceProps = {
      [resourceName]: data,
      [`onChange${capitalize(resourceName)}`]: onChange,
      [`onSave${capitalize(resourceName)}`]: onSave,
      [`onReset${capitalize(resourceName)}`]: onReset
    };

    return <Component {...props} {...resourceProps} />;
  };
}

export default withEditResource;

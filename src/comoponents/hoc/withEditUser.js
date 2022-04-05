import { useState, useEffect } from "react";
import axios from "axios";

function withEditUser(Component, userId) {
  return (props) => {
    const [originUser, setOriginUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        setOriginUser(response.data);
        setUser(response.data);
      })();
    }, []);

    const onChangeUser = (change) => {
      setUser((user) => ({ ...user, ...change }));
    };

    const onSaveUser = async () => {
      const response = await axios.post(`/users/${userId}`, { user });
      setOriginUser(response.data);
      setUser(response.data);
    };

    const onResetUser = () => {
      setUser(originUser);
    };

    return (
      <Component
        {...props}
        user={user}
        onChangeUser={onChangeUser}
        onSaveUser={onSaveUser}
        onResetUser={onResetUser}
      />
    );
  };
}

export default withEditUser;

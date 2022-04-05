import useDataSource from "../hooks/useDataSource";
import axios from "axios";

const serverResource = (url) => async () => {
  const response = await axios.get(url);
  return response.data;
};

const localStorageResource = (key) => () => localStorage.getItem(key);

function UserInfo({ userId }) {
  const user = useDataSource(serverResource(`/users/${userId}`));
  const message = useDataSource(localStorageResource("message"));
  console.log("message", message);

  const { name, age, hairColor, hobbies } = user || {};

  return user ? (
    <>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default UserInfo;

import withEditResource from "./withEditResource";

const UserInfoForm = withEditResource(
  ({ user, onChangeUser, onSaveUser, onResetUser, ...args }) => {
    const { name, age, job } = user || {};

    return user ? (
      <>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => onChangeUser({ name: e.target.value })}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => onChangeUser({ age: e.target.value })}
          />
        </label>

        <label>
          Job:
          <input
            value={job}
            onChange={(e) => onChangeUser({ job: e.target.value })}
          />
        </label>

        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Change</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "/users/123",
  "user"
);

export default UserInfoForm;

import { useDispatch } from "react-redux";
import { setUsername, setPassword } from "../../reducers/userReducer";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

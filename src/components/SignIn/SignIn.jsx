import React, { useState } from "react";
import "./SignIn.scss";

export default function SignIn({ isAuth, setisAuth }) {
  const [signIn, setSignIn] = useState(false);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };
  const toggleAuth = () => {
    setisAuth(!isAuth);
  };

  return (
    <div className="welcome">
      <h1>To-Do List</h1>
      <div className={signIn ? "signIn" : "signUp"}>
        {/* <h2>{signIn ? "Sign In" : "Sign Up"}</h2> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toggleAuth();
            toggleSignIn();
          }}
        >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="form-control" required />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
          />

          {!signIn && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            {signIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button onClick={toggleSignIn} className="btn btn-primary">
          {signIn
            ? "Don't have an account. Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}

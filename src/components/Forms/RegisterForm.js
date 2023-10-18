import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { FcGoogle } from "react-icons/fc";

function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="form-container sign-up-container">
      <form>
        <h2 className="text-3xl mb-4">Register here.</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="my-3 p-3 form-input"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="my-5 p-3 form-input"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="my-5 p-3 form-input"
        />
        <button
          className="my-6 border-solid border-2 border-black rounded form-button"
          onClick={onSubmit}
          type="submit"
        >
          Register
        </button>
        <button className="my-6 border-solid border-2 border-black rounded form-button bg-white">
          <div className="flex flex-row align-middle ">
            <p className="mx-3 text-black normal-case">Continue with</p>
            <span>
              <FcGoogle />
            </span>
          </div>
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

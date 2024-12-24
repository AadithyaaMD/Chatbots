import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../../config/config"; // Correct path to config.js
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import specific function from Firebase

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (formValues.email === "" || formValues.password === "") {
      setErrorMessage("All fields are required!");
      return;
    }

    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setErrorMessage("");
        alert("Account created successfully!");
        navigate("/firstpage"); // Redirect to /firstpage route
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0", // Grey shaded background
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "white", // White background for the form
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#333" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#333" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#333" }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "15px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Sign Up
          </button>
        </form>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#4CAF50", textDecoration: "none", fontWeight: "bold" }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

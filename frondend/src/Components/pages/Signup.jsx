import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/firebase.js"; // Adjust path as needed

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import Firebase Auth methods
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formValues.name) {
      setErrorMessage("Name is required!");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (formValues.email === "" || formValues.password === "") {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      const user = userCredential.user;

      // Save user details to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: formValues.name,
        email: formValues.email,
        createdAt: new Date(),
      });

      // Update user's displayName in Firebase Authentication
      await updateProfile(user, {
        displayName: formValues.name,
      });

      setErrorMessage(""); // Clear any error messages
      alert("Account created successfully!");
      navigate("/firstpage"); // Redirect to the first page
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000", // Black background
        color: "#fff", // Light text color
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#1a1a1a", // Slightly lighter black for form container
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)", // Subtle shadow for depth
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc" }}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #444",
                backgroundColor: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc" }}>Email</label>
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
                border: "1px solid #444",
                backgroundColor: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc" }}>Password</label>
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
                border: "1px solid #444",
                backgroundColor: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#ccc" }}>Confirm Password</label>
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
                border: "1px solid #444",
                backgroundColor: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          {errorMessage && (
            <p style={{ color: "#e74c3c", fontSize: "14px", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4CAF50", // Green button
              color: "#fff",
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
          <p style={{ fontSize: "14px", color: "#ccc" }}>
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

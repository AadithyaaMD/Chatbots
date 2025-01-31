import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/firebase.js"; // Correct path to Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.email === "" || formValues.password === "") {
      setErrorMessage("All fields are required!");
      return;
    }
    if(formValues.email=="admin@gmail.com" && formValues.password=="admin123"){
      //console.log("welocme back cheif");
      navigate("/admindashboard");
      return;
    }
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user; // User object
        console.log("User logged in:", user); // Debugging user details

        // Optional: Use user details
        //alert(Welcome back, ${user.email}!); // Example: Show user email in alert
        setErrorMessage(""); // Clear error message
        navigate("/firstpage"); // Redirect to a specific page
      })
      .catch((error) => {
        console.error("Login error:", error.message); // Debug error
        setErrorMessage(error.message); // Display error to the user
      });
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
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        {/* Sign Up Option */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "14px", color: "#ccc" }}>
            Don't have an account?{" "}
            <a
              href="/signup"
              style={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Sign Up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            outline: "none",
          }}
        >
          Go to Home Page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;

"use client";
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", true);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#2B373B",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <p style={{ margin: 0 }}>
        Questo sito utilizza i cookie per migliorare l'esperienza utente.{" "}
        <a href="/privacy-policy" style={{ color: "#ffd700" }}>
          Scopri di più
        </a>
      </p>
      <button
        onClick={acceptCookies}
        style={{
          backgroundColor: "#4e503b",
          color: "#fff",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Accetto
      </button>
    </div>
  );
};

export default CookieConsent;

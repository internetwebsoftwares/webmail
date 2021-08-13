import React from "react";

const styles = {
  borderTop: "1px solid #ccc",
  padding: "1rem",
  marginTop: "2rem",
  color: "#333",
};

function Footer() {
  return (
    <footer style={styles} className="appFooter">
      <center>
        <strong>webMa!l </strong> &copy; 2021. All rights reserved.
        <p>
          Developed by: <strong>Ata Shaikh</strong> &{" "}
          <strong>Shaikh Yasir</strong>{" "}
        </p>
      </center>
    </footer>
  );
}

export default Footer;

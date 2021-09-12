import React from "react";

const styles = {
  footer: {
    borderTop: "1px solid #ccc",
    padding: "1rem",
    marginTop: "2rem",
    color: "#333",
  },
  link: {
    color: "#3f51b5",
    textDecoration: "underline",
  },
};

function Footer() {
  return (
    <footer style={styles.footer} className="appFooter">
      <center>
        <strong>webMa!l </strong> &copy;{" "}
        {new Date().getFullYear() !== 2021 && (
          <>
            {new Date().getFullYear()}
            {"-"}
          </>
        )}
        {new Date().getFullYear()}. All rights reserved.
        <p>
          Developed by:{" "}
          <strong>
            <a
              style={styles.link}
              href="https://internetwebsoftwares.github.io/portfolio"
            >
              Ata Shaikh
            </a>
          </strong>{" "}
          & <strong>Shaikh Yasir</strong>{" "}
        </p>
      </center>
    </footer>
  );
}

export default Footer;

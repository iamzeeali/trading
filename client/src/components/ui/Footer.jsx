import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer class="footer" style={footer}>
        <div class="container">
          <span class="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    </React.Fragment>
  );
};

// const clear = { clear: both, height: "60px" };
const footer = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50px" /* Set the fixed height of the footer here */,
  lineHeight: "60px" /* Vertically center the text there */,
  backgroundColor: "#f5f5f5",
};

export default Footer;

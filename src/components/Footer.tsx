import React from "react";

const Footer: React.FC = React.memo(() => {
  return (
    <div className="footer">
      <p style={{ fontWeight: 800 }}>MNML News Reader</p>
      <p style={{ marginTop: "10px" }}>
        A simple reddit client, suitable for reading news
      </p>
    </div>
  );
});

export default Footer;

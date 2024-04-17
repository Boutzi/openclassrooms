import React from "react";
import kasaLogo from "../../assets/logos/logo.svg";

function Footer() {
  return (
    <div className="footer">
      <img src={kasaLogo} className="footer__logo" alt="Logo Kasa" />
      <p className="footer__copyright">© 2020 Kasa. All rights reserved</p>
    </div>
  );
}

export default Footer;

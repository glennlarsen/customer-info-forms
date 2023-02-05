import logo from "images/logoipsum.png";

function index({ info, logoLight }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="logo"
    >
      <img src={logoLight ? logo : logo} alt="Sixt Logo" />
      <span>{info}</span>
    </div>
  );
}

export default index;

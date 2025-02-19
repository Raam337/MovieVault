import "./Header.sass";
import logo from "@/assets/logox.png";

function Header() {
  return (
    <header className="header">
      <div>
        <a href="/">
          <img src={logo} width={200} />
        </a>
      </div>
    </header>
  );
}

export default Header;

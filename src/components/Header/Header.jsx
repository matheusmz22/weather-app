import Dropdown from "./Dropdown";

function Header() {
  return (
    <header className="sm:p-15 sm:mx-10 flex items-center justify-between p-5">
      <img src="/logo.svg" className="w-40" />
      <Dropdown />
    </header>
  );
}

export default Header;

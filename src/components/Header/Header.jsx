import Dropdown from "./Dropdown";

function Header() {
  return (
    <header className="sm:p-4 lg:mx-10 flex items-center justify-between p-4">
      <img src="/logo.svg" className="w-40" />
      <Dropdown />
    </header>
  );
}

export default Header;

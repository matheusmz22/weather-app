import Dropdown from "./Dropdown";

function Header() {
  return (
    <header className=" p-15 mx-10 flex items-center justify-between">
      <img src="/logo.svg" />
      <Dropdown />
    </header>
  );
}

export default Header;

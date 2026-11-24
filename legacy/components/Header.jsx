// Header.jsx — sticky blurred top bar with anchor nav
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="header-mark" href="#top" aria-label="Davis McCracken — top">
          <img src="assets/logo-mark.png" alt="" />
        </a>
        <span className="header-name">Davis McCracken</span>
        <nav className="header-nav">
          <a href="#projects">projects</a>
          <a href="#photos">photos</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
        </nav>
      </div>
    </header>
  );
}

window.Header = Header;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>ODA</h1>
      </div>
    </>
  );
};

export default Header;

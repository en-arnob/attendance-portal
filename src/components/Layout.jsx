import Nav from "./Nav"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;

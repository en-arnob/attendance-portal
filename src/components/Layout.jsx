import Nav from "./Nav"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container mt-2 p-2">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;

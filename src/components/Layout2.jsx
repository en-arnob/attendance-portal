import Nav from "./Nav";

// eslint-disable-next-line react/prop-types
const Layout2 = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="mt-2 px-6">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout2;

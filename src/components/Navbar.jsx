import { useContext, useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 ? true : false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [burgerMenu, setBurgerMenu] = useState(false);

  const clickBurger = () => {
    setBurgerMenu(!burgerMenu);
  };

  const [isAuthenticated, isAdmin] = useContext(AuthDataContext);

  return (
    <nav className="flex items-center justify-around bg-white/30 backdrop-blur-md h-[9vh] text-black sticky top-0 left-0 z-10">
      {/* Logo */}
      <h4 className="uppercase">
        <em>Aziz Imported Collections</em>
      </h4>
      {/* if Small Screen Or Large */}
      {isMobile ? (
        <>
          <CiMenuBurger onClick={clickBurger} className=" w-5 h-5" />
          {burgerMenu && (
            <div className="fixed w-52 h-screen top-0 left-0 bg-white text-black shadow-lg p-4 z-5 flex flex-col gap-5 font-sans items-center">
              <IoIosClose
                className="absolute top-2 right-2  w-10 h-10 pr-2 pt-2 "
                onClick={clickBurger}
              />

              <ul className="flex flex-col gap-5 font-sans mt-7">
                <Link to={"/"} onClick={clickBurger} className="cursor-pointer">
                  <li>Home</li>
                </Link>
                <Link
                  to={"/products"}
                  onClick={clickBurger}
                  className="cursor-pointer"
                >
                  <li>Products</li>
                </Link>
                <Link
                  to={"/cart"}
                  onClick={clickBurger}
                  className="cursor-pointer"
                >
                  <li>Cart</li>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to={"/profile"} className="cursor-pointer">
                      <li>Profile</li>
                    </Link>
                    {isAdmin && (
                      <Link to={"/admin"} className="cursor-pointer">
                        <li>Admin</li>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to={"/login"} className="cursor-pointer">
                      <li>Login</li>
                    </Link>
                    <Link to={"/register"} className="cursor-pointer">
                      <li>Register</li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      ) : (
        <ul className="flex flex-row gap-5 font-sans">
          <Link to={"/"} className="cursor-pointer">
            <li>Home</li>
          </Link>
          <Link to={"/products"} className="cursor-pointer">
            <li>Products</li>
          </Link>
          <Link to={"/cart"} className="cursor-pointer">
            <li>Cart</li>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={"/profile"} className="cursor-pointer">
                <li>Profile</li>
              </Link>
              {isAdmin && (
                <Link to={"/admin"} className="cursor-pointer">
                  <li>Admin</li>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to={"/login"} className="cursor-pointer">
                <li>Login</li>
              </Link>
              <Link to={"/register"} className="cursor-pointer">
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;

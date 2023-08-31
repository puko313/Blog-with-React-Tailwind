import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { SET_CURRENT_USER } from "../../action/constants";

const Navbar = () => {
  const authUser = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
  };
  return (
    <div className="bg-black text-1xl">
      <div className="container mx-auto justify-between flex  text-white">
        <div className="py-5">
          <Link to={"/blog_list"}>Dashboard</Link>
        </div>
        {!localStorage.token ? (
          <div className="py-5">
            <Link to={"/register"} className="px-4">
              Register
            </Link>
            <Link to={"/login"} className="px-4">
              Login
            </Link>
          </div>
        ) : (
          <div className="py-5">
            <a type="button" href="#" className="px-4">
              {sessionStorage.getItem("userName")}
            </a>
            <a type="button" onClick={logout} href={"/"} className="px-4">
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;

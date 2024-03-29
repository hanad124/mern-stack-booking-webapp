import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-wight cursor-pointer">
          Booking.com
        </span>
        <span className="flex space-x-2 items-center gap-8">
          {isLoggedIn ? (
            <>
              <Link to="/my-booking" className="text-white">
                My Bookings
              </Link>
              <Link to="/my-booking" className="text-white">
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className=" rounded px-4 py-1 text-blue-600 bg-white font-medium hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out hover:ring-[2px] hover:ring-white "
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

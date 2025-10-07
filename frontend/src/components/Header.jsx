// import React, { useState, useEffect, useRef } from "react";
// import { Menu, X, Mountain, Settings, User, LogOut, UserCog, History, ChevronDown } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setIsAdmin, setIsAuthenticated } from "../Features/roleSlice.js"; // Assuming you have these actions
// import { toast } from "react-toastify";
// import { set } from "mongoose";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null); // Ref for the dropdown
//   // const [navBgColour,setnavBgColour] = useState("bg-slate-80/90");
//   // const [navItemsColour , setnavItemsColour] = useState("text-gray-200");

//   const currentRoute = location.pathname;
//   const isHomePage = currentRoute === "/";
//   const navBgColour = isHomePage ? "bg-slate-80/90" : "bg-gray-50";
//   const navItemsColour = isHomePage ? "text-gray-200" : "text-gray-800";

//   // State management
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Redux state
//   const isAdmin = useSelector(state => state.role.isAdmin);
//   const isAuthenticated = useSelector(state => state.role.isAuthenticated);

//   // Fetch user role from token on component mount
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(
//           "http://localhost:5001/gettokendetails",
//           {},
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           setUserRole(response.data.role);
//           // Sync redux state if needed
//           dispatch(setIsAuthenticated(true));
//           if(response.data.role === 'ADMIN') {
//             dispatch(setIsAdmin(true));
//           }
//         } else {
//           setUserRole(null);
//         }
//       } catch (err) {
//         setUserRole(null);
//         console.error("Error fetching token details:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserRole();
//   }, [dispatch, isAuthenticated]);

//   const handleUserLogOut = async ()=>{
//     console.log("Logging out user...");
//     try{
//       const response = await axios.post("http://localhost:5001/user/logout", {}, { withCredentials: true });

//       console.log("Logout response:", response);

//       if(response.status === 200) {

//         console.log("User logged out successfully");
//         dispatch(setIsAuthenticated(false));
//         dispatch(setIsAdmin(false));
//         setUserRole(null);
//         setIsDropdownOpen(false);
//          toast.success("Logged out successfully");
//         navigate("/");
//       }
//     } catch (error) {
//     console.error("Logout failed:", error);
//     // Still log out on client-side even if server fails
//     dispatch(setIsAuthenticated(false));
//     dispatch(setIsAdmin(false));
//     setUserRole(null);
//     setIsDropdownOpen(false);
//     toast.error("Logout failed, please try again");
//     navigate("/");
//   }
// };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Common NavLink class function
//   const navLinkClass = ({ isActive }) =>
//     `${
//       isActive ? "text-orange-600" : navItemsColour
//     } hover:text-orange-600 transition-colors font-medium text-lg duration-200`;

//   // Dropdown menu component
//   const UserDropdown = () => (
//     <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out">
//       <div className="py-1">
//         <button
//           onClick={() => {
//             navigate('/profile'); // Assuming a profile page route
//             setIsDropdownOpen(false);
//           }}
//           className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//         >
//           <UserCog className="mr-3 h-5 w-5 text-gray-500" />
//           <span>Your Profile</span>
//         </button>

//         { (userRole === 'ADMIN' || isAdmin) && (
//           <button
//             onClick={() => {
//               navigate('/admin');
//               setIsDropdownOpen(false);
//             }}
//             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//           >
//             <Settings className="mr-3 h-5 w-5 text-gray-500" />
//             <span>Manage Treks</span>
//           </button>
//         )}

//         { userRole === 'USER' && (
//           <button
//             onClick={() => {
//               navigate('/trek-history'); // Assuming a trek history route
//               setIsDropdownOpen(false);
//             }}
//             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//           >
//             <History className="mr-3 h-5 w-5 text-gray-500" />
//             <span>Trek History</span>
//           </button>
//         )}

//         <div className="border-t border-gray-100"></div>
//         <button
//           onClick={handleUserLogOut}
//           className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//         >
//           <LogOut className="mr-3 h-5 w-5" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );

//   // Renders all navigation items for both desktop and mobile
//   const renderNavItems = (isMobile = false) => (
//     <>
//       <NavLink to="/" className={navLinkClass}>Home</NavLink>
//       <NavLink to="/destinations" className={navLinkClass}>Destinations</NavLink>
//       <NavLink to="/services" className={navLinkClass}>Services</NavLink>
//       <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
//       <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
//     </>
//   );

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 ${navBgColour} backdrop-blur-md shadow-sm`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <button className="flex items-center space-x-2" onClick={() => navigate("/")}>
//             <Mountain className="h-8 w-8 text-orange-600" />
//             <span className="text-2xl font-bold text-gray-900 hover:text-orange-600">NisargPath</span>
//           </button>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {renderNavItems()}

//             {isLoading && <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>}

//             {!isLoading && (
//               <>
//                 { (userRole === 'USER' || !userRole) && !(userRole === 'ADMIN' || isAdmin) && (
//                   <button onClick={() => navigate("/destinations")} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300">
//                     Book Now
//                   </button>
//                 )}

//                 { !userRole && !isAuthenticated ? (
//                   <button onClick={() => navigate("/signin")} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300">
//                     Sign In
//                   </button>
//                 ) : (
//                   <div className="relative" ref={dropdownRef}>
//                     <button
//                       onClick={() => setIsDropdownOpen(prev => !prev)}
//                       className="flex items-center p-2 rounded-full bg-orange-50 hover:bg-orange-200 transition-colors"
//                     >
//                       <User className="h-5 w-5 text-gray-700" />
//                       <ChevronDown className={`h-4 w-4 text-gray-600 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>
//                     {isDropdownOpen && <UserDropdown />}
//                   </div>
//                 )}
//               </>
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200">
//             <nav className="flex flex-col space-y-4">
//               {renderNavItems(true)}

//               <div className="border-t border-gray-200 pt-4 flex flex-col items-start space-y-4">
//                 {isLoading && <div className="w-28 h-10 bg-gray-200 rounded-full animate-pulse self-start"></div>}

//                 {!isLoading && (
//                   <>
//                     { (userRole === 'USER' || !userRole) && !(userRole === 'ADMIN' || isAdmin) && (
//                       <button onClick={() => navigate("/destinations")} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 self-start">
//                         Book Now
//                       </button>
//                     )}

//                     { !userRole && !isAuthenticated ? (
//                       <button onClick={() => navigate("/signin")} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 self-start">
//                         Sign In
//                       </button>
//                     ) : (
//                       <div className="relative w-full" ref={dropdownRef}>
//                         <button
//                           onClick={() => setIsDropdownOpen(prev => !prev)}
//                           className="flex items-center justify-between w-full p-2 rounded-md bg-orange-50 hover:bg-orange-200 transition-colors text-left"
//                         >
//                           <span className="fle items-center">
//                             <User className="h-5 w-5 text-gray-700 mr-2" />
//                             Profile Options
//                           </span>
//                           <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                         </button>
//                         {isDropdownOpen && <UserDropdown />}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Mountain,
  Settings,
  User,
  LogOut,
  UserCog,
  History,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsAdmin, setIsAuthenticated } from "../Features/roleSlice.js"; // Assuming you have these actions
import { toast } from "react-toastify";
import { set } from "mongoose";
import logo from "../assets/trekora1.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null); // Ref for the dropdown

  const currentRoute = location.pathname;
  const isHomePage = currentRoute === "/";

  // Scroll state for home page
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic navbar styling based on page and scroll state
  const navBgColour = isHomePage
    ? isScrolled
      ? "bg-white/95"
      : "bg-slate-80/90"
    : "bg-gray-50";
  const navItemsColour = isHomePage
    ? isScrolled
      ? "text-gray-800"
      : "text-gray-200"
    : "text-gray-800";

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redux state
  const isAdmin = useSelector((state) => state.role.isAdmin);
  const isAuthenticated = useSelector((state) => state.role.isAuthenticated);

  // Scroll event listener for home page only
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(false); // Reset when not on home page
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 690);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Fetch user role from token on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      console.log("Fetching user role...");
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5001/gettokendetails",
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          setUserRole(response.data.role);
          console.log("User Role:", response.data.role);
          console.log("Current isAdmin from Redux:", isAdmin);
          console.log("Current isAuthenticated from Redux:", isAuthenticated);
          // Sync redux state if needed
          dispatch(setIsAuthenticated(true));
          if (response.data.role === "ADMIN") {
            console.log("Setting admin to true");
            dispatch(setIsAdmin(true));
          }
        } else {
          setUserRole(null);
        }
      } catch (err) {
        setUserRole(null);
        console.error("Error fetching token details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [dispatch, isAuthenticated]);

  const handleUserLogOut = async () => {
    console.log("Logging out user...");
    try {
      const response = await axios.post(
        "http://localhost:5001/user/logout",
        {},
        { withCredentials: true }
      );

      console.log("Logout response:", response);

      if (response.status === 200) {
        console.log("User logged out successfully");
        dispatch(setIsAuthenticated(false));
        dispatch(setIsAdmin(false));
        setUserRole(null);
        setIsDropdownOpen(false);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Still log out on client-side even if server fails
      dispatch(setIsAuthenticated(false));
      dispatch(setIsAdmin(false));
      setUserRole(null);
      setIsDropdownOpen(false);
      toast.error("Logout failed, please try again");
      navigate("/");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Common NavLink class function
  const navLinkClass = ({ isActive }) =>
    `${
      isActive ? "text-orange-600" : navItemsColour
    } hover:text-orange-600 transition-colors font-medium text-lg duration-200`;

  // Dropdown menu component
  const UserDropdown = () => (
    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out">
      <div className="py-1">
        <button
          onClick={() => {
            navigate("/profile"); // Assuming a profile page route
            setIsDropdownOpen(false);
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <UserCog className="mr-3 h-5 w-5 text-gray-500" />
          <span>Your Profile</span>
        </button>

        {(userRole === "ADMIN" || isAdmin) && (
          <button
            onClick={() => {
              navigate("/admin");
              setIsDropdownOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            <span>Manage Treks</span>
          </button>
        )}

        <div className="border-t border-gray-100"></div>
        <button
          onClick={handleUserLogOut}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // Renders all navigation items for both desktop and mobile
  const renderNavItems = (isMobile = false) => (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/destinations" className={navLinkClass}>
        Destinations
      </NavLink>
      <NavLink to="/services" className={navLinkClass}>
        Services
      </NavLink>
      <NavLink to="/gallery" className={navLinkClass}>
        Gallery
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
    </>
  );

  // Debug logging
  console.log(
    "Header Debug - userRole:",
    userRole,
    "isAdmin:",
    isAdmin,
    "isAuthenticated:",
    isAuthenticated,
    "isLoading:",
    isLoading
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${navBgColour} backdrop-blur-md shadow-sm transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            className="flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <img src={logo} alt="TREKORA" className="h-12 w-auto" />
            </div>
            <span
              className={`text-2xl font-bold ${
                isHomePage
                  ? isScrolled
                    ? "text-gray-800"
                    : "text-gray-200"
                  : "text-gray-800"
              } hover:text-orange-600`}
            >
              TREKORA
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {renderNavItems()}

            {isLoading && (
              <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            )}

            {!isLoading && (
              <>
                {(userRole === "USER" || !userRole) &&
                  !(userRole === "ADMIN" || isAdmin) && (
                    <button
                      onClick={() => navigate("/destinations")}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
                    >
                      Book Now
                    </button>
                  )}

                {(userRole === "ADMIN" || isAdmin) && (
                  <button
                    onClick={() => {
                      console.log("Desktop Manage Treks clicked");
                      navigate("/admin");
                    }}
                    className="flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Manage Treks
                  </button>
                )}

                {!userRole && !isAuthenticated ? (
                  <button
                    onClick={() => navigate("/signin")}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300"
                  >
                    Sign In
                  </button>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className="flex items-center p-2 rounded-full bg-orange-50 hover:bg-orange-200 transition-colors"
                    >
                      <User className="h-5 w-5 text-gray-700" />
                      <ChevronDown
                        className={`h-4 w-4 text-gray-600 ml-1 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isDropdownOpen && <UserDropdown />}
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {renderNavItems(true)}

              <div className="border-t border-gray-200 pt-4 flex flex-col items-start space-y-4">
                {isLoading && (
                  <div className="w-28 h-10 bg-gray-200 rounded-full animate-pulse self-start"></div>
                )}

                {!isLoading && (
                  <>
                    {(userRole === "USER" || !userRole) &&
                      !(userRole === "ADMIN" || isAdmin) && (
                        <button
                          onClick={() => navigate("/destinations")}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 self-start"
                        >
                          Book Now
                        </button>
                      )}
                    {(userRole === "ADMIN" || isAdmin) && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 self-start"
                      >
                        <Settings className="h-5 w-5 mr-2" />
                        Manage Treks
                      </button>
                    )}
                    {!userRole && !isAuthenticated ? (
                      <button
                        onClick={() => navigate("/signin")}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 self-start"
                      >
                        Sign In
                      </button>
                    ) : (
                      <div className="relative w-full" ref={dropdownRef}>
                        <button
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className="flex items-center justify-between w-full p-2 rounded-md bg-orange-50 hover:bg-orange-200 transition-colors text-left"
                        >
                          <span className="fle items-center">
                            <User className="h-5 w-5 text-gray-700 mr-2" />
                            Profile Options
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-600 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isDropdownOpen && <UserDropdown />}
                      </div>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

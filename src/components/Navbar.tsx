import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectCartItems } from "../redux/features/cartSlice";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Services", url: "/services" },
  { title: "Contact", url: "/contact" },
];

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(navLinks[0]);
  const [click, setClick] = useState(navLinks[0]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const cartItem = useAppSelector(selectCartItems);
  const modalVariants = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
      transition: {
        type: "tween", 
        duration: 0.3, 
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: "50%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
        ease: "easeOut", // Add ease-out easing function
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };
  const MotionLinks = motion(Link);
  return (
    <nav className="px-4 py-4 text-black ">
      <div className="container flex items-center justify-between mx-auto ">
        <div className="text-xl font-bold text-white">Keep Type</div>
        <ul className="flex items-center gap-6 cursor-pointer">
          {navLinks.map((navLink, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHovered(navLink)}
              onHoverEnd={() => setHovered(click)}
              onClick={() => setClick(navLink)}
              className="relative hidden px-5 py-2 capitalize duration-300 text-zinc-200 md:block group font-extralight hover:text-gray-200">
              {navLink.title}
              {hovered === navLink && (
                <MotionLinks
                  to={navLink.url}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15, type: "spring" },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2, type: "spring" },
                  }}
                  layoutId="background"
                  className="absolute inset-0 rounded-md bg-slate-100 bg-opacity-10"></MotionLinks>
              )}
            </motion.div>
          ))}
          <div className="text-white md:hidden">
            <FaBars onClick={toggleModal} />
          </div>
        </ul>
        <Link to={"/cart"}>
          {" "}
          <div className="indicator ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-black badge badge-sm indicator-item bg-slate-400">
              {cartItem.length}
            </span>
          </div>
        </Link>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit">
            <FaTimes
              className="absolute text-white cursor-pointer top-6 right-4"
              onClick={toggleModal}
              style={{ fontSize: "16px" }}
            />
            <motion.div
              className="relative w-full bg-black"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit">
              <div className="flex flex-col items-center justify-center h-full gap-8 ">
                {navLinks.map((link, index) => (
                  <MotionLinks
                    to={link.url}
                    key={index}
                    className="text-2xl font-light text-white cursor-pointer"
                    variants={linkItemVariants}>
                    {link.title}
                  </MotionLinks>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

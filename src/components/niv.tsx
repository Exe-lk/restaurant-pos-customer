import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";

export default function niv() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const email: any = sessionStorage.getItem("user");
    if (email) {
      setEmail(email);
    }
  }, []);

  const handlelogout = async () => {
    await sessionStorage.removeItem("user");
    Router.push("/login");
  };
  return (
    <div className="navbar bg-opacity-75 bg-warning text-neutral">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">MindfUlness</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {email ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/emotion-detection"}>
                <b> Emotion Detection</b>
              </Link>
            </li>
            <li>
              <a>Item 3</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        ) : (
          <div>
            
          </div>
        )}
      </div>
      <div className="navbar-end" onClick={handlelogout}>
        <a className="btn">{email ? "Log out" : "Log in"}</a>
      </div>
    </div>
  );
}

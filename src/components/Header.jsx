import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-govcy-blue text-govcy-blue-foreground">
      <div className="bg-govcy-blue-dark">
        <div className="mx-auto flex max-w-[1280px] items-center justify-end px-6 py-2.5">
          <a
            href="#login"
            className="flex items-center gap-2 text-[15px] font-medium hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-in h-4 w-4"
              aria-hidden="true"
            >
              <path d="m10 17 5-5-5-5"></path>
              <path d="M15 12H3"></path>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            </svg>
            Cy Login Service
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 pt-8 pb-3">
        <a href="/" className="flex items-center gap-4">
          <img
            src="/assets/cyprus-emblem-color-tBxRK35Q.png"
            alt="Republic of Cyprus emblem"
            className="h-14 w-auto"
            width="56"
            height="56"
          />
          <span className="text-[44px] leading-none font-light tracking-tight">
            gov<span className="text-govcy-orange font-light">.cy</span>
          </span>
        </a>
        <div className="hidden items-center gap-4 text-[17px] font-medium md:flex">
          <a href="#el" className="px-2 py-1 hover:underline">
            EL
          </a>
          <span className="text-white/30">|</span>
          <a href="#en" className="border-b-2 border-white px-2 py-1">
            EN
          </a>
        </div>
        <button
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu h-7 w-7"
            aria-hidden="true"
          >
            <path d="M4 5h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 19h16"></path>
          </svg>
        </button>
      </div>
      <nav
        className={`mx-auto max-w-[1280px] px-6 pb-6 ${menuOpen ? "mobile-nav-open" : ""}`}
      >
        <ul className="flex flex-wrap items-center divide-x divide-white/40 border-y border-white/30 text-[17px] font-medium">
          <li className="border-l border-white/40">
            <a href="#" className="block px-6 py-3 hover:underline">
              Services
            </a>
          </li>
          <li className="">
            <a href="#" className="block px-6 py-3 hover:underline">
              Websites
            </a>
          </li>
          <li className="">
            <a href="#" className="block px-6 py-3 hover:underline">
              News
            </a>
          </li>
          <li className="">
            <a href="" className="block px-6 py-3 hover:underline">
              Government
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

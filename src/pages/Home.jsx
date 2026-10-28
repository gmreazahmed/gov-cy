import React, { useState } from "react";
import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GovCyPortal() {
  const [query, setQuery] = useState("");
  const [assistantMessage, setAssistantMessage] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    // Connect this to your own search endpoint if needed.
    if (query.trim())
      window.location.hash = `search=${encodeURIComponent(query.trim())}`;
  };

  const handleAssistantSend = (event) => {
    event.preventDefault();
    if (!assistantMessage.trim()) return;
    setConversationStarted(true);
    setAssistantMessage("");
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <section className="bg-govcy-blue text-govcy-blue-foreground">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-16 pt-4 lg:grid-cols-2">
          <div className="flex flex-col">
            <h1 className="text-[44px] font-bold leading-tight md:text-[56px]">
              Government Portal
            </h1>
            <p className="mt-8 max-w-md text-[28px] font-light leading-snug md:text-[32px]">
              Find government services and websites
            </p>
            <div className="mt-12">
              <label htmlFor="hero-search" className="text-[22px] font-bold">
                Search here
              </label>
              <form
                className="mt-4 flex max-w-xl shadow-lg"
                onSubmit={handleSearch}
              >
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-14 flex-1 bg-white px-4 text-[17px] text-govcy-text outline-none"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="flex h-14 w-14 items-center justify-center bg-govcy-blue-dark text-white hover:bg-govcy-blue-dark/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m21 21-4.34-4.34"></path>
                    <circle cx="11" cy="11" r="8"></circle>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/chatbot-mascot-Cyp1bT9I.png"
                  alt="Digital assistant"
                  className="h-20 w-20"
                  width="80"
                  height="80"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[28px] font-bold leading-none">
                      Digital Assistant
                    </h2>
                    <span className="rounded bg-govcy-link px-2 py-0.5 text-[12px] font-bold tracking-wider text-white">
                      BETA
                    </span>
                  </div>
                  <p className="mt-2 text-[16px] font-semibold">
                    Ask the gov.cy digital assistant
                  </p>
                </div>
              </div>
              <button aria-label="Expand">
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
                  className="lucide lucide-maximize2 lucide-maximize-2 h-5 w-5 -scale-x-100"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="m21 3-7 7"></path>
                  <path d="m3 21 7-7"></path>
                  <path d="M9 21H3v-6"></path>
                </svg>
              </button>
            </div>
            <div className="mt-4 flex flex-col bg-[oklch(0.92_0.01_230)] text-govcy-text">
              <div className="h-1.5 bg-govcy-orange"></div>
              <div className="flex items-start justify-end p-3">
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
                  className="lucide lucide-globe h-5 w-5 text-govcy-link"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <div className="px-4 pb-2">
                <div className="rounded bg-white p-4 text-[15px] leading-relaxed shadow-sm">
                  Hi, I am available to assist you with services and processes
                  related to Cyprus government. Click
                  <a
                    href="#topics"
                    className="font-bold text-govcy-link underline"
                  >
                    here
                  </a>
                  for the full list of our supported topics. How can I help you
                  today?
                </div>
              </div>
              <div className="flex justify-center py-6">
                <button
                  type="button"
                  onClick={() => setConversationStarted(true)}
                  className="rounded bg-govcy-link px-6 py-3 text-[15px] font-bold text-white shadow hover:bg-govcy-link/90"
                >
                  {conversationStarted
                    ? "Conversation started"
                    : "Start conversation"}
                </button>
              </div>
              <div className="flex-1"></div>
              <form
                onSubmit={handleAssistantSend}
                className="m-3 mt-12 flex items-center gap-2 rounded bg-white px-3 py-2 shadow-sm"
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
                  className="lucide lucide-mic h-5 w-5 text-govcy-link"
                  aria-hidden="true"
                >
                  <path d="M12 19v3"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <rect x="9" y="2" width="6" height="13" rx="3"></rect>
                </svg>
                <input
                  type="text"
                  value={assistantMessage}
                  onChange={(event) => setAssistantMessage(event.target.value)}
                  placeholder="Write your question"
                  className="flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-govcy-text/60"
                />
                <button
                  aria-label="Send"
                  className="flex h-9 w-9 items-center justify-center rounded bg-govcy-link text-white"
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
                    className="lucide lucide-send h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="text-[36px] font-bold text-govcy-text">
            Featured services
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 md:gap-x-16">
            <li>
              <a
                href="/check-visa"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>Check Visa Status</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>e-Kalathi</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>Digital Citizen</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>Apply for an ID card</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>Submit tax declarations via TAXISnet</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>State Student Welfare</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>
                  Search for a pending fine recorded by the Speed Enforcement
                  System
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center gap-5 text-[18px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-govcy-surface">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-5 w-5 text-govcy-link"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
                <span>Renewal of road tax</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="border-l-4 border-govcy-blue bg-govcy-surface">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 py-10 text-center md:grid-cols-3">
          <div className="relative flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-monitor absolute -left-2 top-1/2 h-24 w-24 -translate-y-1/2 text-govcy-text/10"
              aria-hidden="true"
            >
              <rect width="20" height="14" x="2" y="3" rx="2"></rect>
              <line x1="8" x2="16" y1="21" y2="21"></line>
              <line x1="12" x2="12" y1="17" y2="21"></line>
            </svg>
            <div className="text-[48px] font-bold leading-none text-govcy-text">
              153
            </div>
            <div className="mt-2 text-[18px] font-semibold text-govcy-text">
              New digital services
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-[48px] font-bold leading-none text-govcy-text">
              246
            </div>
            <div className="mt-2 text-[18px] font-semibold text-govcy-text">
              Digital services (old gen)
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div className="text-[48px] font-bold leading-none text-govcy-text">
              100
            </div>
            <div className="mt-2 text-[18px] font-semibold text-govcy-text">
              Not fully digital services
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="mb-8 text-[36px] font-bold text-govcy-text">
            Services
          </h2>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#agriculture-fisheries-and-livestock"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Agriculture, fisheries and livestock
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Procedures, certificates and subsidies relating to agricultural,
                livestock or fishing activities
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#business-activity"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Business activity
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Procedures about the life cycle of your business, taxation
                matters, customs, shipping, etc.
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#citizens-and-day-to-day-life"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Citizens and day-to-day life
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Services for Cypriot citizens and foreign nationals, as well as
                processes concerning transport and vehicles, postal services,
                etc.
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#culture"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Culture
                </a>
              </h3>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#education"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Education
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Procedures for educators, programmes, research and school
                enrolment certifications
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#employment-and-insurance"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Employment and insurance
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Services relating to employment, insurance and retirement
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#health"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Health
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Procedures for medical care, medicines and public health
                programmes
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#justice"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Justice
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Legislation, judicial cases, matters relating to the police,
                payment of fines and certification of documents
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#military-service"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Military service
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Services and procedures concerning conscription and contract
                soldiers
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#property-and-taxation"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Property and taxation
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Services regarding the management of your property and taxation
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#welfare"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Welfare
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Benefits, plans and grants available for citizens
              </p>
            </article>
            <article className="border-t border-govcy-surface-alt pt-6">
              <h3>
                <a
                  href="#tourism"
                  className="text-[20px] font-bold text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Tourism
                </a>
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-govcy-text">
                Licensing and procedures for tourist establishments and
                professionals
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="border-l-4 border-govcy-blue bg-govcy-surface">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-8">
            <div>
              <div className="text-[48px] font-bold leading-none text-govcy-text">
                18
              </div>
              <a
                href="#"
                className="mt-1 inline-block text-[18px] font-semibold text-govcy-text underline decoration-govcy-text/40 underline-offset-4 hover:decoration-govcy-text"
              >
                Ministries / Deputy Ministries
              </a>
            </div>
            <div>
              <div className="text-[48px] font-bold leading-none text-govcy-text">
                74
              </div>
              <a
                href="#"
                className="mt-1 inline-block text-[18px] font-semibold text-govcy-text underline decoration-govcy-text/40 underline-offset-4 hover:decoration-govcy-text"
              >
                Departments
              </a>
            </div>
            <div>
              <div className="text-[48px] font-bold leading-none text-govcy-text">
                68
              </div>
              <a
                href="#"
                className="mt-1 inline-block text-[18px] font-semibold text-govcy-text underline decoration-govcy-text/40 underline-offset-4 hover:decoration-govcy-text"
              >
                Government agencies and other public bodies
              </a>
            </div>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-govcy-text">
            <p>
              Gov.cy is the new web portal of the Republic of Cyprus. It hosts
              the websites and services, digital and non-digital, of the
              Ministries, Deputy Ministries, Departments and other public
              organisations.
            </p>
            <p>
              On the portal you can search directly for the website, service or
              topic you interested in. You can also view the services by subject
              category, and the websites by Ministry, Deputy Ministry,
              Department, Government Agency and other Public Body.
            </p>
            <p>
              The aim is for the gov.cy portal to become a central reference
              point for citizens for all matters relating to the public sector.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="mb-10 text-[36px] font-bold text-govcy-text">
            Stay Informed
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <article>
              <h3>
                <a
                  href="#"
                  className="text-[20px] font-bold leading-snug text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  President of the Republic of Cyprus – Official Governance
                  Agenda 2026
                </a>
              </h3>
              <div className="mt-3 text-[15px] text-govcy-text/70">
                05/02/26 19:53
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-govcy-text">
                The President of the Republic of Cyprus, Mr Nikos
                Christodoulides, presents the Official Governance Agenda 2026.
              </p>
            </article>
            <article>
              <h3>
                <a
                  href="#"
                  className="text-[20px] font-bold leading-snug text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Consumer Price Index (CPI): January 2026
                </a>
              </h3>
              <div className="mt-3 text-[15px] text-govcy-text/70">
                05/02/26 17:15
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-govcy-text">
                Inflation 0,5% Consumer Price Index in January 2026 decreased by
                0,30 points, reaching 99,98 units compared to 100,28 units in
                December 2025. Inflation in January 2026 increased at a rate…
              </p>
            </article>
            <article>
              <h3>
                <a
                  href="#"
                  className="text-[20px] font-bold leading-snug text-govcy-link visited:text-govcy-link-visited hover:underline"
                >
                  Industrial Turnover Index: November 2025
                </a>
              </h3>
              <div className="mt-3 text-[15px] text-govcy-text/70">
                05/02/26 16:57
              </div>
              <p className="mt-3 text-[16px] leading-relaxed text-govcy-text">
                Annual Change +10,0% In November 2025, the Industrial Turnover
                Index reached 138,6 units (base 2021=100), recording an increase
                of 10,0% compared to November 2024. For the period January –
                November…
              </p>
            </article>
          </div>
          <a
            href="#all-updates"
            className="mt-10 inline-block text-[17px] font-semibold text-govcy-link underline hover:no-underline"
          >
            View all updates
          </a>
        </div>
      </section>
      <section className="bg-govcy-blue text-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-5 text-[17px] font-semibold">
          <span>Is this page helpful ?</span>
          <a
            href="#yes"
            className="underline underline-offset-4 hover:no-underline"
          >
            Yes
          </a>
          <a
            href="#no"
            className="underline underline-offset-4 hover:no-underline"
          >
            No
          </a>
        </div>
        <div className="h-1 bg-govcy-orange"></div>
      </section>
      <Footer />
    </main>
  );
}

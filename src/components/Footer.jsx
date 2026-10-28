export default function Footer() {
  return (
    <footer className="bg-govcy-surface text-govcy-text">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <ul className="space-y-5">
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Agriculture, fisheries and livestock
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Business activity
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Education
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Employment and insurance
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Justice
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Military service
              </a>
            </li>
          </ul>
          <ul className="space-y-5">
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Citizens and day-to-day life
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Tourism
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Welfare
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Health
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-semibold underline underline-offset-4 hover:no-underline"
              >
                Property and taxation
              </a>
            </li>
          </ul>
          <ul className="space-y-5">
            <li>
              <a
                href="#"
                className="text-[17px] font-bold underline underline-offset-4 hover:no-underline"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-bold underline underline-offset-4 hover:no-underline"
              >
                Websites
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-bold underline underline-offset-4 hover:no-underline"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[17px] font-bold underline underline-offset-4 hover:no-underline"
              >
                Government
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-10 border-govcy-surface-alt" />
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-semibold">
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:no-underline"
              >
                Privacy Statement
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:no-underline"
              >
                Cookies Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:no-underline"
              >
                Accessibility Statement
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:no-underline"
              >
                Digital Assistant Usage Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="underline underline-offset-4 hover:no-underline"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <img
                src="/assets/eu-flag-BJ40c221.png"
                alt="EU flag"
                className="h-12 w-auto"
                width="72"
                height="48"
                loading="lazy"
              />
              <span className="mt-1 text-[11px] leading-tight text-govcy-text/80">
                Co-funded by
                <br />
                the European Union
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/cyprus-emblem-color-tBxRK35Q.png"
                alt="Republic of Cyprus"
                className="h-14 w-auto"
                width="56"
                height="56"
                loading="lazy"
              />
              <span className="mt-1 text-[11px] text-govcy-text/80">
                Republic of Cyprus
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-6 border-t border-govcy-surface-alt pt-6">
          <span className="text-[28px] font-light tracking-tight">
            gov<span className="text-govcy-orange">.cy</span>
          </span>
          <span className="text-[14px] text-govcy-text/70">
            © Republic of Cyprus, 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

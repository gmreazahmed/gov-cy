export default function Footer() {
  const columns = [
    [
      "Agriculture, fisheries and livestock",
      "Business activity",
      "Education",
      "Employment and insurance",
      "Justice",
    ],
    [
      "Citizens and day-to-day life",
      "Tourism",
      "Welfare",
      "Health",
      "Property and taxation",
    ],
    ["Services", "Websites", "News", "Information"],
  ];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {columns.map((column, index) => (
          <div key={index}>
            {column.map((item) => (
              <a href="#information" key={item}>
                {item}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <strong>
          visa<span>.demo</span>
        </strong>
        <p>Independent practice project · Sample data only</p>
      </div>
    </footer>
  );
}

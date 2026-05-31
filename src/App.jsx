import { useEffect, useMemo, useState } from "react";
import "./App.css";

const loadouts = [
  {
  weapon: "M4A1",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "M4A1 Assault Rifle-Warfare-6K6NR9803J3VC9GA2O2BG",
  image: "/screenshots/m4a1.png",
  tags: ["Low Recoil", "Beginner Friendly"],
  notesId: "Stabil buat mid range, cocok buat pemula.",
  notesEn: "Stable for mid-range fights, great for beginners."
},
{
  weapon: "AKM",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "AKM Assault Rifle-Warfare-6JS0I4G03J3VC9GA2O2BG",
  image: "/screenshots/akm.png",
  tags: ["High Damage", "Medium Recoil"],
  notesId: "Damage sakit, tapi recoil perlu dikontrol.",
  notesEn: "Hits hard, but the recoil needs good control."
},
{
  weapon: "Vector",
  category: "SMG",
  mode: "Warfare",
  code: "Vector Submachine Gun-Warfare-6K6NRSO03J3VC9GA2O2BG",
  image: "/screenshots/vector.png",
  tags: ["Low Recoil", "Fast TTK"],
  notesId: "Cocok buat rush jarak dekat dan main agresif.",
  notesEn: "Great for close-range rushing and aggressive plays."
},
{
  weapon: "AK-12",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "AK-12 Assault Rifle-Warfare-6JUD0HK03J3VC9GA2O2BG",
  image: "/screenshots/ak12.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Bagus buat pick musuh dari jarak menengah.",
  notesEn: "Good for picking enemies from mid range."
},
{
  weapon: "AUG",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "AUG Assault Rifle-Warfare-6K6NTR803J3VC9GA2O2BG",
  image: "/screenshots/aug.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Bagus buat pick musuh dari jarak menengah.",
  notesEn: "Good for picking enemies from mid range."
},
{
  weapon: "SMG-45",
  category: "SMG",
  mode: "Warfare",
  code: "SMG-45 Submachine Gun-Warfare-6JUBRJK03J3VC9GA2O2BG",
  image: "/screenshots/smg45.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Recoil Stabil, cocok buat main santai jarak menengah.",
  notesEn: "Stable recoil, good for relaxed mid-range gameplay."
},
{
  weapon: "PTR-32",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "PTR-32 Assault Rifle-Warfare-6K6S9HK03J3VC9GA2O2BG",
  image: "/screenshots/ptr32.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Bagus buat main jarak menengah.",
  notesEn: "Good for mid-range gameplay."
},
{
  weapon: "QBZ95-1",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "QBZ95-1 Assault Rifle-Warfare-6K6SA8003J3VC9GA2O2BG",
  image: "/screenshots/qbz.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Bagus buat pick musuh jarak menengah.",
  notesEn: "Good for picking enemies at mid range."
},
{
  weapon: "MK4",
  category: "SMG",
  mode: "Warfare",
  code: "MK4 Submachine Gun-Warfare-6K6SBB403J3VC9GA2O2BG",
  image: "/screenshots/mk4.png",
  tags: ["Mid Range", "Burst Mode", "Low Recoil"],
  notesId: "Low Recoil, Burst mode jarak menengah.",
  notesEn: "Low recoil with burst mode for mid-range fights."
},
{
  weapon: "SCAR-H",
  category: "Battle Rifle",
  mode: "Warfare",
  code: "SCAR-H Battle Rifle-Warfare-6K6SAPS03J3VC9GA2O2BG",
  image: "/screenshots/scarh.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Handling agak kurang, tapi cocok buat main jarak menengah.",
  notesEn: "Handling is a bit weaker, but it works well at mid range."
},
{
  weapon: "K416",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "K416 Assault Rifle-Warfare-6JVJ01G03J3VC9GA2O2BGG",
  image: "/screenshots/k416.png",
  tags: ["Mid Range", "Low Recoil"],
  notesId: "Recoil stabil, cocok buat main jarak menengah.",
  notesEn: "Stable recoil, suitable for mid-range gameplay."
},
{
  weapon: "MP7",
  category: "SMG",
  mode: "Warfare",
  code: "MP7 Submachine Gun-Warfare-6K6SDHG03J3VC9GA2O2BG",
  image: "/screenshots/mp7.png",
  tags: ["Close Combat", "Low Recoil"],
  notesId: "Low Recoil, cocok buat ngerush main jarak dekat.",
  notesEn: "Low recoil, great for rushing in close combat."
},
{
  weapon: "Bizon",
  category: "SMG",
  mode: "Warfare",
  code: "Bizon Submachine Gun-Warfare-6K6SE9403J3VC9GA2O2BG",
  image: "/screenshots/bizon.png",
  tags: ["Close Combat", "Low Recoil"],
  notesId: "Recoil stabil, cocok buat ngerush main jarak dekat.",
  notesEn: "Stable recoil, great for rushing in close combat."
}
];

const categories = ["All", "Assault Rifle", "SMG", "Sniper", "LMG", "Shotgun", "Battle Rifle"];
const modes = ["All", "Warfare", "Operations"];

const translations = {
  id: {
    liveDatabase: "Database Loadout Aktif",
    gameName: "Garena Delta Force",
    eyebrow: "Delta Force Loadout Database",
    title: "GINKGO LOADOUT",
    subtitle:
      "Temukan racikan senjata terbaik, kode loadout siap pakai, dan screenshot attachment buat push rank di Warfare maupun Operations.",
    exploreLoadouts: "Eksplor Loadouts",
    searchPlaceholder: "Cari senjata, mode, kategori, atau tag...",
    allCategories: "Semua Kategori",
    allModes: "Semua Mode",
    showing: "Menampilkan",
    from: "dari",
    loadout: "loadout",
    copyCode: "Copy Code",
    copied: "Copied!",
    prev: "Prev",
    next: "Next",
    emptyTitle: "Loadout nggak ketemu",
    emptyText: "Coba ganti keyword, kategori, atau mode.",
    footer: "Garena Delta Force Loadout Database | Dibuat oleh",
    screenshotAlt: "Screenshot loadout"
  },
  en: {
    liveDatabase: "Live Loadout Database",
    gameName: "Garena Delta Force",
    eyebrow: "Delta Force Loadout Database",
    title: "GINKGO LOADOUT",
    subtitle:
      "Discover the best weapon builds, ready-to-use loadout codes, and attachment screenshots for pushing rank in Warfare and Operations.",
    exploreLoadouts: "Explore Loadouts",
    searchPlaceholder: "Search weapon, mode, category, or tag...",
    allCategories: "All Categories",
    allModes: "All Modes",
    showing: "Showing",
    from: "of",
    loadout: "loadouts",
    copyCode: "Copy Code",
    copied: "Copied!",
    prev: "Prev",
    next: "Next",
    emptyTitle: "No loadouts found",
    emptyText: "Try changing the keyword, category, or mode.",
    footer: "Garena Delta Force Loadout Database | Made by",
    screenshotAlt: "Loadout screenshot"
  }
};

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [copiedCode, setCopiedCode] = useState("");
  const [zoomImage, setZoomImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [language, setLanguage] = useState(() => {
  return localStorage.getItem("language") || "id";
});

const t = translations[language];

useEffect(() => {
  const updateItemsPerPage = () => {
    if (window.innerWidth <= 700) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(6);
    }
  };

  updateItemsPerPage();
  window.addEventListener("resize", updateItemsPerPage);

  return () => {
    window.removeEventListener("resize", updateItemsPerPage);
  };
}, []);

useEffect(() => {
  setCurrentPage(1);
}, [search, category, mode]);

useEffect(() => {
  localStorage.setItem("language", language);
}, [language]);

useEffect(() => {
  const handleEsc = (event) => {
    if (event.key === "Escape") {
      setZoomImage(null);
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () => {
    window.removeEventListener("keydown", handleEsc);
  };
}, []);

  const filteredLoadouts = useMemo(() => {
    return loadouts.filter((item) => {
      const matchSearch =
  item.weapon.toLowerCase().includes(search.toLowerCase()) ||
  item.category.toLowerCase().includes(search.toLowerCase()) ||
  item.mode.toLowerCase().includes(search.toLowerCase()) ||
  item.tags.join(" ").toLowerCase().includes(search.toLowerCase()) ||
  item.notesId.toLowerCase().includes(search.toLowerCase()) ||
  item.notesEn.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "All" || item.category === category;
      const matchMode = mode === "All" || item.mode === mode;

      return matchSearch && matchCategory && matchMode;
    });
  }, [search, category, mode]);

const totalPages = Math.ceil(filteredLoadouts.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const paginatedLoadouts = filteredLoadouts.slice(startIndex, endIndex);

    const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 1500);
    } catch {
      alert("Gagal copy kode. Coba copy manual.");
    }
  };

  const totalLoadouts = loadouts.length;
  const totalCategories = [...new Set(loadouts.map((item) => item.category))].length;
  const totalModes = [...new Set(loadouts.map((item) => item.mode))].length;

  return (
    <main className="page">
            <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-light hero-light-left"></div>
        <div className="hero-light hero-light-right"></div>

        <div className="hero-content">
          <div className="hero-topbar">
            <div className="hero-badge">
  <span className="badge-dot"></span>
  <span>{t.liveDatabase}</span>
</div>

<div className="language-switcher">
  <button
    className={language === "id" ? "active" : ""}
    onClick={() => setLanguage("id")}
  >
    ID
  </button>

  <button
    className={language === "en" ? "active" : ""}
    onClick={() => setLanguage("en")}
  >
    EN
  </button>
</div>
          </div>

          <p className="eyebrow">{t.eyebrow}</p>

          <h1 className="hero-title">
  {t.title}
</h1>

          <p className="subtitle">
  {t.subtitle}
</p>

          <div className="hero-actions">
  <a href="#loadout-list" className="hero-button primary">
    {t.exploreLoadouts}
  </a>
</div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>{totalLoadouts}+</strong>
              <span>Loadouts</span>
            </div>

            <div className="stat-card">
              <strong>{totalCategories}</strong>
              <span>Categories</span>
            </div>

            <div className="stat-card">
              <strong>{totalModes}</strong>
              <span>Modes</span>
            </div>
          </div>

          <div className="hero-search-panel">
            <div className="search-box">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="filters">
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? t.allCategories : item}
                  </option>
                ))}
              </select>

              <select value={mode} onChange={(event) => setMode(event.target.value)}>
                {modes.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? t.allModes : item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="result-info" id="loadout-list">
        <p>
          {t.showing} <strong>{paginatedLoadouts.length}</strong> {t.from}{" "}
<strong>{filteredLoadouts.length}</strong> {t.loadout}
        </p>
      </section>

      <section className="grid">
        {paginatedLoadouts.map((item) => (
          <article className="card" key={item.weapon + item.code}>
            <button
  className="image-wrap"
  	onClick={() => setZoomImage(item)}
  aria-label={`Zoom screenshot ${item.weapon}`}
>
  <img
  className="loadout-image"
  src={item.image}
  alt={`${t.screenshotAlt} ${item.weapon}`}
/>
</button>

            <div className="card-top">
              <div>
                <h2>{item.weapon}</h2>
                <p>{item.category}</p>
              </div>

              <span>{item.mode}</span>
            </div>

            <div className="tags">
              {item.tags.map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>

            <p className="notes">
  {language === "id" ? item.notesId : item.notesEn}
</p>

            <div className="code-box">
              <code>{item.code}</code>
            </div>

            <button onClick={() => copyCode(item.code)}>
              {copiedCode === item.code ? t.copied : t.copyCode}
            </button>
          </article>
        ))}
      </section>

{totalPages > 1 && (
  <section className="pagination">
    <button
      className="page-button"
      onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
      disabled={currentPage === 1}
    >
      {t.prev}
    </button>

    <div className="page-numbers">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            className={`page-number ${currentPage === pageNumber ? "active" : ""}`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>

    <button
      className="page-button"
      onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      {t.next}
    </button>
  </section>
)}

       {filteredLoadouts.length === 0 && (
        <section className="empty">
          <h2>{t.emptyTitle}</h2>
<p>{t.emptyText}</p>
        </section>
      )}

      <footer className="footer" id="footer">
  <p>
    © 2026 {t.footer} <strong>GinkGo</strong>.
  </p>
</footer>
{zoomImage && (
  <div className="zoom-overlay" onClick={() => setZoomImage(null)}>
    <div className="zoom-modal" onClick={(event) => event.stopPropagation()}>
      <button className="zoom-close" onClick={() => setZoomImage(null)}>
        ×
      </button>

      <img
        className="zoom-image"
        src={zoomImage.image}
        alt={`${t.screenshotAlt} ${zoomImage.weapon}`}
      />

      <div className="zoom-info">
        <h2>{zoomImage.weapon}</h2>
        <p>{zoomImage.category} • {zoomImage.mode}</p>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
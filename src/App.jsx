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
},
{
  weapon: "K437",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "K437 Assault Rifle-Warfare-6K70V5C03J3VC9GA2O2BG",
  image: "/screenshots/k437.png",
  tags: ["Stable Build", "Low Recoil"],
  notesId: "Recoil stabil, cocok buat main jarak dekat ataupun menengah.",
  notesEn: "Stable recoil, suitable for close or medium range gameplay."
},
{
  weapon: "SG552",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "SG552 Assault Rifle-Warfare-6K71AU003J3VC9GA2O2BG",
  image: "/screenshots/sg552.png",
  tags: ["Stable Build", "Low Recoil"],
  notesId: "Recoil stabil, cocok buat main jarak menengah.",
  notesEn: "Stable recoil, suitable for medium range gameplay."
},
{
  weapon: "M7",
  category: "Battle Rifle",
  mode: "Warfare",
  code: "M7 Battle Rifle-Warfare-6K7BKFS03J3VC9GA2O2BG",
  image: "/screenshots/m7.png",
  tags: ["Low Recoil", "High Mobility"],
  notesId: "Recoil stabil, mobilitas tinggi. cocok buat main agak barbar.",
  notesEn: "Stable recoil, high mobility. Suitable for playing a bit aggressively."
},
{
  weapon: "AUG",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "AUG Assault Rifle-Warfare-6K7BL5K03J3VC9GA2O2BG",
  image: "/screenshots/aug2.png",
  tags: ["Low Recoil", "Long-Range Combat"],
  notesId: "Recoil stabil, buat main jarak dekat atau pun menegah.",
  notesEn: "Stable recoil, suitable for close or medium range gameplay."
},
{
  weapon: "KC-17",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "KC-17 Assault Rifle-Warfare-6K7BM3S03J3VC9GA2O2BG",
  image: "/screenshots/kc17.png",
  tags: ["Low Recoil", "High Mobility","Close Range"],
  notesId: "Recoil stabil, mobilitas tinggi. cocok buat main close combat agak barbar.",
  notesEn: "Stable recoil, high mobility, suitable for close combat and somewhat aggressive gameplay."
},
{
  weapon: "AS val",
  category: "Assault Rifle",
  mode: "Warfare",
  code: "AS Val Assault Rifle-Warfare-6K7BMNC03J3VC9GA2O2BG",
  image: "/screenshots/asval.png",
  tags: ["Low Recoil", "Close Range", "Fast TTK"],
  notesId: "Recoil stabil, mobilitas tinggi. cocok buat main close range agak barbar.",
  notesEn: "Stable recoil, suitable for close range and slightly aggressive play."
},
{
  weapon: "AKM",
  category: "Assault Rifle",
  mode: "Operations",
  code: "AKM Assault Rifle-Operations-6K7BOF403J3VC9GA2O2BG",
  image: "/screenshots/akm-op.png",
  tags: ["Stable Recoil", "High Control"],
  notesId: "Recoil stabil , AKM budget 250K cocok buat main di mode easy",
  notesEn: "Stable recoil, AKM budget 250K is suitable for playing in easy mode"
},
{
  weapon: "CI-19",
  category: "Assault Rifle",
  mode: "Operations",
  code: "CI-19 Assault Rifle-Operations-6K7BPV003J3VC9GA2O2BG",
  image: "/screenshots/ci19-op.png",
  tags: ["Stable Recoil", "High Control"],
  notesId: "Recoil stabil , CI19 budget 260K cocok buat main di mode easy",
  notesEn: "Stable recoil, CI19 budget 260K is suitable for playing in easy mode"
},
{
  weapon: "M4A1",
  category: "Assault Rifle",
  mode: "Operations",
  code: "M4A1 Assault Rifle-Operations-6K7BR2S03J3VC9GA2O2BG",
  image: "/screenshots/m4-op.png",
  tags: ["Stable Build", "Low Recoil"],
  notesId: "Recoil stabil , M4 budget 200K cocok buat main di mode easy",
  notesEn: "Stable recoil, M4 budget 200K is suitable for playing in easy mode"
},
{
  weapon: "AUG",
  category: "Assault Rifle",
  mode: "Operations",
  code: "AUG Assault Rifle-Operations-6K7BS3003J3VC9GA2O2BG",
  image: "/screenshots/aug-op.png",
  tags: ["Stable Build", "Low Recoil", "High Control"],
  notesId: "Recoil stabil , AUG budget 250K cocok buat main di mode easy",
  notesEn: "Stable recoil, AUG budget 250K is suitable for playing in easy mode"
},
{
  weapon: "K416",
  category: "Assault Rifle",
  mode: "Operations",
  code: "K416 Assault Rifle-Operations-6K7BSTK03J3VC9GA2O2BG",
  image: "/screenshots/k416-op.png",
  tags: ["Low Recoil", "Close Range"],
  notesId: "Recoil stabil , K416 budget 240K cocok buat main di mode easy",
  notesEn: "Stable recoil, K416 budget 240K is suitable for playing in easy mode"
},
{
  weapon: "G3",
  category: "Battle Rifle",
  mode: "Operations",
  code: "G3 Battle Rifle-Operations-6K7C02003J3VC9GA2O2BG",
  image: "/screenshots/g3-op.png",
  tags: ["Low Recoil", "Mid Range"],
  notesId: "Recoil stabil , G3 budget 200K cocok buat main di mode easy",
  notesEn: "Stable recoil, G3 budget 200K is suitable for playing in easy mode"
}
];

const categories = ["All", ...new Set(loadouts.map((item) => item.category))];
const modes = ["All", ...new Set(loadouts.map((item) => item.mode))];

const translations = {
  id: {
    liveDatabase: "Database Loadout Aktif",
    gameName: "Garena Delta Force",
    eyebrow: "Delta Force Loadout Database",
    title: "GINKGO GUNSMITH",
    subtitle:
      "Kumpulan loadout Delta Force yang disusun untuk memberikan kontrol stabil, performa konsisten, serta build siap pakai untuk mode Warfare dan Operations.",
    armoryBrowser: "Tactical Armory",
    refinedBuilds: "Loadout siap tempur, rapi, cepat, dan tinggal copy.",
    armoryIntro: "Filter build berdasarkan mode, kategori, atau gaya main. Semua kode dibuat gampang di-scan sebelum masuk match.",
    catalogReady: "Copy-ready",
    filteredView: "Live filter",
    searchLabel: "Cari Loadout",
    categoryLabel: "Kategori",
    modeLabel: "Mode",
    readyToCopy: "Siap Copy",
    inspectBuild: "Pratinjau Build",
    exploreLoadouts: "Eksplor Loadouts",
    searchPlaceholder: "Cari senjata, mode, kategori, atau tag...",
    allCategories: "Semua Kategori",
    allModes: "Semua Mode",
    showing: "Menampilkan",
    from: "dari",
    loadout: "loadout",
    statLoadouts: "Loadout",
    statCategories: "Kategori",
    statModes: "Mode",
    copyCode: "Salin Kode",
    copied: "Tersalin!",
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
    title: "GINKGO GUNSMITH",
    subtitle:
      "A collection of Delta Force loadouts designed to provide stable control, consistent performance, and ready-to-use builds for Warfare and Operations modes.",
    armoryBrowser: "Tactical Armory",
    refinedBuilds: "Battle-ready loadouts, cleaned up, fast, and copy-ready.",
    armoryIntro: "Filter builds by mode, category, or playstyle. Every code is easy to scan before jumping into a match.",
    catalogReady: "Copy-ready",
    filteredView: "Live filter",
    searchLabel: "Search Loadout",
    categoryLabel: "Category",
    modeLabel: "Mode",
    readyToCopy: "Ready to Copy",
    inspectBuild: "Preview Build",
    exploreLoadouts: "Explore Loadouts",
    searchPlaceholder: "Search weapon, mode, category, or tag...",
    allCategories: "All Categories",
    allModes: "All Modes",
    showing: "Showing",
    from: "of",
    loadout: "loadouts",
    statLoadouts: "Loadouts",
    statCategories: "Categories",
    statModes: "Modes",
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


          <div className="hero-search-panel">
            <label className="field field-search">
              <span>{t.searchLabel}</span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="filters">
              <label className="field">
                <span>{t.categoryLabel}</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? t.allCategories : item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>{t.modeLabel}</span>
                <select value={mode} onChange={(event) => setMode(event.target.value)}>
                  {modes.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? t.allModes : item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="result-info" id="loadout-list">
        <p className="result-pill">
          {t.showing} <strong>{paginatedLoadouts.length}</strong> {t.from}{" "}
          <strong>{filteredLoadouts.length}</strong> {t.loadout}
        </p>
      </section>

      <section className="grid">
        {paginatedLoadouts.map((item) => (
          <article className="card" key={item.weapon + item.code}>
            <div className="card-accent" />
            <button
  className="image-wrap"
  	onClick={() => setZoomImage(item)}
  aria-label={`Zoom screenshot ${item.weapon}`}
>
  <span className="image-label">{t.inspectBuild}</span>
  <img
  className="loadout-image"
  src={item.image}
  alt={`${t.screenshotAlt} ${item.weapon}`}
/>
</button>

            <div className="card-top">
              <div>
                <h2>{item.weapon}</h2>
                <p className="card-category">{item.category}</p>
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
              <span>{t.readyToCopy}</span>
              <code>{item.code}</code>
            </div>

            <button className="copy-button" onClick={() => copyCode(item.code)}>
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
    © 2026 {t.footer}{" "}
    <a
      className="footer-link"
      href="https://www.tiktok.com/@hexaxoxo"
      target="_blank"
      rel="noopener noreferrer"
    >
      GinkGo
    </a>
    .
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
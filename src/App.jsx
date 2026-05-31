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
    notes: "Stabil buat mid range, cocok buat pemula."
  },
  {
    weapon: "AKM",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "AKM Assault Rifle-Warfare-6JS0I4G03J3VC9GA2O2BG",
    image: "/screenshots/akm.png",
    tags: ["High Damage", "Medium Recoil"],
    notes: "Damage sakit, tapi recoil perlu dikontrol."
  },
  {
    weapon: "Vector",
    category: "SMG",
    mode: "Warfare",
    code: "Vector Submachine Gun-Warfare-6K6NRSO03J3VC9GA2O2BG",
    image: "/screenshots/vector.png",
    tags: ["Low Recoil", "Fast TTK"],
    notes: "Cocok buat rush jarak dekat dan main agresif."
  },
  {
    weapon: "AK-12",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "AK-12 Assault Rifle-Warfare-6JUD0HK03J3VC9GA2O2BG",
    image: "/screenshots/ak12.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Bagus buat pick musuh dari jarak menengah."
  },
  {
    weapon: "AUG",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "AUG Assault Rifle-Warfare-6K6NTR803J3VC9GA2O2BG",
    image: "/screenshots/aug.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Bagus buat pick musuh dari jarak menengah."
  },
  {
    weapon: "SMG-45",
    category: "SMG",
    mode: "Warfare",
    code: "SMG-45 Submachine Gun-Warfare-6JUBRJK03J3VC9GA2O2BG",
    image: "/screenshots/smg45.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Recoil Stabil, cocok buat main santai jarak menengah."
  },
  {
    weapon: "PTR-32",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "PTR-32 Assault Rifle-Warfare-6K6S9HK03J3VC9GA2O2BG",
    image: "/screenshots/ptr32.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Bagus buat main jarak menengah."
  },
  {
    weapon: "QBZ95-1",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "QBZ95-1 Assault Rifle-Warfare-6K6SA8003J3VC9GA2O2BG",
    image: "/screenshots/qbz.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Bagus buat pick musuh jarak menengah."
  },
  {
    weapon: "MK4",
    category: "SMG",
    mode: "Warfare",
    code: "MK4 Submachine Gun-Warfare-6K6SBB403J3VC9GA2O2BG",
    image: "/screenshots/mk4.png",
    tags: ["Mid Range", "Burst Mode", "Low Recoil"],
    notes: "Low Recoil, Burst mode jarak menengah."
  },
  {
    weapon: "SCAR-H",
    category: "Battle Rifle",
    mode: "Warfare",
    code: "SCAR-H Battle Rifle-Warfare-6K6SAPS03J3VC9GA2O2BG",
    image: "/screenshots/scarh.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Handling agak kurang, tapi cocok buat main jarak menengah."
  },
  {
    weapon: "K416",
    category: "Assault Rifle",
    mode: "Warfare",
    code: "K416 Assault Rifle-Warfare-6JVJ01G03J3VC9GA2O2BGG",
    image: "/screenshots/k416.png",
    tags: ["Mid Range", "Low Recoil"],
    notes: "Recoil stabil, cocok buat main jarak menengah."
  },
  {
    weapon: "MP7",
    category: "SMG",
    mode: "Warfare",
    code: "MP7 Submachine Gun-Warfare-6K6SDHG03J3VC9GA2O2BG",
    image: "/screenshots/mp7.png",
    tags: ["Close Combat", "Low Recoil"],
    notes: "Low Recoil, cocok buat ngerush main jarak dekat."
  },
  {
    weapon: "Bizon",
    category: "SMG",
    mode: "Warfare",
    code: "Bizon Submachine Gun-Warfare-6K6SE9403J3VC9GA2O2BG",
    image: "/screenshots/bizon.png",
    tags: ["Close Combat", "Low Recoil"],
    notes: "Recoil stabil, cocok buat ngerush main jarak dekat."
  }
];

const categories = ["All", "Assault Rifle", "SMG", "Sniper", "LMG", "Shotgun", "Battle Rifle"];
const modes = ["All", "Warfare", "Operations"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [copiedCode, setCopiedCode] = useState("");
  const [zoomImage, setZoomImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
        item.tags.join(" ").toLowerCase().includes(search.toLowerCase());

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
        <p className="eyebrow">Delta Force Loadout Database</p>
        <h1>Kode Loadout Delta Force Garena</h1>
        <p className="subtitle">
          Kumpulan kode loadout, screenshot, dan catatan senjata buat Warfare dan Operations.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari senjata, mode, kategori, atau tag..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filters">
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "Semua Kategori" : item}
              </option>
            ))}
          </select>

          <select value={mode} onChange={(event) => setMode(event.target.value)}>
            {modes.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "Semua Mode" : item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="result-info">
        <p>
          Menampilkan <strong>{paginatedLoadouts.length}</strong> dari{" "}
<strong>{filteredLoadouts.length}</strong> loadout
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
  <img className="loadout-image" src={item.image} alt={`Screenshot loadout ${item.weapon}`} />
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

            <p className="notes">{item.notes}</p>

            <div className="code-box">
              <code>{item.code}</code>
            </div>

            <button onClick={() => copyCode(item.code)}>
              {copiedCode === item.code ? "Copied!" : "Copy Code"}
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
      Prev
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
      Next
    </button>
  </section>
)}

       {filteredLoadouts.length === 0 && (
        <section className="empty">
          <h2>Loadout nggak ketemu</h2>
          <p>Coba ganti keyword, kategori, atau mode.</p>
        </section>
      )}

      <footer className="footer">
  <p>
    © 2026 Garena Delta Force Loadout Database | Made by <strong>GinkGo</strong>.
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
        alt={`Screenshot loadout ${zoomImage.weapon}`}
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
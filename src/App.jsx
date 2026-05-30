import { useMemo, useState } from "react";
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
  }
];

const categories = ["All", "Assault Rifle", "SMG", "Sniper", "LMG", "Shotgun", "Battle Rifle"];
const modes = ["All", "Warfare", "Operations"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [copiedCode, setCopiedCode] = useState("");

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
          Menampilkan <strong>{filteredLoadouts.length}</strong> loadout
        </p>
      </section>

      <section className="grid">
        {filteredLoadouts.map((item) => (
          <article className="card" key={item.weapon + item.code}>
            <div className="image-wrap">
              <img className="loadout-image" src={item.image} alt={`Screenshot loadout ${item.weapon}`} />
            </div>

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

      {filteredLoadouts.length === 0 && (
        <section className="empty">
          <h2>Loadout nggak ketemu</h2>
          <p>Coba ganti keyword, kategori, atau mode.</p>
        </section>
      )}
    </main>
  );
}
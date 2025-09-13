import { useState } from "react";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "https://eleven-public-cdn.elevenlabs.io/images/flags/circle-flags/us.svg",
  },
  {
    code: "hi",
    name: "Hindi",
    flag: "https://eleven-public-cdn.elevenlabs.io/images/flags/circle-flags/in.svg",
  },
  {
    code: "fr",
    name: "French",
    flag: "https://eleven-public-cdn.elevenlabs.io/images/flags/circle-flags/fr.svg",
  },
  {
    code: "sp",
    name: "Spanish",
    flag: "https://eleven-public-cdn.elevenlabs.io/images/flags/circle-flags/es.svg",
  },
];

export default function LanguageDropdown({ onSelect }) {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    onSelect(lang.code); // send selected lang to parent
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-between p rounded-full border border-gray-300 px-3 py-2 bg-white text-sm font-medium hover:border-black cursor-pointer gap-2"
      >
        <div className="flex items-center gap-2">
          <img
            src={selected.flag}
            alt={selected.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          {selected.name}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 z-10">
          <ul className="py-1 mx-2">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleSelect(lang)}
                  className="flex items-center gap-2 w-full px-2 py-2  text-sm hover:bg-gray-200 rounded-xl cursor-pointer"
                >
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

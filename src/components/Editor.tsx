import React, { useState, useRef, useEffect } from "react";
import LanguageDropdown from "./LanguageDropdown";
import { Download, Pause, Play } from "lucide-react";

const texts = {
  en: `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`,
  hi: `एल्डोरिया की प्राचीन भूमि में, जहाँ आकाश चमकते थे और जंगल हवा को रहस्य फुसफुसाते थे, एक ड्रैगन नाम Zephyros रहता था। [sarcastically] वह 'सब कुछ जला दो' वाला प्रकार नहीं... [giggles] लेकिन वह कोमल, बुद्धिमान था, पुरानी तारों जैसी आँखों वाला। [whispers] जब वह गुजरता था तो पक्षी भी चुप हो जाते थे।`,
  fr: `Dans l'ancien pays d'Eldoria, où les cieux scintillaient et les forêts murmuraient des secrets au vent, vivait un dragon nommé Zephyros. [sarcastically] Pas du genre « brûle tout »... [giggles] mais il était doux, sage, avec des yeux comme de vieilles étoiles. [whispers] Même les oiseaux se taisaient quand il passait.`,
  sp: `En la antigua tierra de Eldoria, donde los cielos brillaban y los bosques susurraban secretos al viento, vivía un dragón llamado Zephyros. [sarcastically] No del tipo «quémalo todo»... [giggles] pero era gentil, sabio, con ojos como estrellas antiguas. [whispers] Incluso los pájaros se callaban cuando pasaba.`,
};

const Editor = () => {
  const [text, setText] = useState(texts.en);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch audio URL when language changes
  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const res = await fetch(`/api/audio/${selectedLang}`);
        if (!res.ok) {
          throw new Error("Failed to fetch audio");
        }
        const data = await res.json();
        if (data.url) {
          setAudioUrl(data.url);
        } else {
          setAudioUrl(null);
          alert("Audio not found for this language!");
        }
      } catch (err) {
        console.error(err);
        setAudioUrl(null);
        alert("Error fetching audio URL.");
      }
    };

    fetchAudioUrl();
  }, [selectedLang]);

  // Update text and stop audio when language changes
  useEffect(() => {
    setText(texts[selectedLang] || texts.en); // Fallback to English if not found
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selectedLang]);

  const toggleAudio = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch((err) => {
        console.error("Playback error:", err);
        alert("Error playing audio.");
      });
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) {
      alert("No audio available to download!");
      return;
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `audio_${selectedLang}.mp3`; // Adjust extension based on audio format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  return (
    <div className="w-full mt-12 mb-20">
      <div className="bg-gray-200 w-[1100px] h-[500px] mx-auto rounded-3xl px-1.5 pt-1.5 relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 h-[204px] w-[432px] max-w-[60%] opacity-90 z-0"
          style={{
            background: `linear-gradient(
              0deg, rgba(243, 244, 246, 0) 0%, 
              rgba(243, 244, 246, 0.04) 62.8%, 
              rgb(243, 244, 246) 100%
            ),
            linear-gradient(
              270deg, rgba(243, 244, 246, 0) 32.65%, 
              rgb(243, 244, 246) 93.63%
            ),
            linear-gradient(
              230deg, rgb(253, 115, 54) 24.11%, 
              rgb(215, 167, 255) 42.89%, 
              rgb(175, 250, 255) 62.49%
            )`,
          }}
        ></div>
        <div className="bg-white w-full h-11/12 rounded-2xl shadow-lg relative z-10">
          <textarea
            className="w-full h-10/12 p-4 rounded-lg resize-none outline-none px-5 text-lg font-semibold"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Button Section */}
          <div className=" border-t border-gray-200 flex justify-between items-center px-10 py-4">
            <div>
              <LanguageDropdown onSelect={setSelectedLang} />
            </div>
            <div className="flex gap-5 items-center justify-center ">
              <button
                onClick={toggleAudio}
                disabled={!audioUrl}
                className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6 fill-current text-white" />
                    PAUSE
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-current text-white" />
                    PLAY
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={!audioUrl}
                className="bg-white rounded-full border border-gray-300 hover:border-black h-10 w-10 flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download />
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-center text-sm font-bold py-2">
            Powered by Eleven v3 (alpha)
          </p>
        </div>
      </div>
      <audio ref={audioRef} hidden controls />
    </div>
  );
};

export default Editor;

import React, { useState, useRef, useEffect } from "react";
import LanguageDropdown from "./LanguageDropdown";
import { Download, Pause, Play } from "lucide-react";

const Editor = () => {
  const [text, setText] = useState(
    `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`
  );
  const [selectedLang, setSelectedLang] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        const res = await fetch(`/api/audio/${selectedLang}`);
        const data = await res.json();
        if (data.url) {
          audioRef.current.src = data.url;
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          alert("Audio not found for this language!");
        }
      } catch (err) {
        console.error(err);
        alert("Error playing audio.");
      }
    }
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
                className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-black/50"
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

              <button className="bg-white rounded-full border border-gray-300 hover:border-black h-10 w-10 flex justify-center items-center cursor-pointer">
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

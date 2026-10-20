
import { useEffect, useState } from "react";
import hase from "../../assets/hase.png";
import igel from "../../assets/igel.png";
import lama from "../../assets/lama.png";
import puma from "../../assets/puma.png";
import dose from "../../assets/dose.png";
import pinsel from "../../assets/pinsel.png";
import lineal from "../../assets/lineal.png";
import domino from "../../assets/domino.png"

const sentences = [
  {
    id: 1,
    title: "der Hase",
    sentence1: "Das ist der Hase.",
    sentence2: "Das ist mein Hase.",
    image: hase,
  },
  {
    id: 2,
    title: "der Igel",
    sentence1: "Das ist der Igel.",
    sentence2: "Das ist mein Igel.",
    image: igel,
  },
  {
    id: 3,
    title: "der Lama",
    sentence1: "Das ist der Lama.",
    sentence2: "Das ist mein Lama.",
    image: lama,
  },
   {
    id: 4,
    title: "der Puma",
    sentence1: "Das ist der Puma.",
    sentence2: "Das ist mein Puma.",
    image: puma,
  },
    {
    id: 5,
    title: "das Domino",
    sentence1: "Das ist das Domino.",
    sentence2: "Das ist mein Domino.",
    image: domino,
  },
  {
    id: 6,
    title: "der Pinsel",
    sentence1: "Das ist der Pinsel.",
    sentence2: "Das ist mein Pinsel.",
    image: pinsel,
  },
  {
    id: 7,
    title: "das Lineal",
    sentence1: "Das ist das Lineal.",
    sentence2: "Das ist mein Lineal.",
    image: lineal,
  },
    {
    id: 8,
    title: "die Dose",
    sentence1: "Das ist die Dose.",
    sentence2: "Das ist meine Dose.",
    image: dose,
  },
];

export default function Hase() {
  const [speakingId, setSpeakingId] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    return () => {
      synth?.cancel();
    };
  }, []);

  const handleSpeech = (item) => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    const synth = window.speechSynthesis;

    // Stop audio if the same card is clicked again
    if (speakingId === item.id) {
      synth.cancel();
      setSpeakingId(null);
      return;
    }

    // Stop any previous card audio
    synth.cancel();

    const voices = synth.getVoices();

    const germanVoice =
      voices.find((voice) => voice.lang === "de-DE") ||
      voices.find((voice) => voice.lang.startsWith("de"));

    const phrases = [item.sentence1, item.sentence2];

    const utterances = phrases.map((phrase) => {
      const utterance = new SpeechSynthesisUtterance(phrase);

      utterance.lang = "de-DE";
      utterance.rate = 0.85;
      utterance.pitch = 1;

      if (germanVoice) {
        utterance.voice = germanVoice;
      }

      utterance.onerror = () => setSpeakingId(null);

      return utterance;
    });

    utterances[utterances.length - 1].onend = () => {
      setSpeakingId(null);
    };

    setSpeakingId(item.id);

    utterances.forEach((utterance) => {
      synth.speak(utterance);
    });
  };

  return (
    <main
      dir="ltr"
      className="min-h-screen  px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <p className="text-sm font-bold  tracking-[0.25em] text-orange-500 sm:text-base">
          Wo ist mein Hase?
          </p>


       
        </header>

        {/* Dynamic Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sentences.map((item) => {
            const isSpeaking = speakingId === item.id;

            return (
              <article
                key={item.id}
                className="group flex min-w-0 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-md shadow-stone-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image on the left */}
                <div className="relative w-[38%] shrink-0 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-2 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-emerald-800 shadow-sm sm:left-3">
                    🇩🇪
                  </div>
                </div>

                {/* Text on the right */}
                <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4 lg:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 sm:text-sm">
                    Deutsch für Kinder
                  </p>

                  <h2 className="mt-2 break-words text-lg font-bold text-stone-900 sm:text-xl">
                    {item.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="break-words text-sm font-semibold leading-6 text-stone-800">
                        {item.sentence1}
                      </p>
                    </div>

                    <div className="border-t border-stone-100 pt-3">
                      <p className="break-words text-sm font-semibold leading-6 text-stone-800">
                        {item.sentence2}
                      </p>
                    </div>
                  </div>

                  {/* Speech Button */}
                  <button
                    type="button"
                    onClick={() => handleSpeech(item)}
                    aria-label={
                      isSpeaking
                        ? `Stop ${item.title} pronunciation`
                        : `Listen to ${item.title} sentences`
                    }
                    className={`mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 ${
                      isSpeaking
                        ? "bg-rose-600 text-white hover:bg-rose-700"
                        : "bg-orange-400 text-white hover:bg-orange-500"
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 shrink-0 fill-current"
                          aria-hidden="true"
                        >
                          <rect
                            x="6"
                            y="6"
                            width="12"
                            height="12"
                            rx="2"
                          />
                        </svg>
                        Stop
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 shrink-0 fill-none stroke-current"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                          <path d="M19 5a10 10 0 0 1 0 14" />
                        </svg>
                           Hör zu!

                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

       
      </div>
    </main>
  );
}

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Slide = { id: number; title: string; text: string; image: string };

const slides: Slide[] = [
  {
    id: 1,
    title: "🌍 Explore the World",
    text: "Browse through all countries with their flags, names, and regions.",
    image: "https://picsum.photos/seed/world/800/400",
  },
  {
    id: 2,
    title: "🔎 Filter by Region",
    text: "Easily filter countries by continents such as Asia, Europe, Africa and more.",
    image: "https://picsum.photos/seed/filter/800/400",
  },
  {
    id: 3,
    title: "📥 Load More Results",
    text: "Progressively load more countries instead of seeing everything at once.",
    image: "https://picsum.photos/seed/load/800/400",
  },
  {
    id: 4,
    title: "⭐ Save Favorites",
    text: "Keep a personalized list of your favorite countries for quick access.",
    image: "https://picsum.photos/seed/favorites/800/400",
  },
];

export default function Slider() {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % slides.length);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="custom-slider border-3 border-black p-3 position-relative h-100 mt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="text-center flex-grow-1 px-2">
          <div className="ratio ratio-16x9 bg-light  d-flex align-items-center justify-content-center mb-3 overflow-hidden relative">
            {slides.map((slide, i) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className={`
                  absolute inset-0 w-100 h-100 object-cover
                  transition-all duration-700 ease-in-out
                  ${i === index ? "opacity-100 translate-x-0" : "opacity-0"} 
                  ${
                    i > index && direction === "right"
                      ? "translate-x-full"
                      : i < index && direction === "left"
                      ? "-translate-x-full"
                      : ""
                  }
                `}
              />
            ))}
          </div>
          <h5 className="mb-1">{slides[index].title}</h5>
          <p className="mb-0">{slides[index].text}</p>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3 items-center">
        <FaArrowLeft onClick={prev} className="cursor-pointer" />
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={"dot " + (i === index ? "active" : "")}
            onClick={() => {
              setDirection(i > index ? "right" : "left");
              setIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <FaArrowRight onClick={next} className="cursor-pointer" />
      </div>
    </div>
  );
}

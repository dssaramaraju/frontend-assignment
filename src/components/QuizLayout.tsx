import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Question = {
  text: string;
  options: string[];
  correctIndex: number;
};

type Props = {
  questions: Question[];
};

export default function QuizLayout({ questions }: Props) {
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    () => questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  const current = questions[index];

  const score = useMemo(() => {
    let s = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctIndex) s++;
    }
    return s;
  }, [selectedAnswers, questions]);

  const percent = Math.round((score / questions.length) * 100);

  const handleSelect = (optIdx: number) => {
    setSelectedAnswers((prev) => {
      const copy = [...prev];
      copy[index] = optIdx;
      return copy;
    });
  };

  const goNext = () => {
    if (selectedAnswers[index] === null) return;

    if (index === questions.length - 1) {
      setSubmitted(true);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (selectedAnswers[index] === null) return;
    setSubmitted(true);
  };

  const handleRestart = () => {
    setSelectedAnswers(questions.map(() => null));
    setIndex(0);
    setSubmitted(false);
  };

  const segments = questions.map((_, i) => i);
  const isLast = index === questions.length - 1;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
        <div className="w-full h-full flex flex-col items-center justify-center" style={{ padding: 40 }}>
          <div className="subtitle-bubble">Keep Learning !</div>

          <h2 className="title" style={{ marginTop: 18, textAlign: "center" }}>
            Your Final score is
          </h2>

          <div style={{ fontFamily: "Playfair Display, serif", fontSize: 96, color: "rgb(19,91,108)", marginTop: 18 }}>
            {percent} <span style={{ fontSize: 36, verticalAlign: "super" }}>%</span>
          </div>

          <button
            onClick={handleRestart}
            className="option"
            style={{ padding: "10px 28px", borderRadius: 8, marginTop: 32 }}
          >
            Start Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell" style={{ padding: 0 }}>
      <div className="inner-panel">
        <header className="flex flex-col items-center">
          <h1 className="title">
            Test Your <span className="gradient-title">Knowledge</span>
          </h1>

          <div className="subtitle-bubble">Answer all questions to see your results</div>

          <div className="progress-row" aria-hidden>
            {segments.map((_, i) => {
              const filled = i <= index;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div
                    className={filled ? "progress-track" : "progress-separator"}
                    style={{ width: 220 }}
                  >
                    {filled && (
                      <div
                        className="progress-active"
                        style={{ width: i === index ? "55%" : "100%" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        <main className="quiz-area" role="main" style={{ marginTop: 8 }}>
          <div className="quiz-card">
            <div className="question" role="heading" aria-level={2}>
              {current.text}
            </div>

            <div className="options" role="list">
              {current.options.map((opt, optIdx) => {
                const active = selectedAnswers[index] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    role="listitem"
                    aria-pressed={active}
                    className={`option w-full ${active ? "option--active" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={{ height: 20 }} />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              {index !== 0 && (
                <button className="nav-btn" onClick={goPrev} aria-label="Previous question">
                  <FaChevronLeft />
                </button>
              )}

              {isLast ? (
                <button
                  onClick={handleSubmit}
                  className="nav-btn"
                  aria-label="Submit quiz"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={goNext}
                  className="nav-btn"
                  aria-label="Next question"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          </div>
        </main>

        <div className="paw-wrapper" aria-hidden style={{ position: "absolute", left: 28, bottom: 34 }}>
          <div className="speech">Best of Luck !</div>

          {/* Paw SVG */}
          <svg className="paw" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="76" rx="22" ry="20" fill="#ffe7ef" stroke="#ffd1df" strokeWidth="1.5" />
            <ellipse cx="42" cy="46" rx="10" ry="12" fill="#ffd6e6" stroke="#ffbfd6" strokeWidth="1.2" />
            <ellipse cx="60" cy="38" rx="10.5" ry="12.5" fill="#ffcfe0" stroke="#ffbfd6" strokeWidth="1.2" />
            <ellipse cx="78" cy="46" rx="10" ry="12" fill="#ffd6e6" stroke="#ffbfd6" strokeWidth="1.2" />
            <ellipse cx="60" cy="74" rx="9" ry="7.5" fill="white" opacity="0.55" />
          </svg>
        </div>
      </div>
    </div>
  );
}

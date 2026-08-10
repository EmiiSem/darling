"use client";

import { useMemo, useState } from "react";

type SurveyMode = "boyfriend" | "girlfriend";

type SurveyQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type SurveyData = {
  title: string;
  subtitle: string;
  questions: SurveyQuestion[];
  fullSecret: string;
  partialSecret: string;
};

const surveyData: Record<SurveyMode, SurveyData> = {
  boyfriend: {
    title: "Опрос для парня",
    subtitle: "Ответь так, как лучше всего чувствуешь нас.",
    questions: [
      {
        question: "Что для нас важнее всего в спокойный вечер?",
        options: ["Вкусный чай и разговор", "Тишина и объятия", "Смех и фильмы"],
        answer: 1,
        explanation: "Ты точно попал в нашу самую уютную сторону.",
      },
      {
        question: "Что лучше всего поддерживает нашу связь?",
        options: ["Сюрпризы", "Забота", "Совместные планы"],
        answer: 1,
        explanation: "Именно забота делает нас особенно близкими.",
      },
      {
        question: "Что из этого чаще всего делает нас счастливее?",
        options: ["Встречи без спешки", "Общие фото", "Любимые мелочи"],
        answer: 2,
        explanation: "Иногда именно маленькие вещи оказываются главными.",
      },
      {
        question: "Что ты бы выбрал для нашего будущего?",
        options: ["Больше приключений", "Больше спокойствия", "И то и другое"],
        answer: 2,
        explanation: "Правильный ответ — когда в будущем есть всё хорошее сразу.",
      },
    ],
    fullSecret: "Ты у меня самый родной человек. Спасибо, что ты рядом.",
    partialSecret: "Даже если не всё идеально, ты всё равно для меня очень важен.",
  },
  girlfriend: {
    title: "Опрос для девушки",
    subtitle: "Пусть ответы будут такими же нежными, как ты.",
    questions: [
      {
        question: "Что делает нас особенно милыми вместе?",
        options: ["Наши шутки", "Нежность", "Общие мечты"],
        answer: 1,
        explanation: "Ты очень точно чувствуешь нашу нежную сторону.",
      },
      {
        question: "Что лучше всего сохраняет тепло между нами?",
        options: ["Слова", "Объятия", "Внимание"],
        answer: 2,
        explanation: "Внимание — это очень красивый способ любить.",
      },
      {
        question: "Что из этого всегда хочется помнить?",
        options: ["Особые даты", "Счастливые моменты", "Секретные фразы"],
        answer: 1,
        explanation: "Счастливые моменты мы точно будем хранить бережно.",
      },
      {
        question: "Что ты бы хотела видеть в нашем будущем?",
        options: ["Побольше света", "Побольше спокойствия", "И свет, и спокойствие"],
        answer: 2,
        explanation: "Это очень красивый ответ для нас двоих.",
      },
    ],
    fullSecret: "Ты — моё самое красивое чудо. Я очень тебя люблю.",
    partialSecret: "Даже если что-то не совпало, ты всё равно для меня самая-самая.",
  },
};

export function HeartGame() {
  const [mode, setMode] = useState<SurveyMode | null>(null);
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");

  const data = mode ? surveyData[mode] : null;
  const currentQuestion = data?.questions[step] ?? null;
  const totalQuestions = data?.questions.length ?? 0;
  const wins = correctAnswers.length;
  const attempts = correctAnswers.length + wrongAnswers.length;
  const accuracy = attempts > 0 ? Math.round((wins / attempts) * 100) : 0;

  const achievements = useMemo(() => {
    return [
      wins >= 1 ? "Первая победа" : "Ждёт первой победы",
      wins >= 2 ? "Тёплая память" : "Ещё чуть-чуть",
      wins >= 3 ? "Сильная пара" : "Почти рядом",
      completed ? "Опрос пройден" : "Финал впереди",
    ];
  }, [completed, wins]);

  function startSurvey(nextMode: SurveyMode) {
    setMode(nextMode);
    setStep(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setCompleted(false);
    setSecretOpen(false);
    setSecretMessage("");
  }

  function chooseOption(optionIndex: number) {
    if (!currentQuestion || completed) {
      return;
    }

    const isCorrect = optionIndex === currentQuestion.answer;

    if (isCorrect) {
      setCorrectAnswers((current) => Array.from(new Set([...current, step])));
      setWrongAnswers([]);
    } else {
      setWrongAnswers((current) => Array.from(new Set([...current, step])));
    }

    const isLastQuestion = step === totalQuestions - 1;

    window.setTimeout(() => {
      if (isLastQuestion) {
        setCompleted(true);
        setSecretOpen(false);
        const allCorrect = wins + (isCorrect ? 1 : 0) === totalQuestions;
        setSecretMessage(allCorrect ? data?.fullSecret ?? "" : data?.partialSecret ?? "");
        return;
      }

      setStep((current) => current + 1);
    }, 420);
  }

  function revealSecret() {
    if (!data) {
      return;
    }

    const allCorrect = completed && wins === totalQuestions;
    setSecretOpen(true);
    setSecretMessage(allCorrect ? data.fullSecret : data.partialSecret);
  }

  function resetGame() {
    setMode(null);
    setStep(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setCompleted(false);
    setSecretOpen(false);
    setSecretMessage("");
  }

  const progress = totalQuestions > 0 ? Math.round(((step + (completed ? 1 : 0)) / totalQuestions) * 100) : 0;

  return (
    <div className="game-card game-card--full">
      {!mode ? (
        <div className="quiz-intro">
          <h3>Выбери опрос</h3>
          <p className="muted">
            Сначала выбери, для кого проходишь тест. В конце появится секретное сообщение, а результаты повлияют на количество маленьких побед.
          </p>
          <div className="quiz-switcher" role="group" aria-label="Выбор опроса">
            <button className="button" type="button" onClick={() => startSurvey("boyfriend")}>Опрос для парня</button>
            <button className="button-secondary" type="button" onClick={() => startSurvey("girlfriend")}>Опрос для девушки</button>
          </div>
        </div>
      ) : (
        <>
          <div className="quiz-header">
            <div>
              <h3>{data?.title}</h3>
              <p className="muted">{data?.subtitle}</p>
            </div>
            <button className="button-secondary" type="button" onClick={resetGame}>
              Сменить опрос
            </button>
          </div>

          <div className="quiz-progress" aria-label="Прогресс опроса">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-meta">
            <span>Общие победы: {wins}</span>
            <span>Маленькие достижения: {attempts}</span>
            <span>Точность: {attempts > 0 ? `${accuracy}%` : "0%"}</span>
          </div>

          {!completed && currentQuestion ? (
            <div className="quiz-card">
              <p className="quiz-question">{currentQuestion.question}</p>
              <div className="quiz-options">
                {currentQuestion.options.map((option, index) => {
                  const isCorrectOption = index === currentQuestion.answer;
                  return (
                    <button
                      className={`quiz-option ${wrongAnswers.includes(step) && !isCorrectOption ? "is-wrong" : ""} ${correctAnswers.includes(step) && isCorrectOption ? "is-correct" : ""}`}
                      key={option}
                      type="button"
                      onClick={() => chooseOption(index)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="quiz-feedback">
                {correctAnswers.includes(step)
                  ? currentQuestion.explanation
                  : wrongAnswers.includes(step)
                    ? "Почти. Можно пробовать ещё — это не строгий экзамен, а тёплый опрос."
                    : "Выбирай ответ, который больше всего похож на вас."}
              </p>
            </div>
          ) : (
            <div className="quiz-card quiz-finish">
              <strong>Опрос завершён</strong>
              <p className="muted">
                Ответы уже собраны. Теперь можно открыть секретное сообщение и сохранить этот маленький результат для вас двоих.
              </p>
              <button className="button-secondary" type="button" onClick={revealSecret}>
                Показать секрет
              </button>
            </div>
          )}

          {secretOpen && (
            <div className="secret-box">
              <h4>Секретное сообщение</h4>
              <p>{secretMessage}</p>
              <div className="secret-actions">
                <button className="button-secondary" type="button" onClick={revealSecret}>
                  Обновить сообщение
                </button>
                <button className="button-secondary" type="button" onClick={resetGame}>
                  Пройти заново
                </button>
              </div>
            </div>
          )}

          {completed && (
            <div className="achievement-list" aria-label="Общие достижения">
              {achievements.map((item) => (
                <div className={`achievement ${item.includes("Ждёт") ? "is-muted" : ""}`} key={item}>
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className="game-status">
            {completed ? "Опрос завершён. Можно перечитать секретное сообщение." : `Вопрос ${step + 1} из ${totalQuestions}`}
          </div>
        </>
      )}
    </div>
  );
}

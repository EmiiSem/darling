"use client";

import { useMemo, useState } from "react";
import { HeartFireworks } from "./animations";

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
        question: "Какой момент запомнился больше всего?",
        options: [
          "Первая прогулка и встреча",
          "Первая ночь вместе",
          "Первая поездка на Чёрное море",
          "Первый Новый год",
          "Первый справленный день рождения",
        ],
        answer: 0,
        explanation: "С этого всё и началось — и это до сих пор самое родное воспоминание.",
      },
      {
        question: "С какой фразы началась наша первая встреча?",
        options: ["Привет, как дела?", "Ты что живой?", "Давно не виделись", "Можно с тобой пройтись?"],
        answer: 1,
        explanation: "Да, именно с этой забавной фразы началась наша история.",
      },
      {
        question: "Где была наша первая прогулка?",
        options: ["По Москве", "У моря", "По селу", "В парке большого города"],
        answer: 2,
        explanation: "Первая неловкая прогулка по селу — и уже держались за руки.",
      },
      {
        question: "Что лучше всего поддерживает нашу связь?",
        options: ["Сюрпризы", "Забота", "Совместные планы"],
        answer: 1,
        explanation: "Именно забота делает нас особенно близкими.",
      },
      {
        question: "Где мы встретили наш первый Новый год вместе?",
        options: ["Вдвоём дома", "В кругу семьи", "В поездке", "У друзей"],
        answer: 1,
        explanation: "Первые салюты, первые подарки и очень тёплый праздник.",
      },
      {
        question: "Что из этого чаще всего делает нас счастливее?",
        options: ["Встречи без спешки", "Общие фото", "Любимые мелочи"],
        answer: 2,
        explanation: "Иногда именно маленькие вещи оказываются главными.",
      },
      {
        question: "Куда нас увёл первый отпуск к морю?",
        options: ["Сразу в Геленджик", "На полуостров, в Крым", "За границу", "На Волгу"],
        answer: 1,
        explanation: "Сначала был полуостров и Крым - и сразу захотелось путешествовать ещё.",
      },
      {
        question: "Что из Геленджика вспоминается ярче всего?",
        options: [
          "Купание далеко от берега",
          "Катание на банане",
          "Теплоход с выходом в открытое море",
          "Всё сразу - море эмоций",
        ],
        answer: 3,
        explanation: "Там было слишком много всего светлого, чтобы выбрать только одно.",
      },
      {
        question: "Какой кадр из наших поездок самый «наш»?",
        options: ["Москва Сити", "Катамаран на Волге", "Крым на дневном свете", "Каждый по-своему родной"],
        answer: 3,
        explanation: "Правильно: у каждого кадра своё тепло, и все они наши.",
      },
      {
        question: "Какая общая мечта звучит ближе всего?",
        options: ["Больше поездок на море", "Переезд в Беларусь", "Совместный альбом", "Всё это вместе"],
        answer: 3,
        explanation: "Мечты лучше не выбирать по одной — пусть будут все.",
      },
      {
        question: "Нужно ли нам личное пространство?",
        options: ["Да", "Иногда", "Нет", "А зачем оно нужно?!"],
        answer: 3,
        explanation: "А зачем оно нужно?! Мы же вместе всегда!",
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
        question: "Какой момент запомнился больше всего?",
        options: [
          "Первая прогулка и встреча",
          "Первая ночь вместе",
          "Первая поездка на Чёрное море",
          "Первый Новый год",
          "Первый справленный день рождения",
        ],
        answer: 0,
        explanation: "С первой прогулки и началось всё самое важное.",
      },
      {
        question: "Что лучше всего сохраняет тепло между нами?",
        options: ["Слова", "Объятия", "Внимание"],
        answer: 2,
        explanation: "Внимание - это очень красивый способ любить.",
      },
      {
        question: "С какой фразы началась наша первая встреча?",
        options: ["Ты что живой?", "Я по тебе скучала", "Пойдём гулять", "Ну привет"],
        answer: 0,
        explanation: "Да, именно так — смешно, неожиданно и уже по-нашему.",
      },
      {
        question: "Что из этого всегда хочется помнить?",
        options: ["Особые даты", "Счастливые моменты", "Секретные фразы"],
        answer: 1,
        explanation: "Счастливые моменты мы точно будем хранить бережно.",
      },
      {
        question: "Где мы встретили наш первый Новый год вместе?",
        options: ["В поездке у моря", "Вдвоём в тишине", "В кругу семьи", "В большом городе"],
        answer: 2,
        explanation: "Первые салюты, первые обзоры подарков и очень красивый праздник.",
      },
      {
        question: "Какой зимний момент из самого начала самый родной?",
        options: ["Первый снег в переписке", "Первый зимний поцелуй", "Первые подарки", "Первая фотография"],
        answer: 1,
        explanation: "Тот самый первый зимний поцелуй ни с чем не сравнить.",
      },
      {
        question: "Что из Геленджика хочется вспоминать снова и снова?",
        options: [
          "Прогулки и теплоход",
          "Купание далеко от берега",
          "Катание на банане",
          "Всё: море, смех и мы вдвоём",
        ],
        answer: 3,
        explanation: "Там было целое море эмоций — и все они наши.",
      },
      {
        question: "Что делает обычный день особенным?",
        options: ["Совместные фото", "Маленькие сюрпризы", "Разговоры без спешки", "Всё это вместе"],
        answer: 3,
        explanation: "Обычный день становится нашим, когда в нём есть всё тёплое сразу.",
      },
      {
        question: "Какая мечта на двоих звучит правильнее всего?",
        options: ["Поездки в другие страны", "Переезд в Беларусь", "Совместный альбом", "Все мечты сразу"],
        answer: 3,
        explanation: "Пусть сбывается не одна мечта, а целая жизнь вместе.",
      },
      {
        question: "Что лучше всего добавить в наши отношения?",
        options: ["Календарь особенных дат", "Больше сюрпризов", "Путешествия каждый год", "И традиции, и поездки, и тепло"],
        answer: 3,
        explanation: "Самый верный ответ — когда хочется всего самого доброго сразу.",
      },
      {
        question: "Нужно ли нам личное пространство?",
        options: ["Да", "Иногда", "Нет", "А зачем оно нужно?!"],
        answer: 1,
        explanation: "Да, нам нужно быть вместе, но иногда тоже нужно быть самим собой.",
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
      wins >= 4 ? "Тёплая память" : "Ещё чуть-чуть",
      wins >= 8 ? "Сильная пара" : "Почти рядом",
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
  const isPerfect = completed && wins === totalQuestions && totalQuestions > 0;

  return (
    <div className="game-card game-card--full">
      <HeartFireworks active={isPerfect} />
      {!mode ? (
        <div className="quiz-intro">
          <h3>Выбери опрос</h3>
          <p className="muted">
            Сначала выбери, для кого проходишь тест. В конце появится секретное сообщение, а результаты повлияют на количество маленьких побед.
          </p>
          <div className="quiz-switcher" role="group" aria-label="Выбор опроса">
            <button className="button-secondary" type="button" onClick={() => startSurvey("boyfriend")}>Опрос для парня</button>
            <button className="button" type="button" onClick={() => startSurvey("girlfriend")}>Опрос для девушки</button>
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
              <strong>{isPerfect ? "Идеально - 100%!" : "Опрос завершён"}</strong>
              <p className="muted">
                {isPerfect
                  ? "Все ответы совпали. Лови салют из сердечек — и не забудь открыть секретное сообщение."
                  : "Ответы уже собраны. Теперь можно открыть секретное сообщение и сохранить этот маленький результат для вас двоих."}
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

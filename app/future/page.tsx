import { Reveal } from "../ui/animations";

const futurePlans = [
  "Больше совместных поездок и маленьких путешествий без спешки.",
  "Больше путешествий на моря, а также в другие страны.",
  "Добавлять традиции: совместные фото, наш альбом, любимые места и особые даты.",
  "Делать пространство для поддержки, доверия и спокойствия друг для друга.",
  "Делать друг для друга маленькие сюрпризы.",
  "Радоваться обычным дням так же сильно, как важным событиям.",
];

const dreamCards = [
  {
    title: "Планы на двоих",
    text: "Наши общие цели: поездки заграницу, переезд в Беларусь, сбытие наших мечтаний и желаний, которые будут воплощаться вместе.",
  },
  {
    title: "Маленькие ритуалы",
    text: "Вечерние просмотры атмосферных фильмов/сериалов, больше совместных фотографий.",
  },
];

export default function FuturePage() {
  return (
    <main className="page" style={{ paddingBottom: "1.5rem" }}>
      <Reveal className="center-note">
        <span className="eyebrow">Будущее</span>
        <h1 className="section-title" style={{ marginTop: "1rem" }}>
          Всё, что мы ещё обязательно создадим.
        </h1>
        <p>
          Эта страница для наших мечтаний, планов, пожеланий и всех вещей, о
          которых хочется помнить заранее.
        </p>
      </Reveal>

      <section className="future-grid" style={{ paddingTop: "1.5rem" }}>
        <Reveal className="future-card">
          <h3>Наши мечты</h3>
          <ul>
            {futurePlans.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="future-card">
          <h3>Что можно добавить в наших отношениях</h3>
          <ul>
            <li>Календарь особенных дат.</li>
            <li>Совместный альбом.</li>
            <li>Справление годовщины отношений и будущих годовщин нашей свадьбы.</li>
            <li>Путешествия каждый год.</li>
          </ul>
        </Reveal>
      </section>

      <section className="future-grid" style={{ paddingTop: "1rem" }}>
        {dreamCards.map((item) => (
          <Reveal className="future-card" key={item.title}>
            <h3>{item.title}</h3>
            <p className="muted">{item.text}</p>
          </Reveal>
        ))}
      </section>
    </main>
  );
}

import Link from "next/link";
import { HeartFloat, Reveal } from "./ui/animations";
import { ImageSlider } from "./ui/image-slider";

const storyHighlights = [
  {
    title: "Нежность в каждом дне",
    text: "Сайт построен как маленькое пространство, где у каждого момента есть своё место, свет и настроение.",
  },
  {
    title: "Воспоминания и обещания",
    text: "Здесь можно хранить то, что уже было, и то, что мы хотим сделать вместе дальше.",
  },
  {
    title: "Тёплая атмосфера",
    text: "Плавные появления, мягкие цвета и сердечки на фоне делают страницу живой.",
  },
];

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const heroImages = [
  {
    src: asset("/images/slide1.jpg"),
    alt: "Первая наша встреча и прогулка по Москве с совместной фотографией",
  },
  {
    src: asset("/images/slide2.jpg"),
    alt: "Ещё одно памятное изображение в Москва Сити",
  },
  {
    src: asset("/images/slide3.jpg"),
    alt: "Забавный кадр из игры вместе",
  },
  {
    src: asset("/images/slide4.jpg"),
    alt: "Счастливый момент нашей прогулке на катамаране на Волге",
  },
  {
    src: asset("/images/slide5.jpg"),
    alt: "Дневной свет наших улыбок в Крыму :3",
  },
  {
    src: asset("/images/slide6.jpg"),
    alt: "Нежность в нашей фотографии",
  },
  {
    src: asset("/images/slide7.jpg"),
    alt: "Любовь навсегда",
  }
];

export default function HomePage() {
  return (
    <main className="page">
      <HeartFloat count={18} />
      <section className="hero-grid">
        <Reveal className="hero-card">
          <span className="eyebrow">Для тебя и для нас</span>
          <h1 className="hero-title">Наш маленький мир, в котором живёт любовь.</h1>
          <p className="hero-copy">
            Это сайт-подарок о нас: с историей, планами на будущее, приятными
            воспоминаниями и маленькой игрой, если захочется улыбнуться.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/history">
              Посмотреть историю
            </Link>
            <Link className="button-secondary" href="/future">
              Наши планы
            </Link>
          </div>
        </Reveal>
      </section>

      <Reveal className="hero-aside hero-slider-block">
        <div className="slider">
          <ImageSlider images={heroImages} />
        </div>
      </Reveal>

      <section style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <h2 className="section-title">О нас как о паре</h2>
        <div className="panel-grid">
          {storyHighlights.map((item, index) => (
            <Reveal className="panel" key={index /* или item.title */}>
              <strong>{item.title}</strong>
              <p className="muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

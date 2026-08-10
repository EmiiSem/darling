import { HeartGame } from "../ui/heart-game";
import { Reveal } from "../ui/animations";

export default function GamePage() {
  return (
    <main className="page">
      <Reveal className="center-note">
        <span className="eyebrow">Мини-игра</span>
        <h1 className="section-title" style={{ marginTop: "1rem" }}>
          Опрос для нас двоих.
        </h1>
        <p>
          Выбирай, для кого проходишь опрос: для парня или для девушки. После
          завершения появится секретное сообщение, а результаты будут влиять на
          тёплые маленькие достижения.
        </p>
      </Reveal>

      <section className="game-grid game-grid--full" style={{ paddingTop: "1.5rem" }}>
        <HeartGame />
      </section>
    </main>
  );
}

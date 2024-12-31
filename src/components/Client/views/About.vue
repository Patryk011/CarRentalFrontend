<template>
  <div class="about-container">
    <Banner text="O nas" />
    <section class="about">
      <div class="content">
        <h1>KIM JESTEŚMY</h1>
        <p>
          Jesteśmy liderem w branży wynajmu samochodów, oferującym szeroki wybór
          pojazdów dopasowanych do Twoich potrzeb. Naszym celem jest zapewnienie
          najwyższej jakości usług oraz pełnej satysfakcji naszych klientów.
        </p>
        <p>
          Dzięki naszemu zaangażowaniu, elastyczności i profesjonalizmowi
          zdobyliśmy zaufanie tysięcy klientów w całej Polsce. Wynajem
          samochodów nigdy nie był prostszy!
        </p>
        <div class="about-images">
          <img src="/src/assets/fleet.jpg" alt="Flota" />
          <img src="/src/assets/106.jpg" alt="Usługi" />
        </div>
        <h2>NASZA MISJA</h2>
        <p>
          Naszą misją jest dostarczanie niezawodnych pojazdów, które pozwalają
          naszym klientom podróżować wygodnie i bezpiecznie. Stawiamy na
          innowacyjność i stale rozwijamy naszą ofertę, aby sprostać
          oczekiwaniom nawet najbardziej wymagających klientów.
        </p>
        <h2>DLACZEGO MY?</h2>
        <ul>
          <li>Szeroki wybór nowoczesnych samochodów</li>
          <li>Konkurencyjne ceny i atrakcyjne promocje</li>
          <li>Elastyczne warunki wynajmu</li>
          <li>Profesjonalna i przyjazna obsługa</li>
        </ul>
        <h2>SKONTAKTUJ SIĘ Z NAMI</h2>
        <p>
          Masz pytania? Skontaktuj się z nami, aby dowiedzieć się więcej o
          naszej ofercie lub zarezerwować samochód. Jesteśmy tutaj, aby pomóc!
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Banner from "../atoms/Banner/Banner.vue";
</script>

<style lang="scss" scoped>
.about-container {
  width: 100%;
  background-color: #fff;

  .about {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 2em;
    text-align: left;
    padding: 2em;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 1em;

    .content {
      color: var(--primary-color);

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;

        text-align: center;
      }

      h2 {
        font-size: 2rem;
        margin: 2rem 0 1rem;
        color: var(--primary-color);
        padding-bottom: 0.5rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
      }

      ul {
        list-style-type: disc;
        margin: 1em 0;
        padding-left: 1.5em;

        li {
          font-size: 1.1rem;
          margin-bottom: 0.7em;
          position: relative;
        }
      }

      .about-images {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5em;
        margin: 2em 0;

        img {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 1em;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
        }
      }

      @media (max-width: 768px) {
        .about-images {
          flex-direction: column;
          align-items: center;

          img {
            max-width: 100%;
          }
        }

        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.75rem;
        }

        p,
        li {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>

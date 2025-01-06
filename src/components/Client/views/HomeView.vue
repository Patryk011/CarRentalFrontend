<template>
  <div class="home-view">
    <Banner text="Wypożycz auto dopasowane do swoich potrzeb" />

    <section class="about-us">
      <div class="container">
        <img src="@/assets/about-us.webp" alt="O nas" class="about-image" />
        <div class="about-text">
          <h2>O Nas</h2>
          <p>
            Jesteśmy liderem na rynku wynajmu samochodów, oferując szeroki wybór
            pojazdów dostosowanych do Twoich potrzeb. Nasza misja to zapewnienie
            komfortu i bezpieczeństwa podczas każdej podróży.
          </p>
          <button @click="$router.push('/o-nas')" class="learn-more">
            Dowiedz się więcej
          </button>
        </div>
      </div>
    </section>

    <section class="company-info">
      <div class="container">
        <h2>Wypożyczalnia Samochodów CarRental</h2>
        <div class="info-content">
          <p>
            Wypożyczalnia samochodów CarRental jest profesjonalną firmą, która
            działa z pasji do motoryzacji. Chcemy zapewnić klientom usługi
            najwyższej jakości. Dzięki wieloletniemu doświadczeniu w branży
            wynajmu samochodu możemy doskonale zrozumieć potrzeby klienta.
          </p>
          <p>
            Pragniemy zapewnić każdemu pełną satysfakcję z korzystania z naszych
            usług. Wypożyczalnia samochodów CarRental to miejsce, gdzie
            znajdziesz szeroki wybór pojazdów, które są w stanie sprostać Twoim
            oczekiwaniom. Wybranym samochodem wybierzesz się nie tylko na krótki
            weekendowy wypad, ale również na dłuższą wyprawę. Wypożyczalnia
            CarRental to minimum formalności, maksimum zysku!
          </p>
          <h3>Wypożyczalnia samochodów CarRental</h3>
          <p>
            Jesteś w podróży poza swoim miejscem zamieszkania? Chcesz wybrać się
            w długą trasę samochodem, na którym można polegać? A może chcesz
            wypróbować konkretny model, zanim zdecydujesz się na jego zakup?
            Nasza wypożyczalnia samochodów odpowiada na wszystkie te potrzeby i
            zapewnia ofertę najwyższej jakości.
          </p>
          <p>
            CarRental to renomowane usługi wynajmu wszelkiego rodzaju pojazdów.
            Zachęcamy do zapoznania się z naszą flotą. Jesteśmy przekonani, że
            będziemy w stanie zaproponować rozwiązania, które zostaną w pełni
            dopasowane do Twoich potrzeb. Działamy na terenie całego kraju, a
            nasze liczne placówki zapewniają nie tylko rozbudowaną, ale także
            bardzo korzystną cenowo ofertę.
          </p>

          <h3>Tania wypożyczalnia aut</h3>
          <p>
            Nasza oferta jest skierowana zarówno do klientów indywidualnych, jak
            i przedsiębiorstw. Czekamy na Ciebie. U nas warto wynająć samochód,
            dlatego skorzystaj z naszej oferty i ciesz się najwyższą jakością
            usług oraz atrakcyjnymi cenami.
          </p>

          <h3>Wypożyczalnia samochodów bez kaucji</h3>
          <p>
            Masz dość tego, że wypożyczenie samochodu w innych punktach jest
            obarczone mnóstwem dodatkowych ukrytych opłat? My wychodzimy
            potrzebom klientów naprzeciw i oferujemy najkorzystniejsze warunki,
            dzięki którym wynajem aut staje się prosty i dostępny dla każdego.
          </p>
          <p>
            Skorzystanie z usług naszej wypożyczalni samochodów nie wymaga
            uiszczenia kaucji. Płacisz wyłącznie za użytkowanie auta i nie
            musisz przejmować się niczym więcej.
          </p>
          <p>
            Co więcej, nie musisz przejmować się tym, że zmieniły się Twoje
            plany. Masz prawo do odwołania rezerwacji bez ponoszenia dodatkowych
            kosztów. Jeżeli zrezygnowałeś z przyjazdu do miasta, data odbioru
            przestała być dla Ciebie korzystna lub przez opóźnienia w locie
            pojawisz się na lotnisku w innym terminie, nie będziesz dodatkowo
            stratny!
          </p>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Dlaczego My?</h2>
        <div class="features-grid">
          <div class="feature-item">
            <i class="icon fas fa-car"></i>
            <h3>Szeroki Wybór Pojazdów</h3>
            <p>Od ekonomicznych po luksusowe – mamy samochód dla każdego.</p>
          </div>
          <div class="feature-item">
            <i class="icon fas fa-clock"></i>
            <h3>24/7 Obsługa Klienta</h3>
            <p>Nasz zespół jest dostępny o każdej porze, aby Ci pomóc.</p>
          </div>
          <div class="feature-item">
            <i class="icon fas fa-shield-alt"></i>
            <h3>Bezpieczeństwo</h3>
            <p>
              Wszystkie nasze pojazdy są regularnie serwisowane i sprawdzane.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials">
      <div class="container">
        <h2>Opinie Klientów</h2>
        <div class="testimonials-carousel">
          <div class="testimonial">
            <p>"Świetna obsługa i doskonałe samochody. Polecam każdemu!"</p>
            <h4>Anna Kowalska</h4>
          </div>
          <div class="testimonial">
            <p>"Proces wynajmu był prosty i szybki. Na pewno wrócę!"</p>
            <h4>Jan Nowak</h4>
          </div>
          <div class="testimonial">
            <p>
              "Profesjonalne podejście i konkurencyjne ceny. Bardzo zadowolony."
            </p>
            <h4>Maria Wiśniewska</h4>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Gotowy na podróż?</h2>
        <button @click="$router.push('/wynajem-auta')" class="cta-button">
          Zarezerwuj Teraz
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Banner from "../atoms/Banner/Banner.vue";
</script>
<style lang="scss" scoped>
.home-view {
  .about-us,
  .company-info,
  .features,
  .testimonials,
  .cta,
  .footer {
    padding: 60px 20px;
    text-align: center;

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  .about-us {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    flex-wrap: wrap;

    .about-image {
      width: 600px;
      height: 400px;
      border-radius: 10px;
      margin: 2em;
      @media (max-width: 768px) {
        width: 100%;
      }
    }

    .about-text {
      margin: 0 auto;
      width: 75%;
      text-align: left;
      display: flex;
      flex-direction: column;

      h2 {
        text-align: center;
      }

      @media (max-width: 768px) {
        width: 100%;
      }

      h2 {
        font-size: 2.5em;
        margin-bottom: 20px;
        color: #333;
      }

      p {
        font-size: 1.1em;
        line-height: 1.8;
        margin-bottom: 20px;
        color: #555;
      }

      .learn-more {
        background-color: #df0d0d;
        color: #fff;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        width: 50%;
        margin: 0 auto;
        font-size: 1em;
        transition: background-color 0.3s, transform 0.3s;

        &:hover {
          background-color: #df180a;
          transform: translateY(-2px);
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 127, 80, 0.5);
        }
      }
    }
  }

  .company-info {
    background-color: #fff;

    .container {
      text-align: left;

      h2 {
        font-size: 2.5em;
        margin-bottom: 40px;
        color: #333;
        text-align: center;
      }

      .info-content {
        font-size: 1.1em;
        line-height: 1.8;
        color: #555;

        h3 {
          font-size: 2em;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #d60c0c;
        }

        p {
          margin-bottom: 20px;
        }
      }
    }
  }

  .features {
    background-color: #fff;

    .features-grid {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 40px;

      .feature-item {
        background-color: #f1f1f1;
        padding: 30px 20px;
        border-radius: 10px;
        flex: 1 1 250px;
        max-width: 300px;
        text-align: center;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .icon {
          font-size: 2.5em;
          color: #d60c0c;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.5em;
          margin-bottom: 10px;
          color: #333;
        }

        p {
          font-size: 1em;
          color: #555;
        }
      }
    }
  }

  .testimonials {
    background-color: #f9f9f9;

    h2 {
      font-size: 2.5em;
      margin-bottom: 40px;
      color: #333;
    }

    .testimonials-carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 20px;
      padding-bottom: 20px;

      .testimonial {
        background-color: #fff;
        padding: 20px 25px;
        border-radius: 10px;
        min-width: 300px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        scroll-snap-align: center;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        p {
          font-style: italic;
          color: #555;
          margin-bottom: 15px;
        }

        h4 {
          text-align: right;
          color: #333;
          font-weight: bold;
        }
      }
    }

    @media (max-width: 768px) {
      .testimonials-carousel {
        flex-direction: column;
        align-items: center;
      }

      .testimonial {
        min-width: 100%;
      }
    }
  }

  .cta {
    background-color: #e42d27;
    color: #fff;

    h2 {
      font-size: 2.5em;
      margin-bottom: 20px;
      text-align: center;
    }

    .cta-button {
      background-color: #fff;
      color: #d62c2c;
      border: none;
      padding: 15px 30px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2em;
      transition: background-color 0.3s, color 0.3s, transform 0.3s;

      &:hover {
        color: #fd2600;
        transform: translateY(-2px);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(228, 45, 39, 0.5);
      }
    }
  }
}

@media (max-width: 1200px) {
  .home-view {
    .about-us {
      .about-text {
        h2 {
          font-size: 2.2em;
        }

        p {
          font-size: 1em;
        }
      }
    }

    .features {
      .features-grid {
        .feature-item {
          flex: 1 1 45%;
        }
      }
    }

    .testimonials {
      h2 {
        font-size: 2.2em;
      }
    }

    .cta {
      h2 {
        font-size: 2.2em;
      }

      .cta-button {
        font-size: 1.1em;
      }
    }

    .company-info {
      .container {
        .info-content {
          font-size: 1em;

          h3 {
            font-size: 1.8em;
          }

          p {
            font-size: 1em;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-view {
    .about-us {
      flex-direction: column;

      .about-text {
        width: 100%;
        text-align: center;

        h2 {
          font-size: 2em;
        }
      }
    }

    .features {
      .features-grid {
        flex-direction: column;
        align-items: center;

        .feature-item {
          flex: 1 1 100%;
          max-width: 400px;
        }
      }
    }

    .testimonials {
      .testimonials-carousel {
        flex-direction: column;
        align-items: center;

        .testimonial {
          min-width: 100%;
        }
      }
    }

    .cta {
      h2 {
        font-size: 2em;
      }

      .cta-button {
        font-size: 1em;
      }
    }

    .company-info {
      .container {
        .info-content {
          h3 {
            font-size: 1.6em;
          }

          p {
            font-size: 0.95em;
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .home-view {
    .about-us {
      .about-text {
        h2 {
          font-size: 1.8em;
        }

        p {
          font-size: 0.95em;
        }
      }
    }

    .features {
      .features-grid {
        .feature-item {
          padding: 20px;
        }
      }
    }

    .testimonials {
      h2 {
        font-size: 2em;
      }

      .testimonial {
        padding: 15px 20px;
      }
    }

    .cta {
      h2 {
        font-size: 1.8em;
      }

      .cta-button {
        padding: 12px 25px;
        font-size: 1em;
      }
    }

    .company-info {
      .container {
        .info-content {
          h3 {
            font-size: 1.4em;
          }

          p {
            font-size: 0.9em;
          }
        }
      }
    }
  }
}
</style>

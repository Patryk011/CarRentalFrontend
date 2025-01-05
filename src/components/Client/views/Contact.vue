<template>
  <Banner text="Kontakt" />
  <div class="main-container">
    <div class="contact-form-container">
      <h2 class="form-intro">Wypełnij formularz aby się z nami skontaktować</h2>
      <ContactForm />
    </div>
    <div class="info-container">
      <div class="left-section">
        <h3>Chcesz zarezerwować samochód przez telefon?</h3>
        <p>
          <strong>Infolinia 24h/7:</strong>
          <span class="highlight">+48 999 999 999</span>
        </p>
        <p>
          Nasze biuro obsługi klienta jest dostępne 7 dni w tygodniu, 365 dni w
          roku.
        </p>
      </div>

      <div class="middle-section">
        <h3>Dane rejestracyjne firmy</h3>
        <p><strong>CarRental Sp. z o.o.</strong></p>
        <p>ul. Henryka Sienkiewicza 10, 25-333 Kielce</p>
        <p><strong>NIP:</strong> 999 999 99 99</p>
        <p><strong>REGON:</strong> 123456789</p>
        <p><strong>KRS:</strong> 000000000</p>
        <p>Sąd Rejonowy w Kielcach, X Wydział Gospodarczy KRS</p>
        <p>Kapitał zakładowy: 1 000 000 PLN opłacony w&nbsp;całości</p>
      </div>

      <div class="right-section">
        <h3>Dane kontaktowe</h3>
        <p><strong>Telefon kontaktowy:</strong> +48 999 999 999</p>

        <p>
          Email:
          <a href="mailto:reklamacje@carfree.pl">carrental4321@gmail.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "../atoms/Banner/Banner.vue";
import ContactForm from "../molecules/ContactForm.vue";
</script>

<style scoped lang="scss">
.main-container {
  max-width: 1400px;
  margin: 0 auto;

  .info-container {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding-top: 6em;

    .left-section,
    .middle-section,
    .right-section {
      background: #f9f9f9;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      width: 30%;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
      }
    }

    h3 {
      margin-bottom: 1.2rem;
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
    }

    p {
      margin-bottom: 1rem;
      line-height: 1.8;
      color: #555;
    }

    .highlight {
      color: #d32e22;
      font-weight: bold;
    }

    a {
      color: #d32e22;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: darken(#d32e22, 10%);
        text-decoration: underline;
      }
    }
  }

  .contact-form-container {
    h2 {
      padding: 2em;
      text-align: center;
    }
  }
}
</style>

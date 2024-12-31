<template>
  <div class="faq-container">
    <h1>Najczęściej zadawane pytania</h1>
    <div class="faq-item" v-for="(item, index) in faqItems" :key="index">
      <div class="faq-question" @click="toggle(index)">
        <span>{{ item.question }} </span>
        <span class="icon">{{ activeIndex === index ? "-" : "+" }} </span>
      </div>
      <div class="faq-answer" v-show="activeIndex === index">
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Jak mogę zarezerwować samochód?",
    answer:
      "Rezerwację samochodu możesz dokonać online poprzez naszą stronę internetową lub kontaktując się bezpośrednio z naszym biurem obsługi klienta.",
  },
  {
    question: "Jakie dokumenty są potrzebne do wynajmu samochodu?",
    answer:
      "Do wynajmu samochodu potrzebny jest ważny dowód osobisty lub paszport oraz prawo jazdy. W niektórych przypadkach może być wymagany dodatkowy dokument potwierdzający źródło dochodu.",
  },
  {
    question: "Czy mogę wynająć samochód z kierowcą?",
    answer: "Nie oferujemy wynajmu samochodu z kierowcą.",
  },
  {
    question: "Jakie są warunki ubezpieczenia wynajmowanego pojazdu?",
    answer:
      "Wszystkie nasze samochody są objęte podstawowym ubezpieczeniem OC oraz AC. Istnieje możliwość wykupienia dodatkowych opcji ubezpieczenia dla większego bezpieczeństwa.",
  },
  {
    question: "Czy mogę anulować rezerwację?",
    answer: "Tak, rezerwację można anulować bez dodatkowych kosztów.",
  },
  {
    question: "Czy oferujecie długoterminowy wynajem samochodów?",
    answer:
      "Tak, oferujemy atrakcyjne warunki wynajmu długoterminowego dla klientów indywidualnych oraz firm. Skontaktuj się z nami, aby omówić szczegóły i otrzymać indywidualną ofertę.",
  },
  {
    question: "Jakie modele samochodów są dostępne w ofercie?",
    answer: `W naszej ofercie znajdziesz szeroki wybór samochodów różnych marek i klas, listę naszych wszystkich pojazdów możesz zobaczyć w zakładce "Wynajem auta".`,
  },

  {
    question: "Gdzie mogę odebrać i zwrócić wynajęty samochód?",
    answer:
      "Odbiór i zwrot samochodu możliwy jest w naszych biurach znajdujących się w różnych lokalizacjach w całej Polsce. ",
  },
  {
    question:
      "Czy mogę wynająć samochód na krótki okres, na przykład na jeden dzień?",
    answer:
      "Tak, oferujemy wynajem samochodów na krótkie okresy, w tym na jeden dzień. Jest to idealne rozwiązanie dla osób potrzebujących samochodu na krótki wyjazd lub dojazd do pracy.",
  },

  {
    question: "Czy istnieje limit kilometrów podczas wynajmu samochodu?",
    answer:
      "Standardowo oferujemy wynajem z nieograniczoną ilością kilometrów.",
  },
];

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style lang="scss" scoped>
.faq-container {
  max-width: 50%;
  margin: 4.5% auto 0 auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 1em;

  h1 {
    text-align: center;
    margin-bottom: 1.5em;
    color: var(--primary-color);
  }

  .faq-item {
    border-bottom: 1px solid #ddd;
    padding: 1em 0;

    :last-child {
      border-bottom: none;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 1.2rem;
      color: var(--primary-color);

      .icon {
        font-size: 1.5rem;
        transition: transform 0.3s ease;
      }
    }

    .faq-answer {
      margin-top: 0.5em;
      font-size: 1rem;
      color: #555;
      transition: max-height 0.3s ease;

      p {
        margin: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-container {
    padding: 1em;

    h1 {
      font-size: 1.8rem;
    }

    .faq-item {
      .faq-question {
        font-size: 1rem;

        .icon {
          font-size: 1.2rem;
        }
      }

      .faq-answer {
        font-size: 0.95rem;
      }
    }
  }
}
</style>

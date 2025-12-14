# Sprawozdanie z projektu UX/UI – RecipeHub

## 1. Wprowadzenie

Celem projektu było zaprojektowanie spójnego, nowoczesnego i intuicyjnego interfejsu użytkownika dla platformy **RecipeHub**, umożliwiającej przeglądanie, wyszukiwanie oraz korzystanie z przepisów kulinarnych. Projekt obejmuje kilka kluczowych widoków: **Home**, **Recipes (lista)**, **Entity View (widok pojedynczego przepisu)**, **About** oraz **Contact**. Wszystkie mockupy zostały wykonane w oparciu o jeden **design system**, co zapewnia spójność wizualną i funkcjonalną całego produktu.

---

## 2. Design system – fundament spójności

### Zastosowana kolorystyka

- **Kolor dominujący:** czerń / bardzo ciemny grafit – wykorzystywany w nagłówkach, przyciskach CTA (np. „Explore Recipes”, „Save Recipe”), stopce
- **Kolory neutralne:** biel oraz jasne odcienie szarości – tło stron, karty, sekcje treści
- **Akcenty kolorystyczne:** naturalne kolory zdjęć potraw (zieleń bazylii, czerwień pomidorów, brązy i beże) – brak agresywnych akcentów UI pozwala skupić uwagę na treści

Taka paleta kolorów wspiera czytelność, nadaje projektowi elegancki i „premium” charakter oraz nie konkuruje wizualnie z fotografiami jedzenia, które są kluczowym elementem serwisu.

### Typografia

- Wyraźna hierarchia nagłówków (duże, pogrubione H1/H2)
- Prosty, bezszeryfowy krój pisma zwiększający czytelność
- Konsekwentne odstępy i interlinie poprawiające skanowalność treści

### Powtarzalne komponenty

- Karty (Cards) przepisów
- Przyciski typu primary / secondary
- Formularze
- Sekcje z wyraźnymi nagłówkami

---

## 3. Analiza poszczególnych widoków

## 3.1 Home (Strona główna)

### Opis struktury

Widok Home pełni funkcję strony wejściowej oraz inspiracyjnej:

- **Header / Navbar** z logo RecipeHub, nawigacją, wyszukiwarką oraz przyciskiem „Sign In”
- **Hero section** z mocnym hasłem („Discover Delicious Recipes Daily”), opisem wartości oraz przyciskami CTA
- **Social proof** – statystyki (liczba przepisów, użytkowników, ocena)
- **Browse by Category** – kafelki kategorii kuchni
- **Featured Recipes** – lista wyróżnionych przepisów w formie kart
- **How It Works** – prosty, 3-krokowy proces korzystania z serwisu
- **Newsletter** – sekcja zapisu
- **Footer** z linkami i informacjami dodatkowymi

### Zastosowanie UX/UI

- Wyraźne CTA w pierwszym ekranie (above the fold)
- Wizualna hierarchia informacji (od inspiracji → eksploracji → edukacji)
- Karty przepisów jako znany i intuicyjny wzorzec
- Ikony kategorii ułatwiające szybkie skanowanie

Home skutecznie łączy funkcję marketingową i użytkową. Użytkownik od razu rozumie wartość produktu i wie, jaki kolejny krok wykonać.

---

## 3.2 Recipes (Lista przepisów)

### Opis struktury

- **Header** z tytułem strony
- **Panel filtrów** (np. kategoria, czas, poziom trudności)
- **Lista przepisów** w formie kart z:

  - zdjęciem
  - nazwą przepisu
  - krótkimi metadanymi
  - przyciskiem „View Recipe"

### Zastosowanie UX/UI

- Filtry ograniczające przeciążenie informacyjne
- Spójne karty jak na Home – brak potrzeby uczenia się nowego wzorca
- Jasne CTA prowadzące do widoku szczegółowego

Widok Recipes jest skalowalny i przygotowany na dużą liczbę treści. Spójność kart z Home wzmacnia przewidywalność interfejsu.

---

## 3.3 Entity View (Widok pojedynczego przepisu)

### Opis struktury

- Breadcrumbs (Home > Italian > Classic Margherita Pizza)
- Tytuł przepisu + metadane (czas, porcje, poziom trudności, ocena)
- Duże zdjęcie potrawy
- Panel akcji (Save, Print, Share)
- Sekcja Nutrition Facts
- Ingredients (checkboxy)
- Instructions w formie kroków
- Related Recipes

### Zastosowanie UX/UI

- Breadcrumbs – orientacja w strukturze serwisu
- Checklisty składników – wsparcie w trakcie gotowania
- Numerowane kroki – redukcja błędów poznawczych
- Sticky / wyróżniony panel akcji

Widok przepisu jest maksymalnie funkcjonalny i wspiera użytkownika w realnym kontekście użycia (gotowanie).

---

## 3.4 About

### Opis struktury

- Header z nagłówkiem „About RecipeHub"
- Sekcja **Our Story** – opis misji i zdjęcie
- **Our Team** – avatary zespołu z podpisami
- **Get In Touch** – formularz kontaktowy + dane kontaktowe

### Zastosowanie UX/UI

- Storytelling budujący zaufanie
- Wizerunki zespołu – humanizacja marki
- Formularz jako naturalne CTA

Widok About wzmacnia wiarygodność produktu i nadaje mu „ludzką twarz”, zachowując tę samą estetykę co pozostałe strony.

---

## 3.5 Contact

### Opis struktury

- Formularz kontaktowy
- Dane kontaktowe (email, telefon, adres)
- Mapa lokalizacji
- Office hours

### Zastosowanie UX/UI

- Jasna separacja informacji
- Mapa jako element wspierający decyzję kontaktu
- Zgodność formularza z innymi formularzami w systemie

Contact jest prosty i funkcjonalny – nie odciąga uwagi od celu, jakim jest szybki kontakt z firmą.

---

## 4. Spójność projektu

Spójność projektu wynika z:

- Jednolitego design systemu
- Powtarzalnych komponentów
- Konsekwentnej typografii i kolorystyki
- Identycznego stylu kart, formularzy i CTA

Dzięki temu użytkownik porusza się po serwisie intuicyjnie, bez potrzeby ponownego uczenia się interfejsu na każdej podstronie.

---

## 5. Screeny aplikacji

Poniżej znajdują się screeny aplikacji przedstawiające różne widoki na urządzeniach desktopowych i mobilnych.

### Desktop

- **Home**

![Home](Screeny/Desktop/Home.png)

- **Recipes**

![Recipes](Screeny/Desktop/Recipies.png)

- **Entity View**

![Entity View](Screeny/Desktop/Entity%20View.png)

- **About**

![About](Screeny/Desktop/About.png)

- **Contact**

![Contact](Screeny/Desktop/Contact.png)

### Mobile

- **Home**

![Home Mobile](Screeny/Mobile/Home%20Mobile.png)

- **Recipes**

![Recipes](Screeny/Mobile/Recipies.png)

- **Entity View**

![Entity View](Screeny/Mobile/Entity%20View.png)

- **About**

![About](Screeny/Mobile/About.png)

- **Contact**

![Contact](Screeny/Mobile/Contact.png)

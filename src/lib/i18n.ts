// Languages of the site. Translated: the site's own interface (navigation,
// buttons, blog UI) and blog posts. Page content of About, Research, Projects,
// Experience, Education and Contact stays in English in both languages.

export const locales = ["en", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// Cookie that remembers the language a reader picked with the switcher.
export const LOCALE_COOKIE = "lang";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(lang: Locale): Locale {
  return lang === "en" ? "ro" : "en";
}

// "/about" -> "/ro/about", "/" -> "/ro"
export function localePath(lang: Locale, path: string): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// hreflang links for a page that exists in both languages.
export function languageAlternates(path: string) {
  return {
    languages: {
      en: localePath("en", path),
      ro: localePath("ro", path),
      "x-default": localePath("en", path),
    },
  };
}

const en = {
  dateLocale: "en-US",
  languageName: "English",
  meta: {
    description:
      "Ștefan D., systems engineer. Notes on math, science, and absurd ideas.",
  },
  nav: {
    about: "about",
    blog: "blog",
    research: "research",
    projects: "projects",
    experience: "experience",
    education: "education",
    contact: "contact",
  },
  theme: { dark: "[ dark ]", light: "[ light ]", label: "Toggle theme" },
  menu: { open: "[ menu ]", close: "[ close ]" },
  switchTo: "Română",
  blog: {
    disclaimer: "// some of these ideas are absurd. a few might turn out to be right.",
    empty: "No posts yet. Coming soon.",
    back: "← blog/",
    part: (n: number, total: number) => `part ${n} of ${total}`,
    onlyIn: "This post is only available in Romanian.",
    replyText: "Thoughts, objections, or an even more absurd idea? Talk back.",
    replyButton: "reply to this post →",
  },
  search: {
    placeholder: "a topic, an idea, a word…",
    searching: "searching…",
    noMatches: "grep: no matches",
    forQuery: "for",
    inTag: "in",
  },
};

export type Dictionary = typeof en;

const ro: Dictionary = {
  dateLocale: "ro-RO",
  languageName: "Română",
  meta: {
    description:
      "Ștefan D., inginer de sisteme. Note despre matematică, știință și idei absurde.",
  },
  nav: {
    about: "despre",
    blog: "blog",
    research: "cercetare",
    projects: "proiecte",
    experience: "experiență",
    education: "educație",
    contact: "contact",
  },
  theme: { dark: "[ noapte ]", light: "[ zi ]", label: "Schimbă tema" },
  menu: { open: "[ meniu ]", close: "[ închide ]" },
  switchTo: "English",
  blog: {
    disclaimer: "// unele dintre aceste idei sunt absurde. câteva s-ar putea dovedi corecte.",
    empty: "Nicio postare încă. În curând.",
    back: "← blog/",
    part: (n: number, total: number) => `partea ${n} din ${total}`,
    onlyIn: "Această postare este disponibilă doar în engleză.",
    replyText: "Gânduri, obiecții sau o idee și mai absurdă? Răspunde-mi.",
    replyButton: "răspunde la postare →",
  },
  search: {
    placeholder: "un subiect, o idee, un cuvânt…",
    searching: "caut…",
    noMatches: "grep: niciun rezultat",
    forQuery: "pentru",
    inTag: "în",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ro };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export function formatDate(dateString: string, lang: Locale): string {
  return new Date(dateString).toLocaleDateString(dictionaries[lang].dateLocale, {
    year: "numeric",
    month: "long",
  });
}

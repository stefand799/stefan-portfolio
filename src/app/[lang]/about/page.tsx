import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, languageAlternates, localePath, type Locale } from "@/lib/i18n";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import { SoupBowl } from "@/components/ui/SoupBowl";

const title: Record<Locale, string> = { en: "About", ro: "Despre" };

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: hasLocale(lang) ? title[lang] : title.en,
    alternates: languageAlternates("/about"),
  };
}

// "Now" section. Set SHOW_NOW to false to hide it.
const SHOW_NOW = true;

const now: Record<Locale, { text: string; href: string }[]> = {
  en: [
    { text: "Building apps with AI algorithms and agents at Siemens.", href: "/experience" },
    { text: "Starting a master's in automation and information technologies.", href: "/education" },
    { text: "Teaching programming to high school students.", href: "/experience" },
    { text: "Writing down the absurd ideas, before they escape.", href: "/blog" },
  ],
  ro: [
    { text: "Construiesc aplicații cu algoritmi și agenți AI la Siemens.", href: "/experience" },
    { text: "Încep un master în automatică și tehnologii informatice.", href: "/education" },
    { text: "Predau programare elevilor de liceu.", href: "/experience" },
    { text: "Notez ideile absurde, înainte să-mi scape.", href: "/blog" },
  ],
};

// Shared paragraph styles
const p = { className: "leading-relaxed", style: { color: "var(--color-muted)" } };
const story = {
  className: "leading-relaxed pl-4",
  style: { color: "var(--color-muted)", borderLeft: "2px solid var(--color-border)" },
};

function IntroEn() {
  return (
    <>
      <p {...p}>
        I won&apos;t do the usual presentation. I&apos;ve been a person, a student, a
        teacher, a dumbass, a genius. And now I&apos;m <strong>a thought in your head</strong>.
        Glad you have enough space up here.
      </p>
      <p {...p}>
        I hope that from here on, this feels more like <strong>a nice chat</strong> than a
        reading session.
      </p>
    </>
  );
}

function IntroRo() {
  return (
    <>
      <p {...p}>
        Nu o să fac prezentarea obișnuită. Am fost un om, un student, un profesor, un
        tâmpit, un geniu. Iar acum sunt <strong>un gând în capul tău</strong>. Mă bucur că
        ai destul loc aici sus.
      </p>
      <p {...p}>
        Sper ca de aici încolo să pară mai degrabă <strong>o discuție faină</strong> decât o
        sesiune de citit.
      </p>
    </>
  );
}

function StoryEn() {
  return (
    <>
      <p {...p}>
        I couldn&apos;t say there are things I like or dislike, rather things that feel{" "}
        <strong>aligned and right</strong>. From a young age I <strong>asked questions</strong>{" "}
        and usually tried to come up with answers from the limited knowledge I had
        gathered so far, sometimes false, or not entirely true.
      </p>
      <p {...story}>
        <strong>At 10</strong>, I tried to explain days and years. We live on a planet that
        spins and also goes around the Sun. Days are short and seasons are long, so the
        spin must be the <strong>day-night cycle</strong>: the side not facing the Sun is
        simply dark. For the temperature difference along the year, I guessed the orbit
        might not be <strong>quite a circle</strong>, so at some point we are farther away
        and it gets colder. Brutal and incomplete, of course. The orbit really is a slight
        ellipse, but distance isn&apos;t what makes the seasons. It&apos;s the{" "}
        <strong>tilt of the Earth&apos;s axis</strong>, which also explains why days and
        nights change length along the year, something I completely forgot about. Still,
        I remember that kid&apos;s reasoning, and I still find it quite impressive.
      </p>
      <p {...p}>
        Along the years I found <strong>exact sciences</strong> interesting, and literature
        and reading annoying. Then, eventually, I found math complicated and quite annoying
        too. But along the way I found <strong>relations between sciences</strong>, turning
        into some kind of weird combination.
      </p>
      <p {...p}>
        Take <strong>e</strong>. In math it comes out of pure counting, a sum of fractions
        of permutations: 1 + 1/1! + 1/2! + 1/3! + … Nothing about the world in it. And yet
        the same number shows up when you measure the world: in how radioactive atoms
        decay, how a cup of tea cools down, how a colony of bacteria grows.{" "}
        <strong>Nobody put it there. It just keeps appearing.</strong>
      </p>
      <p {...p}>
        Don&apos;t you find it weird that professors tried so hard to teach you about it?
        Each time you got annoyed, but never asked why. I mean, for real? And that is just
        one of the examples.
      </p>
      <p {...p}>
        And now, at this age, I keep finding things like that. Even literature and
        languages turn out to be just <strong>the same principles</strong>.
      </p>
      <p {...p} className="leading-relaxed italic">
        Ah, how cliché it sounds, but Socrates wasn&apos;t wrong when he said:{" "}
        <strong>&ldquo;I know that I know nothing.&rdquo;</strong>
      </p>
      <p {...p}>
        It&apos;s like <strong>everything dissolved into one</strong>: comforting, but so
        vast that it&apos;s hard to digest.
      </p>
      <p {...p}>
        Picture this: you have a bowl, then you add water and various ingredients for a
        soup. Now you have a soup. <strong>The bowl is space-time</strong>. The water base
        is <strong>the math that mixes everything together</strong>, and all the other
        ingredients are just <strong>the other sciences</strong>.
      </p>
    </>
  );
}

function StoryRo() {
  return (
    <>
      <p {...p}>
        Nu aș putea spune că sunt lucruri care îmi plac sau nu, ci mai degrabă lucruri care
        par <strong>aliniate și corecte</strong>. De mic <strong>puneam întrebări</strong> și
        de obicei încercam să găsesc răspunsuri din puținele cunoștințe adunate până atunci,
        uneori greșite sau nu tocmai adevărate.
      </p>
      <p {...story}>
        <strong>La 10 ani</strong>, am încercat să explic zilele și anii. Trăim pe o planetă
        care se învârte și, în același timp, merge în jurul Soarelui. Zilele sunt scurte și
        anotimpurile sunt lungi, deci învârtirea trebuie să fie{" "}
        <strong>ciclul zi-noapte</strong>: partea care nu e întoarsă spre Soare e pur și
        simplu întunecată. Pentru diferența de temperatură de-a lungul anului, am ghicit că
        orbita poate nu e <strong>chiar un cerc</strong>, așa că la un moment dat suntem mai
        departe și e mai frig. Brutal și incomplet, desigur. Orbita chiar e o elipsă ușoară,
        dar nu distanța face anotimpurile. E <strong>înclinarea axei Pământului</strong>,
        care explică și de ce zilele și nopțile își schimbă lungimea de-a lungul anului,
        lucru pe care l-am uitat complet. Totuși, îmi amintesc raționamentul copilului
        ăluia și încă mi se pare destul de impresionant.
      </p>
      <p {...p}>
        De-a lungul anilor am găsit <strong>științele exacte</strong> interesante, iar
        literatura și cititul enervante. Apoi, cu timpul, am găsit și matematica complicată
        și destul de enervantă. Dar pe parcurs am descoperit{" "}
        <strong>legături între științe</strong>, care s-au transformat într-un fel de
        combinație ciudată.
      </p>
      <p {...p}>
        Ia-l pe <strong>e</strong>. În matematică iese din numărare pură, o sumă de fracții
        de permutări: 1 + 1/1! + 1/2! + 1/3! + … Nimic despre lume în el. Și totuși, același
        număr apare când măsori lumea: în felul în care se dezintegrează atomii radioactivi,
        în care se răcește o cană de ceai, în care crește o colonie de bacterii.{" "}
        <strong>Nu l-a pus nimeni acolo. Pur și simplu continuă să apară.</strong>
      </p>
      <p {...p}>
        Nu ți se pare ciudat că profesorii s-au chinuit atât să te învețe despre el? De
        fiecare dată te enervai, dar n-ai întrebat niciodată de ce. Adică, serios? Și ăsta
        e doar unul dintre exemple.
      </p>
      <p {...p}>
        Iar acum, la vârsta asta, tot găsesc lucruri de genul ăsta. Până și literatura și
        limbile se dovedesc a fi doar <strong>aceleași principii</strong>.
      </p>
      <p {...p} className="leading-relaxed italic">
        Ah, cât de clișeic sună, dar Socrate nu greșea când spunea:{" "}
        <strong>&bdquo;Știu că nu știu nimic.&rdquo;</strong>
      </p>
      <p {...p}>
        E ca și cum <strong>totul s-ar fi dizolvat într-unul singur</strong>: liniștitor, dar
        atât de vast încât e greu de digerat.
      </p>
      <p {...p}>
        Imaginează-ți asta: ai un bol, apoi adaugi apă și diverse ingrediente pentru o supă.
        Acum ai o supă. <strong>Bolul e spațiu-timpul</strong>. Baza de apă e{" "}
        <strong>matematica ce amestecă totul laolaltă</strong>, iar toate celelalte
        ingrediente sunt doar <strong>celelalte științe</strong>.
      </p>
    </>
  );
}

const text = {
  en: { Intro: IntroEn, Story: StoryEn },
  ro: { Intro: IntroRo, Story: StoryRo },
};

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { Intro, Story } = text[lang];

  return (
    <div className="py-16 about-text">
      <p className="mb-2">
        <CommandPrompt>cat about.txt</CommandPrompt>
      </p>
      <h1 className="font-mono text-3xl font-bold mb-12" style={{ color: "var(--color-fg)" }}>
        {title[lang]}
      </h1>

      <div className="space-y-16">
        <section>
          <div className="space-y-4 max-w-2xl">
            <Intro />
          </div>
        </section>

        <section>
          <div className="space-y-4 max-w-2xl">
            <Story />
            <div className="flex justify-center pt-4">
              <SoupBowl size={80} />
            </div>
          </div>
        </section>

        {SHOW_NOW && (
          <section>
            <p className="mb-4">
              <CommandPrompt>cat now.txt</CommandPrompt>
            </p>
            <ul className="space-y-2 max-w-2xl">
              {now[lang].map(({ text, href }) => (
                <li key={text} {...p}>
                  <span style={{ color: "var(--color-prompt)" }}>{"> "}</span>
                  <Link href={localePath(lang, href)} className="hover:underline">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

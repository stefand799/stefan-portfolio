import type { Metadata } from "next";
import { CommandPrompt } from "@/components/ui/CommandPrompt";
import Link from "next/link";
import { SoupBowl } from "@/components/ui/SoupBowl";

export const metadata: Metadata = {
  title: "About",
};

// "Now" section. Set SHOW_NOW to false to hide it.
const SHOW_NOW = true;

const now = [
  { text: "Building apps with AI algorithms and agents at Siemens.", href: "/experience" },
  { text: "Starting a master's in automation and information technologies.", href: "/education" },
  { text: "Teaching programming to high school students.", href: "/experience" },
  { text: "Writing down the absurd ideas, before they escape.", href: "/blog" },
];

export default function AboutPage() {
  return (
    <div className="py-16 about-text">
      <p className="mb-2">
        <CommandPrompt>cat about.txt</CommandPrompt>
      </p>
      <h1
        className="font-mono text-3xl font-bold mb-12"
        style={{ color: "var(--color-fg)" }}
      >
        About
      </h1>

      <div className="space-y-16">
        <section>
          <div className="space-y-4 max-w-2xl">
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I won&apos;t do the usual presentation. I&apos;ve been a person, a
              student, a teacher, a dumbass, a genius. And now I&apos;m <strong>a thought
              in your head</strong>. Glad you have enough space up here.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I hope that from here on, this feels more like <strong>a nice chat</strong> than a
              reading session.
            </p>
          </div>
        </section>

        <section>
          <div className="space-y-4 max-w-2xl">
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I couldn&apos;t say there are things I like or dislike, rather
              things that feel <strong>aligned and right</strong>. From a young age I <strong>asked
              questions</strong> and usually tried to come up with answers from the
              limited knowledge I had gathered so far, sometimes false, or not
              entirely true.
            </p>
            <p
              className="leading-relaxed pl-4"
              style={{
                color: "var(--color-muted)",
                borderLeft: "2px solid var(--color-border)",
              }}
            >
              <strong>At 10</strong>, I tried to explain days and years. We live on a planet
              that spins and also goes around the Sun. Days are short and
              seasons are long, so the spin must be the <strong>day-night cycle</strong>: the
              side not facing the Sun is simply dark. For the temperature
              difference along the year, I guessed the orbit might not be
              {" "}<strong>quite a circle</strong>, so at some point we are farther away and it gets
              colder. Brutal and incomplete, of course. The orbit really is a
              slight ellipse, but distance isn&apos;t what makes the seasons.
              It&apos;s the <strong>tilt of the Earth&apos;s axis</strong>, which also explains
              why days and nights change length along the year, something I
              completely forgot about. Still, I remember that kid&apos;s reasoning,
              and I still find it quite impressive.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Along the years I found <strong>exact sciences</strong> interesting, and
              literature and reading annoying. Then, eventually, I found math
              complicated and quite annoying too. But along the way I found
              {" "}<strong>relations between sciences</strong>, turning into some kind of solution.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Take <strong>e</strong>. In math it comes out of pure counting, a sum
              of fractions of permutations: 1 + 1/1! + 1/2! + 1/3! + … Nothing
              about the world in it. And yet the same number shows up when you
              measure the world: in how radioactive atoms decay, how a cup of
              tea cools down, how a colony of bacteria grows.{" "}
              <strong>Nobody put it there. It just keeps appearing.</strong>
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Don&apos;t you find it weird that professors tried so hard to teach
              you about it? Each time you got annoyed, but never asked why. I
              mean, for real? And that is just one of the examples.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              And now, at this age, I keep finding things like that. Even
              literature and languages turn out to be just{" "}
              <strong>the same principles</strong>.
            </p>
            <p className="leading-relaxed italic" style={{ color: "var(--color-muted)" }}>
              Ah, how cliché it sounds, but Socrates wasn&apos;t wrong when he
              said: <strong>&ldquo;I know that I know nothing.&rdquo;</strong>
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              It&apos;s like <strong>everything dissolved into one</strong>:
              comforting, but so vast that it&apos;s hard to digest.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Picture this: you have a bowl, then you add water and various
              ingredients for a soup. Now you have a soup. <strong>The bowl is
              space-time</strong>. The water base is <strong>the math that mixes everything
              together</strong>, and all the other ingredients are just <strong>the other
              sciences</strong>.
            </p>
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
              {now.map(({ text, href }) => (
                <li key={text} className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  <span style={{ color: "var(--color-prompt)" }}>{"> "}</span>
                  <Link href={href} className="hover:underline">
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

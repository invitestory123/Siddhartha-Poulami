import { Letters } from "@/hooks/use-letters";

/**
 * Static "Siddhartha & Poulami" headline. Rendered without entrance animation so
 * the names are always visible the moment React hydrates — no GSAP, no
 * opacity transitions, no transform. The letter spans preserve the
 * gold-text gradient and inline layout; they are not animated.
 */
export function LetterH1() {
  return (
    <h1
      className="mt-5 font-display text-4xl leading-tight gold-text sm:text-7xl md:text-8xl"
      style={{ opacity: 1 }}
    >
      <Letters text="Siddhartha" />
      <span className="mx-2 align-middle text-2xl sm:mx-3 sm:text-5xl">&amp;</span>
      <Letters text="Poulami" />
    </h1>
  );
}

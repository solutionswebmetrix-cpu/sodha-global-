import { useState, useEffect } from 'react';

const DEFAULT_PHRASES = [
  ['The', 'Essence', 'of', 'India,'],
  ['Crafted', 'for', 'the', 'World'],
];

interface AnimatedHeroHeadingProps {
  phrases?: string[][];
  wordDelay?: number; // milliseconds between words (default: 600)
  pauseAfterComplete?: number; // pause after phrase completes (default: 1500)
  showCursor?: boolean; // show blinking cursor (default: true)
}

export default function AnimatedHeroHeading({
  phrases = DEFAULT_PHRASES,
  wordDelay = 600,
  pauseAfterComplete = 1500,
  showCursor = true,
}: AnimatedHeroHeadingProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show all content statically
      setVisibleWords([...phrases.flat()]);
      return;
    }

    const currentPhrase = phrases[currentPhraseIndex];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let currentTime = 0;

    // Type each word in the current phrase
    currentPhrase.forEach((word) => {
      const timeout = setTimeout(() => {
        setVisibleWords((prev) => [...prev, word]);
        setIsTyping(true);
      }, currentTime);
      timeouts.push(timeout);
      currentTime += wordDelay;
    });

    // Pause after phrase is complete
    currentTime += pauseAfterComplete;

    // Clear the phrase
    const clearPhrase = setTimeout(() => {
      setVisibleWords([]);
      setIsTyping(false);
    }, currentTime);
    timeouts.push(clearPhrase);

    // Brief gap before moving to next phrase
    currentTime += 300;

    // Move to next phrase
    const nextTimeout = setTimeout(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, currentTime);
    timeouts.push(nextTimeout);

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [currentPhraseIndex, phrases, wordDelay, pauseAfterComplete, prefersReducedMotion]);

  const displayText = visibleWords.join(' ');

  return (
    <h1
      className="mx-auto max-w-5xl text-hero font-display font-bold text-ivory-50 opacity-0 animate-fade-up leading-tight"
      style={{ animationDelay: '0.4s', minHeight: '1.2em' }}
    >
      {prefersReducedMotion ? (
        // Static fallback for accessibility
        <>
          The Essence of India,
          <br />
          <span className="italic font-medium text-copper-300">Crafted for the World</span>
        </>
      ) : (
        // Typewriter animation
        <>
          {currentPhraseIndex === 0 && (
            <>
              {displayText}
              {isTyping && showCursor && <span className="animate-pulse ml-1">|</span>}
              <br />
            </>
          )}
          {currentPhraseIndex === 1 && (
            <span className="italic font-medium text-copper-300">
              {displayText}
              {isTyping && showCursor && <span className="animate-pulse ml-1">|</span>}
            </span>
          )}
        </>
      )}
    </h1>
  );
}

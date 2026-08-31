import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {eyebrow && (
        <p className={`text-eyebrow mb-4 ${light ? 'text-copper-300' : ''}`}>{eyebrow}</p>
      )}
      <h2
        className={`text-display font-display font-semibold ${
          light ? 'text-ivory-50' : 'text-charcoal-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-ivory-200/80' : 'text-charcoal-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

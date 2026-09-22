import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/velora/blur-fade";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title: string;
  description?: string;
  /** Anchor id for in-page links. */
  id?: string;
  eyebrow?: string;
  className?: string;
  /** When true, emit FAQPage JSON-LD for the visible Q&A. */
  jsonLd?: boolean;
}

function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Shared marketing FAQ — accordion + optional schema.org FAQPage markup. */
export function FaqSection({
  items,
  title,
  description,
  id = "faq",
  eyebrow,
  className,
  jsonLd = false,
}: FaqSectionProps) {
  const headingId = `${id}-heading`;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className={cn("py-24 lg:py-32", className)}
    >
      {jsonLd ? <FaqJsonLd items={items} /> : null}
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <BlurFade>
          {eyebrow ? (
            <p className="text-center text-sm font-medium text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className={cn(
              "text-center text-3xl font-semibold tracking-tight text-balance lg:text-4xl",
              eyebrow && "mt-3"
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              id={descriptionId}
              className="mx-auto mt-4 max-w-xl text-center text-muted-foreground text-pretty"
            >
              {description}
            </p>
          ) : null}
        </BlurFade>
        <BlurFade delay={0.15}>
          <Accordion
            type="single"
            collapsible
            className="mt-12"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
          >
            {items.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}

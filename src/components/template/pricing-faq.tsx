import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/velora/blur-fade";
import { cn } from "@/lib/utils";

export const pricingFaqs = [
  {
    q: "Is the free tier really enough to ship?",
    a: "Yes. Everything on this site — every animation, page and section — is the free tier. If your product needs one great landing site, you never have to pay us anything.",
  },
  {
    q: "Do I need Pro to use the components?",
    a: "No. All 32+ animated components and the complete multi-page template are MIT licensed and free. Pro only adds extra niches, section variants, Figma source, and waitlist / newsletter / Stripe wiring.",
  },
  {
    q: "Can I use Velora in commercial or client projects?",
    a: "Yes. The free tier is MIT licensed — use it in client work, products you sell, and internal tools. No attribution required.",
  },
  {
    q: "Is Pro a subscription?",
    a: "No. Pro is a one-time payment with lifetime access and lifetime updates. No renewals, no seat counting for small teams.",
  },
  {
    q: "What's included in the Pro team license?",
    a: "Pro includes a team license, so everyone at your company can use the files. There are no per-seat fees for small teams.",
  },
  {
    q: "Can I start on Free and upgrade later?",
    a: "Yes. Free stays free forever — nothing you ship on it is taken away. When Pro launches, waitlist members get launch pricing and early access.",
  },
  {
    q: "How does this compare to Magic UI Pro or Aceternity Pro?",
    a: "Those run $169–$199 for templates and sections. Velora gives away a complete multi-page template for free and prices Pro at $99 — with a team license included instead of sold separately.",
  },
  {
    q: "What happens when Pro launches?",
    a: "Waitlist members get launch pricing and early access. The free tier stays free forever — Pro only ever adds breadth on top.",
  },
];

interface PricingFaqProps {
  className?: string;
}

export function PricingFaq({ className }: PricingFaqProps) {
  return (
    <section
      id="pricing-faq"
      aria-labelledby="pricing-faq-heading"
      className={cn("py-24 lg:py-32", className)}
    >
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <BlurFade>
          <p className="text-center text-sm font-medium text-primary">FAQ</p>
          <h2
            id="pricing-faq-heading"
            className="mt-3 text-center text-3xl font-semibold tracking-tight text-balance lg:text-4xl"
          >
            Questions about pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground text-pretty">
            Free is the whole product. Here&apos;s how the plans work, what Pro
            adds, and when you might want it.
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <Accordion type="single" collapsible className="mt-12">
            {pricingFaqs.map((faq) => (
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
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still deciding?{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Talk to us
            </Link>
            {" "}
            about licensing or the Pro waitlist.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

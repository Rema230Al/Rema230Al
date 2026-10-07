import { gsap } from "@/lib/gsap";

/** SOL's section entrance: masked title words rise, `.rv-fade` elements fade up. Call inside useGSAP. */
export function revealOnScroll(trigger: HTMLElement) {
  const q = gsap.utils.selector(trigger);
  gsap.from(q(".rv-title .mask-inner"), {
    yPercent: 115,
    stagger: 0.08,
    duration: 1.4,
    ease: "expo.out",
    scrollTrigger: { trigger, start: "top 70%", toggleActions: "play none none reverse" },
  });
  gsap.from(q(".rv-fade"), {
    opacity: 0,
    y: 20,
    stagger: 0.08,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger, start: "top 60%", toggleActions: "play none none reverse" },
  });
}

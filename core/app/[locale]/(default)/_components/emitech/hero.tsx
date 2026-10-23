import { useTranslations } from 'next-intl';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';

export function Hero() {
  const t = useTranslations('Home.Hero');

  return (
    <section className="relative overflow-hidden bg-foreground text-background @container">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-primary opacity-20 blur-3xl @4xl:size-[40rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 size-[22rem] rounded-full bg-primary opacity-10 blur-3xl"
      />
      <div className="relative mx-auto max-w-[var(--section-max-width-2xl,1536px)] px-4 py-16 @xl:px-6 @xl:py-24 @4xl:px-8 @4xl:py-32">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/20 px-3 py-1 font-[family-name:var(--font-family-mono)] text-xs uppercase tracking-widest text-background/80">
          <span className="size-2 rounded-full bg-primary" />
          {t('eyebrow')}
        </p>
        <h1 className="max-w-4xl font-[family-name:var(--font-family-heading)] text-4xl font-medium leading-[1.05] tracking-tight @xl:text-5xl @4xl:text-7xl">
          {t('title')}
          <span className="text-primary">_</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-background/75 @xl:text-xl">{t('description')}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/shop-all" size="large">
            {t('primaryCta')}
          </ButtonLink>
          <ButtonLink
            className="border-background/30 text-background"
            href="/b2b"
            size="large"
            variant="tertiary"
          >
            {t('secondaryCta')}
          </ButtonLink>
        </div>
        <ul className="mt-14 grid max-w-3xl grid-cols-1 gap-4 border-t border-background/15 pt-8 text-sm text-background/70 @md:grid-cols-3">
          <li>
            <strong className="block text-base font-medium text-background">
              {t('Proof1.title')}
            </strong>
            {t('Proof1.text')}
          </li>
          <li>
            <strong className="block text-base font-medium text-background">
              {t('Proof2.title')}
            </strong>
            {t('Proof2.text')}
          </li>
          <li>
            <strong className="block text-base font-medium text-background">
              {t('Proof3.title')}
            </strong>
            {t('Proof3.text')}
          </li>
        </ul>
      </div>
    </section>
  );
}

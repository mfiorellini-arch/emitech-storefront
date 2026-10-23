import { useTranslations } from 'next-intl';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';
import { SectionLayout } from '@/vibes/soul/sections/section-layout';

export function B2BBand() {
  const t = useTranslations('Home.B2B');

  return (
    <SectionLayout className="bg-foreground text-background">
      <div className="flex flex-col gap-8 @3xl:flex-row @3xl:items-center @3xl:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 font-[family-name:var(--font-family-mono)] text-xs uppercase tracking-widest text-primary">
            {t('eyebrow')}
          </p>
          <h2 className="font-[family-name:var(--font-family-heading)] text-3xl font-medium leading-tight @xl:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-background/75">{t('description')}</p>
        </div>
        <ButtonLink className="shrink-0" href="/b2b" size="large">
          {t('cta')}
        </ButtonLink>
      </div>
    </SectionLayout>
  );
}

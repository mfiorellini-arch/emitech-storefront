import { useTranslations } from 'next-intl';

import { SectionLayout } from '@/vibes/soul/sections/section-layout';

const steps = ['Step1', 'Step2', 'Step3'] as const;

export function HowItWorks() {
  const t = useTranslations('Home.HowItWorks');

  return (
    <SectionLayout>
      <div className="mb-10 max-w-2xl">
        <h2 className="font-[family-name:var(--font-family-heading)] text-3xl font-medium leading-none @xl:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-3 text-contrast-500">{t('description')}</p>
      </div>
      <ol className="grid grid-cols-1 gap-6 @md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            className="rounded-lg border border-contrast-100 bg-background p-6 @xl:p-8"
            key={step}
          >
            <span className="mb-6 inline-flex size-10 items-center justify-center rounded-full bg-primary font-[family-name:var(--font-family-mono)] text-sm font-medium text-foreground">
              0{index + 1}
            </span>
            <h3 className="font-[family-name:var(--font-family-heading)] text-xl font-medium">
              {t(`${step}.title`)}
            </h3>
            <p className="mt-2 text-contrast-500">{t(`${step}.text`)}</p>
          </li>
        ))}
      </ol>
    </SectionLayout>
  );
}

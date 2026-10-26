import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';
import { SectionLayout } from '@/vibes/soul/sections/section-layout';
import { getOptionalPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import { getMetadataAlternates } from '~/lib/seo/canonical';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'B2B' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: await getMetadataAlternates({ path: '/b2b', locale }),
  };
}

// Placeholder B2B page. A Makeswift page published at `/b2b` replaces it once Makeswift is set up.
export default async function B2BPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const snapshot = await getOptionalPageSnapshot({ path: '/b2b', locale });

  if (snapshot != null) {
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  }

  const t = await getTranslations('B2B');

  return (
    <SectionLayout>
      <div className="mx-auto max-w-3xl py-10 @xl:py-16">
        <p className="mb-3 font-[family-name:var(--font-family-mono)] text-xs uppercase tracking-widest text-primary">
          {t('eyebrow')}
        </p>
        <h1 className="font-[family-name:var(--font-family-heading)] text-4xl font-medium leading-tight @xl:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg text-contrast-500">{t('description')}</p>
        <p className="mt-4 text-contrast-500">{t('comingSoon')}</p>
        <div className="mt-10">
          <ButtonLink href="/shop-all" size="large" variant="tertiary">
            {t('cta')}
          </ButtonLink>
        </div>
      </div>
    </SectionLayout>
  );
}

import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { SectionLayout } from '@/vibes/soul/sections/section-layout';
import { Image } from '~/components/image';
import { Link } from '~/components/link';

export interface HomeCategory {
  name: string;
  path: string;
  image?: { url: string; altText: string } | null;
}

export async function CategoryGrid({ categories }: { categories: Streamable<HomeCategory[]> }) {
  const t = await getTranslations('Home.Categories');

  return (
    <SectionLayout className="bg-contrast-100">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-family-heading)] text-3xl font-medium leading-none @xl:text-4xl">
          {t('title')}
        </h2>
        <Link
          className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
          href="/shop-all"
        >
          {t('cta')} <ArrowRight size={18} />
        </Link>
      </div>
      <Stream fallback={null} value={categories}>
        {(items) =>
          items.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 @xl:grid-cols-4">
              {items.map((category) => (
                <li key={category.path}>
                  <Link
                    className="group flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg bg-background p-5 ring-1 ring-contrast-200 transition-shadow hover:shadow-lg"
                    href={category.path}
                  >
                    {category.image ? (
                      <Image
                        alt={category.image.altText}
                        className="mb-auto h-24 w-auto self-start object-contain"
                        height={96}
                        src={category.image.url}
                        width={160}
                      />
                    ) : null}
                    <span className="font-[family-name:var(--font-family-heading)] text-lg font-medium group-hover:text-primary @xl:text-xl">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-contrast-500">{t('empty')}</p>
          )
        }
      </Stream>
    </SectionLayout>
  );
}

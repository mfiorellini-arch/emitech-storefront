import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { Metadata } from 'next';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';
import { FeaturedProductCarousel } from '@/vibes/soul/sections/featured-product-carousel';
import { FeaturedProductList } from '@/vibes/soul/sections/featured-product-list';
import { getSessionCustomerAccessToken } from '~/auth';
import { Subscribe } from '~/components/subscribe';
import { productCardTransformer } from '~/data-transformers/product-card-transformer';
import { getPreferredCurrencyCode } from '~/lib/currency';
import { getMakeswiftPageMetadata } from '~/lib/makeswift';
import { getOptionalPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import { getMetadataAlternates } from '~/lib/seo/canonical';

import { B2BBand } from './_components/emitech/b2b-band';
import { CategoryGrid } from './_components/emitech/category-grid';
import { Hero } from './_components/emitech/hero';
import { HowItWorks } from './_components/emitech/how-it-works';
import { getPageData } from './page-data';

interface Params {
  locale: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home.Meta' });
  const metadata = await getMakeswiftPageMetadata({ path: '/', locale });

  return {
    title: metadata?.title ?? t('title'),
    description: metadata?.description ?? t('description'),
    alternates: await getMetadataAlternates({ path: '/', locale }),
  };
}

// Home page strategy: if a Makeswift page is published at `/` for this locale, it wins and can be
// edited visually. Otherwise we render the code-defined Emi_Tech home below, which ships at launch.
export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const snapshot = await getOptionalPageSnapshot({ path: '/', locale });

  if (snapshot != null) {
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  }

  const t = await getTranslations('Home');
  const format = await getFormatter();

  const streamablePageData = Streamable.from(async () => {
    const customerAccessToken = await getSessionCustomerAccessToken();
    const currencyCode = await getPreferredCurrencyCode();

    return getPageData(currencyCode, customerAccessToken);
  });

  const streamableCategories = Streamable.from(async () => {
    const data = await streamablePageData;

    return data.site.categoryTree.slice(0, 8).map((category) => ({
      name: category.name,
      path: category.path,
      image: category.image,
    }));
  });

  const streamableFeaturedProducts = Streamable.from(async () => {
    const data = await streamablePageData;
    const featuredProducts = removeEdgesAndNodes(data.site.featuredProducts);
    const { defaultOutOfStockMessage, showOutOfStockMessage, showBackorderMessage } =
      data.site.settings?.inventory ?? {};
    const taxDisplay = data.site.settings?.tax?.plp;

    return productCardTransformer(
      featuredProducts,
      format,
      showOutOfStockMessage ? defaultOutOfStockMessage : undefined,
      showBackorderMessage,
      taxDisplay,
    );
  });

  const streamableNewestProducts = Streamable.from(async () => {
    const data = await streamablePageData;
    const newestProducts = removeEdgesAndNodes(data.site.newestProducts);
    const { defaultOutOfStockMessage, showOutOfStockMessage, showBackorderMessage } =
      data.site.settings?.inventory ?? {};
    const taxDisplay = data.site.settings?.tax?.plp;

    return productCardTransformer(
      newestProducts,
      format,
      showOutOfStockMessage ? defaultOutOfStockMessage : undefined,
      showBackorderMessage,
      taxDisplay,
    );
  });

  const streamableShowNewsletterSignup = Streamable.from(async () => {
    const data = await streamablePageData;

    return data.site.settings?.newsletter?.showNewsletterSignup;
  });

  return (
    <>
      <Hero />

      <CategoryGrid categories={streamableCategories} />

      <FeaturedProductList
        cta={{ label: t('FeaturedProducts.cta'), href: '/shop-all' }}
        description={t('FeaturedProducts.description')}
        emptyStateSubtitle={t('FeaturedProducts.emptyStateSubtitle')}
        emptyStateTitle={t('FeaturedProducts.emptyStateTitle')}
        products={streamableFeaturedProducts}
        title={t('FeaturedProducts.title')}
      />

      <HowItWorks />

      <FeaturedProductCarousel
        cta={{ label: t('NewestProducts.cta'), href: '/shop-all/?sort=newest' }}
        description={t('NewestProducts.description')}
        emptyStateSubtitle={t('NewestProducts.emptyStateSubtitle')}
        emptyStateTitle={t('NewestProducts.emptyStateTitle')}
        nextLabel={t('NewestProducts.nextProducts')}
        previousLabel={t('NewestProducts.previousProducts')}
        products={streamableNewestProducts}
        title={t('NewestProducts.title')}
      />

      <B2BBand />

      <Stream fallback={null} value={streamableShowNewsletterSignup}>
        {(showNewsletterSignup) => (showNewsletterSignup ? <Subscribe /> : null)}
      </Stream>
    </>
  );
}

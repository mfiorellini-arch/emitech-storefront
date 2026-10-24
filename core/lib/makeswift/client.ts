import { Makeswift } from '@makeswift/runtime/next';
import { getSiteVersion } from '@makeswift/runtime/next/server';
import { strict } from 'assert';
import { getLocale } from 'next-intl/server';

import { getLocaleRouting } from '~/i18n/locale-config';

import { runtime } from './runtime';

strict(process.env.MAKESWIFT_SITE_API_KEY, 'MAKESWIFT_SITE_API_KEY is required');

export const client = new Makeswift(process.env.MAKESWIFT_SITE_API_KEY, {
  runtime,
});

export const getPageSnapshot = async ({ path, locale }: { path: string; locale: string }) =>
  await client.getPageSnapshot(path, {
    siteVersion: await getSiteVersion(),
    locale: await normalizeLocale(locale),
  });

// Like `getPageSnapshot`, but returns `null` when Makeswift is not configured yet, so the caller
// can render a code-defined page instead of 500ing.
export const getOptionalPageSnapshot = async (args: { path: string; locale: string }) => {
  if (!isMakeswiftConfigured()) return null;

  try {
    return await getPageSnapshot(args);
  } catch (error) {
    if (isUnauthorizedError(error)) {
      warnUnauthorized(args.path);

      return null;
    }

    throw error;
  }
};

export const getComponentSnapshot = async (snapshotId: string) => {
  const siteVersion = await getSiteVersion();
  const locale = await normalizeLocale(await getLocale());

  try {
    return await client.getComponentSnapshot(snapshotId, { siteVersion, locale });
  } catch (error) {
    // Makeswift 404s component snapshots for a locale the site hasn't added, so fall back to
    // the default locale's content.
    if (locale !== undefined && isNotFoundError(error)) {
      return await client.getComponentSnapshot(snapshotId, { siteVersion, locale: undefined });
    }

    throw error;
  }
};

// Like `getComponentSnapshot`, but returns `null` when Makeswift is not configured yet (missing or
// invalid `MAKESWIFT_SITE_API_KEY`), so callers can render a code-defined fallback instead of 500ing.
export const getOptionalComponentSnapshot = async (snapshotId: string) => {
  if (!isMakeswiftConfigured()) return null;

  try {
    return await getComponentSnapshot(snapshotId);
  } catch (error) {
    if (isUnauthorizedError(error)) {
      warnUnauthorized(snapshotId);

      return null;
    }

    throw error;
  }
};

function isMakeswiftConfigured(): boolean {
  const apiKey = process.env.MAKESWIFT_SITE_API_KEY;

  return Boolean(apiKey) && apiKey !== 'todo';
}

function warnUnauthorized(what: string) {
  // eslint-disable-next-line no-console
  console.warn(
    `Makeswift rejected MAKESWIFT_SITE_API_KEY while loading '${what}'; rendering the code-defined fallback.`,
  );
}

function isUnauthorizedError(error: unknown): boolean {
  return (
    error instanceof Error && 'status' in error && (error.status === 401 || error.status === 403)
  );
}

// `RestApiClientError` isn't exported by `@makeswift/runtime`.
function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && 'status' in error && error.status === 404;
}

async function normalizeLocale(locale: string): Promise<string | undefined> {
  const { defaultLocale } = await getLocaleRouting();

  return locale === defaultLocale ? undefined : locale;
}

export async function getMakeswiftPageMetadata({ path, locale }: { path: string; locale: string }) {
  if (!isMakeswiftConfigured()) return null;

  let pages: Awaited<ReturnType<typeof client.getPages>>['data'];

  try {
    ({ data: pages } = await client.getPages({
      pathPrefix: path,
      locale: await normalizeLocale(locale),
      siteVersion: await getSiteVersion(),
    }));
  } catch (error) {
    if (isUnauthorizedError(error)) {
      warnUnauthorized(`pages ${path}`);

      return null;
    }

    throw error;
  }

  if (pages.length === 0 || !pages[0]) {
    return null;
  }

  const { title, description } = pages[0];

  return {
    ...(title && { title }),
    ...(description && { description }),
  };
}

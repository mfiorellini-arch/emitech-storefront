// Plain module (no 'use client') so both server and client components get the real values.
// Importing a const from a 'use client' module into a server component yields a client
// reference instead of the value, which is how the fallback ended up with `source: undefined`.
export const DescriptionSource = {
  CatalogPlainText: 'CatalogPlainText',
  CatalogRichText: 'CatalogRichText',
  Custom: 'Custom',
} as const;

export type DescriptionSource = (typeof DescriptionSource)[keyof typeof DescriptionSource];

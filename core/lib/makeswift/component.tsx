import { type ReactNode } from 'react';

import { getOptionalComponentSnapshot } from '~/lib/makeswift/client';

import { MakeswiftComponentShim } from './makeswift-component-shim';

export const Component = async ({
  snapshotId,
  label,
  fallback = null,
  ...props
}: {
  type: string;
  label: string | Promise<string>;
  snapshotId: string;
  /** Rendered when Makeswift is not configured (missing or rejected API key). */
  fallback?: ReactNode;
}) => {
  const snapshot = await getOptionalComponentSnapshot(snapshotId);

  if (snapshot == null) return fallback;

  return <MakeswiftComponentShim label={await label} snapshot={snapshot} {...props} />;
};

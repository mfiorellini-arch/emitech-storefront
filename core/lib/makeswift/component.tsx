import { getOptionalComponentSnapshot } from '~/lib/makeswift/client';

import { MakeswiftComponentShim } from './makeswift-component-shim';

export const Component = async ({
  snapshotId,
  label,
  ...props
}: {
  type: string;
  label: string | Promise<string>;
  snapshotId: string;
}) => {
  const snapshot = await getOptionalComponentSnapshot(snapshotId);

  if (snapshot == null) return null;

  return <MakeswiftComponentShim label={await label} snapshot={snapshot} {...props} />;
};

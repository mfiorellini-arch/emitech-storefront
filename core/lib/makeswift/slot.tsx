import { Slot as MakeswiftSlot } from '@makeswift/runtime/next';

import { getOptionalComponentSnapshot } from './client';

export async function Slot({
  snapshotId,
  label,
  fallback,
}: {
  snapshotId: string;
  label: string;
  fallback?: React.ReactNode;
}) {
  const snapshot = await getOptionalComponentSnapshot(snapshotId);

  if (snapshot == null) return fallback ?? null;

  return <MakeswiftSlot fallback={fallback} label={label} snapshot={snapshot} />;
}

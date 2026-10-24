import { MakeswiftComponent } from '@makeswift/runtime/next';
import { type ComponentPropsWithoutRef } from 'react';

import { HeaderSection } from '@/vibes/soul/sections/header-section';
import { getOptionalComponentSnapshot } from '~/lib/makeswift/client';

import { PropsContextProvider } from './client';
import { COMPONENT_TYPE } from './register';

type Props = ComponentPropsWithoutRef<typeof HeaderSection> & {
  snapshotId?: string;
  label?: string;
};

export const SiteHeader = async ({
  snapshotId = 'site-header',
  label = 'Site Header',
  navigation,
  ...props
}: Props) => {
  const snapshot = await getOptionalComponentSnapshot(snapshotId);
  const links = await navigation.links;

  if (snapshot == null) {
    return <HeaderSection {...props} navigation={{ ...navigation, links }} />;
  }

  return (
    <PropsContextProvider value={{ ...props, navigation: { ...navigation, links } }}>
      <MakeswiftComponent label={label} snapshot={snapshot} type={COMPONENT_TYPE} />
    </PropsContextProvider>
  );
};

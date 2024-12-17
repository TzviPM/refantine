import React from "react";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import { Avatar, Group, AppShell, Title } from "@mantine/core";

import type { RefineLayoutHeaderProps } from "../types";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  return shouldRenderHeader ? (
    <AppShell.Header h={50} py={6} px="sm">
      <Group justify="right">
        <Title order={6}>{user?.name}</Title>
        <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
      </Group>
    </AppShell.Header>
  ) : null;
};

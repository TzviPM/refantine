import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import {
  AppShell,
  Avatar,
  Flex,
  type MantineStyleProp,
  Title,
  useMantineTheme,
} from "@mantine/core";

import type { RefineThemedLayoutV2HeaderProps } from "../types";
import { HamburgerMenu } from "../hamburgerMenu";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const theme = useMantineTheme();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const borderColor = theme.colors.gray[2];

  let stickyStyles: MantineStyleProp = {};
  if (pickNotDeprecated(sticky, isSticky)) {
    stickyStyles = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <AppShell.Header
      zIndex={199}
      h={64}
      py={6}
      px="sm"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <Flex align="center" gap="sm">
          {user?.name && (
            <Title order={6} data-testid="header-user-name">
              {user?.name}
            </Title>
          )}
          {user?.avatar && (
            <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
          )}
        </Flex>
      </Flex>
    </AppShell.Header>
  );
};

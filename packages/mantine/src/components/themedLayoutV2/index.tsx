import React from "react";
import { Box, Flex } from "@mantine/core";

import type { RefineThemedLayoutV2Props } from "./types";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  initialSiderCollapsed,
  children,
  onSiderCollapsed,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Flex>
        <SiderToRender Title={Title} />
        <Flex direction="column" flex={1}>
          <HeaderToRender />
          <Box
            component="main"
            style={(theme) => ({
              padding: theme.spacing.sm,
            })}
          >
            {children}
          </Box>
          {Footer && <Footer />}
        </Flex>
        {OffLayoutArea && <OffLayoutArea />}
      </Flex>
    </ThemedLayoutContextProvider>
  );
};

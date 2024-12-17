import React from "react";
import { Box, Flex, useMantineTheme } from "@mantine/core";

import type { RefineLayoutLayoutProps } from "./types";
import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";

/**
 * @deprecated use `<ThemedLayout>` instead with 100% backward compatibility.
 * @see https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout
 **/
export const Layout: React.FC<RefineLayoutLayoutProps> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const theme = useMantineTheme();

  return (
    <Flex>
      <SiderToRender Title={Title} />
      <Flex dir="column" flex={1} style={{ overflow: "auto" }}>
        <HeaderToRender />
        <Box
          component="main"
          style={{
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.gray[0],
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Flex>
      {OffLayoutArea && <OffLayoutArea />}
    </Flex>
  );
};

import React, { type CSSProperties } from "react";
import {
  CanAccess,
  type ITreeMenu,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useActiveAuthProvider,
  useRefineContext,
  useRouterContext,
  useRouterType,
  useTitle,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import {
  Box,
  Drawer,
  NavLink,
  type NavLinkStylesNames,
  ScrollArea,
  Tooltip,
  type TooltipProps,
  type Styles,
  useMantineTheme,
  Flex,
  type NavLinkFactory,
  AppShell,
} from "@mantine/core";
import { IconList, IconPower, IconDashboard } from "@tabler/icons-react";

import { ThemedTitleV2 as DefaultTitle } from "@components";
import { useThemedLayoutContext } from "@hooks";

import type { RefineThemedLayoutV2SiderProps } from "../types";

const defaultNavIcon = <IconList size={20} />;

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
  render,
  meta,
  Title: TitleFromProps,
  activeItemDisabled = false,
}) => {
  const theme = useMantineTheme();
  const { siderCollapsed, mobileSiderOpen, setMobileSiderOpen } =
    useThemedLayoutContext();

  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;

  const { defaultOpenKeys, menuItems, selectedKey } = useMenu({ meta });
  const TitleFromContext = useTitle();
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const drawerWidth = () => {
    if (siderCollapsed) return 80;
    return 200;
  };

  const borderColor = theme.colors.gray[2];

  const commonNavLinkStyles: Styles<NavLinkFactory> = {
    root: {
      display: "flex",
      marginTop: "12px",
      justifyContent:
        siderCollapsed && !mobileSiderOpen ? "center" : "flex-start",
    },
    section: {
      marginRight: siderCollapsed && !mobileSiderOpen ? 0 : 12,
    },
    body: {
      display: siderCollapsed && !mobileSiderOpen ? "none" : "flex",
    },
  };

  const commonTooltipProps: Partial<TooltipProps> = {
    disabled: !siderCollapsed || mobileSiderOpen,
    position: "right",
    withinPortal: true,
    withArrow: true,
    arrowSize: 8,
    arrowOffset: 12,
    offset: 4,
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item) => {
      const { icon, label, route, name, children } = item;

      const isSelected = item.key === selectedKey;
      const isParent = children.length > 0;

      const additionalLinkProps = isParent
        ? {}
        : { component: Link as any, to: route };

      const disablePointerStyle: CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      return (
        <CanAccess
          key={item.key}
          resource={name}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Tooltip label={label} {...commonTooltipProps}>
            <NavLink
              key={item.key}
              label={siderCollapsed && !mobileSiderOpen ? null : label}
              icon={icon ?? defaultNavIcon}
              active={isSelected}
              childrenOffset={siderCollapsed && !mobileSiderOpen ? 0 : 12}
              defaultOpened={defaultOpenKeys.includes(item.key || "")}
              pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
              styles={commonNavLinkStyles}
              style={disablePointerStyle}
              {...additionalLinkProps}
            >
              {isParent && renderTreeView(children, selectedKey)}
            </NavLink>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <NavLink
          key="dashboard"
          label={
            siderCollapsed && !mobileSiderOpen
              ? null
              : t("dashboard.title", "Dashboard")
          }
          icon={<IconDashboard size={20} />}
          component={Link as any}
          to="/"
          active={selectedKey === "/"}
          styles={commonNavLinkStyles}
        />
      </Tooltip>
    </CanAccess>
  ) : null;

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <NavLink
        key="logout"
        label={
          siderCollapsed && !mobileSiderOpen
            ? null
            : t("buttons.logout", "Logout")
        }
        leftSection={<IconPower size={20} />}
        pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
        onClick={handleLogout}
        styles={commonNavLinkStyles}
      />
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed: siderCollapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  return (
    <>
      <Drawer
        hiddenFrom="md"
        opened={mobileSiderOpen}
        onClose={() => setMobileSiderOpen(false)}
        size={200}
        zIndex={1200}
        withCloseButton={false}
        styles={{
          root: {
            overflow: "hidden",
          },
        }}
      >
        <AppShell.Section
          pl={8}
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <RenderToTitle collapsed={false} />
        </AppShell.Section>
        <AppShell.Section component={ScrollArea} grow mx="-xs" px="xs">
          {renderSider()}
        </AppShell.Section>
      </Drawer>

      <Box
        visibleFrom="md"
        style={{
          width: drawerWidth(),
          transition: "width 200ms ease, min-width 200ms ease",
          flexShrink: 0,
        }}
      />

      <AppShell.Navbar
        visibleFrom="md"
        w={{ base: drawerWidth() }}
        style={{
          overflow: "hidden",
          transition: "width 200ms ease, min-width 200ms ease",
          position: "fixed",
          top: 0,
          height: "100vh",
          borderRight: 0,
          zIndex: 199,
        }}
      >
        <Flex
          h="64px"
          pl={siderCollapsed ? 0 : "16px"}
          align="center"
          justify={siderCollapsed ? "center" : "flex-start"}
          style={{
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <RenderToTitle collapsed={siderCollapsed} />
        </Flex>
        <AppShell.Section
          grow
          component={ScrollArea}
          mx="-xs"
          px="xs"
          style={{
            ".mantine-ScrollArea-viewport": {
              borderRight: `1px solid ${borderColor}`,
              borderBottom: `1px solid ${borderColor}`,
            },
          }}
        >
          {renderSider()}
        </AppShell.Section>
      </AppShell.Navbar>
    </>
  );
};

import React, { useEffect, useState } from "react";
import type { RefineErrorPageProps } from "@refinedev/ui-types";
import {
  useNavigation,
  useTranslate,
  useGo,
  useResource,
  useRouterType,
} from "@refinedev/core";
import {
  Box,
  Title,
  Text,
  Group,
  Tooltip,
  ActionIcon,
  Button,
  Space,
  Flex,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const { resource, action } = useResource();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
        ),
      );
    }
  }, [resource, action]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      ta="center"
      style={{
        boxSizing: "border-box",
        minHeight: "calc(100vh - 150px)",
      }}
    >
      <Title
        fz={{ base: 220, sm: 120 }}
        style={(theme) => ({
          textAlign: "center",
          fontWeight: 900,
          lineHeight: 1,
          color: theme.colors.gray[2],
        })}
      >
        404
      </Title>
      <Group gap={4} align="center" justify="center">
        <Text c="dimmed" size="lg" ta="center" style={{ maxWidth: 500 }}>
          {translate(
            "pages.error.404",
            "Sorry, the page you visited does not exist.",
          )}
        </Text>
        {errorMessage && (
          <Tooltip openDelay={0} label={errorMessage}>
            <ActionIcon data-testid="error-component-tooltip">
              <IconInfoCircle />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Space h="md" />
      <Button
        variant="subtle"
        size="md"
        onClick={() => {
          if (routerType === "legacy") {
            push("/");
          } else {
            go({ to: "/" });
          }
        }}
      >
        {translate("pages.error.backHome", "Back Home")}
      </Button>
    </Flex>
  );
};

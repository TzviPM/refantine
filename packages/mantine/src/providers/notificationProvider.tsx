import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import { notifications } from "@mantine/notifications";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconCheck, IconRotate2, IconX } from "@tabler/icons-react";

import { RingCountdown } from "@components";

export const useNotificationProvider = (): NotificationProvider => {
  const activeNotifications: string[] = [];

  const isNotificationActive = (key?: string) => {
    return activeNotifications.includes(key as string);
  };

  const addNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index === -1) {
        activeNotifications.push(key);
      }
    }
  };

  const removeNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }
  };

  const notificationProvider: NotificationProvider = {
    open: ({
      message,
      description,
      type,
      undoableTimeout,
      key,
      cancelMutation,
    }) => {
      if (type === "progress") {
        if (isNotificationActive(key)) {
          notifications.update({
            id: key!,
            message: (
              <Group justify="apart" wrap="nowrap">
                <Group gap="xs" justify="center">
                  <RingCountdown undoableTimeout={undoableTimeout ?? 0} />
                  <Box>
                    <Text>{message}</Text>
                    {description && <Text>{description}</Text>}
                  </Box>
                </Group>
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    cancelMutation?.();
                    if (key) {
                      removeNotification(key);
                      notifications.hide(key);
                    }
                  }}
                >
                  <IconRotate2 size={18} />
                </ActionIcon>
              </Group>
            ),
            styles: {
              root: {
                paddingLeft: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
                "&::before": { display: "none" },
              },
            },
            withCloseButton: false,
            autoClose: false,
          });
        } else {
          addNotification(key);
          notifications.show({
            id: key,
            message: (
              <Group justify="apart" wrap="nowrap">
                <Group gap="xs" justify="center">
                  <RingCountdown undoableTimeout={undoableTimeout ?? 0} />
                  <Box>
                    <Text>{message}</Text>
                    {description && <Text>{description}</Text>}
                  </Box>
                </Group>
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    cancelMutation?.();
                    if (key) {
                      removeNotification(key);
                      notifications.hide(key);
                    }
                  }}
                >
                  <IconRotate2 size={18} />
                </ActionIcon>
              </Group>
            ),

            styles: {
              root: {
                paddingLeft: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
                "&::before": { display: "none" },
              },
            },
            withCloseButton: false,
            autoClose: false,
          });
        }
      } else {
        if (isNotificationActive(key)) {
          notifications.update({
            id: key!,
            color: type === "success" ? "primary" : "red",
            icon:
              type === "success" ? (
                <IconCheck size={18} />
              ) : (
                <IconX size={18} />
              ),
            message,
            title: description,
            autoClose: 5000,
          });
        } else {
          addNotification(key);
          notifications.show({
            id: key!,
            color: type === "success" ? "primary" : "red",
            icon:
              type === "success" ? (
                <IconCheck size={18} />
              ) : (
                <IconX size={18} />
              ),
            message,
            title: description,
            onClose: () => {
              removeNotification(key);
            },
            autoClose: 5000,
          });
        }
      }
    },
    close: (key) => {
      removeNotification(key);
      notifications.hide(key);
    },
  };

  return notificationProvider;
};

/**
 * @deprecated `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider.
 */
export const notificationProvider = useNotificationProvider;

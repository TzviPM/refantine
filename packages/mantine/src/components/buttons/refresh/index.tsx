import React from "react";
import { useRefreshButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonVariant,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  hideText = false,
  dataProviderName,
  svgIconProps,
  children,
  onClick,
  meta: _meta,
  metaData: _metaData,
  ...rest
}) => {
  const {
    onClick: onRefresh,
    label,
    loading,
  } = useRefreshButton({
    resource: resourceNameFromProps ?? propResourceNameOrRouteName,
    id: recordItemId,
    dataProviderName,
  });

  const { variant, styles: _styles, ...commonProps } = rest;

  return hideText ? (
    <ActionIcon
      onClick={onClick ? onClick : onRefresh}
      loading={loading}
      aria-label={label}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...(variant
        ? {
            variant: mapButtonVariantToActionIconVariant(
              variant as ButtonVariant,
            ),
          }
        : { variant: "default" })}
      {...(commonProps as ActionIconProps)}
    >
      <IconRefresh size={18} {...svgIconProps} />
    </ActionIcon>
  ) : (
    <Button
      variant="default"
      leftSection={<IconRefresh size={18} {...svgIconProps} />}
      loading={loading}
      onClick={onClick ? onClick : onRefresh}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...rest}
    >
      {children ?? label}
    </Button>
  );
};

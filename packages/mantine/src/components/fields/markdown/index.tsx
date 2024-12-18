import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import type { MarkdownFieldProps } from "../types";
import type { PluggableList } from "react-markdown";

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<MarkdownFieldProps> = ({
  value = "",
  ...rest
}) => {
  return (
    // There's an issue related with the type inconsistency of the `remark-gfm` and `remark-rehype` packages, we need to cast the `gfm` as any. (https://github.com/orgs/rehypejs/discussions/63)
    <ReactMarkdown remarkPlugins={[gfm] as unknown as PluggableList} {...rest}>
      {value}
    </ReactMarkdown>
  );
};

"use client";

import React, { useRef } from "react";
import * as runtime from "react/jsx-runtime";
import { useInjectCopyButtons } from "@/hooks/ui";
import Image from "next/image";
import { Callout } from "./callout";
import CollapsibleCodeBlock from "./collapsible-codeblock";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  CollapsibleCodeBlock,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  const contentRef = useRef<HTMLDivElement>(null);

  // 这里传入 ref 对象，让 Hook 内部检测到挂载后的元素
  useInjectCopyButtons(contentRef);

  return (
    <div ref={contentRef}>
      <Component components={components} />
    </div>
  );
}

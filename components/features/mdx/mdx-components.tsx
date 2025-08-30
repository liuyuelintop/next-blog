"use client";

import React from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Callout } from "./callout";
import CollapsibleCodeBlock from "./collapsible-codeblock";
import PreWrapper from "./pre-wrapper";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  CollapsibleCodeBlock,
  pre: PreWrapper,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}

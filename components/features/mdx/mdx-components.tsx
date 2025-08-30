"use client";

import React from "react";
import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Callout } from "./callout";
import CollapsibleCodeBlock from "./collapsible-codeblock";
import PreWrapper from "./pre-wrapper";

const createMDXComponent = (code: string) => {
  try {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to render MDX content:", error);
    // Fallback component to prevent error boundary crash
    const ErrorFallback = () => (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">
          Unable to render content. Please refresh the page.
        </p>
      </div>
    );
    ErrorFallback.displayName = 'MDXErrorFallback';
    return ErrorFallback;
  }
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
  if (!code) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-600">No content available.</p>
      </div>
    );
  }

  const Component = createMDXComponent(code);
  
  try {
    return <Component components={components} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error rendering MDX component:", error);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">
          Failed to render content. Please try refreshing the page.
        </p>
      </div>
    );
  }
}

"use client";

import { useState, useEffect } from "react";

interface CopyButtonProps {
  text: string;
}

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    {...props}
  >
    <path d="M8 17.929H6c-1.105 0-2-.895-2-2V4c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v2" />
    <path d="M16 12h2c1.105 0 2 .895 2 2v8c0 1.105-.895 2-2 2h-8c-1.105 0-2-.895-2-2v-2" />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      // silent fail
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className="absolute top-3 right-3 p-1.5 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-200"
      onClick={onCopy}
      disabled={isCopied}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only">{isCopied ? "Copied" : "Copy to clipboard"}</span>
    </button>
  );
}

"use client";

import { FC, useState, ReactNode } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

interface CollapsibleCodeBlockProps {
  children: ReactNode;
  hint: string;
}

// TODO: Implement extend/collapse functionality in the future.
const CollapsibleCodeBlock: FC<CollapsibleCodeBlockProps> = ({
  children,
  hint = "Click to view the code",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button>{hint}</button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <pre>
          <code>{children}</code>
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleCodeBlock;

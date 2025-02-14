// hooks/useInjectCopyButtons.ts
import { useEffect } from "react";

export function useInjectCopyButtons(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const rootElement = ref.current;
    if (!rootElement) return;

    const codeBlocks = rootElement.querySelectorAll("pre");
    codeBlocks.forEach((preEl) => {
      if (preEl.querySelector(".copy-button")) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "copy-button absolute top-2 right-2 bg-gray-700 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition";

      button.addEventListener("click", () => {
        const codeEl = preEl.querySelector("code");
        if (!codeEl) return;
        const textToCopy = codeEl.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => {
            button.innerText = "Copy";
          }, 1500);
        });
      });

      preEl.classList.add("relative", "group");
      preEl.appendChild(button);
    });
  }, [ref]); // 当 ref 对象改变时尝试执行副作用
}

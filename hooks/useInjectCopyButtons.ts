// hooks/useInjectCopyButtons.ts
import { useEffect } from "react";

/**
 * 在 ref.current 中查找所有 figure[data-rehype-pretty-code-figure]，
 * 为其插入一个右上角的“Copy”按钮。
 */
export function useInjectCopyButtons(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const rootElement = ref.current;
    if (!rootElement) return;

    // 1. 查找所有 figure[data-rehype-pretty-code-figure]
    const figures = rootElement.querySelectorAll(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figureEl) => {
      // 如果已经插入过按钮，则跳过
      if (figureEl.querySelector(".copy-button")) return;

      // 2. 创建按钮
      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "copy-button absolute top-2 right-2 bg-gray-700 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition";

      // 3. 点击按钮时，复制 <pre><code> 的文本
      button.addEventListener("click", () => {
        const codeEl = figureEl.querySelector("pre code");
        if (!codeEl) return;
        const textToCopy = codeEl.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => {
            button.innerText = "Copy";
          }, 1500);
        });
      });

      // 4. 给 figure 加上定位和 group
      figureEl.classList.add("relative", "group");

      // 5. 把按钮插入 figure
      figureEl.appendChild(button);
    });
  }, [ref]);
}

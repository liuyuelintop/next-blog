// hooks/useInjectCopyButtons.ts
import { useEffect } from "react";

/**
 * 在 ref.current 中查找所有 figure[data-rehype-pretty-code-figure]，
 * 为其插入一个右上角的“Copy”按钮，并在点击后复制代码内容。
 */
export function useInjectCopyButtons(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const rootElement = ref.current;
    if (!rootElement) return;

    // 查找所有 figure[data-rehype-pretty-code-figure]
    const figures = rootElement.querySelectorAll(
      "figure[data-rehype-pretty-code-figure]"
    );

    figures.forEach((figureEl) => {
      // 如果已经插入过按钮，则跳过
      if (figureEl.querySelector(".copy-button")) return;

      // 创建复制按钮
      const button = document.createElement("button");
      button.innerText = "Copy";
      // 假设你在 globals.css 中用 .copy-button + @apply 定义了样式
      button.classList.add("copy-button");

      // 绑定点击事件
      button.addEventListener("click", () => {
        // 找到 <pre><code>
        const codeEl = figureEl.querySelector("pre code");
        if (!codeEl) return;

        // 使用类型守卫，确认 codeEl 是 HTMLElement
        if (codeEl instanceof HTMLElement) {
          const textToCopy = codeEl.innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            button.innerText = "Copied!";
            setTimeout(() => {
              button.innerText = "Copy";
            }, 1500);
          });
        }
      });

      // 给 figure 设置定位和 group，以便按钮绝对定位并 hover 显示
      figureEl.classList.add("relative", "group");

      // 把按钮插入到 figure
      figureEl.appendChild(button);
    });
  }, [ref]);
}

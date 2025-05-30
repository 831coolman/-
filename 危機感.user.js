// ==UserScript==
// @name         未提出危機感持てる拡張機能
// @version      1.0
// @description  強調表示
// @author       Yuta
// @match        https://gakujo.iess.niigata-u.ac.jp/campusweb/campusportal.do?page=main&tabId=en
// @match        file:///C:/Users/Nemle/OneDrive%20-%20%E6%96%B0%E6%BD%9F%E5%A4%A7%E5%AD%A6/%E5%8B%89%E5%BC%B7%E7%94%A8/index.html
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const targetWords = ["未提出"];
    const className = "highlight-yellow-on-black";

    const style = document.createElement('style');
    style.textContent = `
        .${className} {
            background-color: black;
            color: yellow;
            font-weight: bold;
            padding: 0 2px;
        }
    `;
    document.head.appendChild(style);

    function highlightWords(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentNode;
            if (!parent || parent.tagName === "SCRIPT" || parent.tagName === "STYLE") return;

            const text = node.textContent;
            let changed = false;

            targetWords.forEach(word => {
                const regex = new RegExp(`(${word})`, 'g');
                if (regex.test(text)) {
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(regex, `<span class="${className}">$1</span>`);
                    parent.replaceChild(span, node);
                    changed = true;
                }
            });

        } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(child => highlightWords(child));
        }
    }

    window.addEventListener('load', () => {
        highlightWords(document.body);
    });
})();

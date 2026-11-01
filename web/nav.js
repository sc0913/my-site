document.addEventListener("DOMContentLoaded", () => {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
                // 加载完导航后，立刻根据当前语言翻译一下
                const currentLang = localStorage.getItem('site_lang') || 'zh';
                if (typeof changeLanguage === 'function') {
                    changeLanguage(currentLang);
                }
            }
        })
        .catch(err => console.error('导航栏加载失败:', err));
});
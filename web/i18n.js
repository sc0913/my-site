// i18n.js

// 1. 定义中英文翻译字典
const translations = {
    zh: {
        nav_home: "首页",
        nav_quotes: "语录",
        nav_projects: "研究项目",
        nav_machine: "无用机器与游戏",
        
        index_title: "欢迎来到拖延症研究所",
        index_slogan: "能明天做的事，今天绝不开始。",
        index_desc: "这里是一个专门研究“为什么我们会把重要的事情拖到明天”的神秘组织。本网站旨在为您提供最舒适的摸鱼体验。请随意浏览，反正你现在的正事也没做。",
        
        quotes_title: "语录",
        quotes_random: "今日随机借口：",
        quotes_list_title: "拖延症语录大全 (15条)",
        
        projects_title: "我们的研究项目",
        projects_desc: "以下是本研究所未来五年（或者可能拖到十年）的计划：",
        
        machine_title: "数字玩具与游戏",
        machine_useless_title: "无用机器 (Useless Machine)",
        machine_useless_desc: "试着点击这个按钮：",
        machine_btn: "立刻完成作业",
        machine_game_title: "互动游戏：消灭DDL (抓乌龟)", // 这里改成了抓乌龟
        machine_score: "分数: ",
        machine_time: "剩余时间: ",
        machine_start_btn: "开始游戏",
        machine_playing_btn: "游戏进行中...",
        machine_play_again_btn: "再玩一次",
        machine_alert_clicked: "居然被你点到了！看来你真的很闲，快去写作业吧！",
        machine_alert_end: "游戏结束！你抓住了 ",
        machine_alert_end2: " 只乌龟。看来你离战胜DDL又远了一步。"
    },
    en: {
        nav_home: "Home",
        nav_quotes: "Quotes",
        nav_projects: "Projects",
        nav_machine: "Useless Machine & Game",
        
        index_title: "Welcome to the Procrastination Research Center",
        index_slogan: "Never do today what you can put off until tomorrow.",
        index_desc: "This is a mysterious organization dedicated to studying 'why we put off important things until tomorrow'. This site aims to provide you with the most comfortable slacking experience. Feel free to browse, since you're not doing your actual work anyway.",
        
        quotes_title: "Quotes",
        quotes_random: "Today's Random Excuse: ",
        quotes_list_title: "Collection of Procrastination Quotes (15)",
        
        projects_title: "Our Research Projects",
        projects_desc: "Here are our plans for the next five years (or maybe ten):",
        
        machine_title: "Digital Toys & Games",
        machine_useless_title: "Useless Machine",
        machine_useless_desc: "Try clicking this button:",
        machine_btn: "Finish Homework Now",
        machine_game_title: "Interactive Game: Destroy the Deadline (Catch Turtles)", // 英文版也加上抓乌龟
        machine_score: "Score: ",
        machine_time: "Time Left: ",
        machine_start_btn: "Start Game",
        machine_playing_btn: "Playing...",
        machine_play_again_btn: "Play Again",
        machine_alert_clicked: "You actually clicked it! You must be really bored. Go do your homework!",
        machine_alert_end: "Game Over! You caught ",
        machine_alert_end2: " turtles. It seems you are further away from defeating the deadline."
    }
};

// 2. 核心切换函数
function changeLanguage(lang) {
    localStorage.setItem('site_lang', lang);
    
    // 查找所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 重新渲染动态内容（如：语录列表、游戏文本）
    // 我们通过触发一个自定义事件来通知其他脚本
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

// 3. 页面加载时初始化语言
document.addEventListener("DOMContentLoaded", () => {
    // 检查本地存储中的语言，默认使用中文
    const savedLang = localStorage.getItem('site_lang') || 'zh';
    
    // 如果导航栏中有切换按钮，绑定点击事件
    // 注意：导航栏是用 JS 异步加载的，所以我们需要稍作延迟，或者使用事件委托
    document.body.addEventListener('click', (e) => {
        // 如果点击的是按钮本身，或者按钮里面的图标
        if (e.target.id === 'lang-switch-btn' || e.target.closest('#lang-switch-btn')) {
            const currentLang = localStorage.getItem('site_lang') || 'zh';
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            changeLanguage(newLang);
        }
    });

    // 初始执行一次翻译（防止 nav.js 加载慢导致覆盖）
    setTimeout(() => changeLanguage(savedLang), 100);
});
const liveSteps = [
  {
    icon: "C",
    title: "采集 Agent 正在抓取 42 个来源",
    detail: "RSS、新闻站、技术社区与产品博客同步扫描",
    cost: "12.4M",
  },
  {
    icon: "P",
    title: "解析 Agent 已清洗 318 篇正文",
    detail: "移除广告、导航、重复段落和无效页面",
    cost: "86.7M",
  },
  {
    icon: "D",
    title: "去重 Agent 合并 74 组重复报道",
    detail: "按语义相似度、发布时间和来源可信度保留主版本",
    cost: "145.2M",
  },
  {
    icon: "A",
    title: "分析 Agent 正在生成影响评分",
    detail: "提取行业、公司、风险、机会和优先级标签",
    cost: "331.8M",
  },
  {
    icon: "W",
    title: "写作 Agent 输出今日情报日报",
    detail: "生成短摘要、深度解读和可导出的 Markdown",
    cost: "180.3M",
  },
];

const dashboardViews = {
  overview: `
    <div class="cards">
      <div class="stat-card"><span>今日任务</span><strong>128</strong></div>
      <div class="stat-card"><span>成功率</span><strong>96.8%</strong></div>
      <div class="stat-card"><span>平均耗时</span><strong>3m 42s</strong></div>
      <div class="stat-card"><span>今日 Token</span><strong>42.9M</strong></div>
    </div>
    <table class="data-table">
      <thead><tr><th>Agent</th><th>状态</th><th>处理量</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Collector</td><td><span class="pill">running</span></td><td>42 sources</td><td>12.4M</td></tr>
        <tr><td>Parser</td><td><span class="pill">completed</span></td><td>318 articles</td><td>86.7M</td></tr>
        <tr><td>Deduper</td><td><span class="pill">completed</span></td><td>74 clusters</td><td>145.2M</td></tr>
        <tr><td>Analyst</td><td><span class="pill">running</span></td><td>221 insights</td><td>331.8M</td></tr>
      </tbody>
    </table>
  `,
  tasks: `
    <table class="data-table">
      <thead><tr><th>任务 ID</th><th>类型</th><th>状态</th><th>下一步</th></tr></thead>
      <tbody>
        <tr><td>RUN-2048</td><td>AI 行业日报</td><td><span class="pill">running</span></td><td>生成深度解读</td></tr>
        <tr><td>RUN-2047</td><td>安全漏洞监控</td><td><span class="pill">retrying</span></td><td>重抓失败页面</td></tr>
        <tr><td>RUN-2046</td><td>产品发布追踪</td><td><span class="pill">completed</span></td><td>等待导出</td></tr>
        <tr><td>RUN-2045</td><td>开源项目趋势</td><td><span class="pill">completed</span></td><td>已推送</td></tr>
      </tbody>
    </table>
  `,
  reports: `
    <div class="report-list">
      <article class="report-item">
        <h3>AI 编程工具日报</h3>
        <p>今日高价值内容集中在多 Agent IDE、长上下文代码审查、企业私有化部署和 token 成本控制。系统合并 19 篇重复报道后保留 7 条核心结论。</p>
      </article>
      <article class="report-item">
        <h3>模型 API 生态追踪</h3>
        <p>新增 11 个 API 相关公告，重点变化包括定价结构、上下文长度、工具调用稳定性和多模态能力开放。</p>
      </article>
      <article class="report-item">
        <h3>安全与合规简报</h3>
        <p>Agent 自动标记 6 条潜在高风险漏洞新闻，并把 CVE、受影响版本和修复建议整理成结构化摘要。</p>
      </article>
    </div>
  `,
  settings: `
    <div class="source-list">
      <article class="source-item"><h3>AI 产品博客</h3><p>启用，关键词：agent、coding、workflow、automation。</p></article>
      <article class="source-item"><h3>技术社区</h3><p>启用，抓取热门主题并过滤闲聊内容。</p></article>
      <article class="source-item"><h3>安全公告</h3><p>启用，优先处理 CVE、依赖漏洞和供应链风险。</p></article>
      <article class="source-item"><h3>开源仓库动态</h3><p>启用，追踪 release、issue 热度和 README 变化。</p></article>
    </div>
  `,
};

const tokenBars = [
  ["正文解析与清洗", 86.7, 11],
  ["语义去重与聚类", 145.2, 19],
  ["影响分析与打标", 331.8, 44],
  ["日报写作与复核", 180.3, 24],
  ["失败重试与校验", 12.4, 2],
];

const liveTimeline = document.querySelector("#liveTimeline");
const workspaceView = document.querySelector("#workspaceView");
const tokenBarsNode = document.querySelector("#tokenBars");
const authDialog = document.querySelector("#authDialog");

function renderTimeline() {
  liveTimeline.innerHTML = liveSteps
    .map(
      (step) => `
        <div class="timeline-item">
          <span class="timeline-icon">${step.icon}</span>
          <div>
            <strong>${step.title}</strong>
            <p>${step.detail}</p>
          </div>
          <span class="pill">${step.cost}</span>
        </div>
      `,
    )
    .join("");
}

function renderDashboard(view = "overview") {
  workspaceView.innerHTML = dashboardViews[view];
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === view);
  });
}

function renderTokenBars() {
  tokenBarsNode.innerHTML = tokenBars
    .map(
      ([label, value, width]) => `
        <div class="bar-row">
          <div class="bar-head">
            <span>${label}</span>
            <strong>${value.toFixed(1)}M</strong>
          </div>
          <div class="bar-track"><div class="bar-fill" style="width: ${width}%"></div></div>
        </div>
      `,
    )
    .join("");
}

function openAuth() {
  if (typeof authDialog.showModal === "function") {
    authDialog.showModal();
  }
}

document.querySelector("#openAuth").addEventListener("click", openAuth);
document.querySelector("#startDemo").addEventListener("click", openAuth);

document.querySelector("#createAccount").addEventListener("click", () => {
  const email = document.querySelector("#email").value || "demo@example.com";
  localStorage.setItem("newspilot-demo-user", email);
  location.hash = "dashboard";
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => renderDashboard(tab.dataset.view));
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  document.querySelector("#themeIcon").textContent = next === "dark" ? "☼" : "◐";
});

renderTimeline();
renderDashboard();
renderTokenBars();

const PRODUCT_VERSION = "0.1.1";
const RELEASE_BASE = `https://github.com/anyao3/anyao-web-multi-video-player-site/releases/download/v${PRODUCT_VERSION}`;
const MAC_ARM64_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player-${PRODUCT_VERSION}-arm64.dmg`;
const MAC_INTEL_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player-${PRODUCT_VERSION}-x64.dmg`;
const WINDOWS_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player.Setup.${PRODUCT_VERSION}.exe`;
const PURCHASE_URL = "https://buy.polar.sh/polar_cl_tak7fd5x8EhGhrPQTGvw6fEZrADQ40S7HpSxk0m8OhC";
const DOWNLOADS_ENABLED = false;
const PURCHASES_ENABLED = false;

document.addEventListener("DOMContentLoaded", () => {
  const isJapanese = document.documentElement.lang === "ja";
  const maintenance = document.createElement("section");
  maintenance.className = "maintenance-notice";
  maintenance.setAttribute("role", "status");
  maintenance.innerHTML = isJapanese
    ? '<p class="eyebrow">MAINTENANCE</p><h1>現在メンテナンス中です</h1><p>アプリの配布および販売を一時停止しています。再開までしばらくお待ちください。</p>'
    : '<p class="eyebrow">MAINTENANCE</p><h1>Temporarily under maintenance</h1><p>App downloads and purchases are currently unavailable. Please check back later.</p>';
  document.querySelector("main")?.replaceChildren(maintenance);
  document.querySelectorAll("[data-version]").forEach((el) => { el.textContent = `v${PRODUCT_VERSION}`; });
  const urls = { "mac-arm64": MAC_ARM64_DOWNLOAD_URL, "mac-intel": MAC_INTEL_DOWNLOAD_URL, windows: WINDOWS_DOWNLOAD_URL };
  document.querySelectorAll("[data-download]").forEach((link) => {
    link.href = urls[link.dataset.download];
    if (!DOWNLOADS_ENABLED) {
      link.removeAttribute("href");
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.querySelector(".button-label")?.replaceChildren(document.createTextNode(isJapanese ? "メンテナンス中" : "Under maintenance"));
    }
  });
  const macDialog = document.querySelector("#mac-download-dialog");
  const macDialogDownload = macDialog?.querySelector(".dialog-download");
  document.querySelectorAll('[data-download="mac-arm64"], [data-download="mac-intel"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!DOWNLOADS_ENABLED || !macDialog?.showModal || !macDialogDownload) return;
      event.preventDefault();
      macDialogDownload.href = link.href;
      macDialog.showModal();
    });
  });
  macDialogDownload?.addEventListener("click", () => macDialog.close());
  macDialog?.addEventListener("click", (event) => { if (event.target === macDialog) macDialog.close(); });
  document.querySelectorAll("[data-purchase]").forEach((link) => {
    link.href = PURCHASE_URL;
    if (!PURCHASES_ENABLED) {
      link.removeAttribute("href");
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
    }
  });
  document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const previous = button.textContent;
    button.textContent = button.dataset.copiedLabel || "Copied";
    setTimeout(() => { button.textContent = previous; }, 1400);
  }));
});

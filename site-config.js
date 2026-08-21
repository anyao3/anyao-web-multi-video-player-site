const PRODUCT_VERSION = "0.1.0";
const RELEASE_BASE = `https://github.com/anyao3/anyao-web-multi-video-player-site/releases/download/v${PRODUCT_VERSION}`;
const MAC_ARM64_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player-${PRODUCT_VERSION}-arm64.dmg`;
const MAC_INTEL_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player-${PRODUCT_VERSION}-x64.dmg`;
const WINDOWS_DOWNLOAD_URL = `${RELEASE_BASE}/Anyao.Web.Multi.Video.Player.Setup.${PRODUCT_VERSION}.exe`;
const PURCHASE_URL = "https://buy.polar.sh/polar_cl_tak7fd5x8EhGhrPQTGvw6fEZrADQ40S7HpSxk0m8OhC";
const DOWNLOADS_ENABLED = true;
const PURCHASES_ENABLED = true;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-version]").forEach((el) => { el.textContent = `v${PRODUCT_VERSION}`; });
  const urls = { "mac-arm64": MAC_ARM64_DOWNLOAD_URL, "mac-intel": MAC_INTEL_DOWNLOAD_URL, windows: WINDOWS_DOWNLOAD_URL };
  document.querySelectorAll("[data-download]").forEach((link) => {
    link.href = urls[link.dataset.download];
    if (!DOWNLOADS_ENABLED) {
      link.removeAttribute("href");
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.querySelector(".button-label")?.replaceChildren(document.createTextNode("Coming soon"));
    }
  });
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
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = previous; }, 1400);
  }));
});

(() => {
  const key = "anyao-language";
  const pageLanguage = document.documentElement.lang;
  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem(key); } catch { /* Language detection still works without storage. */ }

  if (pageLanguage === "en" && (savedLanguage === "ja" || (!savedLanguage && navigator.language.toLowerCase().startsWith("ja")))) {
    const suffix = `${location.search}${location.hash}`;
    location.replace(`ja/${suffix}`);
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-language-choice]").forEach((link) => {
      link.addEventListener("click", () => {
        try { localStorage.setItem(key, link.dataset.languageChoice); } catch { /* The link still changes language. */ }
      });
    });
  });
})();

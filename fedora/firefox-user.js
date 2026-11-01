// Firefox preferences for the Fedora laptop, reapplied on every launch.
//
// Theme and the left sidebar only — the rest of this Firefox is configured by
// hand. The full macOS set is in ../firefox/user.js.

// Dark toolbar theme, same as on the Mac (0 = dark, 1 = light, 2 = system).
user_pref("browser.theme.toolbar-theme", 0);

// --- Left sidebar: vertical tabs + tools ------------------------------------
user_pref("sidebar.revamp", true);
user_pref("sidebar.verticalTabs", true);
// Unlike the Mac, keeps "passwords": there is no Enpass here.
user_pref("sidebar.main.tools", "aichat,syncedtabs,history,bookmarks,passwords");

// Claude as the AI chat in the sidebar.
user_pref("browser.ml.chat.provider", "https://claude.ai/new");

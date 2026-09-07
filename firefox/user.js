// Firefox preferences, reapplied on every launch.
//
// Only behavioural settings live here. Anything you may want to rearrange by
// hand later (toolbar layout, sidebar widths) is in prefs-seed.js instead,
// because user.js is re-read at every startup and would revert your changes.

// --- Layout ---------------------------------------------------------------
user_pref("sidebar.revamp", true);
user_pref("sidebar.verticalTabs", true);
user_pref("sidebar.main.tools", "aichat,syncedtabs,history,bookmarks");
user_pref("browser.toolbars.bookmarks.visibility", "always");
user_pref("browser.theme.toolbar-theme", 0);

// --- AI sidebar -----------------------------------------------------------
user_pref("browser.ml.chat.provider", "https://claude.ai/new");

// --- New tab: no widgets, no sponsored content ----------------------------
user_pref("browser.newtabpage.activity-stream.widgets.clocks.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.crossword.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.focusTimer.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.lists.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.pictureOfTheDay.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.privacy.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.sportsWidget.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.stocks.enabled", false);
user_pref("browser.newtabpage.activity-stream.widgets.weather.enabled", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);

// --- Passwords are Enpass's job, not Firefox's ----------------------------
user_pref("signon.rememberSignons", false);
user_pref("dom.forms.autocomplete.formautofill", true);

// --- Clearing history: keep cookies, drop form data -----------------------
user_pref("privacy.clearHistory.cookiesAndStorage", false);
user_pref("privacy.clearHistory.formdata", true);
user_pref("privacy.clearOnShutdown_v2.formdata", true);

// --- Find in page ---------------------------------------------------------
user_pref("findbar.highlightAll", true);
user_pref("accessibility.typeaheadfind.flashBar", 0);

// --- DNS over HTTPS -------------------------------------------------------
// Pinned explicitly so a new profile does not have to wait for Mozilla's
// gradual rollout to switch it on. Mode 2 = DoH first, plain DNS as fallback.
user_pref("network.trr.mode", 2);
user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");

// --- about:addons: hide the panes that are never used ---------------------
user_pref("extensions.ui.dictionary.hidden", true);
user_pref("extensions.ui.locale.hidden", true);
user_pref("extensions.ui.mlmodel.hidden", true);
user_pref("extensions.ui.sitepermission.hidden", true);

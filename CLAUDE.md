# CLAUDE.md — Ripple privacy policy

Public privacy policy for both Ripple editions, served by GitHub Pages from `main` at **https://mr-who-root.github.io/Ripple-Privacy-Policy/**. It's (to be) linked from both Play listings, so **never move or rename this URL**.

The workspace-level `../CLAUDE.md` has the edition facts and the standing rule. **Confirm any policy wording with the user before pushing**, and change the "Effective" date in the hero when the wording changes.

## Files

- `index.html`: the whole policy. Numbered `<section class="policy-section" id="…">` blocks with a matching `.toc-link` in the sidebar: overview, collect, storage, ads (Free/Pro `.edition` cards), permissions (`.perm-table`), sharing, choices, children, changes, contact.
- `styles.css`, `script.js`: identical copies of the website's files (theme key `ripple_theme`, TOC scrollspy, copy-email button). Edit both repos together.
- `assets/`: app icon (`icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` for og:image).

## Keep it true to the code

Sources to check when anything changes:

- Permissions: the **merged** manifests, not just `android/app/src/main/AndroidManifest.xml` (SDKs add their own). After a build: `grep -oE 'android:name="[a-z.]*permission\.[A-Z_]+"' build/app/intermediates/merged_manifest*/release/*/AndroidManifest.xml | sort -u` in `../PRO` and `../FREE`.
- SDKs: `pubspec.yaml` in each edition (Free adds `google_mobile_ads`; neither has Firebase or analytics).
- Ads behaviour: `../FREE/lib/services/ads_service.dart`, `free_limits.dart`, `widgets/reward_gate.dart`.
- The in-app policy: `lib/screens/privacy_policy_screen.dart` in each edition (and `../FREE/PRIVACY_POLICY.md`). This site is a superset of both; keep them consistent.

Render with headless Chrome in dark, light and 500 px width before pushing (command in `../Ripple-Website/CLAUDE.md`).

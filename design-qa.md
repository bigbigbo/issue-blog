# Design QA

## Comparison target

- Source visual truth: `.mission-control/solar-term-redesign-20260727/reference-selected.png`
- Rendered implementation: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-final-glyph-balanced-test.png`
- Route and state: `http://localhost:3100/?date=2026-07-27`, desktop homepage, current term `大暑`, latest real GitHub issue selected
- CSS viewport: `1488 x 1058`
- Device pixel ratio: `1`
- Source pixels: `1487 x 1058`
- Implementation capture pixels: `1479 x 1109`
- Normalization: the source and implementation were both cropped to `1479 x 1058` at the top-left origin. The comparison therefore uses equal pixel dimensions at 1x density. The browser capture is 9 pixels narrower than its requested CSS viewport because of the Chrome content viewport.
- Full-view comparison: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-final-comparison.png`
- Focused hero comparison: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-final-hero-focused-comparison.png`
- Focused latest-article comparison: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-final-lower-focused-comparison.png`
- The colorful pet at the far right edge of some Chrome captures is a browser overlay outside the application DOM and is excluded from visual judgment.

## Review 2 comparison target

- User review source: `/Users/brooks/Library/Application Support/PixPin/Temp/PixPin_2026-07-28_12-56-12.png`
- User review source pixels: `875 x 735`
- Review request: reduce the oversized desktop term glyph, offset the two characters horizontally and vertically, and restore a four-season gradient background across the site.
- Revised homepage capture: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/home-seasonal-gradient-desktop.png`
- Revised homepage capture pixels: `1479 x 1109`
- Revised CSS viewport: `1488 x 1058`
- Mobile capture: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/home-seasonal-gradient-mobile.png`
- Review comparison: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/review-2-before-after-comparison.png`
- Comparison normalization: the revised desktop capture was cropped to `875 x 735` from `x 144, y 24` so the glyph, facts column, image edge, and lower boundary align with the user's focused source crop.
- Additional route evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/blog-seasonal-gradient-desktop.png` and `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/article-seasonal-gradient-desktop.png`

## Review 3 comparison target

- Final user direction: remove every gradient and retain seasonal color changes through four coordinated solid palettes.
- Earlier implementation: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/home-seasonal-gradient-desktop.png`
- Final implementation: `.mission-control/solar-term-redesign-20260727/evidence/review-3/screenshots/home-seasonal-solid-desktop.png`
- Desktop comparison: `.mission-control/solar-term-redesign-20260727/evidence/review-3/screenshots/review-3-gradient-vs-solid-comparison.png`
- Mobile evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-3/screenshots/home-seasonal-solid-mobile.png`
- Source and implementation pixels: both desktop captures are `1479 x 1109`, captured from a `1488 x 1058` CSS viewport at device pixel ratio `1`.
- State: `2026-07-28`, current term `大暑`, summer palette.

## Review 4 comparison target

- Final user direction: replace the seasonal page surfaces with the soft white of xuan paper and make the paper fibers visibly present.
- Source implementation: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/home-seasonal-solid-before.jpg`
- Revised implementation: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/home-xuan-paper-desktop-1.jpg`
- Full-view comparison: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/review-4-seasonal-vs-xuan-comparison.jpg`
- Focused paper comparison: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/review-4-paper-focus-comparison.jpg`
- Mobile evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/home-xuan-paper-mobile.jpg`
- Source and implementation pixels: both desktop captures are `1479 x 1109`, captured from a `1488 x 1058` CSS viewport at device pixel ratio `1`.
- Mobile capture pixels: `381 x 2423`, captured from a `390 x 844` CSS viewport at device pixel ratio `1`.
- State: `2026-07-28`, current term `大暑`, with the xuan-paper surface and summer accent.

## Review 5 footer comparison target

- Source visual truth for preserved structure and copy: `.mission-control/footer-redesign-20260728/reference-current-footer.png`
- User direction: add a strong contrasting palette, retain the large display glyphs, give them a faint projected shadow, and add irregular linework or geometric decoration behind the copy.
- Final browser-rendered desktop footer: `.mission-control/footer-redesign-20260728/evidence/footer-desktop-final-1098.jpg`
- Final browser-rendered mobile footer: `.mission-control/footer-redesign-20260728/evidence/footer-mobile-final-390.jpg`
- Full-view before-and-after comparison: `.mission-control/footer-redesign-20260728/evidence/footer-before-after-final.jpg`
- CSS viewport: `1098 x 800` desktop and `390 x 844` mobile.
- Device pixel ratio: `1`.
- Source pixels: `1098 x 386`.
- Desktop implementation pixels: `1089 x 443`; the 9-pixel difference is the browser scrollbar.
- Mobile implementation pixels: `381 x 959`; the final full-page browser capture was cropped to the footer bounds at `y 2113`.
- Normalization: the source was resized to `1089 x 383` and padded to `1089 x 443`, then placed beside the equal-width implementation capture.
- State: homepage with `fixture=empty`, date `2026-07-28`, footer at the end of the document.
- Focused comparison: a second crop was not needed because the complete footer, display typography, small labels, linework, and navigation remain legible in the `2178 x 443` full-view comparison.
- The round pet marks visible in some live Chrome captures are browser overlays outside the application DOM and are excluded from visual judgment.

## Findings

- No actionable P0, P1, or P2 findings remain.

- [P3] Hero image tonal and subject-position variance
  Location: homepage seasonal image, `.seasonal-image`
  Evidence: both versions use a high-quality halftone lotus image with a vermilion sun. The implementation has darker midtones and a smaller sun disc placed farther right.
  Impact: the editorial art direction and hierarchy remain intact. The variance is visible only in a close fidelity comparison.
  Fix: optional future asset refinement can brighten the leaf midtones and enlarge the sun disc while preserving the current crop.

- [P3] Dynamic content differs from the static reference
  Location: term counter, seasonal prose, and latest article
  Evidence: the source labels `大暑` as `13 / 24` and uses sample editorial copy. The implementation derives the correct `12 / 24` position from the 24-term sequence and renders the latest real issue from `bigbigbo/issue-blog`.
  Impact: line wraps differ in the lower article module, while the visual system and module proportions remain faithful.
  Fix: no production change recommended. A fixture can reproduce the exact mock copy if pixel-level regression snapshots are later required.

## Required fidelity surfaces

- Fonts and typography: the Song-style display face, heavy two-character term title, compact serif metadata, monospaced counters, weights, line heights, tracking, wrapping, and hierarchy were checked in the full and focused comparisons. The final desktop glyph occupies about 55 percent of its field width, leaves clear vertical breathing room, and offsets its two characters diagonally. Mobile body copy remains at 16 pixels or larger.
- Spacing and layout rhythm: header height, rail width, hero tracks, facts column, image column, lower article module, rules, padding, and vertical section boundaries align closely with the source. The 12-column desktop grid and responsive mobile stack have no clipping or collision.
- Colors and visual tokens: near-black ink, muted rules, the acid-green current-state marker, and xuan-paper neutrals remain consistent across content, navigation, and the term rail. The page surface is `#f8f7f1`, the navbar is `#f2efe7`, and the rail is `#f5f3eb`. Four-season identity remains in compact accent surfaces, including the brand mark, active navigation, and selected-term inset rule. No CSS gradient remains.
- Image quality and asset fidelity: the seasonal hero, article shadow photograph, and paper grain are real raster assets with intentional crops and no visible stretching, halos, or placeholder treatment. The existing high-resolution paper grain is filtered toward a neutral white and blended at `0.38` opacity so fibers remain legible without obscuring typography. Visible arrows and circular marks use the project icon family or image assets.
- Copy and content: navigation, term details, article controls, loading, error, empty, and exhausted-state copy are coherent. Real article content intentionally replaces mock copy.
- Icons: navigation arrows, article controls, status marks, and focus indicators share a consistent stroke and scale. No emoji or text-glyph icon substitutions are present in the application.
- States and interactions: term selection, keyboard roving focus, latest-article controls, blog pagination, retry, loading, empty, exhausted, skip-link, and reduced-motion states were exercised.
- Responsiveness: desktop at `1488 x 1058` and `1440 x 1000`, mobile at `390 x 844`, and overflow at `320` pixels were checked. The final mobile document width equals the viewport width and long article URLs wrap safely.
- Accessibility: semantic buttons and links, visible focus, skip navigation, `aria-current`, live announcements, keyboard activation, 44-pixel mobile targets, alt text, and reduced-motion behavior were checked.

## Review 5 footer findings and fidelity

- No actionable P0, P1, or P2 footer findings remain.
- Fonts and typography: the Song-style display type and monospaced utility labels are preserved. The large `续` uses two restrained offset shadows, while the statement title uses separate vermilion and acid outline copies with blur and low opacity.
- Spacing and layout rhythm: the final desktop tracks measure `210`, `613.891`, and `263.094` pixels within the `1089`-pixel content width. The complete footer is `443` pixels high. Mobile stacks the three panels and metadata into a `381 x 959` footer with no clipping.
- Colors and visual tokens: acid `#c7f23a`, ink `#11110f`, vermilion `#f0441e`, and paper `#f8f7f1` create the requested collision. Ink on vermilion has a `5.00:1` contrast ratio, ink on acid has `14.57:1`, and paper on ink has `17.61:1`.
- Image quality and asset fidelity: `/images/editorial/footer-collage.png` is a real `2172 x 724` raster asset with irregular contour lines, print fragments, and geometric forms. It is cropped with `object-fit: cover`, kept at `0.16` opacity, and remains subordinate to the text.
- Copy and content: all existing footer labels, statement copy, navigation destinations, identity text, and back-to-top copy are unchanged.
- Icons: existing Lucide arrows and the existing circular identity mark remain consistent with the rest of the site.
- States and interactions: the home and blog links remain semantic links. The back-to-top link was activated and moved the page to `#main-content` at `scrollY 80`.
- Responsiveness: desktop and mobile captures show the same information hierarchy. Mobile document width and client width both measured `381` pixels, with no horizontal overflow.
- Accessibility: decorative image and duplicated shadow text are excluded from the accessible name. The final footer heading remains `记录仍在 继续。`, and small navigation copy meets normal-text contrast.

## Comparison history

### Iteration 1

- Earlier P2 finding: the initial desktop grid compressed the term glyph and widened adjacent regions, changing the reference composition.
- Fix: replaced the generic equal grid with measured desktop track proportions in `.home-editorial-grid`.
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-reference-1488x1058.png`

- Earlier P2 finding: a long URL in a real archive excerpt widened the mobile document.
- Fix: added `width: 100%`, `min-width: 0`, and `overflow-wrap: anywhere` to `.archive-entry__excerpt`.
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/blog-full-390.png` and `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/overflow-320.png`

### Iteration 2

- Earlier P2 finding: the desktop `大暑` glyph was about 20 percent too small and lacked the reference's dominant visual weight.
- Fix: increased its desktop optical size, widened the Song-style glyph silhouette, and adjusted line rhythm and horizontal placement.
- Earlier evidence: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-hero-focused-comparison.png`
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/round-1/screenshots/home-final-hero-focused-comparison.png`

### Iteration 3

- User P2 finding: the desktop term glyph had become too large on wide screens and filled the field too aggressively.
- Fix: reduced the wide-screen font range from `320 to 360` pixels to `270 to 330` pixels, removed the large group stretch, and used a restrained `1.18` optical width adjustment on each glyph.
- User P2 finding: the two term characters lacked the desired staggered rhythm.
- Fix: shifted the first glyph left and up, then shifted the second glyph right and down. At `1488 x 1058`, each visible glyph measures about `309 x 232` pixels within a `560 x 664` field.
- User P2 finding: the flat ivory site background lost the previous version's seasonal atmosphere.
- Fix: restored a site-wide multi-stop gradient driven by the exact term color and a four-season companion palette. Homepage term selection updates the gradient immediately. Archive and article routes return to the current date-derived season.
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/review-2-before-after-comparison.png`
- Responsive evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/home-seasonal-gradient-mobile.png`
- Cross-route evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/blog-seasonal-gradient-desktop.png` and `.mission-control/solar-term-redesign-20260727/evidence/review-2/screenshots/article-seasonal-gradient-desktop.png`

### Iteration 4

- User P2 finding: the gradient treatment made the navbar and term rail feel detached from the rest of the editorial system.
- Interim fix: extended the seasonal gradient into both navigation regions.
- User correction: remove gradients entirely and retain only four-season color variation.
- Final fix: replaced every gradient with solid seasonal tokens for the page surface, navbar, and term rail. The selected term returned to solid near-black with a season-colored inset rule.
- Final palettes:
  - Spring: surface `#e9f0e4`, navbar `#dde8d7`, rail `#e2ebde`
  - Summer: surface `#f3e3dc`, navbar `#ecd8cf`, rail `#efddd5`
  - Autumn: surface `#f1e7cf`, navbar `#e9dcba`, rail `#eee1c6`
  - Winter: surface `#e5edf2`, navbar `#d9e5ec`, rail `#dfe9ef`
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-3/screenshots/review-3-gradient-vs-solid-comparison.png`
- Responsive evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-3/screenshots/home-seasonal-solid-mobile.png`

### Iteration 5

- User P2 finding: the four seasonal surface colors still felt heavier than the desired traditional paper mood.
- Fix: replaced the seasonal surface, navbar, and rail colors with a coordinated xuan-paper white family while retaining season changes only in compact accent tokens.
- User P2 finding: the existing paper grain was too faint inside opaque navigation surfaces.
- Fix: increased the real raster grain to `0.38` opacity, neutralized its warmth with a grayscale and contrast filter, and made the navbar and rail slightly translucent so the fiber field continues through those regions.
- Post-fix evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/review-4-seasonal-vs-xuan-comparison.jpg`
- Focused evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/review-4-paper-focus-comparison.jpg`
- Responsive evidence: `.mission-control/solar-term-redesign-20260727/evidence/review-4/screenshots/home-xuan-paper-mobile.jpg`

### Iteration 6

- Earlier P2 finding: paper-colored small text on the vermilion navigation panel measured only `3.52:1` contrast.
- Fix: changed navigation text and rules to ink while preserving the vermilion panel. The final contrast is `5.00:1`.
- Earlier P2 finding: the decorative footer image produced a development warning when the short empty state made it the Largest Contentful Paint.
- Fix: marked the optimized local image as eager. A clean reload produced zero new console errors and zero new console warnings.
- Post-fix desktop evidence: `.mission-control/footer-redesign-20260728/evidence/footer-desktop-final-1098.jpg`
- Post-fix mobile evidence: `.mission-control/footer-redesign-20260728/evidence/footer-mobile-final-390.jpg`
- Post-fix comparison: `.mission-control/footer-redesign-20260728/evidence/footer-before-after-final.jpg`

## Browser verification

- Primary routes checked: homepage, blog archive, and article detail.
- Primary interactions checked: term pointer selection, ArrowRight, Home, End, Enter, Space, latest-article next control, blog load more, retry, and skip link.
- State captures checked: loading skeleton, error and retry, empty homepage, empty blog, exhausted pagination, keyboard focus, and reduced motion.
- Runtime check: after the clean development-server restart and route traversal, Chrome reported zero new console errors and zero new console warnings.
- Review 2 seasonal states checked: `春分` mapped to spring `#aae99e`, `大暑` mapped to summer `#ffa4a4`, `秋分` mapped to autumn `#ffe97d`, and `冬至` mapped to winter `#b5d9ff`.
- Review 2 responsive check: the mobile homepage measured `381` pixels for both document and client width, with no horizontal overflow.
- Review 2 runtime check: the final interaction and route traversal produced zero new console errors and zero new console warnings.
- Review 3 palette check: spring, summer, autumn, and winter each updated the page surface, navbar, term rail, and dark active accent.
- Review 3 gradient check: computed `background-image` was `none` for the seasonal backdrop, navbar, and term rail in all four seasons.
- Review 3 mobile check: document width and client width both measured `381` pixels with the solid summer navbar and horizontal term rail visible.
- Review 4 seasonal check: spring, summer, autumn, and winter all retained the same xuan-paper surface `#f8f7f1`, navbar `#f2efe7`, and rail `#f5f3eb`, while their dark accent tokens changed independently.
- Review 4 paper check: the fixed paper layer computed to `0.38` opacity with `multiply` blending and the expected neutralizing filter.
- Review 4 route check: homepage, blog archive, and article detail inherited the same paper surface, navbar translucency, and texture layer.
- Review 4 responsive check: the mobile document and client widths both measured `381` pixels, with no horizontal overflow.
- Review 4 post-build note: a fresh development request reached the designed retry state because the public GitHub API returned `403`. The production build completed all 20 static pages successfully, and the visual change introduced no layout or interaction failure.
- Review 5 desktop check: the footer measured `1089 x 443` inside a `1098 x 800` browser viewport, with all three panels and metadata visible in the evidence capture.
- Review 5 mobile check: the footer measured `381 x 959`; document width and client width both measured `381` pixels.
- Review 5 interaction check: the back-to-top link set the URL hash to `#main-content` and moved the page to `scrollY 80`.
- Review 5 runtime check: final desktop and mobile reloads produced zero new console errors and zero new console warnings.
- Review 5 build check: `pnpm lint` passed. The production build passed with `GITHUB_REPO_OWNER=bigbigbo` and `GITHUB_REPO_NAME=issue-blog`, generating 29 pages.

## Implementation checklist

- [x] Match desktop composition and display-glyph scale.
- [x] Preserve responsive hierarchy with no page overflow.
- [x] Use real raster imagery and real GitHub content.
- [x] Implement core controls and all required states.
- [x] Verify keyboard access, focus, target sizes, and reduced motion.
- [x] Compare normalized source and implementation captures after the final visual fix.
- [x] Reduce and stagger the wide-screen term glyph.
- [x] Apply four coordinated solid seasonal palettes across homepage, archive, and article routes.
- [x] Keep the navbar and term rail within the active seasonal palette.
- [x] Remove every CSS gradient from the final implementation.
- [x] Replace broad seasonal fills with a consistent xuan-paper white family.
- [x] Carry visible raster paper fibers through the page, navbar, and term rail.
- [x] Preserve four-season identity through compact accent tokens.
- [x] Apply the acid, ink, and vermilion footer palette.
- [x] Add readable offset projection to both display-glyph areas.
- [x] Place a real irregular collage asset behind the statement.
- [x] Preserve footer copy, links, focus behavior, and responsive stacking.
- [x] Verify contrast, browser console, mobile overflow, lint, and production build.

## Follow-up polish

- Optionally refine the hero raster to match the source sun-disc scale and leaf brightness more literally.
- Optionally add a dedicated exact-copy visual fixture for automated screenshot regression tests.

final result: passed

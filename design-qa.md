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

- Fonts and typography: the Song-style display face, heavy two-character term title, compact serif metadata, monospaced counters, weights, line heights, tracking, wrapping, and hierarchy were checked in the full and focused comparisons. The desktop term glyph was optically widened and its line rhythm adjusted to match the source silhouette. Mobile body copy remains at 16 pixels or larger.
- Spacing and layout rhythm: header height, rail width, hero tracks, facts column, image column, lower article module, rules, padding, and vertical section boundaries align closely with the source. The 12-column desktop grid and responsive mobile stack have no clipping or collision.
- Colors and visual tokens: ivory paper, near-black ink, vermilion accent, muted rules, and acid-green current-state marker consistently map to the source. Active and focus states retain sufficient contrast.
- Image quality and asset fidelity: the seasonal hero, article shadow photograph, and paper grain are real raster assets with intentional crops and no visible stretching, halos, or placeholder treatment. Visible arrows and circular marks use the project icon family or image assets.
- Copy and content: navigation, term details, article controls, loading, error, empty, and exhausted-state copy are coherent. Real article content intentionally replaces mock copy.
- Icons: navigation arrows, article controls, status marks, and focus indicators share a consistent stroke and scale. No emoji or text-glyph icon substitutions are present in the application.
- States and interactions: term selection, keyboard roving focus, latest-article controls, blog pagination, retry, loading, empty, exhausted, skip-link, and reduced-motion states were exercised.
- Responsiveness: desktop at `1488 x 1058` and `1440 x 1000`, mobile at `390 x 844`, and overflow at `320` pixels were checked. The final mobile document width equals the viewport width and long article URLs wrap safely.
- Accessibility: semantic buttons and links, visible focus, skip navigation, `aria-current`, live announcements, keyboard activation, 44-pixel mobile targets, alt text, and reduced-motion behavior were checked.

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

## Browser verification

- Primary routes checked: homepage, blog archive, and article detail.
- Primary interactions checked: term pointer selection, ArrowRight, Home, End, Enter, Space, latest-article next control, blog load more, retry, and skip link.
- State captures checked: loading skeleton, error and retry, empty homepage, empty blog, exhausted pagination, keyboard focus, and reduced motion.
- Runtime check: after the clean development-server restart and route traversal, Chrome reported zero new console errors and zero new console warnings.

## Implementation checklist

- [x] Match desktop composition and display-glyph scale.
- [x] Preserve responsive hierarchy with no page overflow.
- [x] Use real raster imagery and real GitHub content.
- [x] Implement core controls and all required states.
- [x] Verify keyboard access, focus, target sizes, and reduced motion.
- [x] Compare normalized source and implementation captures after the final visual fix.

## Follow-up polish

- Optionally refine the hero raster to match the source sun-disc scale and leaf brightness more literally.
- Optionally add a dedicated exact-copy visual fixture for automated screenshot regression tests.

final result: passed

# MELANIFY website

A static, responsive website built with HTML, CSS, and a small shared JavaScript file. No framework, package installation, or build step is required.

Open `index.html` in a browser, or serve this directory with:

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Files

- `index.html`: landing page, regional context, problems, solution, benefits, lab links, partners, sponsor, and references.
- `description.html`: project description, context accordions, allomelanin properties, interactive pathway, and references.
- `engineering.html`, `results.html`, `protocols.html`, `parts.html`, `implementation.html`, `safety.html`: lab chapters.
- `human-practices.html`, `education.html`, `entrepreneurship.html`: community, education, and commercial work.
- `members.html`, `attributions.html`: editable team profiles, contribution table, and timeline.
- `notebook.html`: a local 22-page notebook with readable transcriptions.
- `styles.css`: shared layout, navigation, homepage, description, and responsive styles.
- `wetlab.css`, `community.css`, `supporting-pages.css`: styles scoped to their respective chapters.
- `script.js`: navigation, pathway tabs, native detail controls, scroll reveals, reading progress, and figure enlargement.
- `assets/`: local artwork, research figures, logos, and photos.

All substantive page content is in the HTML. Navigation, details, links, and figures remain accessible without JavaScript; motion preferences are respected. Tables scroll within their containers on small screens.

## Revision notes

The revised navigation has Home, Project, Wet Lab, Beyond the lab, and Team. The top-right science link was removed. The homepage follows the new section structure, and the original pathway explorer now lives on the description page. Engineering uses the revised copy and figures. The protocols page embeds the existing master Google Doc and provides a local notebook fallback. The additional Parts, Implementation, Safety, Members, and Attributions pages are included.

Artwork and photos were extracted from the provided PDF. Reference-team screenshots and red editorial instructions were not used as site content. Scientific performance and commercial figures are presented as research goals or planning assumptions where the source does not establish them as validated results. The TphC transport limitation and the market-volume calculation are made explicit.

## Client material still absent from the supplied files

- The separate Fiverr animation and any separately promised original photos. The supplied logo is shown with a CSS entrance animation, and embedded PDF artwork is used where available.
- Actual names, portraits, biographies, and advisor details. The eleven requested member slots are ready to edit.
- Final contribution names and dates. The requested attribution table and timeline are prepared for editing; future events are marked as planned.
- Three public-opinion reflection paragraphs in Human Practices contain only Lorem ipsum in the brief. Those empty reflection sections were omitted. The seventeen deliberately retained wet-lab placeholder passages remain, as requested in the brief.
- iGEM Registry identifiers. Parts are complete with the provided descriptions; unassigned identifiers are marked for assignment on submission.

Implementation has no dedicated text in the brief, so its proposed workflow is drawn from the provided project, business, and safety content. The existing Results analyses are retained because the updated brief supplies no replacement results section.

## Verification

All 14 HTML pages were checked in Chrome at widths of 320, 390, 768, 1024, and 1440 pixels. Checks covered horizontal overflow, local images and requests, JavaScript errors, mobile navigation and Escape, dropdown placement, pathway keyboard controls, figure dialogs, cycle controls, and navigation/content without JavaScript. Local links, fragments, unique IDs, page headings, image alternatives, and link names were also checked. The Google Doc remains an external service; the local notebook is available if it cannot load.

The ZIP contains the site files and the assets they reference. Temporary PDF extracts, browser test dependencies, screenshots, and Git history are excluded.

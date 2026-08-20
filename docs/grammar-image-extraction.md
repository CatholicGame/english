# Getting illustrations out of the Grammar in Use PDF

> **Shelved, not in use.** This was tried for unit 1's exercise 1.1 and the crops came out too blurry to put in front of a learner, so the image support was removed: there is no `imageUrl` field on `TypeFillItem`, nothing under `public/grammar/`, and picture-dependent exercises stay skipped. The cause is the source, not the pipeline: the book's illustrations are stored as many small tiles (24x32, 49x32 ...), so one picture is only ~100-150px of real pixels and rendering the page at a higher scale just upscales that. Anyone reviving this needs a higher-resolution source or redrawn artwork first; the notes below are kept so the tooling doesn't have to be rediscovered.

Some exercises in `docs/English_Grammar_in_Use_Intermediate_2019_5th-Ed.pdf` cannot be answered from text ("What's happening in the pictures?"). The idea was to crop the illustration out of the PDF, serve it from `public/grammar/unit-<n>/`, and reference it from the exercise item.

This is the recipe that works on this machine, written down because two obvious approaches fail.

## What does not work

- **poppler CLI tools.** Only `pdftotext` is installed (`/mingw64/bin`). There is no `pdfimages`, `pdftoppm` or `pdfinfo`, which is also why the Read tool cannot render PDF pages.
- **Pulling image XObjects individually.** The book's illustrations are composed of many small tiles (24x32, 49x32 ...). Extracting each embedded image gives unusable fragments, so the page has to be rendered and cropped instead.
- **`@napi-rs/canvas` as the pdf.js canvas.** Its `Path2D` handling throws `Value is none of these types String, Path` inside `paintChar`. Use the `canvas` package (node-canvas) instead.

## What works

Working directory is throwaway; nothing here belongs in the app's dependencies.

```bash
mkdir pdfwork && cd pdfwork && npm init -y
npm install pdfjs-dist@4 canvas
# canvas's install script may be blocked; fetch the prebuilt binary directly:
npx prebuild-install -r napi --prefix node_modules/canvas
```

pdf.js in Node has no `document` to allocate scratch canvases from, so `getDocument` must be given a canvas factory or it dies on `paintInlineImageXObject` with `TypeError: Image or Canvas expected`:

```js
class NodeCanvasFactory {
  create(w, h) { const canvas = createCanvas(Math.max(1, w), Math.max(1, h)); return { canvas, context: canvas.getContext("2d") }; }
  reset(cc, w, h) { cc.canvas.width = Math.max(1, w); cc.canvas.height = Math.max(1, h); }
  destroy(cc) { cc.canvas.width = 0; cc.canvas.height = 0; }
}
const doc = await pdfjs.getDocument({
  data, useSystemFonts: false,
  CanvasFactory: NodeCanvasFactory, canvasFactory: new NodeCanvasFactory(),
}).promise;
```

Render the page at `scale: 3`, write it to PNG, then crop the picture strip. Page text renders as blank (the book's embedded fonts don't resolve), which does not matter: only the pictures are wanted, and the text is already digitized from `pdftotext`.

## Page numbering

Units run two pages each from the start of the unit section, so for unit `n`:

- explanation page = `12 + 2n`
- exercises page = `13 + 2n`

Unit 1 explanation is PDF page 14, its exercises page 15; unit 5 exercises are on page 23. Verify with `pdftotext -layout -f <p> -l <p>` before cropping, since the offset only holds while units are two pages each.

## Cropping

Crop boxes are per-page and have to be read off the rendered image; there is no layout metadata to derive them from. For a horizontal strip of N equal pictures, crop the whole strip and slice it into N columns. Unit 1's exercise 1.1 strip on page 15 at scale 3 is `x=276 y=313 w=1328 h=204`, six columns.

Save the crops as `public/grammar/unit-<n>/u<n>-ex<exercise>-<i>.png` and reference them as `/grammar/unit-<n>/...` from the data file. Keep an alt text describing what the picture shows, both for screen readers and so the content still makes sense if an image ever goes missing.

Note that crop boxes are hand-read per page, so this does not scale to 145 units on its own; it would need either a layout heuristic or a lot of manual work even if the resolution problem were solved.

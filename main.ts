/**
 * NusaStat — national statistics site hand-in (make.fun entrypoint).
 *
 * The grader runs this file as `node /bot/main.ts` (Node 22, standard
 * library only, no network, read-only repository at /bot, writable
 * $MAKEFUN_OUTPUT_DIR). It copies the static site (app/) and the
 * screenshots (screenshots/) beside this file into the output directory
 * and writes /output/dossier.json with the vendored make.fun library,
 * the summary the judge reads. Nothing here reads the clock, the
 * network, or any randomness, so two runs on the same repository
 * produce byte-identical output.
 */

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The repository root is the directory holding this file; the grader
// checks the repository out at /bot and runs `node /bot/main.ts`.
const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function handIn(): void {
  const siteIn = join(repoRoot, "app");
  if (!existsSync(siteIn)) {
    throw new Error("app/ directory not found beside main.ts");
  }
  mkdirSync(outDir, { recursive: true });
  cpSync(siteIn, join(outDir, "app"), { recursive: true });
  const shotsOut = join(outDir, "screenshots");
  mkdirSync(shotsOut, { recursive: true });
  const shotsIn = join(repoRoot, "screenshots");
  if (existsSync(shotsIn)) {
    cpSync(shotsIn, shotsOut, { recursive: true });
  }
  // dossier.json is byte for byte what the scorer's own copy of
  // buildDossier writes from the handed-in app/ and screenshots/, so
  // the gate and the judge both read this exact text.
  writeFileSync(
    join(outDir, "dossier.json"),
    buildDossier(outDir, {
      text_max_bytes: 163840,
      screenshots: { max: 4, max_bytes: 262144 },
      app_max_files: 993,
      app_max_bytes: 16777216,
    }),
  );
}

handIn();
console.log(`handed in NusaStat to ${outDir}`);

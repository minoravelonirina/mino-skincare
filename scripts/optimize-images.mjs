import { readdir, stat } from "node:fs/promises";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import sharp from "sharp";

const targetDir = process.argv.lastIndexOf("--dir") !== -1
  ? process.argv[process.argv.lastIndexOf("--dir") + 1]
  : "public/images/products";
const maxDimension = Number(process.env.MAX_DIM || 1200);
const quality = Number(process.env.QUALITY || 75);
const apply = process.argv.includes("--apply");
const toAvif = process.argv.includes("--avif");

const outputDir = join(dirname(targetDir), `${dirname(targetDir).split(/[\\/]/).pop()}_optimized_${Date.now()}`);
const suffixes = toAvif ? [".avif"] : [".webp", ".jpeg", ".jpg", ".png"];
const files = (await readdir(targetDir)).filter((file) =>
  suffixes.some((s) => extname(file).toLowerCase() === s)
);

if (files.length === 0) {
  console.log("Aucune image a optimiser dans", targetDir);
  process.exit(0);
}

console.log(
  `${files.length} image(s) | max ${maxDimension}px | qualite ${quality} | ${toAvif ? "AVIF" : "WebP"} | ${apply ? "ecriture reelle" : "dry-run (rien n'est ecrit)"}`
);
console.log("");

if (apply) await mkdir(outputDir, { recursive: true });

let saved = 0;

for (const file of files) {
  const source = join(targetDir, file);
  const metadata = await sharp(source).rotate().metadata();
  const original = (await stat(source)).size;

  const pipeline = sharp(source).rotate();
  if (metadata.width && metadata.width > maxDimension) {
    pipeline.resize({ width: maxDimension, withoutEnlargement: true });
  }

  const buffer = toAvif
    ? await pipeline.avif({ quality }).toBuffer()
    : await pipeline.webp({ quality }).toBuffer();

  const delta = original - buffer.length;
  saved += delta;
  console.log(
    `${file}: ${(original / 1024).toFixed(1)} Ko -> ${(buffer.length / 1024).toFixed(1)} Ko (${delta >= 0 ? "-" : "+"}${(Math.abs(delta) / 1024).toFixed(1)} Ko)`
  );

  if (apply) {
    const output = toAvif
      ? join(outputDir, file.replace(/\.(webp|jpe?g|png)$/i, ".avif"))
      : join(outputDir, file.replace(/\.(jpe?g|png)$/i, ".webp"));
    await writeFile(output, buffer);
  }
}

console.log("");
if (apply) {
  console.log(`Optimisees ecrites dans: ${outputDir}`);
  console.log("Verifie le rendu, puis remplace les originaux si tu le souhaites.");
} else {
  console.log(`Gain total estime: ${(saved / 1024).toFixed(1)} Ko sur ${(saved / 1024 / 1024).toFixed(2)} Mo`);
  console.log("Relance avec --apply pour ecrire les fichiers, ou --apply --avif pour du AVIF.");
}
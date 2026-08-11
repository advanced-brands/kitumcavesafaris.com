/**
 * Copies the Next.js static export (out/) into the project root
 * so cPanel / public_html Git deploys find index.html at the root.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  console.error("Missing out/index.html — run `next build` first.");
  process.exit(1);
}

const skip = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "src",
  "server",
  "prisma",
  "public",
  "compressed kitum images",
  "scripts",
]);

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

for (const entry of fs.readdirSync(outDir)) {
  if (skip.has(entry)) continue;
  const from = path.join(outDir, entry);
  const to = path.join(root, entry);
  // Replace existing export artifacts at root
  if (fs.existsSync(to)) {
    fs.rmSync(to, { recursive: true, force: true });
  }
  copyRecursive(from, to);
  console.log("Published:", entry);
}

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("Failed to place index.html at project root.");
  process.exit(1);
}

console.log("\n✓ index.html is now at the project root (ready for public_html).");

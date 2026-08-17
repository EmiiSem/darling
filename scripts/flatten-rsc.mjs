import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

function flatten(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (!entry.isDirectory()) {
      continue;
    }

    flatten(fullPath);

    if (!entry.name.startsWith("__next.")) {
      continue;
    }

    for (const file of fs.readdirSync(fullPath, { withFileTypes: true })) {
      if (!file.isFile()) {
        continue;
      }

      const source = path.join(fullPath, file.name);
      const target = path.join(dir, `${entry.name}.${file.name}`);
      fs.copyFileSync(source, target);
    }
  }
}

flatten(outDir);

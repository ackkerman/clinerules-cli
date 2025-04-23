import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR =
  fs.existsSync(path.join(__dirname, "templates"))
    ? path.join(__dirname, "templates")
    : path.join(__dirname, "..", "templates");
const RULES_RE    = /^\d{2}_.+\.md$/;        // 00_scope.md など

/* ---------- util : 章ファイル一覧を取得 ---------- */
async function listChapterFiles(dir: string): Promise<string[]> {
  if (!(await fs.pathExists(dir))) {
    throw new Error(`Template directory not found: ${dir}`);
  }
  const files = await fs.readdir(dir);
  const list  = files.filter((f) => RULES_RE.test(f)).sort();
  if (list.length === 0) {
    console.warn(`⚠️  No chapter files matched in ${dir}`);
  }
  return list;
}

/* ---------- build (.clinerules) ---------- */
export async function buildClinerules(cwd: string) {
  const overrideDir = path.join(cwd, ".cline", "rules");
  const templateFiles = await listChapterFiles(TEMPLATE_DIR);
  const parts: string[] = [];

  for (const file of templateFiles) {
    const overridePath  = path.join(overrideDir, file);
    const templatePath  = path.join(TEMPLATE_DIR, file);

    if (await fs.pathExists(overridePath)) {
      parts.push(await fs.readFile(overridePath, "utf8"));
    } else {
      parts.push(await fs.readFile(templatePath, "utf8"));
    }
  }

  const outputPath = path.join(cwd, ".clinerules");
  await fs.writeFile(outputPath, parts.join("\n\n---\n\n"), "utf8");
}

/* ---------- init (.cline/rules/**) ---------- */
interface InitOpts { force?: boolean; dryRun?: boolean; }

export async function initChapters(cwd: string, opts: InitOpts = {}) {
  const targetDir = path.join(cwd, ".cline", "rules");
  await fs.ensureDir(targetDir);

  const templates = await listChapterFiles(TEMPLATE_DIR);
  const created: string[] = [];
  const skipped:  string[] = [];

  for (const file of templates) {
    const src  = path.join(TEMPLATE_DIR, file);
    const dest = path.join(targetDir,  file);

    if (await fs.pathExists(dest) && !opts.force) {
      skipped.push(file);
    } else {
      if (!opts.dryRun) await fs.copy(src, dest, { overwrite: true });
      created.push(file);
    }
  }
  return { created, skipped };
}

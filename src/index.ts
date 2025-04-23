#!/usr/bin/env node
import { Command } from "commander";
import { buildClinerules, initChapters } from "./generate.js";

const program = new Command();
program.name("clinerules").version("1.0.0")
  .description("Generate & manage .clinerules");

/* --- build --- */
program.command("build")
  .description("assemble .clinerules (XX_*.md auto-merge)")
  .action(() => buildClinerules(process.cwd())
    .then(() => console.log("✅  .clinerules generated")));

/* --- init --- */
program.command("init")
  .description("copy templates (XX_*.md) into .cline/rules/")
  .option("-f, --force", "overwrite existing files")
  .option("--dry-run",   "show actions without copying")
  .action(async (o) => {
    const { created, skipped } = await initChapters(process.cwd(), {
      force:  o.force,
      dryRun: o.dryRun,
    });
    console.log(o.dryRun ? "🔍 Dry-run" : "✅ Init complete");
    if (created.length) console.log("🆕", created.join(", "));
    if (skipped.length) console.log("⏭ ", skipped.join(", "));
  });

program.parse();

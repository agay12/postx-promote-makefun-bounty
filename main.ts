// Copies POST.json (the address of the X post that promotes make.fun's
// make-your-own-bounty post) into the grader's output directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });

const raw = readFileSync(join(process.env.MAKEFUN_BOT_DIR ?? ".", "POST.json"), "utf8");
const post = JSON.parse(raw) as { url: string };
const re = /^https:\/\/(www\.)?(x|twitter)\.com\/[a-zA-Z0-9_]+\/status\/\d+$/;
if (!re.test(post.url)) {
  throw new Error(`POST.json does not name a post on X: ${post.url}`);
}
writeFileSync(join(out, "POST.json"), JSON.stringify({ url: post.url }) + "\n");

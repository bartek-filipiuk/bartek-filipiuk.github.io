import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

test("static export contains the primary portfolio sections", () => {
  for (const id of ["top", "work", "method", "archive", "about"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("all internal hash links have a matching target", () => {
  const targets = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const links = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

  assert.ok(links.length > 0);
  for (const link of links) {
    assert.ok(targets.has(link), `Missing target for #${link}`);
  }
});

test("external links use HTTPS and no credentials are rendered", () => {
  const externalLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.ok(externalLinks.length >= 10);
  assert.ok(externalLinks.every((link) => link.startsWith("https://")));
  assert.doesNotMatch(html, /(ghp_|github_pat_|sk-[a-zA-Z0-9]{16,})/);
});

test("SEO essentials are rendered", () => {
  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Software Architect &amp; AI-Assisted Builder/);
});

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = readFileSync(
  new URL('../lib/content.ts', import.meta.url),
  'utf8',
)
  .replace("import { journeyTimeline } from './journey-content';", '')
  .replace(
    "export { journeyTimeline as timeline } from './journey-content';",
    '',
  )
  .replace(
    'export const getTimeline = () => journeyTimeline;',
    'export const getTimeline = () => [];',
  );
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const data = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`
);
const journeySource = readFileSync(
  new URL('../lib/journey-content.ts', import.meta.url),
  'utf8',
);
const journeyJs = ts.transpileModule(journeySource, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const journeyData = await import(
  `data:text/javascript;base64,${Buffer.from(journeyJs).toString('base64')}`
);
for (const key of ['projects', 'photos', 'activityGroups']) {
  const ids = data[key].map((x) => x.id);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${key}`);
}
assert.equal(data.projects.length, 2, 'Exactly two projects are expected');
for (const p of data.projects) {
  assert.ok(
    p.images.length >= 2 && p.images.length <= 3,
    `${p.id} needs 2–3 image slots`,
  );
  assert.ok(p.source);
  assert.ok(p.website.startsWith('https://'));
  for (const image of p.images) {
    if (image.src) {
      assert.ok(image.alt.trim(), 'Real photos need alt text');
      assert.ok(
        existsSync(resolve('public', image.src.slice(1))),
        `Missing ${image.src}`,
      );
    } else assert.ok(image.label);
  }
}
for (const image of data.photos) {
  assert.ok(image.alt && image.detail);
  assert.ok(existsSync(resolve('public', image.src.slice(1))));
}
assert.equal(journeyData.journeyTimeline.length, 14);
assert.equal(
  new Set(journeyData.journeyTimeline.map((record) => record.id)).size,
  journeyData.journeyTimeline.length,
  'Journey chapter IDs must be unique',
);
for (const record of journeyData.journeyTimeline) {
  assert.ok(
    record.id &&
      record.year &&
      record.title &&
      record.summary &&
      record.heading &&
      record.sourceKey,
  );
}
assert.equal(journeyData.journeyValueChain.length, 9);
assert.equal(journeyData.journeyFutureObjectives.length, 10);
assert.match(journeyData.journeyTimeline[0].location, /Aitibi Village/);
assert.doesNotMatch(journeyData.journeyTimeline[0].location, /Khamari/);
assert.match(
  journeyData.journeyTimeline.find((record) => record.id === 'mineral-water-2026')
    .periodNote,
  /Proposed/,
);
assert.ok(
  data.initiatives.find((x) => x.name.includes('mineral water')).status ===
    'Proposed',
);
assert.ok(data.statements.goals.length === 4);
if (existsSync('out/index.html')) {
  const routes = [
    '/',
    ...Object.keys(data.pageInfo).map((s) => `/${s}/`),
    ...data.projects.map((p) => `/organisations/${p.id}/`),
  ];
  const titles = new Set();
  const htmls = new Map(
    routes.map((route) => [
      route,
      readFileSync(join('out', route, 'index.html'), 'utf8'),
    ]),
  );
  for (const [route, html] of htmls) {
    assert.doesNotMatch(
      html,
      /become a member|membership enquiries|id="membership"|#membership/i,
      `No membership recruitment: ${route}`,
    );
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `One H1: ${route}`,
    );
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `Title: ${route}`);
    assert.ok(!titles.has(title), `Unique title: ${route}`);
    titles.add(title);
    assert.match(html, /<meta name="description"/);
    for (const match of html.matchAll(
      /href="(\/[^"?#]*)(?:\?[^"#]*)?(?:#([^"]*))?"/g,
    )) {
      const path = match[1];
      const hash = match[2];
      if (path.startsWith('/_next/') || /\.[a-z]+$/.test(path)) continue;
      const normalized = path.endsWith('/') ? path : path + '/';
      assert.ok(
        htmls.has(normalized),
        `Missing linked route ${path} from ${route}`,
      );
      if (hash)
        assert.ok(
          htmls.get(normalized).includes(`id="${decodeURIComponent(hash)}"`),
          `Missing anchor ${hash} in ${path}`,
        );
    }
  }
  assert.ok(existsSync('out/404.html'));
  assert.ok(existsSync('out/sitemap.xml'));
  assert.ok(existsSync('out/robots.txt'));
  console.log(
    `Validated ${routes.length} routes, unique metadata, headings, links and anchors.`,
  );
}
console.log(
  'Validated content IDs, 2 projects, real assets, 14 sourced journey chapters and proposed water status.',
);

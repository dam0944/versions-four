import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, compileScript, compileTemplate } from 'vue/compiler-sfc';
import { skills } from '../src/data/skills.js';
import { services } from '../src/data/services.js';
import { members } from '../src/data/team.js';
import { site } from '../src/config/site.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
let components = 0;
const errors = [];
for (const file of walk(join(root, 'src'))) {
  if (!/\.(vue|js|css)$/.test(file)) continue;
  const source = readFileSync(file, 'utf8');
  if (source.includes('\uFFFD')) errors.push(`${file}: invalid UTF-8 replacement character`);
  if (file.endsWith('.vue')) {
    const { descriptor, errors: parseErrors } = parse(source, { filename: file });
    errors.push(...parseErrors.map(String));
    try {
      const script =
        descriptor.scriptSetup || descriptor.script
          ? compileScript(descriptor, { id: file })
          : null;
      if (descriptor.template) {
        const result = compileTemplate({
          source: descriptor.template.content,
          filename: file,
          id: file,
          compilerOptions: { bindingMetadata: script?.bindings },
        });
        errors.push(...result.errors.map((error) => `${file}: ${error}`));
      }
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
    }
    components++;
  }
  for (const match of source.matchAll(
    /(?:from\s*|import\s*\(?\s*|@import\s*)['"](\.[^'"]+)['"]/g,
  )) {
    if (!existsSync(resolve(dirname(file), match[1])))
      errors.push(`${file}: missing import ${match[1]}`);
  }
  for (const match of source.matchAll(/['"(](\/images\/[^'"\s)]+)['")]/g)) {
    if (!existsSync(join(root, 'public', match[1])))
      errors.push(`${file}: missing image ${match[1]}`);
  }
}
assert.ok(['km', 'en'].includes(site.defaultLanguage), 'Default language must be km or en');
assert.ok(existsSync(join(root, 'public/lawyer-loader.svg')), 'Loader artwork must exist');
assert.equal(
  new Set(services.map((service) => service.number)).size,
  services.length,
  'Service IDs must be unique',
);
for (const skill of skills) {
  assert.ok(skill.en && skill.km, 'Each skill requires both translations');
  assert.ok(
    Number.isFinite(skill.value) && skill.value >= 0 && skill.value <= 100,
    'Skill values must be percentages',
  );
}
for (const member of members)
  assert.ok(existsSync(join(root, 'public', member.image)), `Missing team photo: ${member.image}`);
assert.deepEqual(errors, [], 'Source validation failed');
console.log(
  `Validated ${components} Vue components, local imports, image references, and content data.`,
);

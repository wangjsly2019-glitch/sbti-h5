#!/usr/bin/env node
const fs = require('fs');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');

function extractConst(name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  assert(start !== -1, `Missing const ${name}`);

  const from = start + marker.length;
  const end = html.indexOf(';\n', from);
  assert(end !== -1, `Cannot parse const ${name}`);
  const raw = html.slice(from, end).trim();
  return JSON.parse(raw);
}

const questions = extractConst('questions');
const results = extractConst('results');

assert(Array.isArray(questions), 'questions should be an array');
assert(questions.length >= 1, 'questions should not be empty');
assert(questions.length === 20, 'questions length should stay at 20 for current product design');

for (const q of questions) {
  assert(typeof q.q === 'string' && q.q.trim(), `question ${q.id} should have non-empty text`);
  assert(Array.isArray(q.o) && q.o.length === 4, `question ${q.id} should have exactly 4 options`);

  for (const opt of q.o) {
    assert(typeof opt.t === 'string' && opt.t.trim(), `question ${q.id} has empty option text`);
    assert(opt.s && typeof opt.s === 'object', `question ${q.id} option ${opt.t} has invalid score map`);

    const entries = Object.entries(opt.s);
    assert(entries.length >= 1, `question ${q.id} option ${opt.t} should affect at least one dimension`);
    for (const [dim, score] of entries) {
      assert(typeof dim === 'string' && dim.trim(), `question ${q.id} has empty dimension name`);
      assert(Number.isInteger(score) && score > 0, `question ${q.id} dimension ${dim} should use positive integer score`);
    }
  }
}

const expectedResultKeys = ['DEAD', 'FUCK', 'ATM', 'MALO', 'SHIT'];
assert.deepStrictEqual(Object.keys(results), expectedResultKeys, 'result keys changed unexpectedly');

for (const key of expectedResultKeys) {
  const item = results[key];
  assert(item && typeof item === 'object', `result ${key} should exist`);
  assert(typeof item.n === 'string' && item.n.trim(), `result ${key} missing name`);
  assert(typeof item.en === 'string' && item.en === key, `result ${key} en should equal key`);
  assert(typeof item.slogan === 'string' && item.slogan.trim(), `result ${key} missing slogan`);
  assert(Array.isArray(item.desc) && item.desc.length >= 3, `result ${key} should contain at least 3 description lines`);
}

assert(
  html.includes('for (let i = 0; i < questions.length; i++) {'),
  'progress rendering should use questions.length instead of a hard-coded value'
);
assert(
  html.includes('if (currentQ < questions.length) { renderProgress(); renderQuestion(); }'),
  'question step logic should use questions.length instead of a hard-coded value'
);

console.log('quiz-data.test.js: all checks passed');

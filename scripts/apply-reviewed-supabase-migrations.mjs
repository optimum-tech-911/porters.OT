import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF || 'qyzpqajotnnairsgdhqu';
if (!token) throw new Error('SUPABASE_ACCESS_TOKEN is required.');

const files = process.argv.slice(2);
if (files.length !== 1) throw new Error('Pass exactly one reviewed SQL migration path. Apply and verify each transaction separately.');

const file = files[0];
const query = await readFile(resolve(file), 'utf8');
const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
});
const responseText = await response.text();
if (!response.ok) throw new Error(`${basename(file)} failed (${response.status}): ${responseText.slice(0, 600)}`);
console.log(`Applied ${basename(file)}`);

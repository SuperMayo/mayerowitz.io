// src/routes/static.js
import fs from 'fs';
import { resolve } from 'path';

export async function get() {
  const filePath = resolve('dunes.html'); // Update this path as needed
  const html = fs.readFileSync(filePath, 'utf8');

  return {
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
}
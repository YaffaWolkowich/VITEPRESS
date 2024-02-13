import {  promises as fs ,readdir, readFileSync, createWriteStream } from 'node:fs';
import { relative, resolve, join, extname } from 'node:path';

import yamlFront from 'yaml-front-matter';

export default async () => {

    const docsDirectory = resolve(__dirname, '../../docs');
    const rewritesFilePath = resolve(__dirname, './rewrites.js');

    const rewritesObject = await generateRewrites(docsDirectory);
    const stream = createWriteStream(rewritesFilePath);
    stream.write(`export default ${JSON.stringify(rewritesObject, null, 2)}\n`);
    stream.end();
}

async function generateRewrites(docsDirectory) {
    let rewritesObject = {};
    let UUIDSet = new Set();
    await visitDirectory(docsDirectory, rewritesObject, UUIDSet);
    return rewritesObject;
}

async function visitDirectory(docsDirectory ,rewritesObject ,UUIDSet) {
    const filesQueue = [docsDirectory];
    while (filesQueue.length > 0) {
        const currentPath = filesQueue.shift();
        const stats = await fs.stat(currentPath);
        if (stats.isDirectory()) {
            const files = await fs.readdir(currentPath);
            files.forEach(file => filesQueue.push(join(currentPath, file)));
        } else if (stats.isFile() && extname(currentPath) === '.md') {
            await verifyUUIDUniqueness(docsDirectory ,currentPath, rewritesObject, UUIDSet);
        }
    }
}

async function verifyUUIDUniqueness(docsDirectory, filePath, rewritesObject, UUIDSet) {
    const content = readFileSync(filePath, 'utf8');
    const frontmatter = yamlFront.loadFront(content);
    if (frontmatter.permalink) {
        if (UUIDSet.has(frontmatter.permalink))
            throw new Error(`Duplicate UUID found: ${frontmatter.permalink} in file ${filePath}`);
        UUIDSet.add(frontmatter.permalink);
        const relativePath = relative(docsDirectory, filePath);
        rewritesObject[`${relativePath}`] = `${frontmatter.permalink}.md`;
    }
}

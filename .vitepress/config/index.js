import { defineConfig } from 'vitepress';

import buildEndHook from './buildEndHook'
import rewrites from './rewrites'

export default defineConfig({
    title: '🏠 Home',
    titleTemplate: '🧠 Knowledge Base',
    description: 'Knowledge base for company-wide methodology, workflows, conventions, best-practices, and tips.',
    lastUpdated: true,
    cleanUrls: true,
    srcDir: 'docs',
    rewrites: rewrites,
    buildEnd: buildEndHook
})

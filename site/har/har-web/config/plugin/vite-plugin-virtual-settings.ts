import type { Plugin, ResolvedConfig } from 'vite';
import Settings from './Settings';
import { resolve } from 'path';
import path from 'pathe';
// @ts-ignore
import { render } from 'ejs';

const DEFAULT_HTML_NAME = 'index.html';
export interface settingsConfigType {
  platform?: string;
  moduleId?: string;
  root?: string;
}
export default function virtualSettings(opt?: settingsConfigType): Plugin {
  let viteConfig: ResolvedConfig;
  return {
    name: 'virtual-settings',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    config() {
      const { platform, root } = {
        platform: process.env.MODE || 'cube',
        root: process.cwd(),
        ...opt
      };
      const settingsDir = resolve(root, './settings', platform);
      const ctx = new Settings(settingsDir);
      const res = ctx.getResData() || {};
      return {
        define: {
          CONFIG: res
        },
        resolve: {
          alias: {
            '@images': resolve(settingsDir, `images`)
          }
        }
      };
    },
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html, ctx) {
        const url = ctx.filename;
        const base = viteConfig.base;
        const excludeBaseUrl = url.replace(base, '/');
        const htmlName = path.relative(process.cwd(), excludeBaseUrl);
        if (htmlName !== DEFAULT_HTML_NAME) {
          return;
        }
        const ejsData: Record<string, any> = {
          ...(viteConfig?.env ?? {}),
          ...(viteConfig?.define ?? {})
        };
        const result = await render(html, JSON.parse(ejsData.CONFIG));
        return {
          html: result,
          tags: []
        };
      }
    }
  };
}

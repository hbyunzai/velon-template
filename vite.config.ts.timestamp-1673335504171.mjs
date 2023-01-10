var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite/dist/node/index.js";

// build/utils/wrapperEnv.ts
function wrapperEnv(env) {
  const convertedEnv = {};
  for (const name of Object.keys(env)) {
    let value = env[name].replace(/\\n/g, "\n");
    switch (value) {
      case "true":
        value = true;
        break;
      case "false":
        value = false;
        break;
      default:
        break;
    }
    switch (name) {
      case "VITE_SERVER_PORT":
        value = Number(value);
        break;
      case "VITE_USE_PROXY_OPTIONS":
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch (error) {
          value = [];
        }
        break;
      default:
        break;
    }
    convertedEnv[name] = value;
    switch (typeof value) {
      case "string":
        process.env[name] = value;
        break;
      case "object":
        process.env[name] = JSON.stringify(value);
        break;
      default:
        break;
    }
  }
  return convertedEnv;
}

// build/utils/pathUtil.ts
import path from "path";
var PathUtil = class {
  static getRootPath() {
    return path.resolve(process.cwd());
  }
  static getMockPath() {
    return path.resolve(this.getRootPath(), "mock");
  }
  static getDistPath() {
    return path.resolve(this.getRootPath(), "dist");
  }
  static getSrcPath(srcName = "src") {
    return path.resolve(this.getRootPath(), srcName);
  }
};

// build/config/plugins.factory.ts
import vue from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-mock/dist/index.js";
import VueMacros from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-vue-macros/dist/vite.mjs";
import Components from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-vue-components/dist/vite.mjs";
import { AntDesignVueResolver } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import AutoImport from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-auto-import/dist/vite.js";
import compressPlugin from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-compression/dist/index.mjs";
import VitePluginCertificate from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { VitePWA } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-pwa/dist/index.mjs";
import path2 from "path";
import { createHtmlPlugin } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-html/dist/index.mjs";
import Icons from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-icons/dist/vite.mjs";
import { FileSystemIconLoader } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-icons/dist/loaders.mjs";
import IconsResolver from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-icons/dist/resolver.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import topLevelAwait from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var PluginsFactory = class {
  static importMetaEnv(env) {
    this.env = env;
    this.create();
    return this;
  }
  static plugins() {
    return this.pluginList;
  }
  static create() {
    this.setupMacros();
    this.setupVue();
    this.setupTopLevel();
    this.setupIcon();
    this.setupComponents();
    this.setupImports();
    this.setupMock();
    this.setupCompress();
    this.setupHttps();
    this.setupLegacy();
    this.setupPWA();
    this.setupHtml();
  }
  static setupTopLevel() {
    this.pluginList.push(topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`
    }));
  }
  static setupIcon() {
    let localIconPath = path2.resolve(PathUtil.getSrcPath(), "assets/svg-icon");
    const collectionName = this.env.VITE_ICON_LOCAL_PREFIX.replace(`${this.env.VITE_ICON_PREFIX}-`, "");
    this.pluginList.push(
      Icons({
        compiler: "vue3",
        customCollections: {
          [collectionName]: FileSystemIconLoader(localIconPath)
        },
        scale: 1,
        defaultClass: "inline-block"
      })
    );
    this.pluginList.push(
      createSvgIconsPlugin({
        iconDirs: [localIconPath],
        symbolId: `${this.env.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
        inject: "body-last",
        customDomId: "__SVG_ICON_LOCAL__"
      })
    );
  }
  static setupHtml() {
    let entry = "/src/main.ts";
    const html = createHtmlPlugin({
      entry
    });
    this.pluginList.push(html);
  }
  static setupPWA() {
    if (this.env.VITE_USE_PWA) {
      this.pluginList.push(
        VitePWA({
          registerType: "autoUpdate",
          includeAssets: ["favicon.ico"],
          manifest: {
            name: this.env.VITE_APP_NAME,
            short_name: this.env.VITE_APP_SHORT_NAME,
            theme_color: "#fff",
            icons: [
              {
                src: "/logo.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/logo.png",
                sizes: "512x512",
                type: "image/png"
              },
              {
                src: "/logo.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
              }
            ]
          }
        })
      );
    }
  }
  static setupLegacy() {
    if (this.env.VITE_USE_LEGACY) {
      console.warn("legacy is not implements vite@3");
    }
  }
  static setupHttps() {
    if (this.env.VITE_USE_HTTPS) {
      this.pluginList.push(
        VitePluginCertificate({
          source: "coding"
        })
      );
    }
  }
  static setupCompress() {
    if (this.env.VITE_USE_COMPRESS) {
      const compress = [];
      if (this.env.VITE_USE_COMPRESS_TYPE === "gzip") {
        compress.push(
          compressPlugin({
            ext: ".gz",
            algorithm: "gzip",
            deleteOriginFile: this.env.VITE_USE_COMPRESS_DELETE_ORIGIN
          })
        );
      } else if (this.env.VITE_USE_COMPRESS_TYPE === "brotli") {
        compress.push(
          compressPlugin({
            ext: ".br",
            algorithm: "brotliCompress",
            deleteOriginFile: this.env.VITE_USE_COMPRESS_DELETE_ORIGIN
          })
        );
      }
      compress.forEach((c) => this.pluginList.push(c));
    }
  }
  static setupImports() {
    const imports = AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
        filepath: path2.resolve(PathUtil.getSrcPath(), ".eslintrc-auto-import.json"),
        globalsPropValue: true
      },
      dts: path2.resolve(PathUtil.getSrcPath(), "auto-imports.d.ts")
    });
    this.pluginList.push(imports);
  }
  static setupComponents() {
    const collectionName = this.env.VITE_ICON_LOCAL_PREFIX.replace(`${this.env.VITE_ICON_PREFIX}-`, "");
    const components = Components({
      dts: path2.resolve(PathUtil.getSrcPath(), "components.d.ts"),
      types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
          importStyle: "less"
        }),
        IconsResolver({ customCollections: [collectionName], componentPrefix: this.env.VITE_ICON_PREFIX })
      ]
    });
    this.pluginList.push(components);
  }
  static setupMacros() {
    this.pluginList.push(VueMacros({}));
  }
  static setupVue() {
    this.pluginList.push(vue());
  }
  static setupMock() {
    if (this.env.VITE_USE_MOCK) {
      const mock = viteMockServe({
        ignore: /^\\_/,
        mockPath: "mock",
        localEnabled: true,
        prodEnabled: true,
        injectCode: `
      	  import { setupProdMockServer } from '../mock/index';
          setupProdMockServer();
        `
      });
      this.pluginList.push(mock);
    }
  }
};
__publicField(PluginsFactory, "env");
__publicField(PluginsFactory, "pluginList", []);

// build/config/build.factory.ts
var BuildFactory = class {
  constructor() {
  }
  static importMetaEnv(env) {
    this.env = env;
    this.create();
    return this;
  }
  static create() {
    if (this.env.VITE_BUILD_ENV === "prod") {
      this.setupProd();
    }
  }
  static setupProd() {
    this.buildOption = {
      outDir: PathUtil.getDistPath(),
      chunkSizeWarningLimit: 2e3
    };
    this.esBuildOption = {
      pure: this.env.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    };
  }
  static options() {
    return this.buildOption;
  }
  static esOptions() {
    return this.esBuildOption;
  }
};
__publicField(BuildFactory, "env");
__publicField(BuildFactory, "buildOption");
__publicField(BuildFactory, "esBuildOption");

// build/config/antd.optimize.ts
import { kebabCase } from "file:///C:/Users/yunzai-148/Desktop/velon-template/node_modules/unplugin-vue-components/dist/index.mjs";
var antComponents = [
  "Affix",
  "Alert",
  "Anchor",
  "AnchorLink",
  "AutoComplete",
  "AutoCompleteOptGroup",
  "AutoCompleteOption",
  "Avatar",
  "AvatarGroup",
  "BackTop",
  "Badge",
  "BadgeRibbon",
  "Breadcrumb",
  "BreadcrumbItem",
  "BreadcrumbSeparator",
  "Button",
  "ButtonGroup",
  "Calendar",
  "Card",
  "CardGrid",
  "CardMeta",
  "Carousel",
  "Cascader",
  "CheckableTag",
  "Checkbox",
  "CheckboxGroup",
  "Col",
  "Collapse",
  "CollapsePanel",
  "Comment",
  "ConfigProvider",
  "DatePicker",
  "Descriptions",
  "DescriptionsItem",
  "DirectoryTree",
  "Divider",
  "Drawer",
  "Dropdown",
  "DropdownButton",
  "Empty",
  "Form",
  "FormItem",
  "FormItemRest",
  "Image",
  "ImagePreviewGroup",
  "Input",
  "InputGroup",
  "InputNumber",
  "InputPassword",
  "InputSearch",
  "Layout",
  "LayoutContent",
  "LayoutFooter",
  "LayoutHeader",
  "LayoutSider",
  "List",
  "ListItem",
  "ListItemMeta",
  "LocaleProvider",
  "Mentions",
  "MentionsOption",
  "Menu",
  "MenuDivider",
  "MenuItem",
  "MenuItemGroup",
  "Modal",
  "MonthPicker",
  "PageHeader",
  "Pagination",
  "Popconfirm",
  "Popover",
  "Progress",
  "Radio",
  "RadioButton",
  "RadioGroup",
  "RangePicker",
  "Rate",
  "Result",
  "Row",
  "Select",
  "SelectOptGroup",
  "SelectOption",
  "Skeleton",
  "SkeletonAvatar",
  "SkeletonButton",
  "SkeletonImage",
  "SkeletonInput",
  "Slider",
  "Space",
  "Spin",
  "Statistic",
  "StatisticCountdown",
  "Step",
  "Steps",
  "SubMenu",
  "Switch",
  "TabPane",
  "Table",
  "TableColumn",
  "TableColumnGroup",
  "TableSummary",
  "TableSummaryCell",
  "TableSummaryRow",
  "Tabs",
  "Tag",
  "Textarea",
  "TimePicker",
  "TimeRangePicker",
  "Timeline",
  "TimelineItem",
  "Tooltip",
  "Transfer",
  "Tree",
  "TreeNode",
  "TreeSelect",
  "TreeSelectNode",
  "Typography",
  "TypographyLink",
  "TypographyParagraph",
  "TypographyText",
  "TypographyTitle",
  "Upload",
  "UploadDragger",
  "WeekPicker"
];
var antMatchComponents = [
  {
    pattern: /^Avatar/,
    styleDir: "avatar"
  },
  {
    pattern: /^AutoComplete/,
    styleDir: "auto-complete"
  },
  {
    pattern: /^Anchor/,
    styleDir: "anchor"
  },
  {
    pattern: /^Badge/,
    styleDir: "badge"
  },
  {
    pattern: /^Breadcrumb/,
    styleDir: "breadcrumb"
  },
  {
    pattern: /^Button/,
    styleDir: "button"
  },
  {
    pattern: /^Checkbox/,
    styleDir: "checkbox"
  },
  {
    pattern: /^Card/,
    styleDir: "card"
  },
  {
    pattern: /^Collapse/,
    styleDir: "collapse"
  },
  {
    pattern: /^Descriptions/,
    styleDir: "descriptions"
  },
  {
    pattern: /^RangePicker|^WeekPicker|^MonthPicker/,
    styleDir: "date-picker"
  },
  {
    pattern: /^Dropdown/,
    styleDir: "dropdown"
  },
  {
    pattern: /^Form/,
    styleDir: "form"
  },
  {
    pattern: /^InputNumber/,
    styleDir: "input-number"
  },
  {
    pattern: /^Input|^Textarea/,
    styleDir: "input"
  },
  {
    pattern: /^Statistic/,
    styleDir: "statistic"
  },
  {
    pattern: /^CheckableTag/,
    styleDir: "tag"
  },
  {
    pattern: /^TimeRangePicker/,
    styleDir: "time-picker"
  },
  {
    pattern: /^Layout/,
    styleDir: "layout"
  },
  {
    pattern: /^Menu|^SubMenu/,
    styleDir: "menu"
  },
  {
    pattern: /^Table/,
    styleDir: "table"
  },
  {
    pattern: /^TimePicker|^TimeRangePicker/,
    styleDir: "time-picker"
  },
  {
    pattern: /^Radio/,
    styleDir: "radio"
  },
  {
    pattern: /^Image/,
    styleDir: "image"
  },
  {
    pattern: /^List/,
    styleDir: "list"
  },
  {
    pattern: /^Tab/,
    styleDir: "tabs"
  },
  {
    pattern: /^Mentions/,
    styleDir: "mentions"
  },
  {
    pattern: /^Step/,
    styleDir: "steps"
  },
  {
    pattern: /^Skeleton/,
    styleDir: "skeleton"
  },
  {
    pattern: /^Select/,
    styleDir: "select"
  },
  {
    pattern: /^TreeSelect/,
    styleDir: "tree-select"
  },
  {
    pattern: /^Tree|^DirectoryTree/,
    styleDir: "tree"
  },
  {
    pattern: /^Typography/,
    styleDir: "typography"
  },
  {
    pattern: /^Timeline/,
    styleDir: "timeline"
  },
  {
    pattern: /^Upload/,
    styleDir: "upload"
  }
];
var antdvStyleDeps = new Set(
  antComponents.map((compName) => {
    const total = antMatchComponents.length;
    for (let i = 0; i < total; i++) {
      const matcher = antMatchComponents[i];
      if (compName.match(matcher.pattern)) {
        return `ant-design-vue/es/${matcher.styleDir}/style`;
      }
    }
    return `ant-design-vue/es/${kebabCase(compName)}/style`;
  })
);

// build/config/optimize.ts
var optimize = [
  ...antdvStyleDeps,
  "@vue/runtime-core",
  "@vue/shared",
  "ant-design-vue/es/locale/zh_CN",
  "ant-design-vue/es/locale/en_US",
  "vue",
  "vue-router",
  "pinia",
  "axios",
  "@vueuse/core",
  "@vueuse/shared",
  "@ant-design/icons-vue",
  "ant-design-vue/es/table",
  "ant-design-vue/es/tree-select",
  "ant-design-vue/es/vc-util/get",
  "ant-design-vue/es/_util/props-util",
  "dayjs",
  "extend"
];
function createOptimization() {
  return {
    include: optimize
  };
}

// build/config/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path3) => path3.replace(new RegExp(`^${prefix}`), ""),
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
var vite_config_default = defineConfig((configEnv) => {
  const env = wrapperEnv(loadEnv(configEnv.mode, process.cwd()));
  return {
    base: env.VITE_PUBLIC_PATH,
    server: {
      https: env.VITE_USE_HTTPS,
      host: true,
      port: env.VITE_SERVER_PORT,
      cors: true,
      proxy: createProxy(env.VITE_USE_PROXY_OPTIONS)
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "root-entry-name": "variable"
          }
        }
      }
    },
    optimizeDeps: createOptimization(),
    plugins: PluginsFactory.importMetaEnv(env).plugins(),
    build: BuildFactory.importMetaEnv(env).options(),
    esbuild: BuildFactory.importMetaEnv(env).esOptions()
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMvd3JhcHBlckVudi50cyIsICJidWlsZC91dGlscy9wYXRoVXRpbC50cyIsICJidWlsZC9jb25maWcvcGx1Z2lucy5mYWN0b3J5LnRzIiwgImJ1aWxkL2NvbmZpZy9idWlsZC5mYWN0b3J5LnRzIiwgImJ1aWxkL2NvbmZpZy9hbnRkLm9wdGltaXplLnRzIiwgImJ1aWxkL2NvbmZpZy9vcHRpbWl6ZS50cyIsICJidWlsZC9jb25maWcvcHJveHkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5dW56YWktMTQ4XFxcXERlc2t0b3BcXFxcdmVsb24tdGVtcGxhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveXVuemFpLTE0OC9EZXNrdG9wL3ZlbG9uLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWcsIGxvYWRFbnZ9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQge3dyYXBwZXJFbnYsIGNyZWF0ZU9wdGltaXphdGlvbiwgQnVpbGRGYWN0b3J5LCBjcmVhdGVQcm94eSwgUGx1Z2luc0ZhY3Rvcnl9IGZyb20gJy4vYnVpbGQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGNvbmZpZ0VudiA9PiB7XHJcbiAgICBjb25zdCBlbnY6IEltcG9ydE1ldGFFbnYgPSB3cmFwcGVyRW52KGxvYWRFbnYoY29uZmlnRW52Lm1vZGUsIHByb2Nlc3MuY3dkKCkpKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICAgIGh0dHBzOiBlbnYuVklURV9VU0VfSFRUUFMsXHJcbiAgICAgICAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHBvcnQ6IGVudi5WSVRFX1NFUlZFUl9QT1JULFxyXG4gICAgICAgICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICAgICAgICBwcm94eTogY3JlYXRlUHJveHkoZW52LlZJVEVfVVNFX1BST1hZX09QVElPTlMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjc3M6IHtcclxuICAgICAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgbGVzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeVZhcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Jvb3QtZW50cnktbmFtZSc6ICd2YXJpYWJsZSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGltaXplRGVwczogY3JlYXRlT3B0aW1pemF0aW9uKCksXHJcbiAgICAgICAgcGx1Z2luczogUGx1Z2luc0ZhY3RvcnkuaW1wb3J0TWV0YUVudihlbnYpLnBsdWdpbnMoKSxcclxuICAgICAgICBidWlsZDogQnVpbGRGYWN0b3J5LmltcG9ydE1ldGFFbnYoZW52KS5vcHRpb25zKCksXHJcbiAgICAgICAgZXNidWlsZDogQnVpbGRGYWN0b3J5LmltcG9ydE1ldGFFbnYoZW52KS5lc09wdGlvbnMoKVxyXG4gICAgfTtcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5dW56YWktMTQ4XFxcXERlc2t0b3BcXFxcdmVsb24tdGVtcGxhdGVcXFxcYnVpbGRcXFxcdXRpbHNcXFxcd3JhcHBlckVudi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveXVuemFpLTE0OC9EZXNrdG9wL3ZlbG9uLXRlbXBsYXRlL2J1aWxkL3V0aWxzL3dyYXBwZXJFbnYudHNcIjtleHBvcnQgZnVuY3Rpb24gd3JhcHBlckVudihlbnY6IFJlY29yZGFibGUpOiBJbXBvcnRNZXRhRW52IHtcclxuICBjb25zdCBjb252ZXJ0ZWRFbnY6IGFueSA9IHt9O1xyXG4gIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhlbnYpKSB7XHJcbiAgICBsZXQgdmFsdWUgPSBlbnZbbmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG4gICAgLy8gaGFuZGxlIGJvb2wgdHlwZVxyXG4gICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICBjYXNlICd0cnVlJzpcclxuICAgICAgICB2YWx1ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ZhbHNlJzpcclxuICAgICAgICB2YWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLy8gaGFuZGxlIG90aGVyIHR5cGVcclxuICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICBjYXNlICdWSVRFX1NFUlZFUl9QT1JUJzpcclxuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ1ZJVEVfVVNFX1BST1hZX09QVElPTlMnOlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvJy9nLCAnXCInKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHZhbHVlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29udmVydGVkRW52W25hbWVdID0gdmFsdWU7XHJcbiAgICAvLyBoYW5kbGUgcHJvY2VzcyBlbnZcclxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgcHJvY2Vzcy5lbnZbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICBwcm9jZXNzLmVudltuYW1lXSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNvbnZlcnRlZEVudjtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFxidWlsZFxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXHV0aWxzXFxcXHBhdGhVdGlsLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy95dW56YWktMTQ4L0Rlc2t0b3AvdmVsb24tdGVtcGxhdGUvYnVpbGQvdXRpbHMvcGF0aFV0aWwudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXRoVXRpbCB7XHJcbiAgc3RhdGljIGdldFJvb3RQYXRoKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldE1vY2tQYXRoKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuZ2V0Um9vdFBhdGgoKSwgJ21vY2snKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREaXN0UGF0aCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZSh0aGlzLmdldFJvb3RQYXRoKCksICdkaXN0Jyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIGdldFNyY1BhdGgoc3JjTmFtZSA9ICdzcmMnKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBwYXRoLnJlc29sdmUodGhpcy5nZXRSb290UGF0aCgpLCBzcmNOYW1lKTtcclxuICB9XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5dW56YWktMTQ4XFxcXERlc2t0b3BcXFxcdmVsb24tdGVtcGxhdGVcXFxcYnVpbGRcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5dW56YWktMTQ4XFxcXERlc2t0b3BcXFxcdmVsb24tdGVtcGxhdGVcXFxcYnVpbGRcXFxcY29uZmlnXFxcXHBsdWdpbnMuZmFjdG9yeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveXVuemFpLTE0OC9EZXNrdG9wL3ZlbG9uLXRlbXBsYXRlL2J1aWxkL2NvbmZpZy9wbHVnaW5zLmZhY3RvcnkudHNcIjtpbXBvcnQgdHlwZSB7UGx1Z2luT3B0aW9ufSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQge3ZpdGVNb2NrU2VydmV9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xyXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSc7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQge0FudERlc2lnblZ1ZVJlc29sdmVyfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQge1BhdGhVdGlsfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xyXG5pbXBvcnQgY29tcHJlc3NQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgVml0ZVBsdWdpbkNlcnRpZmljYXRlIGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XHJcbmltcG9ydCB7Vml0ZVBXQX0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7Y3JlYXRlSHRtbFBsdWdpbn0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJztcclxuaW1wb3J0IHtGaWxlU3lzdGVtSWNvbkxvYWRlcn0gZnJvbSAndW5wbHVnaW4taWNvbnMvbG9hZGVycyc7XHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcclxuaW1wb3J0IHtjcmVhdGVTdmdJY29uc1BsdWdpbn0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcclxuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsdWdpbnNGYWN0b3J5IHtcclxuICAgIHByaXZhdGUgc3RhdGljIGVudjogSW1wb3J0TWV0YUVudjtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwbHVnaW5MaXN0OiBQbHVnaW5PcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW1wb3J0TWV0YUVudihlbnY6IEltcG9ydE1ldGFFbnYpOiB0eXBlb2YgUGx1Z2luc0ZhY3Rvcnkge1xyXG4gICAgICAgIHRoaXMuZW52ID0gZW52O1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbHVnaW5zKCk6IFBsdWdpbk9wdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldHVwTWFjcm9zKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFZ1ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBUb3BMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBJY29uKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cENvbXBvbmVudHMoKTtcclxuICAgICAgICB0aGlzLnNldHVwSW1wb3J0cygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBNb2NrKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cENvbXByZXNzKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cEh0dHBzKCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cExlZ2FjeSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBQV0EoKTtcclxuICAgICAgICB0aGlzLnNldHVwSHRtbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldHVwVG9wTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0LnB1c2godG9wTGV2ZWxBd2FpdCh7XHJcbiAgICAgICAgICAgIC8vIFRoZSBleHBvcnQgbmFtZSBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBmb3IgZWFjaCBjaHVuayBtb2R1bGVcclxuICAgICAgICAgICAgcHJvbWlzZUV4cG9ydE5hbWU6IFwiX190bGFcIixcclxuICAgICAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGltcG9ydCBuYW1lcyBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBpbiBlYWNoIGNodW5rIG1vZHVsZVxyXG4gICAgICAgICAgICBwcm9taXNlSW1wb3J0TmFtZTogaSA9PiBgX190bGFfJHtpfWBcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cEljb24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxvY2FsSWNvblBhdGggPSBwYXRoLnJlc29sdmUoUGF0aFV0aWwuZ2V0U3JjUGF0aCgpLCAnYXNzZXRzL3N2Zy1pY29uJyk7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSB0aGlzLmVudi5WSVRFX0lDT05fTE9DQUxfUFJFRklYLnJlcGxhY2UoYCR7dGhpcy5lbnYuVklURV9JQ09OX1BSRUZJWH0tYCwgJycpO1xyXG4gICAgICAgIHRoaXMucGx1Z2luTGlzdC5wdXNoKFxyXG4gICAgICAgICAgICBJY29ucyh7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ29sbGVjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBbY29sbGVjdGlvbk5hbWVdOiBGaWxlU3lzdGVtSWNvbkxvYWRlcihsb2NhbEljb25QYXRoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdENsYXNzOiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0LnB1c2goXHJcbiAgICAgICAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICAgICAgICAgIGljb25EaXJzOiBbbG9jYWxJY29uUGF0aF0sXHJcbiAgICAgICAgICAgICAgICBzeW1ib2xJZDogYCR7dGhpcy5lbnYuVklURV9JQ09OX0xPQ0FMX1BSRUZJWH0tW2Rpcl0tW25hbWVdYCxcclxuICAgICAgICAgICAgICAgIGluamVjdDogJ2JvZHktbGFzdCcsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Eb21JZDogJ19fU1ZHX0lDT05fTE9DQUxfXydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldHVwSHRtbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZW50cnkgPSAnL3NyYy9tYWluLnRzJztcclxuICAgICAgICBjb25zdCBodG1sID0gY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgICAgIGVudHJ5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0LnB1c2goaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBQV0EoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52LlZJVEVfVVNFX1BXQSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaChcclxuICAgICAgICAgICAgICAgIFZpdGVQV0Eoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5pY28nXSxcclxuICAgICAgICAgICAgICAgICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmVudi5WSVRFX0FQUF9OQU1FLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG9ydF9uYW1lOiB0aGlzLmVudi5WSVRFX0FQUF9TSE9SVF9OQU1FLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy9sb2dvLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6ICcvbG9nby5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnL2xvZ28ucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cExlZ2FjeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbnYuVklURV9VU0VfTEVHQUNZKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbGVnYWN5IGlzIG5vdCBpbXBsZW1lbnRzIHZpdGVAMycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cEh0dHBzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5WSVRFX1VTRV9IVFRQUykge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaChcclxuICAgICAgICAgICAgICAgIFZpdGVQbHVnaW5DZXJ0aWZpY2F0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiAnY29kaW5nJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBDb21wcmVzcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5lbnYuVklURV9VU0VfQ09NUFJFU1MpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcHJlc3M6IFBsdWdpbk9wdGlvbltdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVudi5WSVRFX1VTRV9DT01QUkVTU19UWVBFID09PSAnZ3ppcCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbXByZXNzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcHJlc3NQbHVnaW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogdGhpcy5lbnYuVklURV9VU0VfQ09NUFJFU1NfREVMRVRFX09SSUdJTlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW52LlZJVEVfVVNFX0NPTVBSRVNTX1RZUEUgPT09ICdicm90bGknKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wcmVzcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzUGx1Z2luKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0OiAnLmJyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiB0aGlzLmVudi5WSVRFX1VTRV9DT01QUkVTU19ERUxFVEVfT1JJR0lOXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcHJlc3MuZm9yRWFjaChjID0+IHRoaXMucGx1Z2luTGlzdC5wdXNoKGMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHNldHVwSW1wb3J0cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbXBvcnRzID0gQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcclxuICAgICAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmaWxlcGF0aDogcGF0aC5yZXNvbHZlKFBhdGhVdGlsLmdldFNyY1BhdGgoKSwgJy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGR0czogcGF0aC5yZXNvbHZlKFBhdGhVdGlsLmdldFNyY1BhdGgoKSwgJ2F1dG8taW1wb3J0cy5kLnRzJylcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaChpbXBvcnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cENvbXBvbmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSB0aGlzLmVudi5WSVRFX0lDT05fTE9DQUxfUFJFRklYLnJlcGxhY2UoYCR7dGhpcy5lbnYuVklURV9JQ09OX1BSRUZJWH0tYCwgJycpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBDb21wb25lbnRzKHtcclxuICAgICAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUoUGF0aFV0aWwuZ2V0U3JjUGF0aCgpLCAnY29tcG9uZW50cy5kLnRzJyksXHJcbiAgICAgICAgICAgIHR5cGVzOiBbe2Zyb206ICd2dWUtcm91dGVyJywgbmFtZXM6IFsnUm91dGVyTGluaycsICdSb3V0ZXJWaWV3J119XSxcclxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUljb25zOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydFN0eWxlOiAnbGVzcydcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgSWNvbnNSZXNvbHZlcih7Y3VzdG9tQ29sbGVjdGlvbnM6IFtjb2xsZWN0aW9uTmFtZV0sIGNvbXBvbmVudFByZWZpeDogdGhpcy5lbnYuVklURV9JQ09OX1BSRUZJWH0pXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaChjb21wb25lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cE1hY3JvcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaChWdWVNYWNyb3Moe30pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR1cFZ1ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBsdWdpbkxpc3QucHVzaCh2dWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBNb2NrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5WSVRFX1VTRV9NT0NLKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vY2sgPSB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgICAgICAgICAgIGlnbm9yZTogL15cXFxcXy8sXHJcbiAgICAgICAgICAgICAgICBtb2NrUGF0aDogJ21vY2snLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJvZEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpbmplY3RDb2RlOiBgXHJcbiAgICAgIFx0ICBpbXBvcnQgeyBzZXR1cFByb2RNb2NrU2VydmVyIH0gZnJvbSAnLi4vbW9jay9pbmRleCc7XHJcbiAgICAgICAgICBzZXR1cFByb2RNb2NrU2VydmVyKCk7XHJcbiAgICAgICAgYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5MaXN0LnB1c2gobW9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXGNvbmZpZ1xcXFxidWlsZC5mYWN0b3J5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy95dW56YWktMTQ4L0Rlc2t0b3AvdmVsb24tdGVtcGxhdGUvYnVpbGQvY29uZmlnL2J1aWxkLmZhY3RvcnkudHNcIjtpbXBvcnQgdHlwZSB7IEJ1aWxkT3B0aW9ucywgRVNCdWlsZE9wdGlvbnMgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgUGF0aFV0aWwgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVpbGRGYWN0b3J5IHtcclxuICBwcml2YXRlIHN0YXRpYyBlbnY6IEltcG9ydE1ldGFFbnY7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGJ1aWxkT3B0aW9uOiBCdWlsZE9wdGlvbnM7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGVzQnVpbGRPcHRpb246IEVTQnVpbGRPcHRpb25zO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbXBvcnRNZXRhRW52KGVudjogSW1wb3J0TWV0YUVudik6IHR5cGVvZiBCdWlsZEZhY3Rvcnkge1xyXG4gICAgdGhpcy5lbnYgPSBlbnY7XHJcbiAgICB0aGlzLmNyZWF0ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmVudi5WSVRFX0JVSUxEX0VOViA9PT0gJ3Byb2QnKSB7XHJcbiAgICAgIHRoaXMuc2V0dXBQcm9kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBzZXR1cFByb2QoKTogdm9pZCB7XHJcbiAgICB0aGlzLmJ1aWxkT3B0aW9uID0ge1xyXG4gICAgICBvdXREaXI6IFBhdGhVdGlsLmdldERpc3RQYXRoKCksXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMFxyXG4gICAgfTtcclxuICAgIHRoaXMuZXNCdWlsZE9wdGlvbiA9IHtcclxuICAgICAgcHVyZTogdGhpcy5lbnYuVklURV9EUk9QX0NPTlNPTEUgPyBbJ2NvbnNvbGUubG9nJywgJ2RlYnVnZ2VyJ10gOiBbXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgb3B0aW9ucygpOiBCdWlsZE9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRPcHRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVzT3B0aW9ucygpOiBFU0J1aWxkT3B0aW9ucyB7XHJcbiAgICByZXR1cm4gdGhpcy5lc0J1aWxkT3B0aW9uO1xyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFxidWlsZFxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFxidWlsZFxcXFxjb25maWdcXFxcYW50ZC5vcHRpbWl6ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveXVuemFpLTE0OC9EZXNrdG9wL3ZlbG9uLXRlbXBsYXRlL2J1aWxkL2NvbmZpZy9hbnRkLm9wdGltaXplLnRzXCI7aW1wb3J0IHsga2ViYWJDYXNlIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRjaGVyIHtcclxuICBwYXR0ZXJuOiBSZWdFeHA7XHJcbiAgc3R5bGVEaXI6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgYW50Q29tcG9uZW50cyA9IFtcclxuICBcIkFmZml4XCIsXHJcbiAgXCJBbGVydFwiLFxyXG4gIFwiQW5jaG9yXCIsXHJcbiAgXCJBbmNob3JMaW5rXCIsXHJcbiAgXCJBdXRvQ29tcGxldGVcIixcclxuICBcIkF1dG9Db21wbGV0ZU9wdEdyb3VwXCIsXHJcbiAgXCJBdXRvQ29tcGxldGVPcHRpb25cIixcclxuICBcIkF2YXRhclwiLFxyXG4gIFwiQXZhdGFyR3JvdXBcIixcclxuICBcIkJhY2tUb3BcIixcclxuICBcIkJhZGdlXCIsXHJcbiAgXCJCYWRnZVJpYmJvblwiLFxyXG4gIFwiQnJlYWRjcnVtYlwiLFxyXG4gIFwiQnJlYWRjcnVtYkl0ZW1cIixcclxuICBcIkJyZWFkY3J1bWJTZXBhcmF0b3JcIixcclxuICBcIkJ1dHRvblwiLFxyXG4gIFwiQnV0dG9uR3JvdXBcIixcclxuICBcIkNhbGVuZGFyXCIsXHJcbiAgXCJDYXJkXCIsXHJcbiAgXCJDYXJkR3JpZFwiLFxyXG4gIFwiQ2FyZE1ldGFcIixcclxuICBcIkNhcm91c2VsXCIsXHJcbiAgXCJDYXNjYWRlclwiLFxyXG4gIFwiQ2hlY2thYmxlVGFnXCIsXHJcbiAgXCJDaGVja2JveFwiLFxyXG4gIFwiQ2hlY2tib3hHcm91cFwiLFxyXG4gIFwiQ29sXCIsXHJcbiAgXCJDb2xsYXBzZVwiLFxyXG4gIFwiQ29sbGFwc2VQYW5lbFwiLFxyXG4gIFwiQ29tbWVudFwiLFxyXG4gIFwiQ29uZmlnUHJvdmlkZXJcIixcclxuICBcIkRhdGVQaWNrZXJcIixcclxuICBcIkRlc2NyaXB0aW9uc1wiLFxyXG4gIFwiRGVzY3JpcHRpb25zSXRlbVwiLFxyXG4gIFwiRGlyZWN0b3J5VHJlZVwiLFxyXG4gIFwiRGl2aWRlclwiLFxyXG4gIFwiRHJhd2VyXCIsXHJcbiAgXCJEcm9wZG93blwiLFxyXG4gIFwiRHJvcGRvd25CdXR0b25cIixcclxuICBcIkVtcHR5XCIsXHJcbiAgXCJGb3JtXCIsXHJcbiAgXCJGb3JtSXRlbVwiLFxyXG4gIFwiRm9ybUl0ZW1SZXN0XCIsXHJcbiAgXCJJbWFnZVwiLFxyXG4gIFwiSW1hZ2VQcmV2aWV3R3JvdXBcIixcclxuICBcIklucHV0XCIsXHJcbiAgXCJJbnB1dEdyb3VwXCIsXHJcbiAgXCJJbnB1dE51bWJlclwiLFxyXG4gIFwiSW5wdXRQYXNzd29yZFwiLFxyXG4gIFwiSW5wdXRTZWFyY2hcIixcclxuICBcIkxheW91dFwiLFxyXG4gIFwiTGF5b3V0Q29udGVudFwiLFxyXG4gIFwiTGF5b3V0Rm9vdGVyXCIsXHJcbiAgXCJMYXlvdXRIZWFkZXJcIixcclxuICBcIkxheW91dFNpZGVyXCIsXHJcbiAgXCJMaXN0XCIsXHJcbiAgXCJMaXN0SXRlbVwiLFxyXG4gIFwiTGlzdEl0ZW1NZXRhXCIsXHJcbiAgXCJMb2NhbGVQcm92aWRlclwiLFxyXG4gIFwiTWVudGlvbnNcIixcclxuICBcIk1lbnRpb25zT3B0aW9uXCIsXHJcbiAgXCJNZW51XCIsXHJcbiAgXCJNZW51RGl2aWRlclwiLFxyXG4gIFwiTWVudUl0ZW1cIixcclxuICBcIk1lbnVJdGVtR3JvdXBcIixcclxuICBcIk1vZGFsXCIsXHJcbiAgXCJNb250aFBpY2tlclwiLFxyXG4gIFwiUGFnZUhlYWRlclwiLFxyXG4gIFwiUGFnaW5hdGlvblwiLFxyXG4gIFwiUG9wY29uZmlybVwiLFxyXG4gIFwiUG9wb3ZlclwiLFxyXG4gIFwiUHJvZ3Jlc3NcIixcclxuICBcIlJhZGlvXCIsXHJcbiAgXCJSYWRpb0J1dHRvblwiLFxyXG4gIFwiUmFkaW9Hcm91cFwiLFxyXG4gIFwiUmFuZ2VQaWNrZXJcIixcclxuICBcIlJhdGVcIixcclxuICBcIlJlc3VsdFwiLFxyXG4gIFwiUm93XCIsXHJcbiAgXCJTZWxlY3RcIixcclxuICBcIlNlbGVjdE9wdEdyb3VwXCIsXHJcbiAgXCJTZWxlY3RPcHRpb25cIixcclxuICBcIlNrZWxldG9uXCIsXHJcbiAgXCJTa2VsZXRvbkF2YXRhclwiLFxyXG4gIFwiU2tlbGV0b25CdXR0b25cIixcclxuICBcIlNrZWxldG9uSW1hZ2VcIixcclxuICBcIlNrZWxldG9uSW5wdXRcIixcclxuICBcIlNsaWRlclwiLFxyXG4gIFwiU3BhY2VcIixcclxuICBcIlNwaW5cIixcclxuICBcIlN0YXRpc3RpY1wiLFxyXG4gIFwiU3RhdGlzdGljQ291bnRkb3duXCIsXHJcbiAgXCJTdGVwXCIsXHJcbiAgXCJTdGVwc1wiLFxyXG4gIFwiU3ViTWVudVwiLFxyXG4gIFwiU3dpdGNoXCIsXHJcbiAgXCJUYWJQYW5lXCIsXHJcbiAgXCJUYWJsZVwiLFxyXG4gIFwiVGFibGVDb2x1bW5cIixcclxuICBcIlRhYmxlQ29sdW1uR3JvdXBcIixcclxuICBcIlRhYmxlU3VtbWFyeVwiLFxyXG4gIFwiVGFibGVTdW1tYXJ5Q2VsbFwiLFxyXG4gIFwiVGFibGVTdW1tYXJ5Um93XCIsXHJcbiAgXCJUYWJzXCIsXHJcbiAgXCJUYWdcIixcclxuICBcIlRleHRhcmVhXCIsXHJcbiAgXCJUaW1lUGlja2VyXCIsXHJcbiAgXCJUaW1lUmFuZ2VQaWNrZXJcIixcclxuICBcIlRpbWVsaW5lXCIsXHJcbiAgXCJUaW1lbGluZUl0ZW1cIixcclxuICBcIlRvb2x0aXBcIixcclxuICBcIlRyYW5zZmVyXCIsXHJcbiAgXCJUcmVlXCIsXHJcbiAgXCJUcmVlTm9kZVwiLFxyXG4gIFwiVHJlZVNlbGVjdFwiLFxyXG4gIFwiVHJlZVNlbGVjdE5vZGVcIixcclxuICBcIlR5cG9ncmFwaHlcIixcclxuICBcIlR5cG9ncmFwaHlMaW5rXCIsXHJcbiAgXCJUeXBvZ3JhcGh5UGFyYWdyYXBoXCIsXHJcbiAgXCJUeXBvZ3JhcGh5VGV4dFwiLFxyXG4gIFwiVHlwb2dyYXBoeVRpdGxlXCIsXHJcbiAgXCJVcGxvYWRcIixcclxuICBcIlVwbG9hZERyYWdnZXJcIixcclxuICBcIldlZWtQaWNrZXJcIlxyXG5dO1xyXG5cclxuY29uc3QgYW50TWF0Y2hDb21wb25lbnRzOiBJTWF0Y2hlcltdID0gW1xyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eQXZhdGFyLyxcclxuICAgIHN0eWxlRGlyOiBcImF2YXRhclwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkF1dG9Db21wbGV0ZS8sXHJcbiAgICBzdHlsZURpcjogXCJhdXRvLWNvbXBsZXRlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eQW5jaG9yLyxcclxuICAgIHN0eWxlRGlyOiBcImFuY2hvclwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15CYWRnZS8sXHJcbiAgICBzdHlsZURpcjogXCJiYWRnZVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkJyZWFkY3J1bWIvLFxyXG4gICAgc3R5bGVEaXI6IFwiYnJlYWRjcnVtYlwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkJ1dHRvbi8sXHJcbiAgICBzdHlsZURpcjogXCJidXR0b25cIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15DaGVja2JveC8sXHJcbiAgICBzdHlsZURpcjogXCJjaGVja2JveFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkNhcmQvLFxyXG4gICAgc3R5bGVEaXI6IFwiY2FyZFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkNvbGxhcHNlLyxcclxuICAgIHN0eWxlRGlyOiBcImNvbGxhcHNlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eRGVzY3JpcHRpb25zLyxcclxuICAgIHN0eWxlRGlyOiBcImRlc2NyaXB0aW9uc1wiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXlJhbmdlUGlja2VyfF5XZWVrUGlja2VyfF5Nb250aFBpY2tlci8sXHJcbiAgICBzdHlsZURpcjogXCJkYXRlLXBpY2tlclwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkRyb3Bkb3duLyxcclxuICAgIHN0eWxlRGlyOiBcImRyb3Bkb3duXCJcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkZvcm0vLFxyXG4gICAgc3R5bGVEaXI6IFwiZm9ybVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXklucHV0TnVtYmVyLyxcclxuICAgIHN0eWxlRGlyOiBcImlucHV0LW51bWJlclwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15JbnB1dHxeVGV4dGFyZWEvLFxyXG4gICAgc3R5bGVEaXI6IFwiaW5wdXRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15TdGF0aXN0aWMvLFxyXG4gICAgc3R5bGVEaXI6IFwic3RhdGlzdGljXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eQ2hlY2thYmxlVGFnLyxcclxuICAgIHN0eWxlRGlyOiBcInRhZ1wiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXlRpbWVSYW5nZVBpY2tlci8sXHJcbiAgICBzdHlsZURpcjogXCJ0aW1lLXBpY2tlclwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXkxheW91dC8sXHJcbiAgICBzdHlsZURpcjogXCJsYXlvdXRcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15NZW51fF5TdWJNZW51LyxcclxuICAgIHN0eWxlRGlyOiBcIm1lbnVcIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eVGFibGUvLFxyXG4gICAgc3R5bGVEaXI6IFwidGFibGVcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15UaW1lUGlja2VyfF5UaW1lUmFuZ2VQaWNrZXIvLFxyXG4gICAgc3R5bGVEaXI6IFwidGltZS1waWNrZXJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15SYWRpby8sXHJcbiAgICBzdHlsZURpcjogXCJyYWRpb1wiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15JbWFnZS8sXHJcbiAgICBzdHlsZURpcjogXCJpbWFnZVwiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15MaXN0LyxcclxuICAgIHN0eWxlRGlyOiBcImxpc3RcIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eVGFiLyxcclxuICAgIHN0eWxlRGlyOiBcInRhYnNcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15NZW50aW9ucy8sXHJcbiAgICBzdHlsZURpcjogXCJtZW50aW9uc1wiXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15TdGVwLyxcclxuICAgIHN0eWxlRGlyOiBcInN0ZXBzXCJcclxuICB9LFxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eU2tlbGV0b24vLFxyXG4gICAgc3R5bGVEaXI6IFwic2tlbGV0b25cIlxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIHBhdHRlcm46IC9eU2VsZWN0LyxcclxuICAgIHN0eWxlRGlyOiBcInNlbGVjdFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXlRyZWVTZWxlY3QvLFxyXG4gICAgc3R5bGVEaXI6IFwidHJlZS1zZWxlY3RcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15UcmVlfF5EaXJlY3RvcnlUcmVlLyxcclxuICAgIHN0eWxlRGlyOiBcInRyZWVcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15UeXBvZ3JhcGh5LyxcclxuICAgIHN0eWxlRGlyOiBcInR5cG9ncmFwaHlcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgcGF0dGVybjogL15UaW1lbGluZS8sXHJcbiAgICBzdHlsZURpcjogXCJ0aW1lbGluZVwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBwYXR0ZXJuOiAvXlVwbG9hZC8sXHJcbiAgICBzdHlsZURpcjogXCJ1cGxvYWRcIlxyXG4gIH1cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBhbnRkdlN0eWxlRGVwcyA9IG5ldyBTZXQoXHJcbiAgYW50Q29tcG9uZW50cy5tYXAoKGNvbXBOYW1lKSA9PiB7XHJcbiAgICBjb25zdCB0b3RhbCA9IGFudE1hdGNoQ29tcG9uZW50cy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsOyBpKyspIHtcclxuICAgICAgY29uc3QgbWF0Y2hlciA9IGFudE1hdGNoQ29tcG9uZW50c1tpXTtcclxuICAgICAgaWYgKGNvbXBOYW1lLm1hdGNoKG1hdGNoZXIucGF0dGVybikpIHtcclxuICAgICAgICByZXR1cm4gYGFudC1kZXNpZ24tdnVlL2VzLyR7bWF0Y2hlci5zdHlsZURpcn0vc3R5bGVgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYGFudC1kZXNpZ24tdnVlL2VzLyR7a2ViYWJDYXNlKGNvbXBOYW1lKX0vc3R5bGVgO1xyXG4gIH0pXHJcbik7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVuemFpLTE0OFxcXFxEZXNrdG9wXFxcXHZlbG9uLXRlbXBsYXRlXFxcXGJ1aWxkXFxcXGNvbmZpZ1xcXFxvcHRpbWl6ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveXVuemFpLTE0OC9EZXNrdG9wL3ZlbG9uLXRlbXBsYXRlL2J1aWxkL2NvbmZpZy9vcHRpbWl6ZS50c1wiO2ltcG9ydCB7IGFudGR2U3R5bGVEZXBzIH0gZnJvbSAnLi9hbnRkLm9wdGltaXplJztcclxuaW1wb3J0IHsgRGVwT3B0aW1pemF0aW9uT3B0aW9ucyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wdGltaXplID0gW1xyXG5cdC4uLmFudGR2U3R5bGVEZXBzLFxyXG5cdCdAdnVlL3J1bnRpbWUtY29yZScsXHJcblx0J0B2dWUvc2hhcmVkJyxcclxuXHQnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL3poX0NOJyxcclxuXHQnYW50LWRlc2lnbi12dWUvZXMvbG9jYWxlL2VuX1VTJyxcclxuXHQndnVlJyxcclxuXHQndnVlLXJvdXRlcicsXHJcblx0J3BpbmlhJyxcclxuXHQnYXhpb3MnLFxyXG5cdCdAdnVldXNlL2NvcmUnLFxyXG5cdCdAdnVldXNlL3NoYXJlZCcsXHJcblx0J0BhbnQtZGVzaWduL2ljb25zLXZ1ZScsXHJcblx0J2FudC1kZXNpZ24tdnVlL2VzL3RhYmxlJyxcclxuXHQnYW50LWRlc2lnbi12dWUvZXMvdHJlZS1zZWxlY3QnLFxyXG5cdCdhbnQtZGVzaWduLXZ1ZS9lcy92Yy11dGlsL2dldCcsXHJcblx0J2FudC1kZXNpZ24tdnVlL2VzL191dGlsL3Byb3BzLXV0aWwnLFxyXG5cdCdkYXlqcycsXHJcblx0J2V4dGVuZCdcclxuXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHRpbWl6YXRpb24oKTogRGVwT3B0aW1pemF0aW9uT3B0aW9ucyB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGluY2x1ZGU6IG9wdGltaXplXHJcblx0fTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFxidWlsZFxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHl1bnphaS0xNDhcXFxcRGVza3RvcFxcXFx2ZWxvbi10ZW1wbGF0ZVxcXFxidWlsZFxcXFxjb25maWdcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3l1bnphaS0xNDgvRGVza3RvcC92ZWxvbi10ZW1wbGF0ZS9idWlsZC9jb25maWcvcHJveHkudHNcIjtpbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ107XHJcblxyXG50eXBlIFByb3h5TGlzdCA9IFByb3h5SXRlbVtdO1xyXG5cclxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+O1xyXG5cclxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvLztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0OiBQcm94eUxpc3QgPSBbXSkge1xyXG5cdGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge307XHJcblx0Zm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcclxuXHRcdGNvbnN0IGlzSHR0cHMgPSBodHRwc1JFLnRlc3QodGFyZ2V0KTtcclxuXHRcdHJldFtwcmVmaXhdID0ge1xyXG5cdFx0XHR0YXJnZXQ6IHRhcmdldCxcclxuXHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxyXG5cdFx0XHR3czogdHJ1ZSxcclxuXHRcdFx0cmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcmVmaXh9YCksIFwiXCIpLFxyXG5cdFx0XHQuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pXHJcblx0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RUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFNLHFCQUFpQztBQUFBLEVBQ3JDO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUVBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUVBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUVBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBRUE7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUVBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFFQTtBQUFBLElBQ0UsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxVQUFVO0FB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

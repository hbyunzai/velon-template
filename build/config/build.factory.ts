import type { BuildOptions, ESBuildOptions } from 'vite';
import { PathUtil } from '../utils';

export class BuildFactory {
  private static env: ImportMetaEnv;

  private static buildOption: BuildOptions;

  private static esBuildOption: ESBuildOptions;

  private constructor() {}

  public static importMetaEnv(env: ImportMetaEnv): typeof BuildFactory {
    this.env = env;
    this.create();
    return this;
  }

  public static create(): void {
    if (this.env.VITE_BUILD_ENV === 'prod') {
      this.setupProd();
    }
  }

  private static setupProd(): void {
    this.buildOption = {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: PathUtil.getDistPath(),
      chunkSizeWarningLimit: 2000
    };
    this.esBuildOption = {
      pure: this.env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    };
  }

  public static options(): BuildOptions {
    return this.buildOption;
  }

  public static esOptions(): ESBuildOptions {
    return this.esBuildOption;
  }
}

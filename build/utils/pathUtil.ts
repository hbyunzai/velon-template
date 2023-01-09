import path from 'path';

export class PathUtil {
  static getRootPath(): string {
    return path.resolve(process.cwd());
  }

  static getMockPath(): string {
    return path.resolve(this.getRootPath(), 'mock');
  }

  static getDistPath(): string {
    return path.resolve(this.getRootPath(), 'dist');
  }


  static getSrcPath(srcName = 'src'): string {
    return path.resolve(this.getRootPath(), srcName);
  }
}

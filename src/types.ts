export interface CliOptions {
  targetDir: string;
  outputDir: string;
  maxFiles: number;
  includeGlobs: string[];
  excludeGlobs: string[];
  withAgents: boolean;
}

export interface ScannedFile {
  path: string;
  absolutePath: string;
  content: string;
  size: number;
}

export interface ScanResult {
  files: ScannedFile[];
  filesScanned: number;
  filesIncluded: number;
}

export interface PackageMetadata {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: string[];
  devDependencies?: string[];
}

export interface ProjectContext {
  projectName: string;
  sourcePath: string;
  generatedAt: string;
  approxTokens: number;
  detectedStack: string[];
  importantFiles: string[];
  compactFileTree: string;
  packageMetadata?: PackageMetadata;
  selectedFiles: ScannedFile[];
  agentsMarkdown: string;
}

export interface GenerateResult {
  outputDir: string;
  filesScanned: number;
  filesIncluded: number;
  approxTokens: number;
  generatedFiles: string[];
}

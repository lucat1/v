export interface Stats {
  errors: any[]
  warnings: any[]
  version: string
  hash: string
  time: number
  builtAt: number
  publicPath: string
  outputPath: string
  assetsByChunkName: AssetsByChunkName
  assets: Asset[]
  filteredAssets: number
  entrypoints: { [key: string]: Entrypoint }
  namedChunkGroups: { [key: string]: Entrypoint }
  chunks: Chunk[]
  modules: ChunkModule[]
  filteredModules: number
  logging: Logging
  children: any[]
}

export interface Asset {
  name: string
  size: number
  chunks: number[]
  chunkNames: string[]
  info: Info
  emitted: boolean
}

export interface Info {}

export interface AssetsByChunkName {
  [key: string]: string
}

export interface Chunk {
  id: number
  rendered: boolean
  initial: boolean
  entry: boolean
  reason?: string
  size: number
  names: string[]
  files: string[]
  hash: string
  siblings: number[]
  parents: any[]
  children: any[]
  childrenByOrder: Info
  modules: ChunkModule[]
  filteredModules: number
  origins: Origin[]
}

export interface ChunkModule {
  id: number
  identifier: string
  name: string
  index: number | null
  index2: number | null
  size: number
  cacheable: boolean
  built: boolean
  optional: boolean
  prefetched: boolean
  chunks: number[]
  issuer: null | string
  issuerId: number | null
  issuerName: null | string
  issuerPath: IssuerPath[] | null
  failed: boolean
  errors: number
  warnings: number
  assets: any[]
  reasons: Reason[]
  usedExports: string[] | boolean
  providedExports: string[] | null
  optimizationBailout: string[]
  depth: number
  modules?: ModuleModule[]
  filteredModules?: number
  profile?: Profile
  source?: string
}

export interface IssuerPath {
  id: number | null
  identifier: string
  name: string
  profile: Profile
}

export interface Profile {
  factory: number
  building: number
  dependencies?: number
}

export interface ModuleModule {
  id: null
  identifier: string
  name: string
  index: number
  index2: number
  size: number
  cacheable: boolean
  built: boolean
  optional: boolean
  prefetched: boolean
  chunks: any[]
  issuer: string
  issuerId: number | null
  issuerName: string
  issuerPath: IssuerPath[]
  profile: Profile
  failed: boolean
  errors: number
  warnings: number
  assets: any[]
  reasons: Reason[]
  usedExports: string[] | boolean
  providedExports: string[]
  optimizationBailout: string[]
  depth: number
  source: string
}

export interface Reason {
  moduleId: number | null
  moduleIdentifier: null | string
  module: null | string
  moduleName: null | string
  type: Type
  userRequest: string
  loc: string
}

export enum Type {
  CjsRequire = 'cjs require',
  HarmonyExportImportedSpecifier = 'harmony export imported specifier',
  HarmonyImportSpecifier = 'harmony import specifier',
  HarmonySideEffectEvaluation = 'harmony side effect evaluation',
  SingleEntry = 'single entry'
}

export interface Origin {
  module: string
  moduleIdentifier: string
  moduleName: string
  loc: string
  request: string
  reasons: any[]
}

export interface Entrypoint {
  chunks: number[]
  assets: string[]
  children: Info
  childAssets: Info
}

export interface Logging {
  'webpack.buildChunkGraph.visitModules': WebpackBuildChunkGraphVisitModules
}

export interface WebpackBuildChunkGraphVisitModules {
  entries: any[]
  filteredEntries: number
  debug: boolean
}

/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
/**
* @param {number} width
* @param {number} height
*/
  constructor(width: number, height: number);
/**
* @param {number} population
*/
  random_initialization(population: number): void;
/**
* @param {Uint8Array} new_cell
*/
  set_cells(new_cell: Uint8Array): void;
/**
* @returns {number}
*/
  cell_ptr(): number;
/**
*/
  next_cycle(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_universe_free: (a: number) => void;
  readonly universe_new: (a: number, b: number) => number;
  readonly universe_random_initialization: (a: number, b: number) => void;
  readonly universe_set_cells: (a: number, b: number, c: number) => void;
  readonly universe_cell_ptr: (a: number) => number;
  readonly universe_next_cycle: (a: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

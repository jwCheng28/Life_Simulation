use wasm_bindgen::prelude::*;
use rand::Rng;

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<u8>
}

impl Universe {
    pub fn cell_arr(&self) -> &[u8] {
        &self.cells
    }

    fn cell_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn live_neighbors(&self, row: u32, col: u32) -> u8 {
        let mut count: u8 = 0;

        let rstart: u32 = if row == 0 { 0 } else { row-1 };
        let rend: u32 = if row == (self.height-1) { self.height-1 } else { row+1 };
        let cstart: u32 = if col == 0 { 0 } else { col-1 };
        let cend: u32 = if col == (self.width-1) { self.width-1 } else { col+1 };

        for r in rstart..rend+1 {
            for c in cstart..cend+1 {
                if r == row && c == col {continue;}
                let cur: usize = self.cell_index(r, c);
                count += self.cells[cur];
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> Universe {
        Universe {
            width,
            height,
            cells: vec![0; (width*height) as usize]
        }
    }

    pub fn random_initialization(&mut self) {
        let mut rng = rand::thread_rng();
        let new_cells: Vec<u8> = (0..self.width*self.height).map(|_| rng.gen_range(0, 2) as u8).collect();
        self.cells = new_cells;
    }

    pub fn set_cells(&mut self, new_cell: Vec<u8>) {
        if new_cell.len() != (self.width * self.height) as usize {
            panic!("Input cell vector size does not match intended universe size");
        } else {
            self.cells = new_cell;
        }
    }

    pub fn cell_ptr(&self) -> *const u8 {
        self.cells.as_ptr()
    }

    pub fn next_cycle(&mut self) {
        let mut new_cells = self.cells.clone();
        for r in 0..self.height {
            for c in 0..self.width {
                let i: usize = self.cell_index(r, c);
                let state: u8 = self.cells[i];
                let living_neighbors: u8 = self.live_neighbors(r, c);
                // println!("{} index: {} neighbors", i, living_neighbors);
                if state == 0 && living_neighbors == 3 {
                    new_cells[i] = 1;
                } else if state == 1 && (living_neighbors < 2 || living_neighbors > 3) {
                    new_cells[i] = 0;
                }
            }
        }
        self.cells = new_cells;
    }
}
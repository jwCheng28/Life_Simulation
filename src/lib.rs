use wasm_bindgen::prelude::*;
use rand::{thread_rng, Rng};

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<u8>,
}

impl Universe {
    fn cell_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn live_neighbors(&self, row: u32, col: u32) -> u8 {
        let mut count: u8 = 0;
        for r in -1..2 {
            if (row == 0 && r == -1) || (row == self.height && r == 1) || (r == 0) {continue;}
            for c in -1..2 {
                if (col == 0 && c == -1) || (col == self.width && c == 1) || (c == 0) {continue;}
                let cur: usize = self.cell_index(row, col);
                count += self.cells[cur];
            }
        }
        count
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: u32, height: u32) -> Universe {
        Universe {
            width,
            height,
            cells: vec![0; (width*height) as usize]
        }
    }

    pub fn random_initialization(&mut self) {
        let mut rng = thread_rng();
        let new_cells: Vec<u8> = (0..self.width*self.height).map(|_| rng.gen_range(0..=1) as u8).collect();
        self.cells = new_cells;
    }

    pub fn next_cycle(&mut self) {
        let mut new_cells = self.cells.clone();
        for r in 0..self.height {
            for c in 0..self.width {
                let i: usize = self.cell_index(r, c);
                let state: u8 = self.cells[i];
                let living_neighbors: u8 = self.live_neighbors(r, c);
                if state == 0 && living_neighbors == 3 {
                    new_cells[i] = 1;
                } else if state == 1 && (living_neighbors < 2 || living_neighbors > 3) {
                    new_cells[i] = 0;
                }
            }
        }
        self.cells = new_cells;
    }

    pub fn cells_string(self) -> String {
        self.cells.iter().map(|state| state.to_string()).collect()
    }
}
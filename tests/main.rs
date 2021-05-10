extern crate life_simulation;
use life_simulation::Universe;

#[cfg(test)]
mod tests {
    use super::Universe;

    #[test]
    fn test_next_cycle() {
        let mut universe1 = Universe::new(3, 3);
        universe1.set_cells(
            vec![0, 1, 0,
                 0, 1, 0,
                 0, 1, 0]
                );

        universe1.next_cycle();
        assert_eq!(universe1.cell_arr(), vec![0,0,0,1,1,1,0,0,0]);
        universe1.next_cycle();
        assert_eq!(universe1.cell_arr(), vec![0,1,0,0,1,0,0,1,0]);
        println!("{:?}", universe1.cell_arr());
    }
}
# Life_Simulation
The intent of this project is for me to learn Rust and play around with Web Assembly at the same time.

In particular, the current goal is to create the famous Conway's Game of Life. In the future, I might add in more simulations if I find anything interesting.

## Conway's Game of Life
Conway's Game of Life is quite interesting as the rules are fairly simple, but the possibility are endless.

Below of the 4 Rules for Conway's Game of Life: (Reference: [wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules))
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
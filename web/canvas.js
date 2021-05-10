import { Universe } from 'life_simulation';
import { memory } from 'life_simulation/life_simulation_bg';

export const drawGrid = (ctx, width, height, cell, color) => {
    /*
    @param:
        ctx: 2D canvas context
        width: width of universe
        height: height of universe
        cell: cell object with the following attributes {size: int, alive_color: clr_hex, dead_color: clr_hex}
        color: color of grid in hex
    @function:
        draws the grid of the universe
    */
    ctx.beginPath();
    ctx.strokeStyle = color;
    for (let i = 0; i <= width; ++i) {
        // Draw Vertical
        ctx.moveTo(i * (cell.size + 1) + 1, 0);
        ctx.lineTo(i * (cell.size + 1) + 1, (cell.size + 1) * height + 1);

        // Draw Horizontal
        ctx.moveTo(0, i * (cell.size + 1) + 1);
        ctx.lineTo((cell.size + 1) * width + 1, i * (cell.size + 1) + 1);
    }
    ctx.stroke();
};

export const clearScreen = (ctx, universe, width, height, cell, color="#FFFFFF") => {
    /*
    @param:
        ctx: 2D canvas context
        universe: universe object
        width: width of universe
        height: height of universe
        cell: cell object with the following attributes {size: int, alive_color: clr_hex, dead_color: clr_hex}
        color: color of screeb in hex
    @function:
        clears the screen into input color
    */
    ctx.beginPath();
    ctx.fillStyle = color;
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            ctx.fillRect(j * (cell.size + 1) + 1, i * (cell.size + 1) + 1, cell.size, cell.size );
        }
    }
    ctx.stroke();
    console.log("Screen cleared");
};

export const drawCells = (ctx, universe, width, height, cell) => {
    /*
    @param:
        ctx: 2D canvas context
        universe: universe object
        width: width of universe
        height: height of universe
        cell: cell object with the following attributes {size: int, alive_color: clr_hex, dead_color: clr_hex}
    @function:
        draw each cell onto the canvas
    */
    const cells_arr = new Uint8Array(memory.buffer, universe.cell_ptr(), width*height);
    let cur = 0;
    ctx.beginPath();
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            cur = i * width + j;
            if (cells_arr[cur]) {
                ctx.fillStyle = cell.alive_color;
            } else {
                ctx.fillStyle = cell.dead_color;
            }
            ctx.fillRect(j * (cell.size + 1) + 1, i * (cell.size + 1) + 1, cell.size, cell.size );
        }
    }
    ctx.stroke();
};
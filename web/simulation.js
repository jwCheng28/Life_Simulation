import { Universe } from 'life_simulation';
import { memory } from 'life_simulation/life_simulation_bg';

// Should add a color picker for this later on
var cell = {
    size: 10,
    alive_color: "#000000",
    dead_color: "#FFFFFF"
};

const UNIVERSE_WIDTH = 64;
const UNIVERSE_HEIGHT = 64;
let universe = new Universe(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);

const canvas = document.getElementById("game_of_life_universe");
canvas.height = (cell.size + 1) * UNIVERSE_HEIGHT + 1;
canvas.width = (cell.size + 1) * UNIVERSE_WIDTH + 1;

const ctx = canvas.getContext('2d');

// Need to add a button for this function
const drawGrid = (color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    for (let i = 0; i <= UNIVERSE_WIDTH; ++i) {
        // Draw Vertical
        ctx.moveTo(i * (cell.size + 1) + 1, 0);
        ctx.lineTo(i * (cell.size + 1) + 1, (cell.size + 1) * UNIVERSE_HEIGHT + 1);

        // Draw Horizontal
        ctx.moveTo(0, i * (cell.size + 1) + 1);
        ctx.lineTo((cell.size + 1) * UNIVERSE_WIDTH + 1, i * (cell.size + 1) + 1);
    }
    ctx.stroke();
};

// Also need to add a button for this function
const clearScreen = () => {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF"
    for (let i = 0; i < UNIVERSE_HEIGHT; ++i) {
        for (let j = 0; j < UNIVERSE_WIDTH; ++j) {
            ctx.fillRect(j * (cell.size + 1) + 1, i * (cell.size + 1) + 1, cell.size, cell.size );
        }
    }
    ctx.stroke();
};

const drawCells = () => {
    const cells_arr = new Uint8Array(memory.buffer, universe.cell_ptr(), UNIVERSE_WIDTH*UNIVERSE_HEIGHT);
    let cur = 0;
    ctx.beginPath();
    for (let i = 0; i < UNIVERSE_HEIGHT; ++i) {
        for (let j = 0; j < UNIVERSE_WIDTH; ++j) {
            cur = i * UNIVERSE_WIDTH + j;
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

const loop = () => {
    universe.next_cycle();
    drawCells();
    requestAnimationFrame(loop);
};

universe.random_initialization();
drawCells();
requestAnimationFrame(loop);
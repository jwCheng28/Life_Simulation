import { Universe } from 'life_simulation';
import * as draw from './canvas';

var cell = {size: 10, color: "#000000"};
const UNIVERSE_WIDTH = 64;
const UNIVERSE_HEIGHT = 64;
let universe = new Universe(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);

const canvas = document.getElementById("game_of_life_universe");
canvas.height = (cell.size + 1) * UNIVERSE_HEIGHT;
canvas.width = (cell.size + 1) * UNIVERSE_WIDTH;

const ctx = canvas.getContext('2d');
const generateButton = document.getElementById("generate");
const clearButton = document.getElementById("clear");
const pauseButton = document.getElementById("pause");
const setColor = document.getElementById("cell_color");
const setPopulation = document.getElementById("population");
let animation = null;
let drawn = false;

const loop = () => {
    universe.next_cycle();
    draw.drawCells(ctx, universe, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    animation = requestAnimationFrame(loop);
};

const play = () => {
    animation = requestAnimationFrame(loop);
};

const pause = () => {
    cancelAnimationFrame(animation);
    animation = null;
};

setPopulation.addEventListener("mouseup", event => {
    if (animation == null && drawn == true) {
        universe.random_initialization(setPopulation.value);
        draw.drawCells(ctx, universe, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    }
});

generateButton.addEventListener("click", event => {
    if (animation != null) pause();
    draw.clearScreen(ctx, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    let population = setPopulation.value;
    universe.random_initialization(population);
    draw.drawCells(ctx, universe, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    drawn = true;
});

clearButton.addEventListener("click", event => {
    draw.clearScreen(ctx, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    universe = new Universe(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);
    pause();
    drawn = false;
});

pauseButton.addEventListener("click", event => {
    animation == null ? play() : pause();
});

setColor.addEventListener("change", event => {
    cell.color = setColor.value;
    if (animation == null && drawn == true) {
        draw.drawCells(ctx, universe, UNIVERSE_WIDTH, UNIVERSE_HEIGHT, cell);
    }
});
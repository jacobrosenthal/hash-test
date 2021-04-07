import { default as wasm, sponge } from "mimc-wasm";
import mimcWithRounds from './mimc.js';

await wasm();



let task = {
    chunkFootprint: {
        bottomLeft: {
            x: 0,
            y: 0,
        },
        sideLength: 16
    },
    planetHashKey: 8,
    planetRarity: 16384
};

console.log("loading");

var times = [];
for (let i = 0; i < 10000; i++) {
    var t0 = performance.now()
    var hash = sponge(task.chunkFootprint.bottomLeft.x, task.chunkFootprint.bottomLeft.y, 220, task.planetHashKey);
    var bigHash = BigInt(hash);
    var t1 = performance.now()
    var time = (t1 - t0);
    times.push(time);
}
var avg = times.reduce((accumulator, currentValue) => accumulator + currentValue) / times.length;
console.log("Call to sponge average " + avg + " milliseconds.")
console.log('\n\n')


var times = [];
for (let i = 0; i < 10000; i++) {
    var t0 = performance.now()
    var hash = mimcWithRounds(220, task.planetHashKey, task.chunkFootprint.bottomLeft.x, task.chunkFootprint.bottomLeft.y);
    var t1 = performance.now()
    var time = (t1 - t0);
    times.push(time);
}
var avg = times.reduce((accumulator, currentValue) => accumulator + currentValue) / times.length;
console.log("Call to js " + avg + " milliseconds.")
console.log('\n\n')




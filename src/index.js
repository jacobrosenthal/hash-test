import { default as wasm, mimc } from "mimc-wasm";
import mimcWithRounds from './mimc.js';

await wasm();


const LOCATION_ID_UB = BigInt(
    '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);


const locationIdFromBigInt = (location) => {
    const locationBI = BigInt(location);
    if (locationBI > LOCATION_ID_UB) throw new Error('not a valid location');
    let ret = locationBI.toString(16);
    while (ret.length < 64) ret = '0' + ret;
    return ret;
};

const mimcjs = (task) => {
    let planetLocations = [];
    const planetRarityBI = BigInt(task.planetRarity);
    const { x: bottomLeftX, y: bottomLeftY } = task.chunkFootprint.bottomLeft;
    const { sideLength } = task.chunkFootprint;
    for (let x = bottomLeftX; x < bottomLeftX + sideLength; x++) {
        for (let y = bottomLeftY; y < bottomLeftY + sideLength; y++) {
            const hash = mimcWithRounds(220, task.planetHashKey, x, y);
            if (hash < (LOCATION_ID_UB / planetRarityBI)) {
                planetLocations.push({
                    coords: { x, y },
                    hash: locationIdFromBigInt(hash),
                });
            }
        }
    }
    return planetLocations;
}







let task = {
    chunkFootprint: {
        bottomLeft: {
            x: 0,
            y: 0,
        },
        sideLength: 256
    },
    planetHashKey: 8,
    planetRarity: 16384
};

console.log("loading");


var times = [];
for (let i = 0; i < 2; i++) {
    var t0 = performance.now()
    var res = mimc(task);
    var t1 = performance.now()
    var time = (t1 - t0);
    times.push(time);
}
var avg = times.reduce((accumulator, currentValue) => accumulator + currentValue) / times.length;
console.log("Call to mimc average " + avg + " milliseconds.")
console.log('\n\n')


var times = [];
for (let i = 0; i < 2; i++) {
    var t0 = performance.now()
    var hash = mimcjs(task);
    var t1 = performance.now()
    var time = (t1 - t0);
    times.push(time);
}
var avg = times.reduce((accumulator, currentValue) => accumulator + currentValue) / times.length;
console.log("Call to js " + avg + " milliseconds.")
console.log('\n\n')




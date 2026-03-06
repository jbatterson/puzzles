// ── Factorfall puzzle data ────────────────────────────────────────────────────
// Colors
const R = '#ff5f5f'
const B = '#3273dc'

export default {
    //tutorial

tutorial: [
    { target: 18, board: [[], [{v:3,c:R}], [{v:2,c:R},{v:6,c:B},{v:3,c:R}], [], []], queue: [{v:3,c:B}] },
    { target: 20, board: [[{v:2,c:B}], [{v:2,c:R},{v:5,c:B}], [], [{v:1,c:R}], [{v:2,c:R}]], queue: [{v:5,c:R},{v:2,c:B}] },
    { target: 24, board: [[{v:2,c:R}], [{v:6,c:R},{v:2,c:B},{v:4,c:B}], [], [{v:4,c:R},{v:8,c:B}], [{v:3,c:R}]], queue: [{v:2,c:R},{v:3,c:B}] },
    { target: 20, board: [[{v:5,c:R},{v:2,c:B}], [{v:2,c:R},{v:2,c:B},{v:2,c:B}], [{v:5,c:B}], [{v:2,c:R}], [{v:5,c:R}]], queue: [{v:1,c:B},{v:1,c:R}] },
    { target: 12, board: [[{v:2,c:B}], [{v:2,c:B},{v:2,c:B},{v:2,c:R}], [], [{v:2,c:R},{v:3,c:R}], []], queue: [{v:6,c:B},{v:1,c:R},{v:6,c:B}] },


],

easy: [
    { target: 12, board: [[{v:3,c:R},{v:2,c:R}], [], [{v:2,c:R}], [{v:2,c:R},{v:2,c:R},{v:2,c:R}], []], queue: [{v:3,c:R},{v:1,c:R}] },
    { target: 45, board: [[], [{v:3,c:R}], [{v:3,c:R}], [{v:5,c:B},{v:5,c:R}], [{v:3,c:B},{v:15,c:R}]], queue: [{v:3,c:R},{v:3,c:B}] },
    { target: 44, board: [[], [{v:2,c:B}], [{v:22,c:R}], [{v:11,c:B},{v:2,c:R}], [{v:2,c:B},{v:11,c:R}]], queue: [{v:2,c:R},{v:1,c:B}] },
    { target: 50, board: [[{v:5,c:R}], [{v:5,c:B}], [{v:2,c:B},{v:5,c:R},{v:5,c:R}], [], [{v:5,c:B}]], queue: [{v:5,c:B},{v:2,c:R}] },
    { target: 30, board: [[], [{v:2,c:B},{v:2,c:R}], [{v:6,c:B},{v:5,c:R},{v:15,c:B}], [{v:10,c:R}], []], queue: [{v:3,c:R},{v:5,c:B}] },
    { target: 28, board: [[{v:2,c:B}], [{v:7,c:R},{v:7,c:B},{v:14,c:B}], [{v:2,c:B},{v:1,c:B}], [], [{v:14,c:B}]], queue: [{v:2,c:B},{v:4,c:R}] },
    { target: 12, board: [[], [{v:2,c:B},{v:2,c:R}], [{v:6,c:R},{v:3,c:B}], [{v:2,c:B},{v:3,c:R},{v:2,c:B}], []], queue: [{v:4,c:R},{v:6,c:B}] },
    { target: 54, board: [[], [{v:3,c:R}], [{v:1,c:R}], [{v:3,c:R}], [{v:2,c:B},{v:2,c:R},{v:3,c:R},{v:27,c:B}]], queue: [{v:9,c:R},{v:1,c:R}] },
    { target: 88, board: [[{v:2,c:R},{v:2,c:B}], [{v:22,c:R}], [{v:1,c:B},{v:2,c:B},{v:4,c:R}], [{v:2,c:B}], []], queue: [{v:44,c:R},{v:22,c:B}] },
    { target: 24, board: [[{v:6,c:B}], [{v:2,c:B},{v:3,c:R},{v:2,c:B}], [{v:3,c:R},{v:3,c:B}], [{v:4,c:B}], []], queue: [{v:8,c:R},{v:2,c:B}] },
    { target: 30, board: [[{v:3,c:R}], [{v:2,c:B},{v:6,c:R},{v:3,c:B},{v:5,c:B}], [{v:3,c:R}], [], []], queue: [{v:10,c:R},{v:5,c:R}] },
    { target: 90, board: [[{v:2,c:B}], [{v:2,c:B},{v:5,c:B},{v:5,c:B}], [], [{v:1,c:B}], [{v:9,c:B}]], queue: [{v:5,c:B},{v:9,c:B}] },
    
],

medium: [
    { target: 84, board: [[], [{v:7,c:B},{v:6,c:B}], [{v:4,c:B},{v:7,c:B}], [{v:2,c:B}], [{v:7,c:B}]], queue: [{v:1,c:B},{v:3,c:B}] },
    { target: 60, board: [[{v:6,c:B}], [], [{v:2,c:B}], [{v:6,c:B},{v:3,c:B},{v:5,c:B}], [{v:3,c:B}]], queue: [{v:5,c:B},{v:4,c:B}] },
    { target: 42, board: [[], [{v:3,c:B}], [{v:2,c:B},{v:14,c:R}], [{v:1,c:B},{v:2,c:R},{v:3,c:R},{v:3,c:B}], [{v:3,c:B}]], queue: [{v:7,c:B},{v:21,c:R}] },
    { target: 20, board: [[{v:2,c:B},{v:5,c:R},{v:2,c:R}], [{v:5,c:B}], [{v:2,c:R},{v:10,c:B}], [], []], queue: [{v:2,c:B},{v:2,c:B},{v:2,c:R}] },
    { target: 44, board: [[{v:4,c:R}], [{v:2,c:B},{v:22,c:R}], [{v:11,c:R},{v:2,c:B},{v:22,c:R}], [{v:2,c:R}], []], queue: [{v:11,c:B},{v:2,c:R},{v:1,c:R}] },
    { target: 18, board: [[{v:3,c:R},{v:3,c:R},{v:2,c:B}], [{v:3,c:B}], [], [{v:3,c:B},{v:9,c:R}], [{v:2,c:R}]], queue: [{v:2,c:R},{v:3,c:B},{v:6,c:B}] },
    { target: 63, board: [[{v:3,c:B},{v:3,c:B}], [], [{v:3,c:B},{v:7,c:R},{v:3,c:B}], [{v:3,c:B}], [{v:3,c:B}]], queue: [{v:7,c:B},{v:7,c:B},{v:9,c:R}] },
    { target: 100, board: [[], [{v:2,c:B},{v:2,c:B}], [{v:5,c:B},{v:1,c:R},{v:1,c:R}], [{v:2,c:R},{v:2,c:B},{v:2,c:R}], []], queue: [{v:25,c:R},{v:25,c:B},{v:10,c:B}] },
    { target: 12, board: [[], [{v:2,c:B}], [{v:1,c:B},{v:4,c:R}], [{v:3,c:R},{v:1,c:B},{v:4,c:R}], [{v:3,c:R},{v:2,c:B}]], queue: [{v:3,c:B},{v:3,c:R},{v:4,c:R}] },
    { target: 88, board: [[{v:2,c:R},{v:2,c:B}], [{v:22,c:R}], [{v:2,c:B},{v:2,c:R},{v:11,c:B},{v:2,c:R}], [{v:22,c:R}], []], queue: [{v:11,c:B},{v:2,c:R},{v:4,c:B}] },
    { target: 56, board: [[], [], [{v:7,c:B},{v:1,c:B},{v:7,c:B},{v:1,c:R},{v:2,c:B}], [{v:14,c:R},{v:7,c:B},{v:2,c:B},{v:1,c:B},{v:7,c:B}], []], queue: [{v:4,c:R},{v:2,c:B},{v:8,c:B}] },
    { target: 100, board: [[{v:5,c:R},{v:10,c:B},{v:20,c:R}], [], [{v:2,c:B},{v:20,c:R}], [{v:10,c:B}], [{v:1,c:B},{v:2,c:B}]], queue: [{v:5,c:R},{v:10,c:B},{v:5,c:B}] },
    { target: 44, board: [[], [], [{v:2,c:B},{v:2,c:R}], [{v:1,c:R},{v:1,c:B},{v:22,c:B},{v:4,c:B},{v:11,c:R}], [{v:11,c:R}]], queue: [{v:11,c:B},{v:2,c:R},{v:4,c:R}] },
    { target: 18, board: [[{v:3,c:B}], [{v:3,c:B},{v:2,c:R}], [{v:3,c:R},{v:6,c:B}], [{v:9,c:B}], []], queue: [{v:3,c:R},{v:3,c:B},{v:2,c:B}] },
    { target: 24, board: [[{v:2,c:R}], [{v:1,c:R},{v:2,c:B}], [{v:4,c:R},{v:2,c:B},{v:2,c:R}], [{v:4,c:B},{v:2,c:B}], []], queue: [{v:6,c:B},{v:6,c:R},{v:6,c:B}] },
    { target: 36, board: [[{v:3,c:R},{v:3,c:R},{v:3,c:B}], [{v:3,c:B},{v:3,c:R}], [{v:2,c:R},{v:1,c:R},{v:4,c:B}], [], []], queue: [{v:3,c:R},{v:4,c:R},{v:2,c:R}] },
    { target: 100, board: [[{v:5,c:B}], [], [{v:5,c:R},{v:4,c:B},{v:2,c:R},{v:2,c:B}], [{v:5,c:B},{v:1,c:R}], [{v:10,c:B}]], queue: [{v:2,c:B},{v:10,c:R},{v:25,c:B}] },
    { target: 36, board: [[], [{v:2,c:R},{v:2,c:B},{v:1,c:R}], [{v:3,c:B},{v:2,c:R},{v:1,c:R}], [{v:2,c:B},{v:2,c:B}], []], queue: [{v:9,c:R},{v:9,c:B},{v:6,c:B}] },
    { target: 99, board: [[{v:11,c:B},{v:11,c:B}], [], [{v:3,c:B}], [{v:11,c:R},{v:11,c:B}], [{v:9,c:B}]], queue: [{v:1,c:B},{v:9,c:R},{v:3,c:B}] },
    { target: 88, board: [[{v:2,c:R},{v:2,c:B}], [{v:2,c:R},{v:1,c:R},{v:11,c:B}], [{v:4,c:B},{v:11,c:R}], [{v:11,c:R}], []], queue: [{v:4,c:B},{v:4,c:R},{v:2,c:R}] },
],

hard: [
    { target: 54, board: [[{v:3,c:B}], [{v:1,c:B},{v:3,c:R}], [{v:9,c:B},{v:3,c:R},{v:3,c:B}], [{v:9,c:R},{v:3,c:R}], []], queue: [{v:6,c:R},{v:6,c:B},{v:6,c:R}] },
    { target: 12, board: [[], [], [{v:2,c:R},{v:1,c:B},{v:2,c:R},{v:6,c:B}], [{v:2,c:B},{v:2,c:R},{v:2,c:R}], []], queue: [{v:6,c:R},{v:1,c:B},{v:3,c:R}] },
    { target: 18, board: [[{v:3,c:R}], [{v:3,c:B},{v:3,c:B}], [{v:1,c:R}], [{v:3,c:B},{v:3,c:B}], [{v:1,c:R},{v:3,c:B}]], queue: [{v:6,c:R},{v:3,c:R},{v:2,c:B}] },
    { target: 54, board: [[], [{v:6,c:R}], [{v:3,c:B},{v:3,c:R},{v:2,c:B},{v:3,c:R}], [{v:6,c:R}], [{v:3,c:R},{v:3,c:B}]], queue: [{v:2,c:B},{v:3,c:R},{v:9,c:B}] },
    { target: 28, board: [[{v:7,c:B}], [{v:1,c:B},{v:1,c:R},{v:14,c:R},{v:4,c:R},{v:7,c:B}], [{v:2,c:R},{v:2,c:B}], [], []], queue: [{v:7,c:R},{v:2,c:B},{v:4,c:B}] },
    { target: 18, board: [[{v:3,c:R}], [{v:3,c:B},{v:6,c:R},{v:6,c:B}], [], [{v:2,c:R},{v:1,c:B}], [{v:3,c:B},{v:3,c:B}]], queue: [{v:9,c:R},{v:6,c:B},{v:1,c:R}] },
    { target: 99, board: [[], [{v:3,c:R}], [{v:1,c:R},{v:9,c:B}], [{v:11,c:B},{v:3,c:R},{v:9,c:B}], [{v:11,c:B}]], queue: [{v:11,c:R},{v:11,c:B},{v:9,c:B}] },
    { target: 24, board: [[{v:2,c:R},{v:2,c:B}], [], [{v:2,c:R}], [{v:3,c:R},{v:3,c:B},{v:2,c:R},{v:4,c:R}], [{v:3,c:R}]], queue: [{v:1,c:B},{v:2,c:R},{v:4,c:B}] },
    { target: 88, board: [[], [{v:11,c:R},{v:4,c:R}], [{v:1,c:B},{v:2,c:B},{v:2,c:R}], [], [{v:2,c:R}]], queue: [{v:22,c:R},{v:4,c:R},{v:44,c:B}] },
    { target: 36, board: [[{v:1,c:B},{v:2,c:B}], [{v:6,c:B}], [{v:2,c:B},{v:12,c:R}], [], [{v:3,c:R},{v:6,c:B},{v:12,c:R}]], queue: [{v:3,c:R},{v:6,c:B},{v:3,c:B}] },
    { target: 70, board: [[], [{v:10,c:R},{v:5,c:R}], [{v:5,c:B},{v:7,c:B},{v:1,c:R}], [{v:5,c:B}], [{v:10,c:R}]], queue: [{v:14,c:R},{v:2,c:B},{v:7,c:R}] },
    { target: 18, board: [[{v:9,c:B}], [{v:2,c:R},{v:2,c:B}], [{v:3,c:B}], [], [{v:2,c:B},{v:2,c:B}]], queue: [{v:1,c:B},{v:9,c:R},{v:3,c:B}] },
    { target: 66, board: [[{v:6,c:B}], [{v:3,c:R}], [{v:3,c:R},{v:11,c:R},{v:1,c:B}], [{v:6,c:B},{v:3,c:B}], []], queue: [{v:22,c:B},{v:2,c:R},{v:11,c:B}] },
    { target: 84, board: [[], [{v:21,c:B},{v:7,c:B}], [{v:3,c:B},{v:4,c:R},{v:4,c:B}], [], [{v:2,c:B},{v:6,c:B}]], queue: [{v:21,c:R},{v:7,c:B},{v:4,c:B}] },
    { target: 36, board: [[], [{v:6,c:B},{v:12,c:B},{v:6,c:B},{v:3,c:B}], [{v:3,c:B},{v:4,c:B},{v:6,c:R}], [], [{v:3,c:R}]], queue: [{v:2,c:R},{v:4,c:B},{v:3,c:B}] },
    { target: 12, board: [[], [], [{v:2,c:R},{v:1,c:B},{v:2,c:R},{v:6,c:B}], [{v:2,c:B},{v:2,c:R},{v:2,c:R}], []], queue: [{v:6,c:R},{v:1,c:B},{v:3,c:R}] },
    { target: 40, board: [[], [{v:4,c:R},{v:2,c:R}], [{v:4,c:B},{v:2,c:R},{v:2,c:B}], [{v:1,c:B},{v:2,c:R}], [{v:2,c:B}]], queue: [{v:10,c:R},{v:10,c:B},{v:10,c:R}] },
    { target: 50, board: [[{v:5,c:R}], [{v:5,c:R},{v:2,c:B},{v:1,c:B}], [{v:5,c:B},{v:10,c:R},{v:1,c:R}], [{v:25,c:R}], []], queue: [{v:5,c:B},{v:5,c:R},{v:2,c:R}] },
    { target: 60, board: [[], [{v:15,c:R},{v:5,c:R}], [{v:3,c:R},{v:4,c:B},{v:4,c:R}], [], [{v:2,c:R},{v:6,c:R}]], queue: [{v:15,c:B},{v:5,c:R},{v:4,c:R}] },
    { target: 28, board: [[], [], [{v:2,c:B},{v:1,c:R},{v:2,c:B},{v:14,c:R}], [{v:2,c:R},{v:2,c:B},{v:2,c:B}], []], queue: [{v:14,c:B},{v:1,c:R},{v:7,c:B}] },
    { target: 30, board: [[], [{v:6,c:B},{v:3,c:B}], [{v:3,c:R},{v:5,c:R},{v:1,c:B}], [{v:3,c:R}], [{v:6,c:B}]], queue: [{v:10,c:B},{v:2,c:R},{v:5,c:B}] },
    { target: 72, board: [[], [{v:3,c:R},{v:6,c:B}], [{v:3,c:B},{v:2,c:B}], [{v:2,c:R}], [{v:2,c:R},{v:2,c:R}]], queue: [{v:12,c:R},{v:3,c:R},{v:2,c:B}] },
    { target: 75, board: [[{v:3,c:R},{v:3,c:R}], [], [{v:5,c:R}], [{v:3,c:B},{v:3,c:R}], [{v:25,c:R}]], queue: [{v:1,c:R},{v:25,c:B},{v:5,c:R}] },
    { target: 12, board: [[], [{v:4,c:B}], [{v:2,c:R},{v:6,c:B},{v:1,c:B}], [{v:2,c:B},{v:3,c:R},{v:1,c:R}], [{v:2,c:B}]], queue: [{v:2,c:R},{v:2,c:B},{v:3,c:B}] },
],

}
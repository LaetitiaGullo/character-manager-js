document.querySelector("header").addEventListener("mouseover", () => {
    document.querySelector("header").addEventListener("mousemove", (mouse) => {
        document.documentElement.style.setProperty('--mouseX', mouse.x / 30 + "px");
        document.documentElement.style.setProperty('--mouseY', mouse.y / 30 + "px");
    })
})

document.querySelector("header").addEventListener("mouseout", () => {
    document.documentElement.style.setProperty('--mouseX', 0 + "px");
    document.documentElement.style.setProperty('--mouseY', 0 + "px");
})

function parallax(x, y) {

}

// let dde = document.documentElement;
// dde.addEventListener("mousemove", e => {
//   let ow = dde.offsetWidth; 
//   let oh = dde.offsetHeight; 
//   dde.style.setProperty('--mouseX', e.clientX * 100 / ow + "%");
//   dde.style.setProperty('--mouseY', e.clientY * 100 / oh + "%");
// });

// function sum(x, y) {
//     let sum = x + y;
//     sum = sum / y;
//     return sum;
// }

// console.log(sum(2, 3));
// console.log(sum(5, 8));
// console.log(sum(1, 8));
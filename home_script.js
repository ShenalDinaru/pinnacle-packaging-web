const background =
document.querySelector(".background");   // Change this value// 5000 = 5 seconds
const transitionTime = 5500;
const images = [
    "Assets/Backgrounds/bg2.jpg",
    "Assets/Backgrounds/bg3.jpg",
    "Assets/Backgrounds/bg6.jpg",
    "Assets/Backgrounds/bg8.jpg"
];

let current = 0;
function changeBackground(){
    background.style.opacity = 0;
    setTimeout(()=>{
        background.style.backgroundImage =
        `url(${images[current]})`;
        background.style.opacity = 1;
    
        current++;
        if(current >= images.length){
            current = 0;
        }
    },700);
}

changeBackground();
setInterval(
    changeBackground,
    transitionTime
);
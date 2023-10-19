let reviews = [
    {
        name: "Alexa",
        designation: "Analyst",
        Lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eos?",
        img: "./Assest/images 1.png"
    },
    {
        name: "Sufiyan",
        designation: "Heavy Developer",
        Lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eos?",
        img: "./Assest/images 2.png"
    },
    {
        name: "Bilal",
        designation: "Sust Developer",
        Lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eos?",
        img: "./Assest/images 3.png"
    }
]

let num = 0;

let cards = document.querySelector('.card')
let image = document.querySelector('img')
let heading = document.querySelector('h2')
let heading1 = document.querySelector('h4')
let para = document.querySelector('p')
let btn_l = document.querySelector('.left')
let btn_r = document.querySelector('.right')

function reviewRun(index) {
    image.src = index.img;
    heading.textContent = index.name;
    heading1.textContent = index.designation;
    para.textContent = index.Lorem;
    // cards.style.transform = `translateX(-${num * (100 / reviews.length)}%)`;
}

function forward() {
    if (num == reviews.length - 1) {
        num = 0;
    } else {
        num++;
    }
    reviewRun(reviews[num])
}
function backward() {
    if (num == 0) {
        num = reviews.length - 1;
    } else {
        num--;
    }
    reviewRun(reviews[num]);
}
reviewRun(reviews[num]);
btn_r.addEventListener('click', forward);
btn_l.addEventListener('click', backward);
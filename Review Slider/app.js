const reviews = [
    {
        name: 'John Doe',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Jane Smith',
        review: 'Nullam et ultricies urna. Aliquam auctor libero at elit laoreet dapibus.'
    },
];

let currentSlide = 0;

function showReview(index) {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.review-card');
    const totalSlides = cards.length;

    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    slider.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

function generateReviews() {
    const slider = document.querySelector('.slider');

    reviews.forEach(review => {
        const card = document.createElement('div');
        card.classList.add('review-card');
        card.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.review}</p>
        `;
        slider.appendChild(card);
    });

    showReview(currentSlide);
}

document.querySelector('.prev-btn').addEventListener('click', () => showReview(currentSlide - 1));
document.querySelector('.next-btn').addEventListener('click', () => showReview(currentSlide + 1));

window.addEventListener('DOMContentLoaded', generateReviews);
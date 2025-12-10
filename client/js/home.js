// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

 document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

 window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      navLink.classList.add('active');
    }
  });
});

 const reviewsData = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    rating: 5,
    text: "This platform completely transformed my job search! The AI resume analyzer helped me optimize my resume, and I landed my dream job within 2 weeks."
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    rating: 5,
    text: "The job tracking feature is a game-changer. I was able to manage all my applications in one place and never missed a follow-up. Got 3 offers in a month!"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    rating: 5,
    text: "I love how easy it is to use. The insights provided helped me understand what recruiters are looking for. Increased my interview rate by 300%!"
  },
  {
    name: "David Kim",
    role: "Data Analyst",
    rating: 5,
    text: "Best investment I've made in my career. The ATS optimization feature ensured my resume got past the filters. Landed a job at a Fortune 500 company!"
  },
  {
    name: "Jessica Williams",
    role: "UX Designer",
    rating: 5,
    text: "The resume templates are professional and modern. Combined with the AI feedback, I created a resume that truly stands out. Thank you!"
  },
  {
    name: "Ahmed Hassan",
    role: "Full Stack Developer",
    rating: 5,
    text: "Incredible tool for job seekers! The dashboard keeps everything organized, and the reminders ensure I never miss important deadlines. 10/10!"
  },
  {
    name: "Lisa Anderson",
    role: "Business Analyst",
    rating: 5,
    text: "Outstanding platform! Helped me organize my job search and the AI suggestions were spot on. Received multiple offers thanks to this tool!"
  },
  {
    name: "James Miller",
    role: "Sales Manager",
    rating: 5,
    text: "The best career tool I've used. The tracking system and AI insights made my job search so much easier. Highly recommended for everyone!"
  }
];

function loadReviews() {
  const reviewLoader = document.getElementById('reviewLoader');
  const reviewCards = document.getElementById('reviewCards');
  
  setTimeout(() => {
    reviewLoader.style.display = 'none';
    reviewCards.style.display = 'flex';
    
    const createReviewCards = () => {
      return reviewsData.map(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        const initials = review.name.split(' ').map(n => n[0]).join('');
        const stars = '★'.repeat(review.rating);
        
        reviewCard.innerHTML = `
          <div class="review-header">
            <div class="review-avatar">${initials}</div>
            <div class="review-info">
              <h4>${review.name}</h4>
              <div class="review-stars">${stars}</div>
            </div>
          </div>
          <p>"${review.text}"</p>
        `;
        
        return reviewCard;
      });
    };
    
    const cards1 = createReviewCards();
    const cards2 = createReviewCards();
    
    cards1.forEach(card => reviewCards.appendChild(card));
    cards2.forEach(card => reviewCards.appendChild(card));
    
    setTimeout(() => {
      reviewCards.style.animation = 'scroll 40s linear infinite';
    }, 100);
    
    reviewCards.addEventListener('mouseenter', () => {
      reviewCards.style.animationPlayState = 'paused';
    });
    
    reviewCards.addEventListener('mouseleave', () => {
      reviewCards.style.animationPlayState = 'running';
    });
  }, 1500);
}

window.addEventListener('load', loadReviews);

const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
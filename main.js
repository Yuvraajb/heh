document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Pricing card animation (Fade in on visibility)
  const pricingCard = document.querySelector(".pricing-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pricingCard.classList.add("visible"); // Add class to trigger CSS animation
          observer.unobserve(pricingCard); // Stop observing once visible
        }
      });
    },
    { threshold: 0.2 }, // Trigger when 20% of the card is visible
  );
  observer.observe(pricingCard);

  // Feature cards staggered animation (Fade in on container visibility)
  const featureContainer = document.querySelector(".feature-container");
  const featureCards = document.querySelectorAll(".feature-card");
  const fullWidthCard = document.querySelector(".full-width .feature-card");

  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (fullWidthCard) {
            fullWidthCard.style.animation = "cardFadeIn 1s ease forwards";
          }
          featureCards.forEach((card, index) => {
            const delay = (index + 1) * 0.2; // Start after full-width card
            card.style.animation = `cardFadeIn 1s ease forwards ${delay}s`;
          });
          featureObserver.unobserve(featureContainer);
        }
      });
    },
    { threshold: 0.1 },
  );

  featureObserver.observe(featureContainer);

  // Create stars for the feature section (Background stars effect)
  const featureStars = document.querySelector(".feature-stars");
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.classList.add("feature-star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty("--star-speed", Math.random());
    star.style.setProperty("--star-direction-x", Math.random() * 2 - 1);
    star.style.setProperty("--star-direction-y", Math.random() * 2 - 1);
    featureStars.appendChild(star);
  }

  // Typing effect for review container (Dynamic review text)
  const reviewContainer = document.getElementById("review-container");
  const texts = [
    "'RecruitY took the stress out of hiring for our startup.'",
    "'In just two weeks, we had a team of A-players ready to go!'",
    "'We’re in love, with our new hires, of course '",
    "'RecruitY nailed our ideal candidate profile and delivered spot-on'",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      reviewContainer.innerHTML =
        currentText.substring(0, charIndex - 1) +
        '<span class="cursor"></span>';
      charIndex--;
      typingSpeed = 50;
    } else {
      reviewContainer.innerHTML =
        currentText.substring(0, charIndex + 1) +
        '<span class="cursor"></span>';
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before starting a new word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000); // Start typing effect after initial delay

  // Tilt effect for pricing card on scroll (Dynamic tilt based on scroll position)
  function handleScroll() {
    const cardRect = pricingCard.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much the card is in the viewport (0 to 1)
    const visiblePercentage = Math.max(
      0,
      Math.min(1, 1 - (cardRect.top + cardRect.height / 2) / viewportHeight),
    );

    // Map the visible percentage to a tilt angle (adjust range as needed)
    const maxTiltAngle = 15; // Maximum tilt angle
    const tiltAngleX = -maxTiltAngle * visiblePercentage; // Tilt more when further up
    const tiltAngleY = maxTiltAngle * visiblePercentage; // Tilt more when further up

    // Apply the tilt transform
    pricingCard.style.transform = `rotateX(${tiltAngleX}deg) rotateY(${tiltAngleY}deg) translateY(${visiblePercentage * 20}px)`; // Added translateY for depth effect
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Call on load to set initial state

  // Reset tilt on hover (optional, if you want to remove tilt when hovering)
  pricingCard.addEventListener("mouseenter", () => {
    pricingCard.style.transform = "translateY(-8px) scale(1.07)"; // Keep hover scale but remove tilt
  });

  pricingCard.addEventListener("mouseleave", () => {
    handleScroll(); // Re-apply tilt based on scroll when mouse leaves
  });

  // Scribble text animation
  const scribbleText = document.querySelector(".scribble-text");
  const scheduleButton = document.querySelector(".schedule-call");

  function writeText() {
    const text = "It is free";
    scribbleText.innerHTML = "";

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.1}s`;
      scribbleText.appendChild(span);

      setTimeout(() => {
        span.classList.add("write");
      }, index * 100);
    });
  }

  // Initial animation on page load
  setTimeout(writeText, 1500); // Delay to sync with other animations

  // Replay animation on hover
  scheduleButton.addEventListener("mouseenter", writeText);

  // Free text animation
  const freeText = document.querySelector(".free-text");
  setTimeout(() => {
    freeText.classList.add("animate");
  }, 2000);
});

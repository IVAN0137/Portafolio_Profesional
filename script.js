// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS Animation Library with improved settings
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: false,
    mirror: false,
    offset: 50,
    delay: 100,
    anchorPlacement: 'top-bottom'
  });

  // Performance optimization - Cache DOM elements
  const elements = {
    header: document.getElementById("header"),
    mobileMenuButton: document.getElementById("mobile-menu-button"),
    mobileMenu: document.getElementById("mobile-menu"),
    themeToggle: document.getElementById("theme-toggle"),
    themeToggleMobile: document.getElementById("theme-toggle-mobile"),
    htmlElement: document.documentElement,
    backToTopButton: document.getElementById("back-to-top"),
    certificateModal: document.getElementById("certificate-modal"),
    closeModal: document.getElementById("close-modal"),
    modalTitle: document.getElementById("modal-title"),
    certificateImage: document.getElementById("certificate-image"),
    toggleEducationBtn: document.getElementById("toggle-education"),
    moreEducation: document.getElementById("more-education"),
    toggleEducationText: document.getElementById("toggle-education-text"),
    toggleCoursesBtn: document.getElementById("toggle-courses"),
    moreCourses: document.getElementById("more-courses"),
    progressBars: document.querySelectorAll(".skill-progress"),
    sections: document.querySelectorAll("section"),
    navLinks: document.querySelectorAll(".nav-link"),
    mobileNavLinks: document.querySelectorAll(".mobile-nav-link"),
    cursorDot: document.querySelector(".cursor-dot"),
    cursorOutline: document.querySelector(".cursor-outline")
  };

 
  // Header scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      elements.header.classList.add("scrolled");
    } else {
      elements.header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  
  // Initial call to set header state
  handleScroll();

  // Mobile Menu Toggle with improved animation
  elements.mobileMenuButton.addEventListener("click", () => {
    elements.mobileMenuButton.classList.toggle("active");
    elements.mobileMenu.classList.toggle("translate-x-full");
    
    // Prevent body scrolling when menu is open
    if (elements.mobileMenu.classList.contains("translate-x-full")) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  });

  // Close mobile menu when clicking on a link
  elements.mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      elements.mobileMenuButton.classList.remove("active");
      elements.mobileMenu.classList.add("translate-x-full");
      document.body.style.overflow = "";
    });
  });

  // Dark Mode Toggle with system preference detection
  const setThemeClass = () => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      elements.htmlElement.classList.add("dark");
    } else {
      elements.htmlElement.classList.remove("dark");
    }
  };

  // Initial theme setup
  setThemeClass();

  // Theme toggle handlers
  const toggleTheme = () => {
    elements.htmlElement.classList.toggle("dark");

    // Save preference to localStorage
    localStorage.setItem(
      "theme", 
      elements.htmlElement.classList.contains("dark") ? "dark" : "light"
    );
  };

  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.themeToggleMobile.addEventListener("click", toggleTheme);

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      elements.htmlElement.classList.toggle("dark", e.matches);
    }
  });

  // Smooth Scrolling for Navigation Links with improved behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to target with improved animation
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });

        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });

  // Active Navigation Link on Scroll with Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "-80px 0px -20% 0px",
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        
        // Update desktop navigation
        elements.navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
        
        // Update mobile navigation
        elements.mobileNavLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  elements.sections.forEach(section => {
    observer.observe(section);
  });

  // Back to Top Button with improved visibility logic
  function toggleBackToTopButton() {
    const scrollPosition = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Show button after scrolling down 300px or 30% of viewport height, whichever is smaller
    const threshold = Math.min(300, viewportHeight * 0.3);
    
    if (scrollPosition > threshold) {
      elements.backToTopButton.classList.remove("opacity-0", "invisible");
      elements.backToTopButton.classList.add("opacity-100", "visible");
    } else {
      elements.backToTopButton.classList.remove("opacity-100", "visible");
      elements.backToTopButton.classList.add("opacity-0", "invisible");
    }
  }

  window.addEventListener("scroll", toggleBackToTopButton);

  elements.backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Certificate Modal with improved data handling
  // Certificate data (in a real application, this would come from a database)
  const certificates = {};

  // Course certificate data
  const courseCertificates = {
    course1: {
      title: "XX Congreso Internacional de Informática.",
      image: "IMG/Certificados/xx.jpeg",
    },
    course2: {
      title: "Certificado de fundamentos de python 1.",
      image: "IMG/Certificados/Certificado_python1 (1).png",
    },
    course3: {
      title: "Cómputo Paralelo",
      image: "IMG/Certificados/Computo _paralelo.png",
    },
    course4: {
      title: "Diplomado de proyecto ECO-ESTUFA",
      image: "IMG/Certificados/R.png",
    },
    course5: {
      title: "Diplomado de proyecto ASERRIN ARDIENTE",
      image: "IMG/Certificados/Aserrin.jpg",
    },
    course6: {
      title: "Certificado de Ingles NEOSTUDY",
      image: "IMG/Certificados/Ingles.png",
    },
  };

  // Merge the certificates objects
  Object.assign(certificates, courseCertificates);

  // Open modal when clicking on certificate buttons
  document.querySelectorAll(".view-certificate-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const certId = this.getAttribute("data-certificate");
      const certificate = certificates[certId];

      if (certificate) {
        elements.modalTitle.textContent = certificate.title;
        elements.certificateImage.src = certificate.image;
        elements.certificateImage.alt = certificate.title;

        // Show modal with improved animation
        elements.certificateModal.classList.remove("opacity-0", "invisible");
        elements.certificateModal.classList.add("opacity-100", "visible");

        // Prevent body scrolling
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal with improved handling
  const closeModalHandler = () => {
    elements.certificateModal.classList.remove("opacity-100", "visible");
    elements.certificateModal.classList.add("opacity-0", "invisible");

    // Re-enable body scrolling
    document.body.style.overflow = "";
  };

  elements.closeModal.addEventListener("click", closeModalHandler);

  // Close modal when clicking outside
  elements.certificateModal.addEventListener("click", (e) => {
    if (e.target === elements.certificateModal) {
      closeModalHandler();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && 
        elements.certificateModal.classList.contains("visible")) {
      closeModalHandler();
    }
  });

  // Toggle Education Items with improved animation
  let educationExpanded = false;

  elements.toggleEducationBtn.addEventListener("click", () => {
    educationExpanded = !educationExpanded;

    if (educationExpanded) {
      elements.moreEducation.classList.remove("hidden");
      elements.toggleEducationText.textContent = "Ocultar";
      elements.toggleEducationBtn.querySelector("i").classList.remove("fa-chevron-down");
      elements.toggleEducationBtn.querySelector("i").classList.add("fa-chevron-up");
    } else {
      elements.moreEducation.classList.add("hidden");
      elements.toggleEducationText.textContent = "Ver más";
      elements.toggleEducationBtn.querySelector("i").classList.remove("fa-chevron-up");
      elements.toggleEducationBtn.querySelector("i").classList.add("fa-chevron-down");
    }
  });

  // Toggle Courses Items with improved animation
  let coursesExpanded = false;

  elements.toggleCoursesBtn.addEventListener("click", () => {
    coursesExpanded = !coursesExpanded;

    if (coursesExpanded) {
      elements.moreCourses.classList.remove("hidden");
      elements.toggleCoursesBtn.querySelector("i").classList.remove("fa-chevron-down");
      elements.toggleCoursesBtn.querySelector("i").classList.add("fa-chevron-up");
    } else {
      elements.moreCourses.classList.add("hidden");
      elements.toggleCoursesBtn.querySelector("i").classList.remove("fa-chevron-up");
      elements.toggleCoursesBtn.querySelector("i").classList.add("fa-chevron-down");
    }
  });

  // Add toggle functionality for courses section
  const toggleCoursesText = document.getElementById("toggle-courses-text");

  elements.toggleCoursesBtn.addEventListener("click", () => {
    coursesExpanded = !coursesExpanded;

    if (coursesExpanded) {
      elements.moreCourses.classList.remove("hidden");
      toggleCoursesText.textContent = "Ocultar cursos";
      elements.toggleCoursesBtn.querySelector("i").classList.remove("fa-chevron-down");
      elements.toggleCoursesBtn.querySelector("i").classList.add("fa-chevron-up");
    } else {
      elements.moreCourses.classList.add("hidden");
      toggleCoursesText.textContent = "Ver más cursos";
      elements.toggleCoursesBtn.querySelector("i").classList.remove("fa-chevron-up");
      elements.toggleCoursesBtn.querySelector("i").classList.add("fa-chevron-down");
    }
  });

  // Animate progress bars when they come into view with Intersection Observer
  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the width from the style attribute
          const width = entry.target.style.width;
          
          // Reset width to 0 and then animate to the target width
          entry.target.style.width = "0%";
          
          // Force a reflow to ensure the animation works
          entry.target.offsetWidth;
          
          // Set the target width to trigger the animation
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          
          // Unobserve after animation is triggered
          progressObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    // Observe all progress bars
    elements.progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const animateProgressBars = () => {
      elements.progressBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        }
      });
    };

    // Initial check
    animateProgressBars();

    // Check on scroll with debounce
    let isScrollingProgress;
    window.addEventListener("scroll", () => {
      window.clearTimeout(isScrollingProgress);
      isScrollingProgress = setTimeout(animateProgressBars, 66);
    });
  }
});

// Declare AOS variable if it's not already declared
var AOS;
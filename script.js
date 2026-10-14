/**
 * Harsha Hettiarachchi - Portfolio JavaScript
 * Modern Vanilla JS: Custom Cursor, 3D Tilt, Scroll Progress, Typewriter, Theme Toggle
 */

document.addEventListener("DOMContentLoaded", () => {

    // ====================================================
    // 1. THEME TOGGLE (Dark Luxury Obsidian & Gold / Light Ivory)
    // ====================================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // Sun and Moon SVG paths
    const moonPath = "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z";
    const sunPath = "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.29 1.29c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.29 1.29c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.29-1.29zm0-10.96l1.29-1.29a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.29 1.29c-.39.39-.39 1.02 0 1.41.39.39 1.03.39 1.41 0zm-12.37 12.37l-1.29 1.29a.996.996 0 000 1.41.996.996 0 001.41 0l1.29-1.29c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0z";

    // Read saved preference or system preference (Default: Dark Obsidian)
    const savedTheme = localStorage.getItem("theme");

    function updateThemeIcon(isLight) {
        if (themeIcon) {
            const pathElem = themeIcon.querySelector("path");
            if (pathElem) {
                pathElem.setAttribute("d", isLight ? sunPath : moonPath);
            }
        }
    }

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        updateThemeIcon(true);
    } else {
        document.body.classList.remove("light-mode");
        updateThemeIcon(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");

            updateThemeIcon(isLight);
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }


    // ====================================================
    // 2. MOBILE NAVIGATION DRAWER
    // ====================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    function closeMobileMenu() {
        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }


    // ====================================================
    // 3. HEADER SCROLL & PROGRESS BAR
    // ====================================================
    const header = document.getElementById("header");
    const scrollProgressBar = document.getElementById("scroll-progress-bar");
    const scrollTopButton = document.getElementById("scroll-top");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar calculation
        if (scrollProgressBar && docHeight > 0) {
            const progress = (scrollY / docHeight) * 100;
            scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }

        // Header glass elevation
        if (header) {
            if (scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Scroll to top button
        if (scrollTopButton) {
            if (scrollY > 400) {
                scrollTopButton.classList.add("show");
            } else {
                scrollTopButton.classList.remove("show");
            }
        }
    }, { passive: true });

    if (scrollTopButton) {
        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ====================================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ====================================================
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });


    // ====================================================
    // 5. DYNAMIC TYPEWRITER EFFECT
    // ====================================================
    const typewriterElement = document.getElementById("typewriter-text");

    if (typewriterElement) {
        const titles = [
            "Frontend Developer",
            "Web Developer",
            "Creative UI Builder",
            "React & JavaScript Enthusiast"
        ];

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 110;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                // Pause at the end of word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing
        setTimeout(type, 800);
    }


    // ====================================================
    // 6. CUSTOM GLOWING MOUSE CURSOR (Desktop only)
    // ====================================================
    const customCursor = document.getElementById("custom-cursor");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (customCursor && !prefersReducedMotion && !isTouchDevice) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let isCursorVisible = false;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isCursorVisible) {
                customCursor.style.opacity = "1";
                isCursorVisible = true;
            }
        });

        document.addEventListener("mouseleave", () => {
            customCursor.style.opacity = "0";
            isCursorVisible = false;
        });

        document.addEventListener("mouseenter", () => {
            customCursor.style.opacity = "1";
            isCursorVisible = true;
        });

        // Interactive hover states on clickable items
        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, .project-card, .skill-card, .info-chip, .contact-card-item"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                customCursor.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                customCursor.classList.remove("cursor-hover");
            });
        });

        // Smooth physics loop for cursor ring lag
        function renderCursor() {
            // Linear interpolation for smooth trailing follower
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            const ring = customCursor.querySelector(".cursor-ring");
            if (ring) {
                const diffX = ringX - mouseX;
                const diffY = ringY - mouseY;
                ring.style.transform = `translate3d(${diffX}px, ${diffY}px, 0)`;
            }

            requestAnimationFrame(renderCursor);
        }

        requestAnimationFrame(renderCursor);
    }


    // ====================================================
    // 7. 3D TILT & MOUSE SPOTLIGHT (Projects & Skills)
    // ====================================================
    const tiltCards = document.querySelectorAll(".project-card, .skill-card");

    if (!prefersReducedMotion && !isTouchDevice) {
        tiltCards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Set CSS variables for radial spotlight
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);

                // Normalized offsets between -0.5 and 0.5
                const normX = (x / rect.width) - 0.5;
                const normY = (y / rect.height) - 0.5;

                const rotateY = normX * 10;
                const rotateX = -normY * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
            });
        });
    }


    // ====================================================
    // 8. SCROLL REVEAL OBSERVER
    // ====================================================
    const revealElements = document.querySelectorAll(".reveal-fade-up");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach((el, index) => {
            // Apply slight stagger if items share the same parent container
            if (el.classList.contains("skill-card") || el.classList.contains("project-card")) {
                const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
                el.style.transitionDelay = `${(siblingIndex % 3) * 0.12}s`;
            }
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add("is-visible"));
    }


    // ====================================================
    // 9. CONTACT FORM VALIDATION & FEEDBACK
    // ====================================================
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        // Clear errors on input
        if (nameInput) nameInput.addEventListener("input", () => { nameError.textContent = ""; });
        if (emailInput) emailInput.addEventListener("input", () => { emailError.textContent = ""; });
        if (messageInput) messageInput.addEventListener("input", () => { messageError.textContent = ""; });

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            let isValid = true;
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
            if (messageError) messageError.textContent = "";

            // Validate Name
            if (!nameInput || nameInput.value.trim() === "") {
                if (nameError) nameError.textContent = "Please enter your name.";
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || emailInput.value.trim() === "") {
                if (emailError) emailError.textContent = "Please enter your email address.";
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                if (emailError) emailError.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            // Validate Message
            if (!messageInput || messageInput.value.trim() === "") {
                if (messageError) messageError.textContent = "Please enter your message.";
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                if (messageError) messageError.textContent = "Message should be at least 10 characters.";
                isValid = false;
            }

            if (isValid) {
                if (formFeedback) {
                    formFeedback.classList.add("show");
                    setTimeout(() => {
                        formFeedback.classList.remove("show");
                    }, 6000);
                }

                contactForm.reset();
            }
        });
    }


    // ====================================================
    // 10. CURRENT YEAR IN FOOTER
    // ====================================================
    const footerYear = document.querySelector(".footer-copyright");
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} Harsha Hettiarachchi. All Rights Reserved.`;
    }

});
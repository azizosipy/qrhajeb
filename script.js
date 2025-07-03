// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('scale-95');
        document.body.classList.toggle('overflow-hidden');
    });
}

// Category selection functionality
const categoryButtons = document.querySelectorAll('.mobile-scroll button');
const menuCards = document.querySelectorAll('.card');
const menuItemsContainer = document.querySelector('.menu-items-container');
const menuCategories = document.querySelectorAll('.menu-category');
const selectedCategoryText = document.getElementById('selected-category');

// Function to show a specific category
function showCategory(category) {
    // Update selected category text
    selectedCategoryText.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    
    // Show menu items container if hidden
    if (menuItemsContainer.classList.contains('hidden')) {
        menuItemsContainer.classList.remove('hidden');
        setTimeout(() => {
            menuItemsContainer.classList.remove('opacity-0');
            menuItemsContainer.classList.add('opacity-100');
        }, 10);
    }
    
    // Hide all categories first
    menuCategories.forEach(menuCat => {
        menuCat.classList.add('hidden');
    });
    
    // Show the selected category
    const selectedCategory = document.querySelector(`.menu-category[data-category="${category}"]`);
    if (selectedCategory) {
        selectedCategory.classList.remove('hidden');
        
        // Add staggered animation to menu items
        const menuItems = selectedCategory.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
        
        // Initialize video scroll buttons if this is the video category
        if (category === 'video') {
            initVideoScrollButtons();
        }
    }
    
    // Update mobile buttons active state
    categoryButtons.forEach(btn => {
        btn.classList.remove('bg-river-blue', 'active');
        btn.classList.add('bg-white/10');
        
        const btnText = btn.textContent.trim().toLowerCase();
        if (btnText === category || (btnText === 'tous' && category === 'all')) {
            btn.classList.remove('bg-white/10');
            btn.classList.add('bg-river-blue', 'active');
        }
    });
}

// Show all categories
function showAllCategories() {
    selectedCategoryText.textContent = 'Tous les plats';
    
    // Show menu items container if hidden
    if (menuItemsContainer.classList.contains('hidden')) {
        menuItemsContainer.classList.remove('hidden');
        setTimeout(() => {
            menuItemsContainer.classList.remove('opacity-0');
            menuItemsContainer.classList.add('opacity-100');
        }, 10);
    }
    
    // Show all categories
    menuCategories.forEach((menuCat, catIndex) => {
        menuCat.classList.remove('hidden');
        
        // Add staggered animation to menu items
        const menuItems = menuCat.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + ((catIndex * 3 + index) * 100));
        });
    });
    
    // Update mobile buttons active state
    categoryButtons.forEach(btn => {
        btn.classList.remove('bg-river-blue', 'active');
        btn.classList.add('bg-white/10');
        
        if (btn.textContent.trim().toLowerCase() === 'tous') {
            btn.classList.remove('bg-white/10');
            btn.classList.add('bg-river-blue', 'active');
        }
    });
    
    // Initialize video scroll buttons
    initVideoScrollButtons();
}

// Add event listeners to category buttons
categoryButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.textContent.trim().toLowerCase();
        
        if (category === 'tous') {
            showAllCategories();
        } else {
            showCategory(category);
        }
    });
});

// Add event listeners to cards
menuCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        if (category) {
            showCategory(category);
            
            // Scroll to menu items
            menuItemsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hover effect for cards on mobile (touch devices)
    card.addEventListener('touchstart', function() {
        this.classList.add('hover:translate-y-[-10px]', 'hover:shadow-xl');
        this.querySelector('img')?.classList.add('scale-110');
    }, {passive: true});
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('hover:translate-y-[-10px]', 'hover:shadow-xl');
            this.querySelector('img')?.classList.remove('scale-110');
        }, 300);
    }, {passive: true});
});

// Video scroll functionality
function initVideoScrollButtons() {
    const scrollContainer = document.querySelector('.videos-scroll-container');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    
    if (scrollContainer && leftBtn && rightBtn) {
        // Show/hide scroll buttons based on scroll position
        const updateScrollButtonVisibility = () => {
            leftBtn.style.display = scrollContainer.scrollLeft > 0 ? 'flex' : 'none';
            rightBtn.style.display = 
                scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) 
                ? 'flex' : 'none';
        };
        
        // Initial update
        updateScrollButtonVisibility();
        
        // Scroll left button
        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -340,
                behavior: 'smooth'
            });
        });
        
        // Scroll right button
        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 340,
                behavior: 'smooth'
            });
        });
        
        // Update button visibility on scroll
        scrollContainer.addEventListener('scroll', updateScrollButtonVisibility);
        
        // Touch swipe for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        scrollContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        scrollContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        const handleSwipe = () => {
            const swipeDistance = touchStartX - touchEndX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    // Swipe left, scroll right
                    scrollContainer.scrollBy({
                        left: 340,
                        behavior: 'smooth'
                    });
                } else {
                    // Swipe right, scroll left
                    scrollContainer.scrollBy({
                        left: -340,
                        behavior: 'smooth'
                    });
                }
            }
        };
        
        // Add scroll animation to video items
        const videoItems = scrollContainer.querySelectorAll('.menu-item');
        videoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 150));
        });
    }
}

// Initialize with 'tous' category as default
document.addEventListener('DOMContentLoaded', function() {
    const firstCategoryButton = document.querySelector('.mobile-scroll button');
    if (firstCategoryButton) {
        firstCategoryButton.click();
    }
}); 
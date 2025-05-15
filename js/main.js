document.addEventListener('DOMContentLoaded', function() {
    // Add all styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 999;
        }
        
        .mobile-menu.active {
            display: flex;
        }
        
        .mobile-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
        }
        
        .mobile-menu li {
            margin: 1rem 0;
        }
        
        .mobile-menu a {
            color: #fff;
            text-decoration: none;
            font-size: 1.25rem;
            padding: 0.5rem 1rem;
        }
        
        .mobile-menu a:hover {
            color: #0066cc;
        }

        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .lightbox-caption {
            color: #fff;
            padding: 1rem;
            text-align: center;
        }
        
        .lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            line-height: 1;
        }
        
        .lightbox-close:hover {
            color: #ccc;
        }
    `;
    document.head.appendChild(style);

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.header');

    if (mobileMenuToggle) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = document.querySelector('.main-nav').innerHTML;
        document.body.appendChild(mobileMenu);

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Media page category filtering
    const mediaNav = document.querySelector('.media-nav');
    if (mediaNav) {
        const buttons = mediaNav.querySelectorAll('.media-nav-button');
        const categories = document.querySelectorAll('.media-category');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                // Show/hide categories
                if (category === 'all') {
                    categories.forEach(cat => cat.style.display = 'block');
                } else {
                    categories.forEach(cat => {
                        if (cat.id === category) {
                            cat.style.display = 'block';
                        } else {
                            cat.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Gallery image lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            const lightboxCaption = document.createElement('div');
            lightboxCaption.className = 'lightbox-caption';
            lightboxCaption.innerHTML = caption.innerHTML;
            
            const closeButton = document.createElement('button');
            closeButton.className = 'lightbox-close';
            closeButton.innerHTML = '×';
            
            // Assemble and append lightbox
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(lightboxCaption);
            lightbox.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Add close functionality
            const closeLightbox = () => {
                lightbox.remove();
                document.removeEventListener('keydown', handleKeyPress);
            };
            
            const handleKeyPress = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            };
            
            closeButton.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            document.addEventListener('keydown', handleKeyPress);
        });
    });
}); 
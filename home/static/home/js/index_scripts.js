
document.addEventListener('DOMContentLoaded', function() {
    // Swiper برای مقالات
    const blogSwiper = new Swiper('.blog-articles-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.blog-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + ' w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300"></span>';
            },
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 4,
            }
        },
        navigation: {
            nextEl: '.blog-swiper-next',
            prevEl: '.blog-swiper-prev',
        },
    });

    // انیمیشن برای ورود مقالات
    const observerOptions = {
        threshold: 0.1,
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

    // اعمال انیمیشن به مقالات
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
        slide.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(slide);
    });

    // انیمیشن هایور برای مقالات
    document.querySelectorAll('article').forEach(article => {
        article.addEventListener('mouseenter', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        article.addEventListener('mouseleave', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // تعامل با تگ‌ها
    document.querySelectorAll('article .bg-gray-100, article .bg-gray-700').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
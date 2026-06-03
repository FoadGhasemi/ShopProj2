// مدیریت منوی موبایل
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMobileMenu() {
    mobileNavMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNavMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}
if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// بستن منو با کلیک روی لینک‌ها
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// عملکرد تغییر حالت تاریک/روشن
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        
        // ذخیره حالت در localStorage
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // بارگذاری حالت ذخیره شده theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

// اجرای ساده استوری‌ها
const storiesContainer = document.getElementById('stories-container');
const stories = [
    { avatar: './assets/img/cover2.jpg' },
    { avatar: './assets/img/cover3.jpg' },
    { avatar: './assets/img/cover20.jpg' },
    { avatar: './assets/img/cover5.jpg' },
    { avatar: './assets/img/cover6.jpg' },
    { avatar: './assets/img/cover8.jpg' },
    { avatar: './assets/img/cover7.jpg' },
    { avatar: './assets/img/cover21.png' },
    { avatar: './assets/img/cove14.jpg' },
    { avatar: './assets/img/cover1.png' },
];

if (storiesContainer) {
    stories.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.className = 'story-item';
        storyElement.innerHTML = `<a href="./shop.html"><img src="${story.avatar}" alt="استوری"></a>`;
        storiesContainer.appendChild(storyElement);
    });
}

// راه‌اندازی Swiper
document.addEventListener('DOMContentLoaded', function() {
    // اسلایدر اصلی
    const mainSwiperElement = document.querySelector('.default-carousel');
    if (mainSwiperElement) {
        const mainSwiper = new Swiper('.default-carousel', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // اسلایدر محصولات شگفت انگیز
    const amazingSwiperElement = document.querySelector('.amazing-carousel');
    if (amazingSwiperElement) {
        const amazingSwiper = new Swiper('.amazing-carousel', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 3000,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
        });
    }

    // اسلایدر برندها
    const brandsSwiperElement = document.querySelector('.brands-slider');
    if (brandsSwiperElement) {
        const brandsSwiper = new Swiper('.brands-slider', {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            },
        });
    }
});

// افزودن محصول به سبد خرید
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        alert(`محصول "${productName}" به سبد خرید اضافه شد!`);
        
        // افزودن انیمیشن به دکمه
        this.classList.add('animate-pulse');
        setTimeout(() => {
            this.classList.remove('animate-pulse');
        }, 500);
    });
});

// ایجاد انیمیشن پالس
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    .animate-pulse {
        animation: pulse 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// منوی کشویی در موبایل
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

// تایمر تخفیف
function updateDiscountTimer() {
    const daysElement = document.querySelector('.timer-item:nth-child(1) .timer-value');
    const hoursElement = document.querySelector('.timer-item:nth-child(2) .timer-value');
    const minutesElement = document.querySelector('.timer-item:nth-child(3) .timer-value');
    const secondsElement = document.querySelector('.timer-item:nth-child(4) .timer-value');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    let sec = parseInt(secondsElement.textContent);
    let min = parseInt(minutesElement.textContent);
    let hr = parseInt(hoursElement.textContent);
    let d = parseInt(daysElement.textContent);
    
    sec--;
    
    if (sec < 0) {
        sec = 59;
        min--;
        
        if (min < 0) {
            min = 59;
            hr--;
            
            if (hr < 0) {
                hr = 23;
                d--;
                
                if (d < 0) {
                    // تایمر به پایان رسیده
                    d = 0;
                    hr = 0;
                    min = 0;
                    sec = 0;
                    clearInterval(timerInterval);
                }
            }
        }
    }
    
    daysElement.textContent = d.toString().padStart(2, '0');
    hoursElement.textContent = hr.toString().padStart(2, '0');
    minutesElement.textContent = min.toString().padStart(2, '0');
    secondsElement.textContent = sec.toString().padStart(2, '0');
}

const timerInterval = setInterval(updateDiscountTimer, 1000);

// عملکرد بستن بنر تبلیغاتی
document.querySelector('.promotion-close')?.addEventListener('click', function() {
    const promotionBar = document.querySelector('.top-promotion-bar');
    if (promotionBar) {
        promotionBar.style.display = 'none';
        
        // ذخیره وضعیت در localStorage برای جلوگیری از نمایش مجدد
        localStorage.setItem('promotionClosed', 'true');
    }
});

// بررسی وضعیت localStorage هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('promotionClosed') === 'true') {
        const promotionBar = document.querySelector('.top-promotion-bar');
        if (promotionBar) {
            promotionBar.style.display = 'none';
        }
    }
});

// تنظیم زمان پایانی برای پیشنهاد (۲ روز از زمان فعلی)
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 2);
countDownDate.setHours(12, 0, 0, 0); // تنظیم ساعت به ۱۲ ظهر

// به روز رسانی تایمر هر ثانیه
const countdownInterval = setInterval(function() {
    // تاریخ و زمان فعلی
    const now = new Date().getTime();
    
    // فاصله زمانی بین الان و زمان پایانی
    const distance = countDownDate - now;
    
    // محاسبه روز، ساعت، دقیقه و ثانیه
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // نمایش نتیجه در المنت‌های مربوطه
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    if (daysElement) daysElement.innerText = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.innerText = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.innerText = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.innerText = seconds.toString().padStart(2, '0');
    
    // اگر زمان به پایان رسیده باشد
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.innerText = "۰۰";
        if (hoursElement) hoursElement.innerText = "۰۰";
        if (minutesElement) minutesElement.innerText = "۰۰";
        if (secondsElement) secondsElement.innerText = "۰۰";
    }
}, 1000);

// افزودن قابلیت کشیدن به استوری‌ها در موبایل
function initStoriesDrag() {
    const storiesContainer = document.getElementById('stories-container');
    if (!storiesContainer) return;
    
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    // فعال برای همه دستگاه‌ها (هم موبایل هم دسکتاپ)
    storiesContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - storiesContainer.offsetLeft;
        scrollLeft = storiesContainer.scrollLeft;
        storiesContainer.style.cursor = 'grabbing';
        storiesContainer.style.scrollBehavior = 'auto'; // غیرفعال کردن اسکرول نرم هنگام کشیدن
    });
    
    storiesContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - storiesContainer.offsetLeft;
        const walk = (x - startX) * 2; // سرعت کشیدن
        storiesContainer.scrollLeft = scrollLeft - walk;
    });
    
    storiesContainer.addEventListener('mouseup', () => {
        isDragging = false;
        storiesContainer.style.cursor = 'grab';
        storiesContainer.style.scrollBehavior = 'smooth';
    });
    
    storiesContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        storiesContainer.style.cursor = 'grab';
        storiesContainer.style.scrollBehavior = 'smooth';
    });
    
    // رویدادهای لمسی برای موبایل
    storiesContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - storiesContainer.offsetLeft;
        scrollLeft = storiesContainer.scrollLeft;
        storiesContainer.style.scrollBehavior = 'auto';
    });
    
    storiesContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - storiesContainer.offsetLeft;
        const walk = (x - startX) * 2;
        storiesContainer.scrollLeft = scrollLeft - walk;
    });
    
    storiesContainer.addEventListener('touchend', () => {
        isDragging = false;
        storiesContainer.style.scrollBehavior = 'smooth';
    });
}

// تایمر شمارش معکوس
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // تنظیم زمان اولیه (2 ساعت، 47 دقیقه، 14 ثانیه)
    let totalSeconds = 2 * 3600 + 47 * 60 + 14;
    
    function updateTimer() {
        if (totalSeconds <= 0) {
            // اگر زمان به پایان رسید، تایمر را متوقف کنید
            clearInterval(timerInterval);
            return;
        }
        
        totalSeconds--;
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // اجرای تایمر هر ثانیه
    const timerInterval = setInterval(updateTimer, 1000);
}

// اسلاید محصولات
function initProductSlider() {
    const productsContainer = document.querySelector('.offer-products');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (!productsContainer || !prevButton || !nextButton) return;
    
    const scrollAmount = 250;
    
    // دکمه قبلی
    prevButton.addEventListener('click', function() {
        productsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    // دکمه بعدی
    nextButton.addEventListener('click', function() {
        productsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // فعال کردن کشیدن با ماوس/لمس
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    // برای دسکتاپ
    productsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - productsContainer.offsetLeft;
        scrollLeft = productsContainer.scrollLeft;
        productsContainer.style.cursor = 'grabbing';
        productsContainer.style.scrollBehavior = 'auto';
    });
    
    productsContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - productsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        productsContainer.scrollLeft = scrollLeft - walk;
    });
    
    productsContainer.addEventListener('mouseup', () => {
        isDragging = false;
        productsContainer.style.cursor = 'grab';
        productsContainer.style.scrollBehavior = 'smooth';
    });
    
    productsContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        productsContainer.style.cursor = 'grab';
        productsContainer.style.scrollBehavior = 'smooth';
    });
    
    // برای موبایل
    productsContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - productsContainer.offsetLeft;
        scrollLeft = productsContainer.scrollLeft;
        productsContainer.style.scrollBehavior = 'auto';
    });
    
    productsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - productsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        productsContainer.scrollLeft = scrollLeft - walk;
    });
    
    productsContainer.addEventListener('touchend', () => {
        isDragging = false;
        productsContainer.style.scrollBehavior = 'smooth';
    });
    
    // تنظیم حالت اولیه کرسر
    productsContainer.style.cursor = 'grab';
}

// عملکرد دکمه‌های محصول
function initProductButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const viewProductButtons = document.querySelectorAll('.view-product-btn');
    
    // دکمه افزودن به سبد خرید
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.price-amount')?.textContent || 'محصول';
            
            // انیمیشن کلیک
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // نمایش پیام
            alert(`محصول "${productName}" به سبد خرید اضافه شد!`);
        });
    });
    
    // دکمه مشاهده محصول
    viewProductButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.price-amount')?.textContent || 'محصول';
            
            // انیمیشن کلیک
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // نمایش پیام موقت
            alert(`در حال انتقال به صفحه محصول "${productName}"`);
        });
    });
}

// تایمر پیشنهاد شگفت‌انگیز
function startAmazingTimer() {
    const hoursElement = document.getElementById('amazing-hours');
    const minutesElement = document.getElementById('amazing-minutes');
    const secondsElement = document.getElementById('amazing-seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // تنظیم زمان اولیه (2 ساعت، 47 دقیقه، 14 ثانیه)
    let totalSeconds = 2 * 3600 + 47 * 60 + 14;
    
    function updateTimer() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }
        
        totalSeconds--;
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    const timerInterval = setInterval(updateTimer, 1000);
}

// تایمر پیشنهاد ویژه
function startSpecialTimer() {
    const hoursElement = document.getElementById('special-hours');
    const minutesElement = document.getElementById('special-minutes');
    const secondsElement = document.getElementById('special-seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // تنظیم زمان اولیه (6 ساعت، 29 دقیقه، 54 ثانیه)
    let totalSeconds = 6 * 3600 + 29 * 60 + 54;
    
    function updateTimer() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }
        
        totalSeconds--;
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    const timerInterval = setInterval(updateTimer, 1000);
}

// منوی مگا
(function(){
    const burger = document.querySelector('.hx9f_burger__c22');
    const panel  = document.getElementById('hx9f-mobile');
    if(burger && panel){
      burger.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = panel.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      
      document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape' && panel.classList.contains('is-open')){
          panel.classList.remove('is-open');
          burger.setAttribute('aria-expanded','false');
        }
      });
      
      // بستن منو با کلیک خارج از آن
      document.addEventListener('click', (e) => {
        if(panel.classList.contains('is-open') && !panel.contains(e.target) && !burger.contains(e.target)){
          panel.classList.remove('is-open');
          burger.setAttribute('aria-expanded','false');
        }
      });
    }

    // مدیریت زیرمنوها در موبایل
    const mobileParents = document.querySelectorAll('.hx9f_mobileHasChildren__p77');
    mobileParents.forEach(parent => {
      const link = parent.querySelector('.hx9f_mobileLink__l44');
      if (link) {
        link.addEventListener('click', (e) => {
          if(parent.querySelector('.hx9f_mobileSubmenu__k88')){
            e.preventDefault();
            e.stopPropagation();
            parent.classList.toggle('active');
          }
        });
      }
    });
    
    // بستن مگامنو با کلیک خارج از آن
    document.addEventListener('click', (e) => {
      const megaMenus = document.querySelectorAll('.hx9f_megaMenu__q33');
      megaMenus.forEach(menu => {
        if(menu.style.display === 'block' && !menu.contains(e.target) && 
           !e.target.classList.contains('hx9f_navLink__d33')) {
          menu.style.display = 'none';
        }
      });
    });
})();

// مقداردهی اولیه هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    initProductSlider();
    initProductButtons();
    startAmazingTimer();
    startSpecialTimer();
    initStoriesDrag();
});

// همچنین هنگام تغییر سایز صفحه (برای اطمینان)
window.addEventListener('resize', initStoriesDrag);
// Custom JavaScript for enhanced functionality

document.addEventListener('DOMContentLoaded', function () {
    initScrollToTop();
    initTOCIndicator();
    initPostFiltering();
    initSeriesFiltering();
});

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

// TOC indicator and navigation
function initTOCIndicator() {
    const tocIndicator = document.getElementById('toc-indicator');
    const tocDropdown = document.getElementById('toc-dropdown');

    if (!tocIndicator || !tocDropdown) return;

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentHeading = '';

    // Create TOC items
    const tocItems = [];
    headings.forEach(function (heading, index) {
        const id = heading.id || 'heading-' + index;
        if (!heading.id) {
            heading.id = id;
        }

        const level = parseInt(heading.tagName.charAt(1));
        const tocItem = document.createElement('a');
        tocItem.href = '#' + id;
        tocItem.className = 'toc-item level-' + level;
        tocItem.textContent = heading.textContent;
        tocDropdown.appendChild(tocItem);
        tocItems.push({
            element: tocItem,
            heading: heading,
            id: id
        });
    });

    // Update current heading indicator
    function updateCurrentHeading() {
        let current = '';
        let currentItem = null;

        tocItems.forEach(function (item) {
            const rect = item.heading.getBoundingClientRect();
            if (rect.top <= 100) {
                current = item.heading.textContent;
                currentItem = item.element;
            }
        });

        if (current !== currentHeading) {
            currentHeading = current;
            document.getElementById('current-heading').textContent = current || '목차';

            // Update active TOC item
            tocItems.forEach(function (item) {
                item.element.classList.remove('current');
            });
            if (currentItem) {
                currentItem.classList.add('current');
            }
        }
    }

    // Toggle TOC dropdown
    tocIndicator.addEventListener('click', function (e) {
        e.stopPropagation();
        tocDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
        tocDropdown.classList.remove('active');
    });

    // Prevent dropdown from closing when clicking inside
    tocDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Smooth scroll to heading when clicking TOC item
    tocItems.forEach(function (item) {
        item.element.addEventListener('click', function (e) {
            e.preventDefault();
            const targetHeading = document.getElementById(item.id);
            if (targetHeading) {
                const headerHeight = 80; // Account for fixed header
                const targetPosition = targetHeading.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                tocDropdown.classList.remove('active');
            }
        });
    });

    // Update current heading on scroll
    window.addEventListener('scroll', updateCurrentHeading);
    updateCurrentHeading(); // Initial update
}

// Post filtering by tags
function initPostFiltering() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const postItems = document.querySelectorAll('.post-item');

    if (filterTags.length === 0) return;

    filterTags.forEach(function (tag) {
        tag.addEventListener('click', function (e) {
            e.preventDefault();

            // Toggle active state
            const isActive = tag.classList.contains('active');
            filterTags.forEach(function (t) { t.classList.remove('active'); });

            if (!isActive) {
                tag.classList.add('active');
                const filterTag = tag.dataset.tag;

                // Filter posts
                postItems.forEach(function (post) {
                    const postTags = post.dataset.tags ? post.dataset.tags.split(',') : [];
                    if (postTags.includes(filterTag)) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            } else {
                // Show all posts
                postItems.forEach(function (post) {
                    post.style.display = 'block';
                });
            }
        });
    });
}

// Series filtering by tags
function initSeriesFiltering() {
    const seriesFilterTags = document.querySelectorAll('.series-filter-tag');
    const seriesCards = document.querySelectorAll('.series-card');

    if (seriesFilterTags.length === 0) return;

    seriesFilterTags.forEach(function (tag) {
        tag.addEventListener('click', function (e) {
            e.preventDefault();

            // Toggle active state
            const isActive = tag.classList.contains('active');
            seriesFilterTags.forEach(function (t) { t.classList.remove('active'); });

            if (!isActive) {
                tag.classList.add('active');
                const filterTag = tag.dataset.tag;

                // Filter series
                seriesCards.forEach(function (card) {
                    const seriesTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
                    if (seriesTags.includes(filterTag)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                // Show all series
                seriesCards.forEach(function (card) {
                    card.style.display = 'block';
                });
            }
        });
    });
}

// Mermaid diagram support
if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
        startOnLoad: true,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    });

    // Update theme on mode change
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                const isDark = document.documentElement.classList.contains('dark');
                mermaid.initialize({
                    theme: isDark ? 'dark' : 'default'
                });
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}

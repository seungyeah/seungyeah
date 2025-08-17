// Series interaction enhancements
let currentExpandedSeries = null;
let currentSeriesPosts = [];
let currentSeriesPage = 0;
const SERIES_POSTS_PER_PAGE = 10;

function toggleSeries(seriesSlug, event) {
    // 기본 동작과 이벤트 전파를 완전히 방지
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    console.log('toggleSeries called with:', seriesSlug);

    const allBooks = document.querySelectorAll('.series-book');
    const clickedBook = document.querySelector(`[data-series="${seriesSlug}"]`);
    const grid = document.getElementById('series-grid');
    const postsContainer = document.getElementById('posts-container');

    if (!clickedBook) {
        console.error('No book found with series:', seriesSlug);
        return false;
    }

    if (currentExpandedSeries === seriesSlug) {
        // 이미 선택된 시리즈를 다시 클릭 - 모든 시리즈 보이기
        closeSeries();
    } else {
        // 새로운 시리즈 선택
        grid.classList.add('expanded-mode');

        // 다른 책들 숨기기, 선택된 책만 보이기
        allBooks.forEach(book => {
            book.classList.remove('expanded');
            if (book === clickedBook) {
                book.style.display = 'flex';
                book.classList.add('expanded');
            } else {
                book.style.display = 'none';
            }
        });

        // 포스트 목록 표시
        showSeriesPosts(clickedBook);
        postsContainer.classList.add('visible');

        currentExpandedSeries = seriesSlug;
    }

    return false;
}

function closeSeries() {
    const grid = document.getElementById('series-grid');
    const postsContainer = document.getElementById('posts-container');
    const allBooks = document.querySelectorAll('.series-book');

    grid.classList.remove('expanded-mode');
    postsContainer.classList.remove('visible');
    allBooks.forEach(book => {
        book.style.display = 'flex';
        book.classList.remove('expanded');
    });
    currentExpandedSeries = null;
    currentSeriesPosts = [];
    currentSeriesPage = 0;
}

function showSeriesPosts(bookElement) {
    const seriesName = bookElement.dataset.seriesName;
    const postCount = bookElement.dataset.postCount;
    const postsData = bookElement.querySelectorAll('.post-data');

    // 포스트 데이터를 배열로 변환
    currentSeriesPosts = Array.from(postsData).map(postData => ({
        index: parseInt(postData.dataset.index),
        title: postData.dataset.title,
        permalink: postData.dataset.permalink,
        date: postData.dataset.date
    }));

    // 인덱스 순으로 정렬
    currentSeriesPosts.sort((a, b) => a.index - b.index);
    currentSeriesPage = 0; // 첫 페이지부터 시작

    // 헤더 업데이트
    const titleElement = document.getElementById('posts-title');
    const metaElement = document.getElementById('posts-meta');

    if (titleElement) titleElement.textContent = seriesName;
    if (metaElement) metaElement.textContent = `${postCount}개 포스트`;

    // 포스트 페이지 표시
    displaySeriesPostsPage();
    updateSeriesPostsNavigation();
}

function displaySeriesPostsPage() {
    const postsList = document.getElementById('posts-list');
    if (!postsList) {
        console.error('posts-list element not found');
        return;
    }

    if (!currentSeriesPosts.length) {
        console.log('No posts to display');
        postsList.innerHTML = '<li>포스트가 없습니다.</li>';
        return;
    }

    const startIndex = currentSeriesPage * SERIES_POSTS_PER_PAGE;
    const endIndex = Math.min(startIndex + SERIES_POSTS_PER_PAGE, currentSeriesPosts.length);
    const postsToShow = currentSeriesPosts.slice(startIndex, endIndex);

    postsList.innerHTML = '';

    postsToShow.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'series-post-item-container';

        listItem.innerHTML = `
            <div class="series-post-number-large">${post.index}</div>
            <div class="series-post-content">
                <h3 class="series-post-title-large">
                    <a href="#" class="series-post-link" data-permalink="${post.permalink}">${post.title}</a>
                </h3>
                <div class="series-post-meta-large">
                    <span>${post.date}</span>
                </div>
            </div>
        `;

        // 링크 클릭 이벤트 추가
        const link = listItem.querySelector('.series-post-link');
        if (link) {
            console.log('Adding click event to link:', post.title, 'permalink:', post.permalink);
            link.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const permalink = link.getAttribute('data-permalink');
                console.log('Link clicked! permalink:', permalink);
                if (permalink) {
                    console.log('Navigating to:', permalink);
                    window.location.href = permalink;
                } else {
                    console.error('No permalink found for:', post.title);
                }
            });
        } else {
            console.error('Link element not found for post:', post.title);
        }

        postsList.appendChild(listItem);
    });
}

function updateSeriesPostsNavigation() {
    const totalPages = Math.ceil(currentSeriesPosts.length / SERIES_POSTS_PER_PAGE);
    const prevBtn = document.getElementById('prev-post-btn');
    const nextBtn = document.getElementById('next-post-btn');
    const pageInfo = document.getElementById('post-navigation-info');

    if (pageInfo) {
        pageInfo.textContent = `${currentSeriesPage + 1} / ${totalPages}`;
    }

    if (prevBtn) {
        prevBtn.disabled = currentSeriesPage === 0;
        prevBtn.style.opacity = currentSeriesPage === 0 ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.disabled = currentSeriesPage >= totalPages - 1;
        nextBtn.style.opacity = currentSeriesPage >= totalPages - 1 ? '0.5' : '1';
    }
}

function navigatePrevPost() {
    if (currentSeriesPage > 0) {
        currentSeriesPage--;
        displaySeriesPostsPage();
        updateSeriesPostsNavigation();
    }
}

function navigateNextPost() {
    const totalPages = Math.ceil(currentSeriesPosts.length / SERIES_POSTS_PER_PAGE);
    if (currentSeriesPage < totalPages - 1) {
        currentSeriesPage++;
        displaySeriesPostsPage();
        updateSeriesPostsNavigation();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Series interaction script loaded');
    console.log('Document ready, looking for series books...');

    // Add enhanced click handling for series books
    const seriesBooks = document.querySelectorAll('.series-book');
    console.log('Found series books:', seriesBooks.length);

    seriesBooks.forEach((book, index) => {
        const seriesSlug = book.dataset.series;
        console.log(`Book ${index}:`, seriesSlug, book);

        if (seriesSlug) {
            // 새 이벤트 리스너 추가
            book.addEventListener('click', function (event) {
                console.log('Book clicked:', seriesSlug, event);
                toggleSeries(seriesSlug, event);
            });

            // 클릭 가능한 스타일 추가
            book.style.cursor = 'pointer';

            // href 제거하여 기본 링크 동작 방지
            const links = book.querySelectorAll('a');
            console.log(`Book ${index} has ${links.length} links`);
            links.forEach(link => {
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('Link clicked in book:', seriesSlug);
                    toggleSeries(seriesSlug, event);
                });
            });
        } else {
            console.warn(`Book ${index} has no series data`);
        }
    });

    // 키보드 네비게이션 추가
    document.addEventListener('keydown', function (event) {
        if (currentExpandedSeries) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                navigatePrevPost();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                navigateNextPost();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                closeSeries();
            }
        }
    });
});

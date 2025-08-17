// Series interaction enhancements
let currentExpandedSeries = null;
let currentSeriesPosts = [];
let currentPostIndex = 0;

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
        grid.classList.remove('expanded-mode');
        postsContainer.classList.remove('visible');
        allBooks.forEach(book => {
            book.style.display = 'flex';
            book.classList.remove('expanded');
        });
        currentExpandedSeries = null;
        currentSeriesPosts = [];
        currentPostIndex = 0;
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
    currentPostIndex = 0;

    // 헤더 업데이트
    document.getElementById('posts-title').textContent = seriesName;
    document.getElementById('posts-meta').textContent = `${postCount}개 포스트`;

    // 초기 포스트 표시
    displayCurrentPost();

    // 네비게이션 버튼 표시/숨김
    updateNavigationButtons();
}

function displayCurrentPost() {
    const postsList = document.getElementById('posts-list');
    if (!currentSeriesPosts.length) return;

    const currentPost = currentSeriesPosts[currentPostIndex];

    postsList.innerHTML = `
        <li class="series-post-item-container current-displaying">
            <div class="series-post-number-large">${currentPost.index}</div>
            <div class="series-post-content">
                <h3 class="series-post-title-large">
                    <a href="${currentPost.permalink}">${currentPost.title}</a>
                </h3>
                <div class="series-post-meta-large">
                    <span>${currentPost.date}</span>
                </div>
            </div>
        </li>
    `;

    // 네비게이션 정보 업데이트
    updatePostInfo();
}

function updatePostInfo() {
    const postInfo = document.getElementById('post-navigation-info');
    if (postInfo) {
        postInfo.textContent = `${currentPostIndex + 1} / ${currentSeriesPosts.length}`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-post-btn');
    const nextBtn = document.getElementById('next-post-btn');

    if (prevBtn) {
        prevBtn.disabled = currentPostIndex === 0;
        prevBtn.style.opacity = currentPostIndex === 0 ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.disabled = currentPostIndex === currentSeriesPosts.length - 1;
        nextBtn.style.opacity = currentPostIndex === currentSeriesPosts.length - 1 ? '0.5' : '1';
    }
}

function navigatePrevPost() {
    if (currentPostIndex > 0) {
        currentPostIndex--;
        displayCurrentPost();
        updateNavigationButtons();
    }
}

function navigateNextPost() {
    if (currentPostIndex < currentSeriesPosts.length - 1) {
        currentPostIndex++;
        displayCurrentPost();
        updateNavigationButtons();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Series interaction script loaded');

    // Add enhanced click handling for series books
    const seriesBooks = document.querySelectorAll('.series-book');

    seriesBooks.forEach(book => {
        const seriesSlug = book.dataset.series;
        if (seriesSlug) {
            // 기존 이벤트 리스너 제거
            book.removeEventListener('click', handleSeriesClick);

            // 새 이벤트 리스너 추가
            book.addEventListener('click', function (event) {
                console.log('Book clicked:', seriesSlug);
                toggleSeries(seriesSlug, event);
            });

            // href 제거하여 기본 링크 동작 방지
            const links = book.querySelectorAll('a');
            links.forEach(link => {
                link.removeAttribute('href');
                link.style.cursor = 'pointer';
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleSeries(seriesSlug, event);
                });
            });
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
                // 시리즈 닫기
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
                currentPostIndex = 0;
            }
        }
    });
});

function handleSeriesClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const seriesSlug = this.dataset.series;
    toggleSeries(seriesSlug, event);
}

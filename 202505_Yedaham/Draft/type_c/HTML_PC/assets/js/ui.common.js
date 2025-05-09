$(function(){
    const $header = $('.header');
    const $qnb = $('.gnb-nav');
    const gnb_speed = 200;
    let closeTimer = null;

    $header.hover(
        function () {
        clearTimeout(closeTimer); // 마우스가 다시 들어오면 닫기 취소
        $header.addClass('is-gnb-opened');
        setTimeout(function () {
            $qnb.addClass('is-active');
        }, gnb_speed);
        },
        function () {
            closeTimer = setTimeout(function () {
                $qnb.removeClass('is-active');
                $qnb.one('transitionend', function () {
                    $header.removeClass('is-gnb-opened');
                });
            }, 200); // 마우스가 벗어난 뒤 300ms 후 닫힘
        }
    );

    // 스크롤이 이동할 때마다 실행
    window.addEventListener('scroll', checkScrollPosition);
})

// 스크롤 체크
function checkScrollPosition() {
    if (window.scrollY >= 250) {
        $('.header').addClass('is-active');
    } else {
        $('.header').removeClass('is-active');
    }
}

// 모달 열기
function modalOpen(id) {
    // 풀페이지 비활성
    if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(false);
    }

    document.getElementById(id)?.classList.add('is-opened');
    document.body.classList.add('is-modal-opened', 'is-scroll-locked');
    // document.documentElement.classList.add('is-scroll-locked');
}

// 모달 닫기
function modalClose(id) {
    // 풀페이지 활성
    if (typeof fullpage_api !== 'undefined') {
        fullpage_api.setAllowScrolling(true);
    }

    document.getElementById(id)?.classList.remove('is-opened');
    document.body.classList.remove('is-modal-opened', 'is-scroll-locked');
    // document.documentElement.classList.remove('is-scroll-locked');
}

// 키워드 삭제
function keywordRemove(id) {
    document.getElementById(id)?.remove();
}

// 검색 결과 적용
function searchResult(id) {
    document.getElementById('keywordSrchInput').value = "2025 채용 관련 정보";
    document.getElementById(id)?.classList.add('is-searched');
}

// 검색 결과 초기화
function searchReset(id, inputElement) {
    if (!inputElement.value.trim()) {
        document.getElementById(id)?.classList.remove('is-searched');
    }
}

// 추천검색어
function keywordSrchValue(inputId, button) {
    document.getElementById(inputId).value = button.innerText;
}

// 풀페이지 활성/비활성
// setFullpageEvent('#modalSrch'); //통합검색 모달
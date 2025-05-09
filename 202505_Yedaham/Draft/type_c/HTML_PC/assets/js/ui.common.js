$(function(){
    const $header = $('.header');
    const $qnb = $('.gnb-nav');
    const gnb_speed = 300;
    const hoverIntentDelay = 150; // 이 시간 이상 머무르면 진짜로 열린다

    let openTimer = null;
    let closeTimer = null;
    let isGnbOpened = false;

    $header.on('mouseenter', function () {
      clearTimeout(closeTimer);

      openTimer = setTimeout(() => {
        isGnbOpened = true;
        $header.addClass('is-gnb-opened');
        $qnb.addClass('is-active');
      }, hoverIntentDelay); // 일정 시간 후에만 열림
    });

    $header.on('mouseleave', function () {
      clearTimeout(openTimer);

      if (isGnbOpened) {
        closeTimer = setTimeout(() => {
          $qnb.removeClass('is-active');
          $header.removeClass('is-gnb-opened');
          isGnbOpened = false;
        }, gnb_speed);
      }
    });
})

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
$(function(){
    // $('#fullpage').fullpage({
    //     normalScrollElements: '.sec_05',
    //     scrolloverflowmacstyle: false,
    //     'onLeave' : function (index, nextIndex, direction){
    //         // Header
    //         if ( nextIndex.index === 0 ){
    //             $('.header').removeClass('is-active');
    //         } else {
    //             $('.header').addClass('is-active');
    //         };

    //     },
	// 	// responsiveOverflow 재설정 방지
	// 	afterResponsive: function (isResponsive) {
    //         if ($('.modal.is-opened').length) {
    //             // 모달이 열려 있는 경우 overflow 설정을 막음
	// 			$('body').css('overflow', 'hidden'); // 원하는 값으로 고정
	// 		}
	// 	}
    // });

    // Modal Open
    // modalOpen('modalSrch');

    // 스크롤이 이동할 때마다 실행
    window.addEventListener('scroll', checkScrollPosition);
})

// 스크롤 체크
function checkScrollPosition() {
    if (window.scrollY >= 100) {
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
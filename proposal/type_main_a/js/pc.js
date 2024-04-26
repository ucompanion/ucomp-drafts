// 스크롤 양에 따라 스타일을 적용하는 함수
function parallaxValue(currentScrollTop, startScrollTop, endScrollTop){
	return (currentScrollTop - startScrollTop) / (endScrollTop - startScrollTop)
}

// 스크롤 휠 이벤트 핸들러
function preventScroll(event) {
    event.preventDefault();
}
function sectionsScroll() {
    // console.log("window.scrollTo(0, 0)");
    var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    var scroll_1 = document.querySelector('.section-1').getBoundingClientRect().top + currentScrollTop + window.innerHeight - 240;
    var scroll_21 = document.querySelector('.section-2').getBoundingClientRect().top + currentScrollTop;
    var scroll_22 = scroll_21 + (window.innerHeight / 2);
    var scroll_23 = scroll_21 + (window.innerHeight * 1);
    var scroll_31 = document.querySelector('.section-3').getBoundingClientRect().top + currentScrollTop;
    var scroll_32 = scroll_31 + (window.innerHeight * 1);
    var scroll_33 = scroll_31 + (window.innerHeight * 2);
    var scroll_34 = scroll_31 + (window.innerHeight * 3);
    var scroll_41 = document.querySelector('.section-4').getBoundingClientRect().top + currentScrollTop;
    var scroll_42 = document.querySelector('.section-4 .con-sec-wrap').getBoundingClientRect().top + currentScrollTop;
    var scroll_43 = scroll_42 + (window.innerHeight * 1);
    var scroll_44 = scroll_42 + (window.innerHeight * 2);
    var scroll_45 = scroll_42 + (window.innerHeight * 3);
    // var scroll_46 = scroll_42 + (window.innerHeight * 4);
    var scroll_51 = document.querySelector('.section-5').getBoundingClientRect().top + currentScrollTop;
    // var scroll_90 = scroll_51 + (100 * 1);
    var scroll_last = document.documentElement.scrollHeight - window.innerHeight;
    // console.log(scroll_last);
    var scrollPositions = [
        0, // 1
        scroll_1, // 2
        scroll_21, // 3
        scroll_22, // 4
        scroll_23, // 5
        scroll_31, // 6
        scroll_32, // 7
        scroll_33, // 8
        scroll_34, // 9
        scroll_41, // 10
        scroll_42, // 11
        scroll_43, // 12
        scroll_44, // 13
        scroll_45, // 14
        scroll_51, // 15
        scroll_last, // 16
    ];
    console.log(scrollPositions, scrollPositions[15]);
    var currentPositionIndex = 0;
    var isScrolling = false;

    // 스크롤 이벤트 리스너
    $(window).on('wheel', function(event) {
        // 스크롤 이벤트를 처리합니다.
        var deltaY = event.originalEvent.deltaY;
        if (!isScrolling) {
            if (deltaY > 0) {
            if (currentPositionIndex < scrollPositions.length - 1) {
                currentPositionIndex++;
                // if (currentPositionIndex > scrollPositions.length - 1) {currentPositionIndex = scrollPositions.length - 1}
                console.log(scrollPositions.length - 1 , currentPositionIndex);
                scrollToPosition(currentPositionIndex);
            }
        } else if (deltaY < 0) {
            if (currentPositionIndex > 0) {
                currentPositionIndex--;
                console.log(scrollPositions.length - 1, currentPositionIndex);
                scrollToPosition(currentPositionIndex);
            }
            }

            // 스크롤 이벤트를 passive로 처리할 수 없으므로 preventDefault() 호출
            window.addEventListener('wheel', preventScroll, { passive: false });
        }
    });

    // 특정 위치로 스크롤 이동하는 함수
    function scrollToPosition(index) {
        var position = scrollPositions[index];
        if (index === scrollPositions.length - 1) { position = document.documentElement.scrollHeight - window.innerHeight }
        console.log("position: ", position, index);

        $('html, body').stop().animate({
            scrollTop: position
        }, 1000, "easeInOutCubic", function() {
            // 스크롤 이동이 완료되면 스크롤 이동 중 여부를 초기화합니다.
            window.scrollTo(0, position);
            isScrolling = false;

            // 테마
            if (index === 0 || index >= 9){ $('body').removeClass('is-darked') }
            else { $('body').addClass('is-darked') }

            // 예외
            if (index > 1) {$('body').addClass('is-header-hide')}
            else {$('body').removeClass('is-header-hide')}

        });

        // 스크롤 이동 중임을 표시합니다.
        isScrolling = true;
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}
function section1(){
	var elementDesc = document.getElementById('section1VisualDesc');
	var elementList = document.getElementById('section1VisualList');
	var element = document.getElementById('section1Thumb');
	var elementCon = document.getElementById('section1VisualCon');
	var startDescOpacity = 1;
	var endDescOpacity = 0;
	var startWidth = 424;
	var endWidth = window.innerWidth + 10;
	var startHeight = 240;
	var endHeight = window.innerHeight + 10;
	var startRadius = 80;
	var endRadius = 0;
    var startConOpacity = 0;
    var endConOpacity = 1;
    var startConScale = 0;
    var endConScale = 1;
	var startScrollTop = 0;
	var endScrollTop = window.innerHeight - startHeight;
	var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
	if (currentScrollTop >= startScrollTop && currentScrollTop <= endScrollTop) {
		var getDescOpacity = startDescOpacity + (endDescOpacity - startDescOpacity) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		var getWidth = startWidth + (endWidth - startWidth) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		var getHeight = startHeight + (endHeight - startHeight) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		var getRadius = startRadius + (endRadius - startRadius) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		var getConOpacity = startConOpacity + (endConOpacity - startConOpacity) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		var getConScale = startConScale + (endConScale - startConScale) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
		element.style.width = getWidth + 'px';
		element.style.height = getHeight + 'px';
		element.style.borderTopLeftRadius = getRadius + 'px';
		element.style.borderTopRightRadius = getRadius + 'px';
		elementList.classList.add('is-fixed');
		elementList.style.top = 0 + 'px';
		elementDesc.style.opacity = getDescOpacity;
        elementCon.style.opacity = getConOpacity;
        elementCon.style.transform = 'scale('+getConScale+')';
		// console.log('ing', currentScrollTop, endHeight, endScrollTop);
	} else if (currentScrollTop <= startScrollTop) {
		element.style.width = startWidth + 'px';
		element.style.height = startHeight + 'px';
		element.style.borderTopLeftRadius = startRadius + 'px';
		element.style.borderTopRightRadius = startRadius + 'px';
		elementList.classList.add('is-fixed');
        elementCon.style.opacity = startConOpacity;
        elementCon.style.transform = 'scale('+startConScale+')';
		// console.log('start', currentScrollTop, endHeight, endScrollTop);
	} else if (currentScrollTop >= endScrollTop) {
		element.style.width = endWidth + 'px';
		element.style.height = endHeight + 'px';
		element.style.borderTopLeftRadius = endRadius + 'px';
		element.style.borderTopRightRadius = endRadius + 'px';
		elementList.classList.remove('is-fixed');
		elementList.style.top = endScrollTop + 'px';
        elementCon.style.opacity = endConOpacity;
        elementCon.style.transform = 'scale('+endConScale+')';
		// console.log('end', currentScrollTop, endHeight, endScrollTop);
	}
}
function section2(){
    // Scroll Position
	var section = document.getElementById('section2');
	var sectionInner = document.getElementById('section2Inner');
	var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
	var startScrollTop = section.getBoundingClientRect().top + currentScrollTop;
	var endScrollTop = startScrollTop + window.innerHeight;
	var endScrollTopBefore = endScrollTop - (window.innerHeight / 2)
	var endScrollTopAfter = endScrollTop + window.innerHeight;

    // Elements
	var sectionBg = document.getElementById('section2Bg');
	var startOpacity1 = 0;
	var endOpacity1 = 0.4;
	var startOpacity2 = endOpacity1;
	var endOpacity2 = 0.8;
	var startOpacity3 = endOpacity2;
	var endOpacity3 = 1;

	var sectionTitle = document.getElementById('section2Title');
	var startTitleX = -361;
	var endTitleX = -861;
	var startTitleY = -120;
	var endTitleY = -120;
	var startTitleY2 = -120;
	var endTitleY2 = -290;

	var sectionTitle1 = document.getElementById('section2Title1');
	var startTitle1X = 10;
	var endTitle1X = 0;

	var sectionTitle3 = document.getElementById('section2Title3');
	var startTitle3X = 140;
	var endTitle3X = 0;

	var sectionText = document.getElementById('section2text');
    var startTextY = 300;
    var endTextY = 0;
    var startOpacity = 0;
    var endOpacity = 1;

    // console.log('ing', currentScrollTop, startScrollTop, endScrollTopHalf, endScrollTop);
    // If
    if (currentScrollTop >= startScrollTop && currentScrollTop <= endScrollTop) {
        if (currentScrollTop <= endScrollTopBefore) {
            var getOpacity1 = startOpacity1 + (endOpacity1 - startOpacity1) * parallaxValue(currentScrollTop, startScrollTop, endScrollTopBefore);
            sectionBg.style.opacity = getOpacity1;

            var getTitleX = startTitleX + (endTitleX - startTitleX) * parallaxValue(currentScrollTop, startScrollTop, endScrollTopBefore);
            var getTitleY = startTitleY + (endTitleY - startTitleY) * parallaxValue(currentScrollTop, startScrollTop, endScrollTopBefore);
            sectionTitle.style.transform = "translate(" + getTitleX + "px, " + getTitleY + "px)";

            var getTitle1X = startTitle1X + (endTitle1X - startTitle1X) * parallaxValue(currentScrollTop, startScrollTop, endScrollTopBefore);
            sectionTitle1.style.transform = "translateX(" + getTitle1X + "px)";

            var getTitle3X = startTitle3X + (endTitle3X - startTitle3X) * parallaxValue(currentScrollTop, startScrollTop, endScrollTopBefore);
            sectionTitle3.style.transform = "translateX(" + getTitle3X + "px)";
            // console.log('ing before', currentScrollTop, startScrollTop, endScrollTopBefore, endScrollTop, section.offsetHeight);
            // console.log('endScrollTopBefore', currentScrollTop, endScrollTopBefore);
        } else if (currentScrollTop <= endScrollTop) {
            var getOpacity2 = startOpacity2 + (endOpacity2 - startOpacity2) * parallaxValue(currentScrollTop, endScrollTopBefore, endScrollTop);
            sectionBg.style.opacity = getOpacity2;

            var getTitleY2 = startTitleY2 + (endTitleY2 - startTitleY2) * parallaxValue(currentScrollTop, endScrollTopBefore, endScrollTop);
            sectionTitle.style.transform = "translate(" + endTitleX + "px, " + getTitleY2 + "px)";

            var getTextY = startTextY + (endTextY - startTextY) * parallaxValue(currentScrollTop, endScrollTopBefore, endScrollTop);
            var getOpacity = startOpacity + (endOpacity - startOpacity) * parallaxValue(currentScrollTop, endScrollTopBefore, endScrollTop);
            sectionText.style.transform = "translateY(" + getTextY + "px)";
            sectionText.style.opacity = getOpacity;
            // console.log('endScrollTop', currentScrollTop, endScrollTopBefore);
        }
        sectionInner.style.top = 0  + 'px';
        section.classList.add('is-fixed');
	} else if (currentScrollTop <= startScrollTop) {
        sectionTitle.style.transform = "translate(" + startTitleX + "px, " + startTitleY + "px)";
        sectionTitle1.style.transform = "translateX(" + startTitle1X + "px)";
        sectionTitle3.style.transform = "translateX(" + startTitle3X + "px)";
        sectionText.style.transform = "translateY(" + startTextY + "px)";
        sectionText.style.opacity = startOpacity;
        section.classList.remove('is-fixed');
        sectionInner.style.top = '0%';
        sectionBg.style.opacity = startOpacity1;
        // console.log('start', currentScrollTop, startScrollTop, endScrollTop);
	} else if (currentScrollTop >= endScrollTop) {
        sectionTitle.style.transform = "translate(" + endTitleX + "px, " + endTitleY2 + "px)";
        sectionTitle1.style.transform = "translateX(" + endTitle1X + "px)";
        sectionTitle3.style.transform = "translateX(" + endTitle3X + "px)";
        sectionText.style.transform = "translateY(" + endTextY + "px)";
        sectionText.style.opacity = endOpacity;
        section.classList.remove('is-fixed');
        sectionInner.style.top = '50%';

        if (currentScrollTop <= endScrollTopAfter) {
            var getOpacity3 = startOpacity3 + (endOpacity3 - startOpacity3) * parallaxValue(currentScrollTop, endScrollTop, endScrollTopAfter);
            sectionBg.style.opacity = getOpacity3;
        } else {
            sectionBg.style.opacity = endOpacity3;
        }
        // console.log('end', currentScrollTop, startScrollTop, endScrollTop);
	}
}
function section3(){
	var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;

    // Sections
	var section = document.getElementById('section3');
    var sectionBg = document.getElementById('section3Bg');
    var startScrollTop = section.getBoundingClientRect().top + currentScrollTop;
	var endScrollTop = startScrollTop + (window.innerHeight * 3);

    if (currentScrollTop >= startScrollTop && currentScrollTop <= endScrollTop) {
        section.classList.add('is-fixed');
        sectionBg.style.top = '0';
    } else if (currentScrollTop <= startScrollTop) {
        section.classList.remove('is-fixed');
        sectionBg.style.top = '0';
    } else if (currentScrollTop >= endScrollTop) {
        section.classList.remove('is-fixed');
        sectionBg.style.top = (window.innerHeight * 3) + 'px';
    }

    // Section BG
    // sectionBg = document.getElementById('section3Bg');
    var startScrollTop0 = startScrollTop;
	var endScrollTop0 = startScrollTop0 + window.innerHeight;
	var startSecBgOpacity = 1;
	var endSecBgOpacity = 0.4;

    if (currentScrollTop >= startScrollTop0 && currentScrollTop <= endScrollTop0) {
        var getSecBgOpacity = startSecBgOpacity + (endSecBgOpacity - startSecBgOpacity) * parallaxValue(currentScrollTop, startScrollTop0, endScrollTop0);
        sectionBg.style.opacity = getSecBgOpacity;
        // console.log('currentScrollTop, startScrollTop0, endScrollTop0', currentScrollTop, startScrollTop0, endScrollTop0);
    } else if (currentScrollTop <= startScrollTop0) {
        sectionBg.style.opacity = startSecBgOpacity;
        // console.log(currentScrollTop, startScrollTop0);
    } else if (currentScrollTop >= endScrollTop) {
        sectionBg.style.opacity = endSecBgOpacity;
        // console.log(currentScrollTop, endScrollTop0);
    }

    // Section 01
    var sectionCon1 = document.getElementById('section3Con1');
    var startScrollTop1 = startScrollTop0;
    var endScrollTop1 = startScrollTop0 + window.innerHeight;
	var startSec1Opacity = 0;
	var endSec1Opacity = 1;
    if (currentScrollTop >= startScrollTop1 && currentScrollTop <= endScrollTop1) {
        var getSec1Opacity = startSec1Opacity + (endSec1Opacity - startSec1Opacity) * parallaxValue(currentScrollTop, startScrollTop1, endScrollTop1);
        sectionCon1.style.opacity = getSec1Opacity;
        // console.log('currentScrollTop, startScrollTop1, endScrollTop1', currentScrollTop, startScrollTop1, endScrollTop1);
    } else if (currentScrollTop <= startScrollTop1) {
        sectionCon1.style.opacity = startSec1Opacity;
    } else if (currentScrollTop >= endScrollTop1) {
        sectionCon1.style.opacity = endSec1Opacity;
    }

    // Section 02
    var sectionCon2 = document.getElementById('section3Con2');
    var startScrollTop2 = startScrollTop1;
    var endScrollTop2 = startScrollTop1 + window.innerHeight;
	var startSec2Opacity = 0;
	var endSec2Opacity = 1;
    if (currentScrollTop >= startScrollTop2 && currentScrollTop <= endScrollTop2) {
        var getSec2Opacity = startSec2Opacity + (endSec2Opacity - startSec2Opacity) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        sectionCon2.style.opacity = getSec2Opacity;
        // console.log('currentScrollTop, startScrollTop2, endScrollTop2', currentScrollTop, startScrollTop2, endScrollTop2);
    } else if (currentScrollTop <= startScrollTop2) {
        sectionCon2.style.opacity = startSec2Opacity;
    } else if (currentScrollTop >= endScrollTop2) {
        sectionCon2.style.opacity = endSec1Opacity;
    }

    // Section 03
    var sectionCon3 = document.getElementById('section3Con3');
    var startScrollTop3 = endScrollTop2;
	var endScrollTop3 = startScrollTop2 + window.innerHeight;
	var startSec3Opacity = 0;
	var endSec3Opacity = 1;
    if (currentScrollTop >= startScrollTop3 && currentScrollTop <= endScrollTop3) {
        var getSec3Opacity = startSec3Opacity + (endSec3Opacity - startSec3Opacity) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        sectionCon3.style.opacity = getSec3Opacity;
        // console.log('currentScrollTop, startScrollTop3, endScrollTop3', currentScrollTop, startScrollTop3, endScrollTop3);
    } else if (currentScrollTop <= startScrollTop3) {
        sectionCon3.style.opacity = startSec1Opacity;
    } else if (currentScrollTop >= endScrollTop3) {
        sectionCon3.style.opacity = endSec1Opacity;
    }

}
function section4() {
    var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;

    // Section 01
    var section = document.getElementById('section4');
    var sectionWrap = document.getElementById('section4wrap');
    var sectionInner = document.getElementById('section4Inner');
    var sectionCon1 = document.getElementById('section4Con1');
    var sectionCon2 = document.getElementById('section4Con2');
    var sectionCon3 = document.getElementById('section4Con3');
    var sectionCon4 = document.getElementById('section4Con4');

    var startScrollTop1 = section.getBoundingClientRect().top + currentScrollTop;
    var endScrollTop1 = sectionWrap.getBoundingClientRect().top + currentScrollTop;
    var startScrollTop2 = sectionWrap.getBoundingClientRect().top + currentScrollTop;
    var endScrollTop2 = startScrollTop2 + window.innerHeight;
    var startScrollTop3 = endScrollTop2;
    var endScrollTop3 = startScrollTop3 + window.innerHeight;
    var startScrollTop4 = endScrollTop3;
    var endScrollTop4 = startScrollTop4 + window.innerHeight;

    var startSecScale = 1;
    var endSecScale = 0.85;
	var startSecOpacity = 1;
	var endSecOpacity = 0.75;
    var readySecTop = 40;
    var startSecTop = window.innerHeight + 50;
    // var endSecTop = (window.innerHeight - 800) / 2;
    var endSecTop = 100;

    if (currentScrollTop >= startScrollTop1 && currentScrollTop <= endScrollTop1) {
        var getSecTop = readySecTop + (endSecTop - readySecTop) * parallaxValue(currentScrollTop, startScrollTop1, endScrollTop1);
        sectionCon1.style.top = getSecTop + "px";
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = '0';
        // console.log('654684964')
    } else if (currentScrollTop >= startScrollTop2 && currentScrollTop <= endScrollTop2) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        var getHideOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        var getSecTop = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        sectionCon1.style.transform = "scale("+ getSecScale +")";
        sectionCon1.style.opacity = getHideOpacity;
        sectionCon2.style.top = getSecTop + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop >= startScrollTop3 && currentScrollTop <= endScrollTop3) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        var getHideOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        var getSecTop = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        sectionCon1.style.opacity = 0;
        sectionCon2.style.transform = "scale("+ getSecScale +")";
        sectionCon2.style.opacity = getHideOpacity;
        sectionCon3.style.top = getSecTop + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop >= startScrollTop4 && currentScrollTop <= endScrollTop4) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        var getHideOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        var getSecTop = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        sectionCon2.style.opacity = 0;
        sectionCon3.style.transform = "scale("+ getSecScale +")";
        sectionCon3.style.opacity = getHideOpacity;
        sectionCon4.style.top = getSecTop + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';

    } else if (currentScrollTop <= startScrollTop1) {
        sectionCon1.style.top = 40 + "px";
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop <= startScrollTop2) {
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = '0';

    } else if (currentScrollTop >= endScrollTop4) {
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = (window.innerHeight * 3) + 'px';
        // console.log('currentScrollTop, startScrollTop, endScrollTop', currentScrollTop, startScrollTop4, endScrollTop4);
    }

}
function applyStyleOnScrollInit() {
	section1();
	section2();
	section3();
	section4();
}

// 스크롤 이벤트에 handleScroll 함수를 연결합니다.
window.addEventListener('scroll', applyStyleOnScrollInit);

// 페이지 로드 시에 applyStyleOnScroll 함수를 호출하여 스크롤 이벤트를 처리합니다.
document.addEventListener('DOMContentLoaded', function() {
    applyStyleOnScrollInit();
    sectionsScroll();
});
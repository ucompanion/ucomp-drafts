// 스크롤 양에 따라 스타일을 적용하는 함수
function parallaxValue(currentScrollTop, startScrollTop, endScrollTop){
	return (currentScrollTop - startScrollTop) / (endScrollTop - startScrollTop)
}

// 스크롤 휠 이벤트 핸들러
function preventScroll(event) {
    event.preventDefault();
}
function sectionsScroll() {
    console.log("window.scrollTo(0, 0)");
    var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
    var scroll_1 = document.querySelector('.section-1').getBoundingClientRect().top + currentScrollTop + window.innerHeight - 240;
    var scroll_21 = document.querySelector('.section-2').getBoundingClientRect().top + currentScrollTop;
    var scroll_22 = scroll_21 + (window.innerHeight * 1);
    var scroll_31 = document.querySelector('.section-3').getBoundingClientRect().top + currentScrollTop;
    var scroll_32 = scroll_31 + window.innerHeight;
    var scroll_33 = scroll_32 + (560 * 1);
    var scroll_34 = scroll_32 + (560 * 2);
    var scroll_41 = document.querySelector('.section-4').getBoundingClientRect().top + currentScrollTop;
    var scroll_42 = document.querySelector('.section-4 .con-sec-wrap').getBoundingClientRect().top + currentScrollTop;
    var scroll_43 = scroll_42 + (492 * 1);
    var scroll_44 = scroll_42 + (492 * 2);
    var scroll_45 = scroll_42 + (492 * 3);
    var scroll_51 = document.querySelector('.section-5').getBoundingClientRect().top + currentScrollTop;
    var scroll_last = document.documentElement.scrollHeight - window.innerHeight - 3;
    // console.log(scroll_last);
    var scrollPositions = [
        0,
        scroll_1,
        scroll_21,
        scroll_22,
        scroll_31,
        scroll_32,
        scroll_33,
        scroll_34,
        scroll_41,
        scroll_42,
        scroll_43,
        scroll_44,
        scroll_45,
        scroll_51,
        scroll_last,
    ];
    var currentPositionIndex = 0;
    var isScrolling = false;

    $('.btn-top').on('click', function(){
        location.reload(true);
    })

    // 스크롤 이벤트 리스너
    $(window).on('wheel', function(event) {
        // 스크롤 이벤트를 처리합니다.
        var deltaY = event.originalEvent.deltaY;
        if (!isScrolling) {
            if (deltaY > 0) {
                if (currentPositionIndex <= scrollPositions.length - 1) {
                    currentPositionIndex++;
                    if (currentPositionIndex > scrollPositions.length - 1) {currentPositionIndex = scrollPositions.length - 1}
                    scrollToPosition(currentPositionIndex);
                }
                $('body').addClass('is-header-hide')
            } else if (deltaY < 0) {
                if (currentPositionIndex > 0) {
                    currentPositionIndex--;
                    scrollToPosition(currentPositionIndex);
                }
                $('body').removeClass('is-header-hide')
            }

            // 스크롤 이벤트를 passive로 처리할 수 없으므로 preventDefault() 호출
            window.addEventListener('wheel', preventScroll, { passive: false });
        }
    });

    // 특정 위치로 스크롤 이동하는 함수
    function scrollToPosition(index) {
        var position = scrollPositions[index];
        $('html, body').stop().animate({
            scrollTop: position
        }, 300, function() {
            // 스크롤 이동이 완료되면 스크롤 이동 중 여부를 초기화합니다.
            console.log("position, currentScrollTop", position, currentScrollTop);
            window.scrollTo(0, position);
            isScrolling = false;

            // 테마
            if (index === 0 || index >= 8){ $('body').removeClass('is-darked') }
            else { $('body').addClass('is-darked') }
        });

        // 스크롤 이동 중임을 표시합니다.
        isScrolling = true;
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}
function section1(){
	var elementList = document.getElementById('section1VisualList');
	var element = document.getElementById('section1Thumb');
	var elementCon = document.getElementById('section1VisualCon');
	var startWidth = 280;
	var endWidth = window.innerWidth + 5;
	var startHeight = 240;
	var endHeight = window.innerHeight + 5;
	var startRadius = 40;
	var endRadius = 0;
    var startConOpacity = 0;
    var endConOpacity = 1;
    var startConScale = 0;
    var endConScale = 1;
	var startScrollTop = 0;
	var endScrollTop = window.innerHeight - startHeight;
	var currentScrollTop = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
	if (currentScrollTop >= startScrollTop && currentScrollTop <= endScrollTop) {
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

    // Elements
	var sectionTitle = document.getElementById('section2Title');
	var startTitleY = 60;
	var endTitleY = 0;

	var sectionTitle1 = document.getElementById('section2Title1');
	var startTitle1Y = 20;
	var endTitle1Y = 0;

	var sectionTitle2 = document.getElementById('section2Title2');
	var startTitle2Y = 30;
	var endTitle2Y = 0;

	var sectionTitle3 = document.getElementById('section2Title3');
	var startTitle3Y = 40;
	var endTitle3Y = 0;

	var sectionText = document.getElementById('section2text');
    var startTextY = 100;
    var endTextY = 0;
    var startOpacity = 0;
    var endOpacity = 1;

    // console.log('ing', currentScrollTop, startScrollTop, endScrollTopHalf, endScrollTop);
    // If
    if (currentScrollTop >= startScrollTop && currentScrollTop <= endScrollTop) {
        var getTitleX = 0;
        var getTitleY = startTitleY + (endTitleY - startTitleY) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
        sectionTitle.style.transform = "translate(" + getTitleX + "px, " + getTitleY + "px)";

        var getTitle1Y = startTitle1Y + (endTitle1Y - startTitle1Y) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
        sectionTitle1.style.transform = "translateY(" + getTitle1Y + "px)";

        var getTitle2Y = startTitle2Y + (endTitle2Y - startTitle2Y) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
        sectionTitle2.style.transform = "translateY(" + getTitle2Y + "px)";

        var getTitle3Y = startTitle3Y + (endTitle3Y - startTitle3Y) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
        sectionTitle3.style.transform = "translateY(" + getTitle3Y + "px)";
        console.log('endScrollTop1', currentScrollTop, startScrollTop, endScrollTop);

        var getTextY = startTextY + (endTextY - startTextY) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);
        var getOpacity = startOpacity + (endOpacity - startOpacity) * parallaxValue(currentScrollTop, startScrollTop, endScrollTop);

        sectionText.style.transform = "translateY(" + getTextY + "px)";
        sectionText.style.opacity = getOpacity;
        sectionInner.style.top = 0  + 'px';
        section.classList.add('is-fixed');
	} else if (currentScrollTop <= startScrollTop) {
		sectionTitle.style.transform = "translate(" + 0 + "px, " + startTitleY + "px)";
        sectionTitle1.style.transform = "translateY(" + startTitle1Y + "px)";
        sectionTitle2.style.transform = "translateY(" + startTitle2Y + "px)";
        sectionTitle3.style.transform = "translateY(" + startTitle3Y + "px)";
        sectionText.style.transform = "translateY(" + startTextY + "px)";
        sectionText.style.opacity = startOpacity;
        section.classList.remove('is-fixed');
        sectionInner.style.top = '0%';
        // console.log('start', currentScrollTop, startScrollTop, endScrollTop);
	} else if (currentScrollTop >= endScrollTop) {
		sectionTitle.style.transform = "translate(" + 0 + "px, " + endTitleY + "px)";
        sectionTitle1.style.transform = "translateY(" + endTitle1Y + "px)";
        sectionTitle2.style.transform = "translateY(" + endTitle2Y + "px)";
        sectionTitle3.style.transform = "translateY(" + endTitle3Y + "px)";
        sectionText.style.transform = "translateY(" + endTextY + "px)";
        sectionText.style.opacity = endOpacity;
        section.classList.remove('is-fixed');
        sectionInner.style.top = '50%';
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
    var endScrollTop2 = startScrollTop2 + 492;
    var startScrollTop3 = endScrollTop2;
    var endScrollTop3 = startScrollTop3 + 492;
    var startScrollTop4 = endScrollTop3;
    var endScrollTop4 = startScrollTop4 + 492;

    var startSecScale = 1;
    var endSecScale = 0.85;
	var startSecOpacity = 1;
	var endSecOpacity = 0.75;
	var hideSecOpacity = 0;
    var endSecTop = 68;
    var startSecTop = 562;

    if (currentScrollTop >= startScrollTop1 && currentScrollTop <= endScrollTop1) {
        var getSecTop = 40 + (endSecTop - 40) * parallaxValue(currentScrollTop, startScrollTop1, endScrollTop1);
        var getSecTopAfter = 532 + (startSecTop - 532) * parallaxValue(currentScrollTop, startScrollTop1, endScrollTop1);
        sectionCon1.style.top = getSecTop + "px";
        sectionCon2.style.top = getSecTopAfter + "px";
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = '0';
        // console.log('654684964')
    } else if (currentScrollTop >= startScrollTop2 && currentScrollTop <= endScrollTop2) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        var getSecOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        var getSecTopAfter = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop2, endScrollTop2);
        var getSecTopHidden = getSecTopAfter + 492;
        sectionCon1.style.transform = "scale("+ getSecScale +")";
        sectionCon1.style.opacity = getSecOpacity;
        sectionCon2.style.top = getSecTopAfter + "px";
        sectionCon3.style.top = getSecTopHidden + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop >= startScrollTop3 && currentScrollTop <= endScrollTop3) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        var getSecOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        var getSecOpacityHidden = hideSecOpacity;
        var getSecTopAfter = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop3, endScrollTop3);
        var getSecTopHidden = getSecTopAfter + 492;
        sectionCon1.style.opacity = getSecOpacityHidden;
        sectionCon2.style.transform = "scale("+ getSecScale +")";
        sectionCon2.style.opacity = getSecOpacity;
        sectionCon3.style.top = getSecTopAfter + "px";
        sectionCon4.style.top = getSecTopHidden + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop >= startScrollTop4 && currentScrollTop <= endScrollTop4) {
        var getSecScale = startSecScale + (endSecScale - startSecScale) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        var getSecOpacity = startSecOpacity + (endSecOpacity - startSecOpacity) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        var getSecOpacityHidden = hideSecOpacity;
        var getSecTopAfter = startSecTop + (endSecTop - startSecTop) * parallaxValue(currentScrollTop, startScrollTop4, endScrollTop4);
        sectionCon2.style.opacity = getSecOpacityHidden;
        sectionCon3.style.transform = "scale("+ getSecScale +")";
        sectionCon3.style.opacity = getSecOpacity;
        sectionCon4.style.top = getSecTopAfter + "px";
        sectionWrap.classList.add('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop <= startScrollTop1) {
        sectionCon1.style.top = 40 + "px";
        sectionCon2.style.top = 532 + "px";
    } else if (currentScrollTop <= startScrollTop2) {
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = '0';
    } else if (currentScrollTop <= startScrollTop3) {

    } else if (currentScrollTop >= endScrollTop4) {
        sectionWrap.classList.remove('is-fixed');
        sectionInner.style.top = (492 * 3) + 'px';
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
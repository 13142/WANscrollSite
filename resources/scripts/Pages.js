/// <reference path="../../scripts/typings/globals/gsap/index.d.ts" />
var loopNumber = getRandomInt(4, 6);
TweenMax.from($("h1"), 0.75, { width: "0px", padding: "0px", ease: Power2.easeInOut, delay: 0.5 });
var gridContainer = $(".grid-container");
$(".cover").offset(gridContainer.offset()).width(gridContainer.outerWidth(false)).height(gridContainer.outerHeight(false));
var jumpingTween = TweenMax.to($(".arrow.prime"), 0.5, { y: 15, ease: Power1.easeIn, yoyo: true, repeat: -1 });
var buttonArr = [];
$(".button").each(function () {
    $(this).click({ page: $(this).attr("data-target") }, GoToPage);
    $(this).removeAttr("data-target");
    buttonArr.push($(this));
});
$(".cover").click(function () {
    $("span.pageLbl").text("Page ??");
    $(this).off("click");
    TweenMax.fromTo($(this), 0.5, { autoAlpha: 0.4 }, { yoyo: true, repeat: -1, ease: Power1.easeOut, autoAlpha: 0.2 });
    $(this).css({ cursor: "default" });
    var shuffleTimeline = new TimelineMax({ onComplete: RemoveOverlay });
    var positionArr = [];
    for (var _i = 0, buttonArr_1 = buttonArr; _i < buttonArr_1.length; _i++) {
        var button = buttonArr_1[_i];
        positionArr.push(button.offset().left);
        button.css({ position: "absolute", left: button.offset().left + "px", top: button.offset().top + "px" });
    }
    for (var i = 0; i < loopNumber; i++) {
        buttonArr = shuffle(buttonArr);
        for (var ii = 0; ii < buttonArr.length; ii++) {
            var button = buttonArr[ii];
            shuffleTimeline.to(button, 0.5, { left: positionArr[ii], ease: Power1.easeInOut }, 0.5 * i);
        }
    }
});
function RemoveOverlay() {
    TweenMax.killTweensOf($(".cover"));
    TweenMax.to($(".cover"), 0.5, { autoAlpha: 0, ease: Power1.easeInOut });
    jumpingTween.time(0);
    TweenMax.killTweensOf($(".arrow"));
    TweenMax.to($(".arrow"), 0.5, { y: 15, ease: Power1.easeIn, yoyo: true, repeat: -1 });
}
function GoToPage(e) {
    if (e.data.page != 0) {
        window.location.href = "../Page" + e.data.page + "/Page" + e.data.page + ".html";
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//# sourceMappingURL=Pages.js.map
﻿/// <reference path="../scripts/typings/globals/gsap/index.d.ts" />

const loopNumber = getRandomInt(4, 6);
TweenMax.from($("h1"), 0.75, {width: "0px", padding: "0px", ease: Power2.easeInOut, delay: 0.5});
let gridContainer = $(".grid-container");
$(".cover").offset(gridContainer.offset()).width(gridContainer.outerWidth(false)).height(gridContainer.outerHeight(false));

let jumpingTween = TweenMax.to($(".arrow.prime"), 0.5, {y: 15, ease: Power1.easeIn, yoyo: true, repeat: -1});

let buttonArr: JQuery[] = [];
$(".button").each(function () {
    $(this).click({page: $(this).attr("data-target")}, GoToPage);
    $(this).removeAttr("data-target");
    buttonArr.push($(this));
});

$(".cover").click(function () {
    $("span.pageLbl").text("Page ??");
    $(this).off("click");
    TweenMax.fromTo($(this), 0.5, {autoAlpha: 0.4},{yoyo: true, repeat: -1, ease: Power1.easeOut, autoAlpha: 0.2});
    $(this).css({cursor: "default"});
    let shuffleTimeline = new TimelineMax({onComplete: RemoveOverlay});

    let positionArr = [];
    for (let button of buttonArr) {
        positionArr.push(button.offset().left);
        button.css({position: "absolute", left: button.offset().left + "px", top: button.offset().top + "px"});
    }
    for (let i = 0; i < loopNumber; i++) {
        buttonArr = shuffle(buttonArr);
        for (let ii = 0; ii < buttonArr.length; ii++) {
            let button = buttonArr[ii];
            shuffleTimeline.to(button, 0.5, {left: positionArr[ii], ease: Power1.easeInOut}, 0.5 * i);
        }
    }
});


function RemoveOverlay() {
    TweenMax.killTweensOf($(".cover"));
    TweenMax.to($(".cover"), 0.5, {autoAlpha: 0, ease: Power1.easeInOut});
    jumpingTween.time(0);
    TweenMax.killTweensOf($(".arrow"));
    TweenMax.to($(".arrow"), 0.5, {y: 15, ease: Power1.easeIn, yoyo: true, repeat: -1});
}

function GoToPage(e) {
    if (e.data.page != 0) {
        window.location.href = "Page" + e.data.page + ".html";
    } else {
        window.location.href = "../index.html";
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
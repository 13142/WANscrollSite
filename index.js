/**
 * Created by Hand of Cthulhu on 26/06/17.
 */
/// <reference path="./scripts/typings/globals/jquery/index.d.ts" />
/// <reference path="./scripts/typings/globals/gsap/index.d.ts" />
/// <reference path="./scripts/typings/globals/scrollmagic/index.d.ts" />
/// <reference path="./scripts/typings/globals/jBox/index.d.ts" />
/// <reference path="./scripts/typings/globals/jqsvg.d.ts" />
//$(".tooltipInner").hide();
initializeTooltips();
var slides = $("section.panel");
var element = $("<div>", {
    "class": "tempHolder"
});
var isAboutToRefresh = false;
var controller = new ScrollMagic.Controller({});
for (var i = 0; i < slides.length; i++) {
    var addedHeight = 0;
    var currentSection = $(slides[i]);
    if (currentSection.hasClass("slidable")) {
        var innerSlides = currentSection.find(".slideIn");
        var numOfSlides = innerSlides.length;
        addedHeight = $(window).height() * 0.5 * numOfSlides;
        var aggregrateHeight = 0;
        var maxHeight = innerSlides.parent().innerHeight();
        var topOfTheStack = 0;
        for (var ii = 0; ii < numOfSlides; ii++) {
            var anotherTrigger = element.clone().css({ top: $(slides[i]).offset().top + $(window).height() * 0.2 + addedHeight * (ii / numOfSlides) }).appendTo(document.body);
            var toDoLine = new TimelineMax();
            toDoLine.from(innerSlides[ii], 0.5, { autoAlpha: 0, ease: Power2.easeOut, y: $(window).height() }, 0);
            var heightToAdd = innerSlides.eq(ii).height();
            if (heightToAdd > maxHeight) {
                throw "Inner item bigger than container";
            }
            aggregrateHeight += heightToAdd;
            while (aggregrateHeight > maxHeight) {
                aggregrateHeight -= innerSlides.eq(topOfTheStack).height();
                toDoLine.to(innerSlides[topOfTheStack], 0.5, { overflow: "hidden", height: 0, ease: Power2.easeInOut }, 0);
                topOfTheStack++;
            }
            new ScrollMagic.Scene({
                triggerElement: anotherTrigger[0],
                triggerHook: "onLeave"
            }).setTween(toDoLine).addTo(controller);
            //TweenMax.from(innerSlides[ii],0.5, {autoAlpha: 0, ease: Power2.easeOut ,y: $(window).height()})
        }
    }
    if (currentSection.hasClass("osi")) {
        new ScrollMagic.Scene({
            triggerElement: currentSection[0],
            duration: (120 + addedHeight / $(window).height()) + "%",
            triggerHook: "onCenter"
        }).on("enter", osiModelLights).addTo(controller);
    }
    currentSection.css("marginBottom", addedHeight);
    var currentScene = new ScrollMagic.Scene({
        triggerElement: slides[i],
        triggerHook: "onLeave"
    }).setPin(slides[i]).addTo(controller);
    var children = slides.eq(i).find(".fadeHolder");
    if (i == 0) {
        for (var ii = 0; ii < children.length; ii++) {
            var relativeTopPos = children.eq(ii).offset().top - slides.eq(i).offset().top;
            new ScrollMagic.Scene({
                triggerElement: slides[i],
                duration: "100%",
                triggerHook: "onLeave"
            }).setTween(TweenMax.to(children[ii], 1, {
                y: -((relativeTopPos / $(window).height()) * 400 + 300),
                opacity: 0
            })).addTo(controller);
            new ScrollMagic.Scene({
                triggerElement: slides[i],
                duration: "100%",
                triggerHook: "onLeave"
            }).setTween(TweenMax.to($("#exitPageBtn"), 1, { autoAlpha: 0 })).addTo(controller);
        }
        continue;
    }
    var tempHolder = element.clone().css({ top: $(slides[i]).offset().top + $(window).height() * 0.2 + addedHeight }).appendTo(document.body);
    for (var ii = 0; ii < children.length; ii++) {
        var relativeTopPos = children.eq(ii).offset().top - slides.eq(i).offset().top;
        new ScrollMagic.Scene({
            triggerElement: tempHolder[0],
            duration: "100%",
            triggerHook: "onLeave"
        }).setTween(TweenMax.to(children[ii], 1, { y: -((relativeTopPos / $(window).height()) * 400 + 300), autoAlpha: 0 })).addTo(controller);
    }
}
// let osiModels = $(".osi");
// for (let i = 0; i < osiModels.length; i++) {
//
// }
var osiTcpRelationship = {
    "Physical": "NetInterface",
    "DataLink": "NetInterface",
    "Network": "Network",
    "Transport": "Transport",
    "Session": "Application",
    "Presentation": "Application",
    "Application": "Application"
};
function osiModelLightsLeave(event) {
    var osiTypes = $(event.currentTarget.triggerElement()).attr("data-osiTypes").split(",");
    var svgEle = $("#osiModel")[0]["contentDocument"].documentElement;
    osiAnimEnd();
    for (var i = 0; i < osiTypes.length; i++) {
        TweenMax.to($("#" + osiTypes[i] + "Layer", svgEle), 1, { autoAlpha: 1 });
    }
}
function osiModelLights(event) {
    var osiTypes = $(event.currentTarget.triggerElement()).attr("data-osiTypes").split(",");
    var svgEle = $("#osiModel")[0]["contentDocument"].documentElement;
    osiAnimEnd();
    for (var i = 0; i < osiTypes.length; i++) {
        TweenMax.to($("#" + osiTcpRelationship[osiTypes[i]], svgEle), 1, { autoAlpha: 1 });
        TweenMax.to($("#" + osiTypes[i] + "Layer", svgEle), 1, { autoAlpha: 1 });
    }
}
new ScrollMagic.Scene({
    triggerElement: $("section.wanSingleComp")[0],
    triggerHook: 0.5
}).setTween(TweenMax.to($(".background.Comp, #osiModel"), 0.5, { autoAlpha: 1 })).on("enter", osiAnim).on("enter", startRepeaterTimeline).on("leave", osiAnimEnd).addTo(controller);
new ScrollMagic.Scene({
    triggerElement: $("section.firstSteps")[0],
    triggerHook: "onLeave"
}).on("leave", osiAnim).addTo(controller);
new ScrollMagic.Scene({
    triggerElement: $("section.CompToRouterStep")[0],
    triggerHook: "onCenter"
}).setTween(TweenMax.to($(".background.CompToRouter"), 0.5, { autoAlpha: 1 })).on("enter", startHubTimeline).addTo(controller);
new ScrollMagic.Scene({
    triggerElement: $("section.PhysicalTopologies")[0],
    triggerHook: "onCenter"
}).setTween(TweenMax.to($(".background.Topologies"), 0.5, { autoAlpha: 1 })).addTo(controller);
new ScrollMagic.Scene({
    triggerElement: $("section.IpAddresses")[0],
    triggerHook: "onCenter"
}).setTween(TweenMax.to($(".background.IpAddresses"), 0.5, { autoAlpha: 1 })).addTo(controller);
function osiAnim() {
    var svgEle = $("#osiModel")[0]["contentDocument"].documentElement;
    var toAnimate = $(svgEle).children().children("g");
    toAnimate.each((function (index, elem) {
        TweenMax.fromTo(elem, 0.75, { autoAlpha: 0.3 }, { delay: index * 0.75, repeatDelay: toAnimate.length * 0.75, autoAlpha: 1, repeat: -1, yoyo: true, ease: Power1.easeInOut });
    }));
    $(svgEle).click(function (eventObject) {
        console.log("hi");
        var targetModal = $("#osiExp");
        TweenMax.to($("#darkenOverlay"), 0.25, { autoAlpha: 1 });
        TweenMax.fromTo(targetModal, 0.25, { scale: 3, autoAlpha: 0, ease: Power4.easeOut }, { scale: 1, autoAlpha: 1 });
        $(document.body).addClass("modalOpen");
    });
}
function osiAnimEnd() {
    var svgEle = $("#osiModel")[0]["contentDocument"].documentElement;
    var toAnimate = $(svgEle).children().children("g");
    TweenMax.killTweensOf(toAnimate);
    TweenMax.to(toAnimate, 0.5, { autoAlpha: 0.3 });
}
$("a.popupLink").click(function (eventObject) {
    var targetModal = $("#" + $(eventObject.delegateTarget).attr("data-target"));
    TweenMax.to($("#darkenOverlay"), 0.25, { autoAlpha: 1 });
    TweenMax.fromTo(targetModal, 0.25, { scale: 3, autoAlpha: 0, ease: Power4.easeOut }, { scale: 1, autoAlpha: 1 });
    $(document.body).addClass("modalOpen");
});
$("#darkenOverlay").click(function (eventObject) {
    if ($(eventObject.delegateTarget).css("opacity") === "1" && !isAboutToRefresh) {
        TweenMax.to($("#darkenOverlay"), 0.25, { autoAlpha: 0 });
        TweenMax.to($(".popupInner"), 0.25, { scale: 3, autoAlpha: 0, ease: Power1.easeOut });
        $(document.body).removeClass("modalOpen");
    }
});
$("#frontPageImage")[0].addEventListener("load", function () {
    var svgEle = $("#frontPageImage")[0]["contentDocument"].documentElement;
    TweenMax.to($("#TopLRing", svgEle), Math.random() * 4 + 12, { rotation: 360, repeat: -1, ease: Power0.easeNone, transformOrigin: "50% 50%" });
    TweenMax.to($("#BottomRing", svgEle), Math.random() * 4 + 12, { rotation: -360, repeat: -1, ease: Power0.easeNone, transformOrigin: "50% 50%" });
    TweenMax.to($("#RightRing", svgEle), Math.random() * 4 + 12, { rotation: 360, repeat: -1, ease: Power0.easeNone, transformOrigin: "50% 50%" });
});
$("#wifiModel")[0].addEventListener("load", function () {
    var svgEle = $("#wifiModel")[0]["contentDocument"].documentElement;
    var animateOrder = ["baseRing", "midRing", "topRing"];
    for (var i = 0; i < animateOrder.length; i++) {
        TweenMax.fromTo($("#" + animateOrder[i], svgEle), 0.75, { autoAlpha: 0.1 }, {
            delay: i * 0.75,
            repeatDelay: animateOrder.length * 0.75,
            autoAlpha: 1,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
        });
    }
});
function startRepeaterTimeline() {
    var svgEle = $("#repeaterModel")[0]["contentDocument"].documentElement;
    var repeaterTimeline = new TimelineMax({ repeat: -1 });
    var duration = 5;
    var startFadeDelay = 0.5;
    repeaterTimeline.fromTo($("#Signal", svgEle), duration, { x: 0 }, { x: "4434%" /*Yes this scales, but there's gotta be a better way*/, ease: Power0.easeNone }, 0);
    repeaterTimeline.fromTo($("#Signal", svgEle), duration * (0.4162) - startFadeDelay, { opacity: 0.8 }, { opacity: 0.3, ease: Power0.easeNone }, startFadeDelay)
        .to($("#Signal", svgEle), 0.01, { opacity: 1 }, duration * (0.4162));
    repeaterTimeline.play();
}
function startHubTimeline() {
    var svgEle = $("#hubModel")[0]["contentDocument"].documentElement;
    var hubTimeline = new TimelineMax({ repeat: -1 });
    var duration = 3;
    hubTimeline.fromTo($("#OriginalSig", svgEle), 2 * duration / 3, { x: 0 }, { x: "1847%" /*TODO: Yes this scales, but there's gotta be a better way*/, ease: Power0.easeNone }, 0);
    hubTimeline.fromTo($("#OutputSig", svgEle), duration / 3, { y: 0 }, { y: "765%", ease: Power0.easeNone }, "+=0.5");
    hubTimeline.play();
}
function initializeTooltips() {
    $(".tooltipLink").each(function (i) {
        new jBox('Tooltip', {
            attach: $(this),
            content: $("#" + $(this).attr("data-target")).clone(),
            pointer: "center",
            outside: "y"
        });
    });
}
var timerVar;
var refreshCountdownCount;
$(window).on("resize", function (eventObject) {
    if (!isAboutToRefresh) {
        isAboutToRefresh = true;
        var targetModal = $("#refreshPopup");
        TweenMax.to($("#darkenOverlay"), 0.25, { autoAlpha: 1 });
        TweenMax.fromTo(targetModal, 0.25, { scale: 3, autoAlpha: 0, ease: Power4.easeOut }, { scale: 1, autoAlpha: 1 });
        $(document.body).addClass("modalOpen");
    }
    clearInterval(timerVar);
    refreshCountdownCount = 3;
    refreshTimer();
    timerVar = setInterval(refreshTimer, 1000);
});
function refreshTimer() {
    $("#refreshCountDown").text(refreshCountdownCount);
    if (refreshCountdownCount <= 0) {
        clearInterval(timerVar);
        window.location.reload(true);
    }
    refreshCountdownCount--;
}
//# sourceMappingURL=index.js.map
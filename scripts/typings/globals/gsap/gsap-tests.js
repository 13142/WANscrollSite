"use strict";
exports.__esModule = true;
var gsap_1 = require("gsap");
var tween = gsap_1.TweenLite
    .to(document.getElementById('some-div'), 1, {
    width: '200px',
    height: '200px'
})
    .seek(0.5);
//# sourceMappingURL=gsap-tests.js.map
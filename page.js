Object.defineProperty(window, "SPHERE_RADIUS", {
	value: 400,
	writeable: false,
	enumerable: true
});

window.addEventListener("load", function() {
	document.body.requestPointerLock = document.body.requestPointerLock ||
			                           document.body.mozRequestPointerLock ||
			                           document.body.webkitRequestPointerLock ||
			                           function() { initGame(); };
	document.exitPointerLock = document.exitPointerLock    ||
		                       document.mozExitPointerLock ||
		                       document.webkitExitPointerLock ||
		                       function() {
		                       	if(!lost) { lose(); }
		                       };
}, false);

function initSphere() {
	sphere = new Sphere();
	window.addEventListener("resize", function() { sphere.recenter(); }, false);
	document.addEventListener("mousedown", function(e) {
		if(e.button === 0 && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && e.target.nodeName !== "A") {
			sphere.dragging = true;
			document.body.requestPointerLock();
		}
	}, false);
	document.addEventListener("mousemove", function(e) {
		sphere.drag(e);
	}, false);
	document.addEventListener("mouseup", function(e) {
		sphere.dragging = false;
		document.exitPointerLock();
	}, false);
}

/**
 * Utility function that converts a value in degrees to radians
 * @param {Number} deg - A value in degrees
 * @returns {Number} The value of deg in radians
 */
function deg2rad(deg) {
	return deg * Math.PI / 180;
}

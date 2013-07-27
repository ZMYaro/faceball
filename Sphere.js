function Sphere() {
	this.posts = [];
	
	this.dragging = false;
	
	this.elem = document.createElement("div");
	this.elem.classList.add("sphere");
	this.recenter();
	document.body.appendChild(this.elem);
}
/** {Number} The amount by which to shift the sphere's contents on the z-axis */
Sphere.Z_OFFSET = -400;

Sphere.prototype.recenter = function() {
	this.elem.style.left = (window.innerWidth / 2) + "px";
	this.elem.style.top = (window.innerHeight / 2) + "px";
};
Sphere.prototype.addPost = function(post) {
	this.posts.push(post);
	this.elem.appendChild(post.elem);
};
/**
 * Rotates the Sphere (and the Posts on it)
 * @param {Number} theta - The distance in degrees to rotate the sphere about the horizontal axis
 * @param {Number} phi - The distance in degrees to rotate the sphere about the vertical axis
 */
Sphere.prototype.rotate = function(theta, phi) {
	for(var i = 0; i < this.posts.length; i++) {
		this.posts[i].longitude += theta;
		this.posts[i].latitude += phi;
	}
};

Sphere.prototype.drag = function(e) {
	if(!this.dragging) {
		return;
	}
	this.rotate(
		(e.movementX ||
		 e.mozMovementX ||
		 e.webkitMovementX ||
		 0),
		(e.movementY ||
		 e.mozMovementY ||
		 e.webkitMovementY ||
		 0)
	 );
};

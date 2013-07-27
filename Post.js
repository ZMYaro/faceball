function Post(elem) {
	if(elem) {
		this.elem = elem
	} else {
		this.elem = document.createElement("div");
	}
	
	/** {Number} The Post's distance from the center of the sphere */
	this._radius = SPHERE_RADIUS - (Math.random() * 100);
	/** {Number} The Post's horizontal displacement on the sphere */
	this._longitude = Math.random() * 360 - 180;
	/** {Number} The Post's vertical displacement on the sphere */
	this._latitude = Math.random() * 180 - 90;
	
	this._set3DCoords();
}
Post.prototype._set3DCoords = function() {
	var x = this._radius * Math.sin(deg2rad(this._longitude)) * Math.sin(deg2rad(this._latitude));
	var y = this._radius * Math.sin(deg2rad(this._longitude)) * Math.cos(deg2rad(this._latitude));
	var z = this._radius * Math.cos(deg2rad(this._longitude)) + Sphere.Z_OFFSET;
	
	this.elem.style.WebkitTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
	   this.elem.style.MozTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
	    this.elem.style.MsTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
	     this.elem.style.OTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
	      this.elem.style.transform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
	
	this.elem.style.zIndex = Math.round(z) + SPHERE_RADIUS;
}
Object.defineProperties(Post.prototype, {
	"longitude": {
		enumerable: true,
		get: function() {
			return this._longitude;
		},
		set: function(value) {
			this._longitude = value;
			this._set3DCoords();
		}
	},
	"latitude": {
		enumerable: true,
		get: function() {
			return this._latitude;
		},
		set: function(value) {
			this._latitude = value;
			this._set3DCoords();
		}
	}
});

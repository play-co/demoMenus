import animate;

import ui.View as View;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		// Don't merge but overwrite...
		opts.x = 0;
		opts.y = 0;
		opts.width = GC.app.baseWidth;
		opts.height = GC.app.baseHeight;
		opts.visible = false;

		supr(this, 'init', [opts]);

		if (opts.modal) {
			// A darker background is the dialog is shown as a modal...
			this._dialogOverlayView = new View({
				superview: this,
				x: 0,
				y: 0,
				width: GC.app.baseWidth,
				height: GC.app.baseHeight,
				backgroundColor: 'rbga(0, 0, 0)'
			});
		}

		// The container which slides in and out of the screen...
		this._dialogContainerView = new View({
			superview: this,
			x: 0,
			y: 0,
			width: GC.app.baseWidth,
			height: GC.app.baseHeight
		});
	};

	this.show = function (cb) {
		if (this._dialogOverlayView) {
			this._dialogOverlayView.style.opacity = 0;
			animate(this._dialogOverlayView).then({opacity: 0.3}, 300);
		}

		this._dialogContainerView.style.x = -GC.app.baseWidth;
		var a = animate(this._dialogContainerView).then({x: 0}, 300);
		cb && a.then(cb, 1);

		this.style.visible = true;

		return this;
	};

	this.hide = function (cb) {
		if (this._dialogOverlayView) {
			animate(this._dialogOverlayView).then({opacity: 0}, 300);
		}

		var a = animate(this._dialogContainerView).then({x: GC.app.baseWidth}, 300);
		a = a.then(bind(this, function () { this.style.visible = false}), 1);
		cb && a.then(cb, 1);

		return this;
	};
});
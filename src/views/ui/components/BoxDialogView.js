import ui.TextView as TextView;
import ui.ImageView as ImageView;

import src.constants.menuConstants as menuConstants;

import .ButtonView as ButtonView;

import .BoxBorderView;

exports = Class(BoxBorderView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);

		var titleStyle = menuConstants.TITLE;

		this.title = new BoxBorderView({
			superview: this,
			x: 34,
			y: 34,
			width: this.style.width - 72,
			height: 60,
			image: titleStyle.BACKGROUND,
			fontFamily: titleStyle.FONT_FAMILY,
			fontSize: titleStyle.FONT_SIZE,
			text: opts.title,
			textColor: titleStyle.COLOR,
			textOutline: titleStyle.STROKE_COLOR,
			textPadding: titleStyle.PADDING,
			strokeWidth: titleStyle.STROKE_WIDTH
		});

		if (opts.backCB) {
			var backStyle = menuConstants.DIALOG.BACK;
			var backImageStyle = backStyle.IMAGE;
			new ButtonView({
				superview: this.title,
				x: backStyle.MARGIN_LEFT,
				y: backStyle.MARGIN_TOP,
				width: backStyle.WIDTH,
				height: backStyle.HEIGHT,
				title: '',
				style: backStyle.STYLE,
				icon: {
					x: backImageStyle.MARGIN_LEFT,
					y: backImageStyle.MARGIN_TOP,
					width: backImageStyle.WIDTH,
					height: backImageStyle.HEIGHT,
					image: backImageStyle.URL
				},
				on: {
					up: opts.backCB
				}
			});
		}
		if (opts.closeCB) {
			var closeStyle = menuConstants.DIALOG.CLOSE;
			var closeImageStyle = closeStyle.IMAGE;
			new ButtonView({
				superview: this.title,
				x: this.title.style.width - closeStyle.MARGIN_RIGHT - closeStyle.WIDTH,
				y: closeStyle.MARGIN_TOP,
				width: closeStyle.WIDTH,
				height: closeStyle.HEIGHT,
				title: '',
				style: closeStyle.STYLE,
				icon: {
					x: closeImageStyle.MARGIN_LEFT,
					y: closeImageStyle.MARGIN_TOP,
					width: closeImageStyle.WIDTH,
					height: closeImageStyle.HEIGHT,
					image: closeImageStyle.URL
				},
				on: {
					up: opts.closeCB
				}
			});
		}
	};
});
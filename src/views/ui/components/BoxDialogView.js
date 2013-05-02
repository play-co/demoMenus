import ui.TextView as TextView;

import src.constants.viewConstants as viewConstants;

import .ButtonView as ButtonView;

import .BoxBorderView;

exports = Class(BoxBorderView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);

		var titleStyle = viewConstants.TITLE;

		this.title = new BoxBorderView({
			superview: this,
			x: 10,
			y: 10,
			width: this.style.width - 20,
			height: 60,
			image: titleStyle.BACKGROUND,
			fontFamily: titleStyle.FONT_FAMILY,
			fontSize: titleStyle.FONT_SIZE,
			text: opts.title,
			textColor: titleStyle.COLOR,
			textOutline: titleStyle.STROKE_COLOR,
			textPadding: titleStyle.PADDING
		});

		if (opts.closeCB) {
			new ButtonView({
				superview: this.title,
				x: this.style.width - 76,
				y: 4,
				width: 52,
				height: 52,
				title: '',
				color: 'GREEN',
				icon: {
					x: 7,
					y: 7,
					width: 38,
					height: 38,
					image: 'resources/images/ui/buttonClose.png'
				},
				on: {
					up: opts.closeCB
				}
			});
		}
	};
});
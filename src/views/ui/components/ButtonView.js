import ui.widget.ButtonView as ButtonView;

import src.constants.menuConstants as menuConstants;

exports = Class(ButtonView, function (supr) {
	this.init = function (opts) {
		var color = opts.color || 'GREEN';
		var buttonStyle = menuConstants.BUTTONS[color]; 

		opts = merge(
			opts,
			{
				images: {
					down: buttonStyle.DOWN,
					up: buttonStyle.UP
				},
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 24, center: 16, right: 24},
					vertical: {top: 24, middle: 16, bottom: 24}
				},
				text: {
					fontFamily: buttonStyle.FONT_FAMILY,
					size: buttonStyle.FONT_SIZE,
					strokeColor: buttonStyle.STROKE_COLOR,
					color: buttonStyle.COLOR,
					strokeWidth: buttonStyle.STROKE_WIDTH
				}
			}
		);

		supr(this, 'init', [opts]);
	};
});
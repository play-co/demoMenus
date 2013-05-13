import ui.widget.ButtonView as ButtonView;

import src.constants.menuConstants as menuConstants;

exports = Class(ButtonView, function (supr) {
	this.init = function (opts) {
		var style = opts.style || 'GREEN';
		var buttonStyle = menuConstants.BUTTONS[style]; 

		opts = merge(
			opts,
			{
				images: {
					down: buttonStyle.DOWN,
					up: buttonStyle.UP
				},
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 30, center: 10, right: 30},
					vertical: {top: 30, middle: 10, bottom: 30}
				},
				text: {
					fontFamily: buttonStyle.FONT_FAMILY,
					size: buttonStyle.FONT_SIZE,
					strokeColor: buttonStyle.STROKE_COLOR,
					color: buttonStyle.COLOR,
					strokeWidth: buttonStyle.STROKE_WIDTH,
					padding: opts.textPadding
				}
			}
		);

		supr(this, 'init', [opts]);
	};
});
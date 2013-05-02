import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import src.constants.viewConstants as viewConstants;

exports = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
 				image: viewConstants.DIALOG.BACKGROUND,
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 16, center: 8, right: 16},
					vertical: {top: 16, middle: 8, bottom: 16}
				}
			}
		);

		supr(this, 'init', [opts]);

		if ('text' in opts) {
			this.text = new TextView({
				superview: this,
				x: 0,
				y: 0,
				width: this.style.width,
				height: this.style.height,
				text: opts.text || '',
				size: opts.fontSize || 30,
				fontFamily: opts.fontFamily,
				color: opts.textColor || '#000000',
				strokeColor: opts.textOutline,
				strokeWidth: 6,
				buffer: false,
				padding: opts.textPadding
			});
		}
	};
});
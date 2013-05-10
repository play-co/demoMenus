import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import src.constants.menuConstants as menuConstants;

exports = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
 				image: menuConstants.DIALOG.BACKGROUND,
				scaleMethod: '9slice',
				sourceSlices: {
					horizontal: {left: 30, center: 10, right: 30},
					vertical: {top: 30, middle: 10, bottom: 30}
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
				strokeWidth: ('strokeWidth' in opts) ? opts.strokeWidth : 6,
				padding: opts.textPadding,
				horizontalAlign: opts.horizontalAlign || 'center',
				buffer: false
			});
		}
	};
});
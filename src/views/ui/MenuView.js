import animate;

import ui.View as View;
import ui.TextView as TextView;

import src.constants.viewConstants as viewConstants;

import .components.BoxBorderView as BoxBorderView;
import .components.BoxDialogView as BoxDialogView;

import .DialogView;

exports = Class(DialogView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		var height = 82;
		var items = opts.items;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.text) {
				height += (item.height || 70) + 10;
			} else if (item.space) {
				height += 10;
			} else {
				height += 70;
			}
		}

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 40,
			y: GC.app.baseHeight * 0.5 - height * 0.5,
			width: GC.app.baseWidth - 80,
			height: height,
			title: opts.title,
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false
		});

		this._items = [];

		var itemStyle = viewConstants.MENU_ITEM;
		var textStyle = viewConstants.MENU_TEXT;
		var menu = this;
		var y = 80;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.space) {
				y += 10;
			} else if (item.text) {
				new TextView({
					superview: this._dialogView,
					x: 10,
					y: y,
					width: this._dialogView.style.width - 20,
					height: item.height || 60,
					image: itemStyle.BACKGROUND,
					text: item.text,
					fontFamily: textStyle.FONT_FAMILY,
					size: textStyle.FONT_SIZE,
					padding: textStyle.PADDING,
					color: itemStyle.COLOR,
					strokeColor: textStyle.STROKE_COLOR,
					strokeWidth: 6,
					wrap: true,
					buffer: false,
					horizontalAlign: item.horizontalAlign || textStyle.HORIZONTAL_ALIGN || 'center'
				});
				y += (item.height || 70) + 10;
			} else {
				var itemView = new BoxBorderView({
					superview: this._dialogView,
					x: 10,
					y: y,
					width: this._dialogView.style.width - 20,
					height: 60,
					image: itemStyle.BACKGROUND,
					text: item.item,
					fontFamily: itemStyle.FONT_FAMILY,
					fontSize: itemStyle.FONT_SIZE,
					textPadding: itemStyle.PADDING,
					textColor: itemStyle.COLOR,
					textOutline: itemStyle.STROKE_COLOR,
					horizontalAlign: item.horizontalAlign || itemStyle.HORIZONTAL_ALIGN || 'center'
				});

				itemView.onInputSelect = (function (item) {
					return function () {
						var cb = function () {
								if (typeof item.action === 'function') {
									item.action();
								} else {
									menu.emit(item.action);
								}
							};

						item.persist ? cb() : menu.hide(cb);
					};
				})(item);

				this._items.push(itemView);
				y += 70;
			}
		}
	};
});
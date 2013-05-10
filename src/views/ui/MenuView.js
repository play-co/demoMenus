import animate;

import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;

import src.constants.menuConstants as menuConstants;

import .components.BoxBorderView as BoxBorderView;
import .components.BoxDialogView as BoxDialogView;
import .components.DialogView as DialogView;

exports = Class(DialogView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		var height = 140;
		var items = opts.items;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.text) {
				height += (item.height || 70) + 10;
			} else if (item.space) {
				height += 10;
			} else if (item.image) {
				height += (item.height || 70) + 10;
			} else {
				height += 76;
			}
		}

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 40,
			y: GC.app.baseHeight * 0.5 - height * 0.5,
			width: GC.app.baseWidth - 80,
			height: height,
			title: opts.title,
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		this._items = [];

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;
		var y = 105;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.space) {
				y += 10;
			} else if (item.image) {
				var align = itemStyle.ALIGN || item.align || 'left';
				var x = itemStyle.MARGIN_LEFT;
				if (align === 'center') {
					x = (this._dialogView.style.width - itemStyle.MARGIN_RIGHT - itemStyle.MARGIN_LEFT - (item.width || 70)) * 0.5;
				} else if (item.align === 'right') {
					x = this._dialogView.style.width - itemStyle.MARGIN_RIGHT - (item.width || 70) - 10;
				}

				new ImageView({
					superview: this._dialogView,
					x: x,
					y: y,
					width: item.width || 70,
					height: item.height || 70,
					image: item.image
				});
				y += (item.height || 70) + 10;
			} else if (item.text) {
				new TextView({
					superview: this._dialogView,
					x: itemStyle.MARGIN_LEFT,
					y: y,
					width: this._dialogView.style.width - itemStyle.MARGIN_LEFT - itemStyle.MARGIN_RIGHT,
					height: item.height || 70,
					image: itemStyle.BACKGROUND,
					text: item.text,
					fontFamily: textStyle.FONT_FAMILY,
					size: textStyle.FONT_SIZE,
					padding: textStyle.PADDING,
					color: itemStyle.COLOR,
					strokeColor: textStyle.STROKE_COLOR,
					strokeWidth: textStyle.STROKE_WIDTH,
					wrap: true,
					horizontalAlign: item.align || textStyle.ALIGN || 'center'
				});
				y += (item.height || 70) + 10;
			} else {
				var itemView = new BoxBorderView({
					superview: this._dialogView,
					x: itemStyle.MARGIN_LEFT,
					y: y,
					width: this._dialogView.style.width - itemStyle.MARGIN_LEFT - itemStyle.MARGIN_RIGHT,
					height: itemStyle.HEIGHT,
					image: itemStyle.BACKGROUND,
					text: item.item,
					fontFamily: itemStyle.FONT_FAMILY,
					fontSize: itemStyle.FONT_SIZE,
					textPadding: itemStyle.PADDING,
					textColor: itemStyle.COLOR,
					textOutline: itemStyle.STROKE_COLOR,
					strokeWidth: itemStyle.STROKE_WIDTH,
					horizontalAlign: item.align || itemStyle.ALIGN || 'center'
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
				y += itemStyle.HEIGHT + itemStyle.MARGIN_BOTTOM;
			}
		}
	};
});
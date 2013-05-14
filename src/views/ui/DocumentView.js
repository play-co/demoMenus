import animate;

import ui.View as View;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;
import ui.ImageView as ImageView;
import ui.ScrollView as ScrollView;

import src.constants.menuConstants as menuConstants;

import .components.BoxBorderView as BoxBorderView;
import .components.BoxDialogView as BoxDialogView;
import .components.ButtonView as ButtonView;
import .components.DialogBackgroundView as DialogBackgroundView;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {
		// Get the height from opts before the super init is executed!
		var width = opts.width || GC.app.baseWidth - 80;
		var height = opts.height || GC.app.baseHeight - 80;

		supr(this, 'init', arguments);

		var contentStyle = menuConstants.DIALOG.CONTENT;

		// The dialog containing the actual content...
		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: (GC.app.baseWidth - width) * 0.5,
			y: (GC.app.baseHeight - height) * 0.5,
			width: width,
			height: height,
			fontFamily: contentStyle.FONT_FAMILY,
			fontSize: contentStyle.FONT_SIZE,
			textPadding: contentStyle.PADDING,
			text: opts.text || '',
			title: opts.title,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : undefined,
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : undefined
		});

		this._dialogView.text.style.visible = false;

		var showItems = this._opts.items && this._opts.pages.length;
		this._marginBottom = showItems ? 0 : menuConstants.DIALOG.BUTTON.HEIGHT;

		var contentWidth = this._dialogView.style.width - contentStyle.MARGIN_LEFT - contentStyle.MARGIN_RIGHT;
		this._dialogView.content = new View({
			superview: this._dialogView,
			x: contentStyle.MARGIN_LEFT + 1,
			y: contentStyle.MARGIN_TOP + 1,
			width: contentWidth - 2,
			height: height - contentStyle.MARGIN_TOP - contentStyle.MARGIN_BOTTOM - 2 + this._marginBottom,
			backgroundColor: '#FFFFFF'
		});

		this._initStyle();
		showItems && this._initItems();

		this._createPages();

		new ImageScaleView({
			superview: this._dialogView,
			x: contentStyle.MARGIN_LEFT,
			y: contentStyle.MARGIN_TOP,
			width: this._dialogView.style.width - contentStyle.MARGIN_LEFT - contentStyle.MARGIN_RIGHT,
			height: height - contentStyle.MARGIN_TOP - contentStyle.MARGIN_BOTTOM + this._marginBottom,
			image: menuConstants.DIALOG.CONTENT_BORDER,
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 30, center: 10, right: 30},
				vertical: {top: 30, middle: 10, bottom: 30}
			}
		}).canHandleEvents(false);

		this._currentPage = 0;
	};

	this._initItems = function () {
		var items = this._opts.items;
		var buttonStyle = menuConstants.DIALOG.BUTTON;

		// Calculate the total width of the items...
		var width = -buttonStyle.MARGIN_RIGHT;
		for (var i = 0; i < items.length; i++) {
			width += items[i].width + buttonStyle.MARGIN_RIGHT;
		}
		var x = (this._dialogView.style.width - width) * 0.5;

		for (var i = 0; i < items.length; i++) {
			bind(
				this,
				function (item) {
					item.superview = this._dialogView;
					item.x = x;
					item.y = this._dialogView.style.height - buttonStyle.HEIGHT - buttonStyle.MARGIN_BOTTOM;
					item.height = buttonStyle.HEIGHT;

					var cb;

					switch (item.type) {
						case 'prev':
							cb = bind(this, 'onPrevPage');

						case 'next':
							cb = cb || bind(this, 'onNextPage');

							item.textPadding = item.padding;
							delete item.padding;
							item.style = item.style || 'BLUE';
							item.on = {up: cb};
							new ButtonView(item);
							break;

						case 'info':
							item.text = '1/1';
							this._infoView = new TextView(item);
							break;
					}
					x += item.width + buttonStyle.MARGIN_RIGHT;
				}
			)(items[i]);
		}
	};

	this._initStyle = function () {
		var style = this._opts.style || {};
		this._titleStyle = style.title || {
			fontFamily: 'Verdana',
			size: 36,
			color: '#000000',
			align: 'left'
		};
		this._textStyle = style.text || {
			fontFamily: 'Verdana',
			size: 26,
			color: '#000000',
			align: 'left'
		};
	};

	this._createView = function (parent, x, y, element) {
		var elementView = new ImageView({
			superview: parent,
			x: x,
			y: y,
			width: element.width || 50,
			height: element.height || 50,
			image: element.image,
			backgroundColor: element.backgroundColor
		});
		if (element.children) {
			var children = element.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				this._createView(elementView, child.x || 0, child.y || y, child);
			}
		}
		return elementView;
	};

	this._createPage = function (page) {
		var contentStyle = menuConstants.DIALOG.CONTENT;
		var content = this._dialogView.content;
		var documentStyle = menuConstants.DIALOG.DOCUMENT;

		var pageContainer = new ImageView({
				superview: content,
				x: 1,
				y: 1,
				width: content.style.width - 2,
				height: content.style.height - 2,
				image: page.image,
				backgroundColor: page.backgroundColor,
				visible: false,
			});

		var scrollContent = new ScrollView({
				superview: pageContainer,
				x: 1,
				y: 1,
				width: content.style.width - 2,
				height: content.style.height - 2,
				scrollX: false,
				scrollY: true
			});

		var pageContent = {
				pageContainer: pageContainer,
				scrollContent: scrollContent,
				content: []
			};

		for (var i = 0; i < page.content.length; i++) {
			var elementView;
			var element = page.content[i];
			var elementStyle = {};
			var isTitle = element.title;
			var text;

			if (element.view || element.image) {
				elementView = this._createView(scrollContent, 0, documentStyle.MARGIN_TOP, element);
				elementView.element = element;

				var align = element.align || page.align || 'left';
				switch (align) {
					case 'left':
						elementView.style.x = documentStyle.MARGIN_LEFT;
						break;
					case 'center':
						elementView.style.x = (scrollContent.style.width - elementView.style.width) * 0.5;
						break;
					case 'right':
						elementView.style.x = scrollContent.style.width - elementView.style.width - documentStyle.MARGIN_RIGHT;
						break;
				}
			} else {
				if (isTitle) {
					text = element.title;
					elementStyle = this._titleStyle;
				} else {
					text = element.text;
					elementStyle = this._textStyle;
				}

				elementView = new TextView({
					superview: scrollContent,
					x: documentStyle.MARGIN_LEFT,
					y: documentStyle.MARGIN_TOP,
					width: scrollContent.style.width - documentStyle.MARGIN_LEFT - documentStyle.MARGIN_RIGHT,
					height: 0,
					maxWidth: scrollContent.style.width - documentStyle.MARGIN_LEFT - documentStyle.MARGIN_RIGHT,
					autoFontSize: false,
					autoSize: true,
					wrap: true,
					fontFamily: elementStyle.fontFamily || 'Verdana',
					size: element.size || page.size || elementStyle.size || 26,
					color: element.color || page.color || elementStyle.color || '#000000',
					text: text,
					horizontalAlign: element.align || page.align || elementStyle.align || 'left'
				});
			}

			elementView.element = element;
			elementView.elementStyle = elementStyle;
			elementView.style.opacity = 0;
			pageContent.content.push(elementView);
		}

		return pageContent;
	};

	this._createPages = function () {
		this._pages = [];

		var pages = this._opts.pages;
		for (var i = 0; i < pages.length; i++) {
			this._pages.push(this._createPage(pages[i]));
		}
	};

	this._showPage = function (index) {
		var page = this._pages[index];

		if (index !== this._currentPage) {
			this._pages[this._currentPage].pageContainer.style.visible = false;
		}

		if (this._showPageInterval) {
			clearInterval(this._showPageInterval);
		}

		page.pageContainer.style.visible = true;
		page.scrollContent.setScrollBounds({minY: 0, maxY: 0});

		this._doneReflow = false;
		this._currentPage = index;

		if (this._infoView) {
			this._infoView.setText((this._currentPage + 1) + '/' + this._pages.length);
		}
	};

	this.render = function (ctx) {
		if (this._doneReflow) {
			return;
		}

		var documentStyle = menuConstants.DIALOG.DOCUMENT;
		var page = this._pages[this._currentPage];
		var y = documentStyle.MARGIN_TOP;

		for (var i = 0; i < page.content.length; i++) {
			var elementView = page.content[i];
			var elementStyle = elementView.elementStyle;

			if (elementView.style.height === 0) {
				return;
			}

			elementView.style.y = y + (elementView.element.marginTop || 0);
			y += elementView.style.height +
					(elementView.element.marginBottom || elementStyle.marginBottom || 10) +
					(elementView.element.marginTop || 0);
		}

		for (var i = 0; i < page.content.length; i++) {
			page.content[i].style.opacity = 1;
		}

		page.scrollContent.setScrollBounds({minY: 0, maxY: y});
		this._doneReflow = true;
	}

	this.onPrevPage = function () {
		this._showPage((this._currentPage + this._pages.length - 1) % this._pages.length);
	};

	this.onNextPage = function () {
		this._showPage((this._currentPage + 1) % this._pages.length);
	};

	this.setTitle = function (text) {
		this._dialogView.title.setText(text);
	};

	this.setText = function (text) {
		this._dialogView.text.setText(text);
	};

	this.show = function () {
		supr(this, 'show', arguments);

		this._showPage(this._currentPage);
	};
});
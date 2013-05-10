import animate;

import ui.View as View;
import ui.SpriteView as SpriteView;
import ui.ImageScaleView as ImageScaleView;

import src.constants.menuConstants as menuConstants;

import .components.BoxDialogView as BoxDialogView;
import .components.ButtonView as ButtonView;
import .components.DialogBackgroundView as DialogBackgroundView;

var TutorialSpriteView = Class(SpriteView, function (supr) {
	this.getSize = function () {
		var animations = this._animations;

		var map = animations[Object.keys(animations)[0]].frames[0].getMap();
		return {
			width: map.marginLeft + map.width + map.marginRight,
			height: map.marginTop + map.height + map.marginBottom
		};
	};
});

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {
		// Get the height from opts before the super init is executed!
		var height = opts.height || GC.app.baseHeight * 0.8;

		supr(this, 'init', arguments);

		var contentStyle = menuConstants.DIALOG.CONTENT;

		// The dialog containing the actual content...
		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 40,
			y: GC.app.baseHeight * 0.5 - height * 0.5,
			width: GC.app.baseWidth - 80,
			height: height,
			fontFamily: contentStyle.FONT_FAMILY,
			fontSize: contentStyle.FONT_SIZE,
			textPadding: contentStyle.PADDING,
			text: '',
			title: opts.title,
			closeCB: bind(this, 'hide')
		});

		this._backgroundView = new View({
			superview: this._dialogView,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			backgroundColor: opts.backgroundColor || menuConstants.TUTORIAL.BACKGROUND_COLOR || 'rgb(255, 255, 255)'
		});
		this._spriteView = new TutorialSpriteView({
			superview: this._dialogView,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			url: opts.url,
			visible: false
		});

		var contentStyle = menuConstants.DIALOG.CONTENT;

		var size = this._spriteView.getSize();
		var availableHeight = this._dialogView.style.height - contentStyle.MARGIN_TOP - contentStyle.MARGIN_BOTTOM;
		var availableWidth = availableHeight * size.width / size.height;

		this._backgroundView.style.x = (this._dialogView.style.width - availableWidth) * 0.5 + 1;
		this._backgroundView.style.y = contentStyle.MARGIN_TOP + 1;
		this._backgroundView.style.width = availableWidth - 2;
		this._backgroundView.style.height = availableHeight - 2;

		this._spriteView.style.x = (this._dialogView.style.width - availableWidth) * 0.5 + 1;
		this._spriteView.style.y = contentStyle.MARGIN_TOP + 1;
		this._spriteView.style.width = availableWidth - 2;
		this._spriteView.style.height = availableHeight - 2;

		new ImageScaleView({
			superview: this._dialogView,
			x: (this._dialogView.style.width - availableWidth) * 0.5,
			y: contentStyle.MARGIN_TOP,
			width: availableWidth,
			height: availableHeight,
			image: menuConstants.DIALOG.CONTENT_BORDER,
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 30, center: 10, right: 30},
				vertical: {top: 30, middle: 10, bottom: 30}
			}
		});

		var buttonStyle = menuConstants.DIALOG.BUTTON;

		new ButtonView({
			superview: this._dialogView,
			x: (this._dialogView.style.width - 120) * 0.5,
			y: height - buttonStyle.HEIGHT - buttonStyle.MARGIN_BOTTOM,
			width: 120,
			height: buttonStyle.HEIGHT,
			title: 'Ok',
			color: 'BLUE',
			on: {
				up: bind(this, 'hide')
			}
		});
	};

	this.show = function () {
		return supr(
			this,
			'show',
			[bind(
				this,
				function () {
					this._spriteView.stopAnimation();
					this._spriteView.startAnimation(this._opts.animation, {loop: this._opts.loop});
				}
			)]
		);
	};

	this.hide = function () {
		return supr(
			this,
			'hide',
			[bind(
				this,
				function () {
					this.style.visible = false;
					this._spriteView.stopAnimation();
					this.emit('Hide');
				}
			)]
		);
	};
});
import animate;

import ui.View as View;
import ui.SpriteView as SpriteView;
import ui.ImageScaleView as ImageScaleView;

import src.constants.viewConstants as viewConstants;

import .components.BoxDialogView as BoxDialogView;
import .components.ButtonView as ButtonView;
import .components.DialogView as DialogView;

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

exports = Class(DialogView, function (supr) {
	this.init = function (opts) {
		// Get the height from opts before the super init is executed!
		var height = opts.height || GC.app.baseHeight * 0.8;

		supr(this, 'init', arguments);

		var contentStyle = viewConstants.CONTENT;

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
			backgroundColor: opts.backgroundColor || viewConstants.TUTORIAL.BACKGROUND_COLOR || 'rgb(255, 255, 255)'
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

		var size = this._spriteView.getSize();
		var availableHeight = this._dialogView.style.height - 175;
		var availableWidth = availableHeight * size.width / size.height;

		this._backgroundView.style.x = (this._dialogView.style.width - availableWidth) * 0.5;
		this._backgroundView.style.y = 85;
		this._backgroundView.style.width = availableWidth;
		this._backgroundView.style.height = availableHeight;

		this._spriteView.style.x = (this._dialogView.style.width - availableWidth) * 0.5;
		this._spriteView.style.y = 85;
		this._spriteView.style.width = availableWidth;
		this._spriteView.style.height = availableHeight;

		new ImageScaleView({
			superview: this._dialogView,
			x: (this._dialogView.style.width - availableWidth) * 0.5 - 2,
			y: 85 - 2,
			width: availableWidth + 4,
			height: availableHeight + 4,
			image: 'resources/images/ui/contenBorder.png',
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 16, center: 8, right: 16},
				vertical: {top: 16, middle: 8, bottom: 16}
			}
		});

		new ButtonView({
			superview: this._dialogView,
			x: (this._dialogView.style.width - 120) * 0.5,
			y: height - 74,
			width: 120,
			height: 64,
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
					console.log('here???')
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
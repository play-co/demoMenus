import device;

import ui.ImageView as ImageView;

import src.views.ui.components.BoxBorderView as BoxBorderView;
import src.views.ui.components.BoxDialogView as BoxDialogView;

import src.views.ui.MenuView as MenuView;
import src.views.ui.TextDialogView as TextDialogView;
import src.views.ui.TutorialView as TutorialView;

var BOUNDS_WIDTH = 576;
var BOUNDS_HEIGHT = 1024;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		this.scaleUI();

		this._menuBackground = new ImageView({
			superview: this,
			x: 0,
			y: 0,
			width: this.baseWidth,
			height: this.baseHeight,
			image: 'resources/images/ui/menuBackground.png'
		});

		this._createMainMenu();
		this._createAlertMenus();
		this._createTutorialMenus();
		this._createConfirmMenus();
	};

	this._createMainMenu = function () {
		this._mainMenu = new MenuView({
			superview: this,
			title: 'Main menu',
			items: [
				{item: 'Alert dialogs', action: 'AlertDialogsMenu'},
				{item: 'Confirm dialogs', action: 'ConfirmDialogsMenu'},
				{item: 'Tutorial', action: 'TutorialMenu'}
			]
		}).
			on('AlertDialogsMenu', bind(this, 'showMenu', '_alertDialogsMenu')).
			on('ConfirmDialogsMenu', bind(this, 'showMenu', '_confirmDialogsMenu')).
			on('TutorialMenu', bind(this, 'showMenu', '_tutorialMenu')).
			show();
	};

	this._createAlertMenus = function () {
		this._alertDialogsMenu = new MenuView({
			superview: this,
			title: 'Alert dialogs',
			items: [
				{item: 'Alert modal', action: 'AlertModal', persist: true},
				{item: 'Alert', action: 'Alert'}
			],
			closeCB: bind(this._mainMenu, 'show')
		}).
			on('AlertModal', bind(this, 'showMenu', '_alertModalDialog')).
			on('Alert', bind(this, 'showMenu', '_alertDialog'));

		this._alertModalDialog = new TextDialogView({
			superview: this,
			title: 'Alert modal',
			text: 'This menu is displayed on top of the dialogs menu',
			modal: true,
			buttons: [
				{
					title: 'Ok',
					width: 160,
					color: 'GREEN'
				}
			]
		});

		this._alertDialog = new TextDialogView({
			superview: this,
			title: 'Alert',
			text: 'This menu is displayed after the dialogs menu was closed',
			buttons: [
				{
					title: 'Ok',
					width: 160,
					color: 'GREEN',
					cb: bind(this, 'showMenu', '_alertDialogsMenu')
				}
			]
		});
	};

	this._createConfirmMenus = function () {
		this._confirmDialogsMenu = new MenuView({
			superview: this,
			title: 'Confirm dialogs',
			items: [
				{item: 'Confirm modal', action: 'ConfirmModal', persist: true},
				{item: 'Confirm', action: 'Confirm'}
			],
			closeCB: bind(this._mainMenu, 'show')
		}).
			on('ConfirmModal', bind(this, 'showMenu', '_confirmModalDialog')).
			on('Confirm', bind(this, 'showMenu', '_confirmDialog'));

		this._confirmModalDialog = new TextDialogView({
			superview: this,
			title: 'Confirm modal',
			text: 'Can you confirm one of these?',
			modal: true,
			buttons: [
				{
					title: 'Green',
					width: 200,
					color: 'GREEN',
				},
				{
					title: 'Blue',
					width: 200,
					color: 'BLUE'
				}
			]
		});

		this._confirmDialog = new TextDialogView({
			superview: this,
			title: 'Confirm modal',
			text: 'Can you confirm one of these?',
			buttons: [
				{
					title: 'Green',
					width: 200,
					color: 'GREEN',
					cb: bind(this, 'showMenu', '_confirmDialogsMenu')
				},
				{
					title: 'Blue',
					width: 200,
					color: 'BLUE',
					cb: bind(this, 'showMenu', '_confirmDialogsMenu')
				}
			]
		});
	};

	this._createTutorialMenus = function () {
		this._tutorialMenu = new MenuView({
			superview: this,
			title: 'Tutorial menu',
			items: [
				{item: 'Tutorial modal', action: 'TutorialModal', persist: true},
				{item: 'Tutorial', action: 'Tutorial'}
			],
			closeCB: bind(this._mainMenu, 'show')
		}).
			on('TutorialModal', bind(this, 'showMenu', '_tutorialModalView')).
			on('Tutorial', bind(this, 'showMenu', '_tutorialView'));

		this._tutorialModalView = new TutorialView({
			superview: this,
			modal: true,
			title: 'Tutorial',
			url: 'resources/images/tutorial/tutorial',
			animation: 'swipe'
		});

		this._tutorialView = new TutorialView({
			superview: this,
			title: 'Tutorial',
			url: 'resources/images/tutorial/tutorial',
			animation: 'swipe'
		}).on('Hide', bind(this, 'showMenu', '_tutorialMenu'));
	};

	this.launchUI = function () {};

	this.scaleUI = function () {
		this.baseWidth = BOUNDS_WIDTH;
		this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
		this.scale = device.width / this.baseWidth;

		this.view.style.scale = this.scale;
	};

	this.showMenu = function (menu) {
		this[menu] && (typeof this[menu].show === 'function') && this[menu].show();
	};
});
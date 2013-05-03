import device;

import ui.ImageView as ImageView;

import src.constants.menuConstants as menuConstants;

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
		this._createMenus();
		this._createAlertMenus();
		this._createTutorialMenus();
		this._createConfirmMenus();
		this._createTransitionMenus();
	};

	this._createMainMenu = function () {
		this._mainMenu = new MenuView({
			superview: this,
			title: 'Main menu',
			items: [
				{item: 'Menus', action: bind(this, 'showMenu', '_menusMenu')},
				{item: 'Alert dialogs', action: bind(this, 'showMenu', '_alertDialogsMenu')},
				{item: 'Confirm dialogs', action: bind(this, 'showMenu', '_confirmDialogsMenu')},
				{item: 'Tutorial dialog', action: bind(this, 'showMenu', '_tutorialMenu')},
				{item: 'Transitions', action: bind(this, 'showMenu', '_transitionsMenu')}
			]
		}).show();
	};

	this._createMenus = function () {
		this._menusMenu = new MenuView({
			superview: this,
			title: 'Menus',
			items: [
				{item: 'Menu with text', action: bind(this, 'showMenu', '_menuTextMenu')},
				{item: 'Menu with images', action: bind(this, 'showMenu', '_menuImageMenu')}
			],
			backCB: bind(this._mainMenu, 'show')
		});

		this._menuTextMenu = new MenuView({
			superview: this,
			title: 'Text',
			items: [
				{text: 'Left aligned', align: 'left'},
				{text: 'Centered', align: 'center'},
				{text: 'Right aligned', align: 'right'},
				{item: 'Back to menus', action: 'Back'}
			],
			backCB: bind(this, 'showMenu', '_menusMenu')
		}).
			on('Back', bind(this, 'showMenu', '_menusMenu'));

		this._menuImageMenu = new MenuView({
			superview: this,
			title: 'Images',
			items: [
				{image: 'resources/images/ui/gc96.png', height: 96, width: 96},
				{image: 'resources/images/ui/gc96.png', height: 96, width: 96, align: 'center'},
				{image: 'resources/images/ui/gc96.png', height: 96, width: 96, align: 'right'},
				{item: 'Back to menus', action: 'Back'}
			],
			backCB: bind(this, 'showMenu', '_menusMenu')
		}).
			on('Back', bind(this, 'showMenu', '_menusMenu'));
	};

	this._createAlertMenus = function () {
		this._alertDialogsMenu = new MenuView({
			superview: this,
			title: 'Alert dialogs',
			items: [
				{item: 'Alert modal', action: bind(this, 'showMenu', '_alertModalDialog'), persist: true},
				{item: 'Alert', action: bind(this, 'showMenu', '_alertDialog')}
			],
			backCB: bind(this._mainMenu, 'show')
		});

		this._alertModalDialog = new TextDialogView({
			superview: this,
			title: 'Alert modal',
			text: 'This menu is displayed on top of the dialogs menu',
			width: 500,
			modal: true,
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN'
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
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_alertDialogsMenu')
				}
			]
		}).on('Hide', bind(this, 'showMenu', '_alertDialogsMenu'));
	};

	this._createConfirmMenus = function () {
		this._confirmDialogsMenu = new MenuView({
			superview: this,
			title: 'Confirm dialogs',
			items: [
				{item: 'Confirm modal', action: bind(this, 'showMenu', '_confirmModalDialog'), persist: true},
				{item: 'Confirm', action: bind(this, 'showMenu', '_confirmDialog')}
			],
			backCB: bind(this._mainMenu, 'show')
		});

		this._confirmModalDialog = new TextDialogView({
			superview: this,
			title: 'Confirm modal',
			text: 'Can you confirm one of these?',
			modal: true,
			buttons: [
				{
					title: 'Green',
					width: 200,
					style: 'GREEN',
				},
				{
					title: 'Blue',
					width: 200,
					style: 'BLUE'
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
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_confirmDialogsMenu')
				},
				{
					title: 'Blue',
					width: 200,
					style: 'BLUE',
					cb: bind(this, 'showMenu', '_confirmDialogsMenu')
				}
			]
		}).on('Hide', bind(this, 'showMenu', '_confirmDialogsMenu'));
	};

	this._createTutorialMenus = function () {
		this._tutorialMenu = new MenuView({
			superview: this,
			title: 'Tutorial menu',
			items: [
				{item: 'Tutorial modal', action: bind(this, 'showMenu', '_tutorialModalView'), persist: true},
				{item: 'Tutorial', action: bind(this, 'showMenu', '_tutorialView')}
			],
			backCB: bind(this._mainMenu, 'show')
		});

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

	this._createTransitionMenus = function () {
		this._transitionsMenu = new MenuView({
			superview: this,
			title: 'Transitions',
			items: [
				{item: 'Slide', action: bind(this, 'showMenu', '_slideDialog')},
				{item: 'Scale', action: bind(this, 'showMenu', '_scaleDialog')},
				{item: 'Fade', action: bind(this, 'showMenu', '_fadeDialog')},
				{item: 'Rotate', action: bind(this, 'showMenu', '_rotateDialog')},
			],
			backCB: bind(this._mainMenu, 'show')
		});

		this._slideDialog = new TextDialogView({
			superview: this,
			title: 'Slide',
			text: 'This menu uses a slide transition',
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_transitionsMenu')
				}
			],
			showTransitionMethod: menuConstants.transitionMethod.SLIDE,
			hideTransitionMethod: menuConstants.transitionMethod.SLIDE
		}).on('Hide', bind(this, 'showMenu', '_transitionsMenu'));

		this._scaleDialog = new TextDialogView({
			superview: this,
			title: 'Scale',
			text: 'This menu uses a scale transition',
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_transitionsMenu')
				}
			],
			showTransitionMethod: menuConstants.transitionMethod.SCALE,
			hideTransitionMethod: menuConstants.transitionMethod.SCALE
		}).on('Hide', bind(this, 'showMenu', '_transitionsMenu'));

		this._fadeDialog = new TextDialogView({
			superview: this,
			title: 'Fade',
			text: 'This menu uses a fade transition',
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_transitionsMenu')
				}
			],
			closeCB: bind(this, 'showMenu', '_transitionsMenu'),
			showTransitionMethod: menuConstants.transitionMethod.FADE,
			hideTransitionMethod: menuConstants.transitionMethod.FADE
		}).on('Hide', bind(this, 'showMenu', '_transitionsMenu'));

		this._rotateDialog = new TextDialogView({
			superview: this,
			title: 'Rotate',
			text: 'This menu uses a rotate transition',
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN',
					cb: bind(this, 'showMenu', '_transitionsMenu')
				}
			],
			closeCB: bind(this, 'showMenu', '_transitionsMenu'),
			showTransitionMethod: menuConstants.transitionMethod.ROTATE,
			showTransitionTime: 1000,
			hideTransitionMethod: menuConstants.transitionMethod.ROTATE,
			hideTransitionTime: 1000
		}).on('Hide', bind(this, 'showMenu', '_transitionsMenu'));
	};

	this.launchUI = function () {};

	this.scaleUI = function () {
		if (device.height > device.width) {
			this.baseWidth = BOUNDS_WIDTH;
			this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
			this.scale = device.width / this.baseWidth;
		} else {
			this.baseWidth = BOUNDS_HEIGHT;
			this.baseHeight = device.height * (BOUNDS_HEIGHT / device.width);
			this.scale = device.height / this.baseHeight;
		}
		this.view.style.scale = this.scale;
	};

	this.showMenu = function (menu) {
		this[menu] && (typeof this[menu].show === 'function') && this[menu].show() || this._mainMenu.show();
	};
});
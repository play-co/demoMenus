import lib.Enum as Enum;

exports.transitionMethod = Enum(
	'NONE',
	'SLIDE',
	'SCALE',
	'FADE',
	'ROTATE'
);

exports.DIALOG = {
	BACKGROUND: 'resources/images/ui/background.png',
	CONTENT_BORDER: 'resources/images/ui/contenBorder.png',
	SHOW_TRANSITION_METHOD: exports.transitionMethod.SLIDE,
	SHOW_TRANSITION_TIME: 300,
	HIDE_TRANSITION_METHOD: exports.transitionMethod.SLIDE,
	HIDE_TRANSITION_TIME: 300,
	BACK: 'resources/images/ui/buttonBack.png',
	CLOSE: 'resources/images/ui/buttonClose.png'
};

exports.TUTORIAL = {
	BACKGROUND_COLOR: 'rgb(255, 255, 255)'
};

exports.CONTENT = {
	BACKGROUND: 'resources/images/ui/item.png',
	FONT_FAMILY: 'NotoSans',
	FONT_SIZE: 36,
	PADDING: [0, 30, 0, 30]
};

exports.MENU_TEXT = {
	FONT_FAMILY: 'NotoSans',
	FONT_SIZE: 36,
	PADDING: [0, 0, 0, 0],
	COLOR: 'rgb(255, 255, 255)',
	STROKE_COLOR: '#384C26',
	STROKE_WIDTH: 6,
	ALIGN: 'center'
};

exports.MENU_ITEM = {
	BACKGROUND: 'resources/images/ui/item.png',
	FONT_FAMILY: 'NotoSans',
	FONT_SIZE: 36,
	PADDING: [0, 0, 10, 0],
	COLOR: 'rgb(255, 255, 255)',
	STROKE_COLOR: '#9A833E',
	STROKE_WIDTH: 6
};

exports.TITLE = {
	BACKGROUND: 'resources/images/ui/title.png',
	FONT_FAMILY: 'AutourOne',
	FONT_SIZE: 36,
	COLOR: 'rgb(242, 227, 7)',
	STROKE_COLOR: 'rgb(33, 44, 22)',
	ICON: false
};

exports.BUTTONS = {
	BLUE: {
		UP: 'resources/images/ui/button1Up.png',
		DOWN: 'resources/images/ui/button1Down.png',
		FONT_FAMILY: 'AutourOne',
		FONT_SIZE: 36,
		COLOR: 'rgb(242, 227, 7)',
		STROKE_COLOR: 'rgb(20, 40, 88)',
		STROKE_WIDTH: 6
	},
	GREEN: {
		UP: 'resources/images/ui/button2Up.png',
		DOWN: 'resources/images/ui/button2Down.png',
		FONT_FAMILY: 'AutourOne',
		FONT_SIZE: 36,
		COLOR: 'rgb(242, 227, 7)',
		STROKE_COLOR: 'rgb(56, 76, 38)',
		STROKE_WIDTH: 6
	}
};
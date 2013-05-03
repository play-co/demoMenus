# Menus and dialogs

One of the basic things most games need is a menu and dialog system.
This repository provides a set of classes to handle the basic menus.

The menus can be displayed in game or on top of a dedicated menu
background, the demo uses a simple gradient as a background.

## Modals

A modal is a menu which is shown on top of another view, if a menu
is shown as a model then the user is required to take action. Usually 
the backgound is darkened to signify that the only available options
are on the active modal.

Every menu can be shown as a modal or a standard menu.

## Navigation

There are several different buttons to navigate trough the menus.
On the title bar there can be a back button on the left side or
a close button on the right side.

The close button is usually displayed when the menus is shown as
a modal, the back button is usually used to navigate through a menu 
tree.

Dialogs -like confirm or alert- have one or more buttons on the bottom
of the dialog.

Menus have a list of options. The standard behaviour is to hide
the menu when a menu option is clicked however it's possible to
overrule this bahaviour and let the menu persist when an option
is selected. This could be used for example to let the user select
a background which could be displayed behind the menu when an
option is selected.

## Transitions

This demo offsers several transitions to show or hide menus:
sliding, scaling, fading and rotating.

## 9-Slice

All element which make up the menus and dialogs are based on 9-slice images.

<table>
	<tr>
		<th>Images</th>
		<th>Size</th>
		<th>Purpose</th>
	</tr>
	<tr>
		<td><img src="doc/components/background.png" width="40" height="40"/></td>
		<td>40x40</td>
		<td>Background</td>
	</tr>
	<tr>
		<td><img src="doc/components/item.png" width="40" height="40"/></td>
		<td>40x40</td>
		<td>Item background, content backround</td>
	</tr>
	<tr>
		<td><img src="doc/components/title.png" width="40" height="40"/></td>
		<td>40x40</td>
		<td>Title background</td>
	</tr>
	<tr>
		<td><img src="doc/components/button1Down.png" width="64" height="64"/> <img src="doc/components/button1Up.png" width="64" height="64"/></td>
		<td>64x64</td>
		<td>Button background</td>
	</tr>
	<tr>
		<td><img src="doc/components/button2Down.png" width="64" height="64"/> <img src="doc/components/button2Up.png" width="64" height="64"/></td>
		<td>64x64</td>
		<td>Button background</td>
	</tr>
	<tr>
		<td><img src="doc/components/buttonBack.png" width="40" height="40"/></td>
		<td>40x40</td>
		<td>Back button</td>
	</tr>
	<tr>
		<td><img src="doc/components/buttonClose.png" width="40" height="40"/></td>
		<td>40x40</td>
		<td>Close button</td>
	</tr>
</table>

### MenuView Class

<img src="doc/screenshots/menus.png" width="480" height="320"/><br />
*A screenshot of the main menu*

Parameters
 + `superview {View}` ---The view which contains this menu, could be a menu background or the game view.
 + `title {string}` ---The title displayed in the title bar of the menu
 + `items {array}` ---A list of menu items, the structure of the item is:
  + `item {string}` ---The display title of the item
  + `action {string|function}` ---If it's a string then the value will be emitted else the function is invoked on clicking.
  + `persist {boolean}` ---Optional, If this values is `true` then the menu will not be hidden when the option is clicked.
  + `text {string}` ---Optional, display a text instead of a clickable option.
  + `image {string}` ---Optional, the path to an image to display instead of a clickable option.
  + `width {number} = 70` ---Optional, the width of the image.
  + `height {number} = 70` ---Optional, the height of the image.
  + `align {string}` ---Optional, the horizontal alignment of the text or image, the default is `center` options are: `left`, `center` and `right`.

~~~
import src.views.ui.MenuView as MenuView;

new MenuView({
	superview: this,
	title: 'Main menu',
	items: [
		{item: 'Menus', action: 'Menus'},
		{item: 'Setup', action: bind(this, 'onSetup')}
	]
}).show();
~~~

#### Methods

__show([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is visible.
Returns
 {object} ---Returns the reference to the menu.

__hide([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is hidden.
Returns
 {object} ---Returns the reference to the menu.

### TextDialogView Class

#### Events

If the action is a string then that string is emitted when the option is clicked.

__Hide__

Emitted then the menu is hidden.

### TextDialogView Class

The `TextDialogView` class is a generic dialog which can be used to create a confirm or alert dialog.

<img src="doc/screenshots/confirm.png" width="480" height="320"/><br />
*A screenshot of a confirm dialog using the `TextDialogView` class*

<img src="doc/screenshots/alert.png" width="480" height="320"/><br />
*A screenshot of an alert dialog using the `TextDialogView` class*

Parameters
 + `superview {View}` ---The view which contains this menu, could be a menu background or the game view.
 + `title {string}` ---The title displayed in the title bar of the menu.
 + `text {string}` ---The text displayed.
 + `width {number}` ---Optional, the default value is the available screen width minus 80 pixels.
 + `height {number} = 400` ---Optional, the width of the dialog.
 + `modal {boolean}` ---Optional, if true then the background will be darkened.
 + `buttons {array}` ---A list of buttons displayed at the bottom of the dialog, the structure of the button item is:
  + `title {string}` ---The title of the button.
  + `width {number}` ---The horizontal size of the button.
  + `style {string}` ---A string representing the style of the button, the styles are configured in `src.constants.menuConstants`.

~~~
import src.views.ui.TextDialogView as TextDialogView;

new TextDialogView({
	superview: this,
	title: 'Alert modal',
	text: 'This menu is displayed on top of the dialogs menu',
	modal: true,
	buttons: [
		{
			title: 'Ok',
			width: 160,
			style: 'GREEN'
		}
	]
}).show();
~~~

#### Methods

__setText(text)__

Parameters
 + `text {string}` ---Sets the text of the dialog

__setTitle(text)__

Parameters
 + `text {string}` ---Sets the title of the dialog

__show([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is visible.
Returns
 {object} ---Returns the reference to the menu.

__hide([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is hidden.
Returns
 {object} ---Returns the reference to the menu.

### TutorialView Class

The `TutorialView` is a dialog to display a short animation.

The [SpriteView](http://docs.gameclosure.com/api/ui-spriteview.html) class is used to play the animation.

<img src="doc/screenshots/tutorial.png" width="320" height="480"/><br />
*A screenshot of a tutorial dialog*

Parameters
 + `superview {View}` ---The view which contains this menu, could be a menu background or the game view.
 + `title {string}` ---The title displayed in the title bar of the menu.
 + `url {string}` ---The path to the animation.
 + `animation {string}` ---The animation which is played.

#### Methods

__show([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is visible.
Returns
 {object} ---Returns the reference to the menu.

__hide([cb])__

Parameters
 + `cb {function}` ---Optional, a callback invoked when the menu is hidden.
Returns
 {object} ---Returns the reference to the menu.
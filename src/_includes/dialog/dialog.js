// JUSTIN! Don't forget to uncomment the finishedLoading() function

/*
DEMO: https://codepen.io/oneezy/pen/ZEBXLVa


To open a dialog, add "data-dialog" to any html element
There are 4 different dialog attributes that allow you to customize the dialog
______________________________________________________________________________________________________

1. data-dialog (4) 
	- page
	- half
	- image
	- tooltip
	
2. data-dialog-animate (23)
	- fadeIn
	- zoomIn
	- fromRight
	- fromBottom 
	
3. data-dialog-bg (1)
	- hide | hidden | none | no | false
	
4. data-dialog-close (1)
	- closes dialog
	
5. data-dialog-class (1)
	- adds a unique class name to the html


<!-- EXAMPLES -->
<button data-dialog data-dialog-bg="hide">Default dialog</button>
<button data-dialog="page" data-dialog-animate="fadeIn">Full Page dialog</button>
<button data-dialog="page" data-dialog-animate="fromRight">Slider Page dialog</button>
<button data-dialog="half" data-dialog-animate="zoomIn">Half Page dialog</button>
<button data-dialog="image" data-dialog-animate="zoomIn" data-dialog-bg="hide">Image dialog</button>
<button data-dialog="tooltip" data-dialog-animate="fromBottom">Tooltip dialog</button>
______________________________________________________________________________________________________*/


export default async function dialog() {
	let html = document.querySelector('html');
	let page = document.querySelector('#page');
	let dialog = document.querySelector('.dialog__wrapper');
	
	function clearClass() {
		html.classList = '';
	}
	
	document.addEventListener('click', async (e) => {
		let button 	= 	e.target.closest('[data-dialog]');
		let close 	= 	e.target.closest('[data-dialog-close]');
		let scrim 	= 	e.target.closest('.dialog__scrim'); 
		
		// Open dialog
		if (button) {
			let type 	= button.dataset.dialog;
			let style 	= button.dataset.dialogClass;
			let animate = button.dataset.dialogAnimate;
			let bg 		= button.dataset.dialogBg;
			
			if(!html.classList.contains('active')) {
				html.classList = '';
				html.classList.add('dialog', 'active');
				if (type) {
					html.classList.add(`dialog--${type}`, 'active');
				}
				if (style) {
					html.classList.add(`dialog--${style}`, 'active');
				}
				if (animate) {
					html.classList.add(`dialog--${animate}`, 'active');
				}
				if (bg == 'hide' || bg == 'false' || bg == 'none' || bg == 'hidden' || bg == 'no' ) {
					html.classList.add('dialog--hide-bg', 'active');
				}
			}
		}
		
		// Close dialog
		if (scrim || close) {
			html.classList.add('inactive');
			
			dialog.addEventListener('animationend', async (e) => {
				if (html.classList.contains('inactive')) {
					clearClass();
					// finishedLoading();
				}
			});
		}
		
		// ESC keypress //
		document.addEventListener('keyup', async (e) => {
			if (e.key == "Escape" && html.classList.contains('active')) {
				html.classList.add('inactive');
				dialog.addEventListener('animationend', async (e) => {
					if (html.classList.contains('inactive')) {
						clearClass();
						// finishedLoading();
					}
				});
			}
		});

		
	});
}
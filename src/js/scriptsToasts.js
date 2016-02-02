/********** TOASTS **********/

function toastAdd (data) {

	// This is used to initialise the toasts
	if (window.toastInt === undefined) {

		// Stop this conditional from calling again
		toastInt = true;

		// Create the toasts container element
		toastCache = document.createElement("div");
		toastCache.setAttribute("id", "toasts");
		document.body.appendChild(toastCache);

		// Create the toast timeout variable
		toastTimeout = null;

		// Create the toast array
		toastArray = new Array();

	};

	var toastElement = document.createElement("div");
	toastElement.className = "toast " + data.type;
	//toastElement.onclick = toastRemove(this);
	toastElement.setAttribute("onclick", "toastRemove(this)");

	// TODO: Convert following two conditionals to catch/match for simplicity

	function createTextElement (targetClass, targetText) {
		var toastElementText = document.createElement("span");
		toastElementText.classList.add(targetClass);
		toastElementText.innerHTML = targetText;
		toastElement.appendChild(toastElementText);
	};

	// Check if the title property has been passed; if so, add title element
	if (data.hasOwnProperty("title") !== false) {
		createTextElement("title", data.title);
	};

	// Check if the subtitle property has been passed; if so, add subtitle element
	if (data.hasOwnProperty("subtitle") !== false) {
		createTextElement("subtitle", data.subtitle);
	};

	toastCache.appendChild(toastElement);

	toastArray.push(toastElement);

	setTimeout(function() {
		toastElement.classList.add("visible");
		toastReorder(0);
	}, 0);

};

function toastRemove (target) {

	var targetIndex = toastArray.indexOf(target);
	toastArray.splice(targetIndex, 1);
	target.classList.add("remove");

	setTimeout(function () {
		target.remove();
	}, 500);

	setTimeout(function () {
		toastReorder(targetIndex);
	}, 50);

	clearTimeout(toastTimeout);

};

function toastClear () {

	for (var i = 0; i < toastArray.length; i++) {
		toastArray[i].classList.remove("visible");
		setTimeout(function () {
			toastArray = [];
			toastCache.innerHTML = "";
		}, 500);
	};

};

function toastReorder (target) {

	for (var i = target; i < toastArray.length; i++) {

		if (i == 0) {
			var targetOffset = 0;
		}
		else {
			var targetOffset = parseInt(toastArray[i - 1].dataset.toastOffset) - parseInt(toastArray[i - 1].offsetHeight) - 20;
		};

		toastArray[i].style = "-webkit-transform: translateY(" + targetOffset + "px); -moz-transform: translateY(" + targetOffset + "px); -ms-transform: translateY(" + targetOffset + "px); -o-transform: translateY(" + targetOffset + "px); transform: translateY(" + targetOffset + "px)";
		toastArray[i].dataset.toastOffset = targetOffset;

	};

};
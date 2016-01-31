/********** TOASTS **********/

var toastArray = new Array();

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

	};

	var toastElement = document.createElement("div");
	toastElement.className = "toast " + data.type;
	//toastElement.onclick = toastRemove(this);
	toastElement.setAttribute("onclick", "toastRemove(this)");

	// Create the wrapper for the text
	var toastElementWrapper = document.createElement("div");
	toastElementWrapper.classList.add("wrapper");
	toastElement.appendChild(toastElementWrapper);

	// TODO: Convert following two conditionals to catch/match for simplicity

	function createTextElement (targetClass, targetText) {
		var toastElementText = document.createElement("span");
		toastElementText.classList.add(targetClass);
		toastElementText.innerHTML = targetText;
		toastElementWrapper.appendChild(toastElementText);
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
	target.classList.remove("visible");

	setTimeout(function () {
		target.remove();
	}, 500);

	setTimeout(function () {
		toastReorder(0);
	}, 50);

	clearTimeout(toastTimeout);

};

function toastClear () {

	for (var i = 0; i < toastArray.length; i++) {
		toastRemove(toastCache.children[i]);
	};

};

function toastReorder (target) {

	var heights = 0;

	for (var i = target; i < toastArray.length; i++) {

		if (i > 0) {
			heights = heights - parseInt(toastArray[i - 1].offsetHeight) - 20;
		};

		toastArray[i].style = "-webkit-transform: translateY(" + heights + "px); -moz-transform: translateY(" + heights + "px); -ms-transform: translateY(" + heights + "px); -o-transform: translateY(" + heights + "px); transform: translateY(" + heights + "px)";

	};

};
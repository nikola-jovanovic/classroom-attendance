exports.getAjax = function (url, fn) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				var data = JSON.parse(this.responseText);
				fn(false, data);
			} else {
				fn(true);
			}
		}
	};

	request.send();
	request = null;	
};
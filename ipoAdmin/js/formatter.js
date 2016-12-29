function moneyFormatter(n) {
	return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function priceFormatter(n) {
	return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function numFormatter(n) {
	//with thousands separators
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function padLeft(str, length) {
	if(str.toString().length >= length) {
		return str; 
	}
	else {
		return padLeft("0" + str, length);
	}
}
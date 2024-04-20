import { Utils } from "handlebars";

const myCustomHelpers = {};

myCustomHelpers.toString = (obj) => {
	return Utils.toString(obj);
};

myCustomHelpers.haveEqualId = (first, second) => {
	let firstAsString = "";
	let secondAsString = "";

	if (first) {
		firstAsString =
			typeof first === "object" ? first.toString() : Utils.toString(first);
	}

	if (second) {
		secondAsString =
			typeof second === "object" ? second.toString() : Utils.toString(second);
	}

	if (firstAsString === secondAsString) return true;

	return false;
};

export default myCustomHelpers;

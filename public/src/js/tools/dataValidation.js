var validateString = function(inputText, minLength, maxLength, inputTextName){
	var customAlertMessage = 'The '+inputTextName+' must be between '+minLength+' and '+maxLength+' chars, it can contain only letters';
	return validateRegex(inputText, minLength, maxLength, /^[a-zA-Z]+$/, customAlertMessage);
};

var validateNumber = function(inputNumber, minLength, maxLength, inputNumberName){
	var customAlertMessage = 'The '+inputNumberName+' must be between '+minLength+' and '+maxLength+' digits, it can contain only numbers';
	return validateRegex(inputNumber, minLength, maxLength, /^[0-9]+$/, customAlertMessage);
};

var validatePhoneNumber = function(inputPhoneNumber){
	var customAlertMessage = "The phone number must be in format 000 000 0000, separators allowed are space ( ), dot (.) and dash (-)";
	return validateRegex(inputPhoneNumber, 12, 12, /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/, customAlertMessage);
};

var validateEmailAddress = function(inputEmailAddress){
	var customAlertMessage = "The email address is not valid";
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//var re = /\S+@\S+\.\S+/; //paranoid mode off
	return validateRegex(inputEmailAddress, 7, 100, re, customAlertMessage);
};

var validateRegex = function(inputData, minLength, maxLength, regex, customAlertMessage){
	if (!inputData || inputData.length < minLength || inputData.length > maxLength || !regex.test(inputData)){
		if (customAlertMessage && customAlertMessage != ''){
			alert(customAlertMessage);
		} else {
			alert('I can not validate the input data');
		}
		return false;
	}
	return true;
}
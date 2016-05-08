/*
	author: "Murray Watson"
*/

//validates customer names
function custNameVal(user_inpt, cur_id){
	var alph = "abcdefghijklmnopqrstuvwxyz";
		inpt = trailingChars(user_inpt, " ");				//inpt value with trailing spaces removed
		names = inpt.split(" ");							//splits each name up into an array
		inpt_numb = cur_id.replace("cust_input_", ""); 		//gets the current customer number
		illegal_chars = illegalChars(names, alph);			//if '0' not illegal chars, if '1' illegal chars
		name_errors = 0;									//if '0' each name is valid, if '1' not every name is

	//loops names checking if each name is valid
	for(var i = 0; i < names.length; ++i){
		//the last name has a specific length requirement so is checked seperately
		if(i === names.length - 1){
			//checks the same as each other name, but also that the length dosnt exceed 20 chars
			if((names[i].length === 0 || names[i].length > 20) && user_inpt.length !== 0 ){
				name_errors = 1;
				break;
			}
		}

		else{
			//checks if the user has cleared the field, if so it checks that
			//nothing has been entered, else it checks if each name has a value
			if((names[i].length === 0 && user_inpt.length !== 0) && user_inpt.length !== 0){
				name_errors = 1;
				break;
			}
		}
	}

	//checks that no illegal chars exist, name errors exist and that the user has provided
	//at least one forename and surname, and the total chars used is no greater than 150
	//or if the user has cleared the input
	if(!(illegal_chars) && user_inpt.length < 151 && !(name_errors) && (names.length >= 2 || user_inpt === "")){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");		//removes error class from current input
		cust_names[inpt_numb - 1] = user_inpt						//updates the customer name for the current input
	}

	else{
		$("#" + cur_id).addClass("input_invalid");
		$("#cust" + inpt_numb).addClass("input_invalid");
		cust_names[inpt_numb - 1] = -1								//sets the current customer name to -1 to show its invalid
	}

	var errors = 0;

	//checks that each customer name currently stored is valid
	for(var i = 0; i < cust_names.length; ++i){
		if(cust_names[i] === -1){
			errors = 1;
			break
		}
	}

	toggleErrors(errors);
}

//validates customer tickets
function custTickVal(user_inpt, cur_id){
	var inpt_numb = cur_id.replace("cust_input_", "");				//gets the current customer number
		numbs = "0123456789";
		illegal_chars = illegalChars(user_inpt, numbs);				//if 0 no illegal chars if 1 illegal chars

	//checks that the user has entered a number greater than or equal to 2
	//less than or equal to 20 or if the user has cleared the input
	if(!(isNaN(parseInt(user_inpt))) && parseInt(user_inpt) >= 2 && parseInt(user_inpt) <= 20 && !(illegal_chars)){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");
		cust_tickets[inpt_numb - 1] = parseInt(user_inpt);			//updates customer tickets info
	}

	//user has cleared the input
	else if(user_inpt == ""){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");
		cust_tickets[inpt_numb - 1] = 0;							//updates customer info to 0 to show its been cleared
	}

	else{
		$("#cust" + inpt_numb).addClass("input_invalid");
		$("#" + cur_id).addClass("input_invalid");
		cust_tickets[inpt_numb - 1] = -1;							//updates customer info to -1 to show its invalid
	}

	var errors = 0;

	//checks if any customer tickets are invalid
	for(var i = 0; i < cust_tickets.length; ++i){
		if(cust_tickets[i] == -1){
			errors = 1;
			break;
		}
	}

	toggleErrors(errors);
}

//removes any trailing chars
//inpt is the value to check and trailChar is the trailing char to remove
function trailingChars(inpt, trail_char){
	var i = inpt.length - 1;		//the starting value of the loop is the last char of inpt
		fixed_inpt = "";			//inpt with trailing chars removed
		to_remove_from = -1;		//the index to remove from, if -1 nothing needs to be removed

	//loops until its checked all of inpt or until its found a char not equal to trail_char
	while(inpt[i] === trail_char && i >= 0){
		to_remove_from = i;
		--i;
	}

	//checks if any chars need to be removed
	if(to_remove_from !== -1){
		//removes trailing chars
		for(var i = 0; i < to_remove_from; ++i){
			fixed_inpt += inpt[i];
		}
	}

	else{
		fixed_inpt = inpt;
	}

	//return the inpt with any trailing chars removed
	return fixed_inpt;
}

//checks if 'inpt' contains any chars that are not in 'legal'
//inpt is an array of value/s and legal is an array of chars
function illegalChars(inpts, legal){
	//loops through inpts checking each value
	for(var i = 0; i < inpts.length; ++i){
		//checks if the inpts[i] contains chars not in legal
		//if so it will reuturn true and end the loop
		for(var j = 0; j < inpts[i].length; ++j){
			if(legal.indexOf(inpts[i].toLowerCase()[j]) === -1){
				return 1;
			}
		}
	}

	//return 0 if all fo the values in 'inpts' are valid
	return 0;
}

//displays the error when the parameter 'error' is 0
//hides the error when the paremater 'error' is 1
function toggleErrors(error){
	if(!(error)){
		//hides the error
		$("#error_container").hide();
	}

	else{
		//shows the error
		$("#error_container").show();
	}
}
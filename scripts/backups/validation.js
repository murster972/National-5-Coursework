function cust_name_val(user_inpt, cur_id){
	var names = user_inpt.split(" ");

	//removes trailing space at end of input
	if(user_inpt[user_inpt.length - 1] == " "){
		var tmp_names = user_inpt.slice(0, -1);
		names = tmp_names.split(" ");
	}

	var	alph = "abcdefghijklmnopqrstuvwxyz";
		inpt_numb = parseInt(cur_id.replace("cust_input_", ""));
		illegal = illegal_chars(names, alph);
		name_errors = 0;

	for(var i = 0; i < names.length; ++i){
		if(i == names.length - 1){
			if((names[i].length == 0 || names[i].length > 20) && user_inpt.length != 0){
				name_errors = 1;
				break;
			}
		}

		else{
			if((names[i].length == 0 && user_inpt.length != 0) && user_inpt.length != 0){
				name_errors = 1;
				break;
			}
		}
	}

	if(!(illegal) && user_inpt.length < 150 && !(name_errors) && (names.length >= 2 || user_inpt.length == 0)){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");
		cust_names[inpt_numb - 1] = user_inpt;
	}

	else{
		$("#" + cur_id).addClass("input_invalid");
		$("#cust" + inpt_numb).addClass("input_invalid");
		cust_names[inpt_numb - 1] = -1;
		//cust_names_errors[inpt_numb - 1] = -1;
	}

	var errors = 0;

	for(var i = 0; i < cust_names.length; ++i){
		if(cust_names[i] == -1){
			errors = 1;
		}
	}

	console.log(errors);

	display_hide_errors(errors);
}	

function cust_tick_val(user_inpt, cur_id){
	var inpt_numb = parseInt(cur_id.replace("cust_input_", ""));
		numbs = "0123456789"
		illegal = illegal_chars(user_inpt, numbs);

	if(!(isNaN(parseInt(user_inpt))) && parseInt(user_inpt) >= 2 && parseInt(user_inpt) <= 20 && !(illegal)){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");
		cust_tickets[inpt_numb - 1] = parseInt(user_inpt);
	}

	else if(user_inpt == ""){
		$("#" + cur_id).removeClass("input_invalid");
		$("#cust" + inpt_numb).removeClass("input_invalid");
		cust_tickets[inpt_numb - 1] = 0;
	}

	else{
		$("#cust" + inpt_numb).addClass("input_invalid");
		$("#" + cur_id).addClass("input_invalid");
		cust_tickets[inpt_numb - 1] = -1;
	}

	var errors = 0;

	for(var i = 0; i < cust_tickets.length; ++i){
		if(cust_tickets[i] == -1){
			errors = 1;
		}
	}

	display_hide_errors(errors);
}

//checks if 'inpts' contains any chaars that are not in 'legal_chars'
function illegal_chars(inpts, legal_chars){
	for(var i = 0; i < inpts.length; ++i){
		for(var j = 0; j < inpts[i].length; ++j){
			if(legal_chars.indexOf(inpts[i].toLowerCase()[j]) == -1){
				return 1;
			}
		}
	}

	return 0;
}

//displays/hides errors
function display_hide_errors(error){
	if(!(error)){
		$("#error_container").hide(200);
	}

	else{
		$("#error_container").show(200);
	}
}
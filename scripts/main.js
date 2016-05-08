/*
	author: "Murray Watson"
*/

//declares global variables and sets their intial values
var cust_names = ["", "", "", "", "", "", "", "", "", ""];
	cust_tickets = [];
	backstage_pass_winner = [];
	headings = ["Customer Names", "Customer Tickets", "Discounts"];
	err_msgs = ["At least one name - forename/s and surname - is required. Name can only be: a-z, A-Z, and space. Surname can be a maximum of 20 chars.",
				  "Each customer must have a minium of 2 and a maximum of 20 tickets."];

	current_val = function(usr_inpt, cur_id){custNameVal(usr_inpt, cur_id)};
	next_step = function(){custNameNext()};

$(document).ready(function(){
	$("#error_container").text(err_msgs[0]);				//sets intial error message
	$("#heading_container").text(headings[0]);              //set intial heading
	//listens for a change in input fields
	$(".input_style").change(function(){
		var id = $(this).attr("id");						//gets the id for current input
			usr_inpt = $("#" + id).val();					//gets the value of the current input

		current_val(usr_inpt, id);
	})

	//listens for clear button click
	$(".inpt_butn").click(function(){
		var id = $(this).attr("id");						//gets the id for the current butn
			inpt_id = "cust_input_" + (id.replace("butn", ""));							//gets butn number and creates corropsoding input id

		$("#" + inpt_id).val("");							//clears the current input
		current_val("", inpt_id);
	})

	//listens for next button click
	$("#next_butn").click(function(){
		next_step();
	})
})

//checks if all data entered for customer name is valid,
//if valid it proceeds to customer tickets, if not valid it displays
//the appropriate error message to the user and will contineu to do so
//until the error has been resolved
function custNameNext(){
	var illegal = 0;
		valid_names = [];

	//loops through customer names checking if each name is valid
	for(var i = 0; i < cust_names.length; ++i){
		//if name is -1 then its invalid
		if(cust_names[i] == -1){
			illegal = 1;
		}

		//if name hasnt been cleared
		else if(cust_names[i].length > 0){
			valid_names.push(cust_names[i]);
		}

		else{
			//no customer name exists
		}
	}

	//checks no illegal name exist and at least one valid name exists
	if(!(illegal) && valid_names.length > 0){
		cust_names = valid_names;							//removes any blank names from customer names
		$("#error_container").hide();						//hides errors
		custTicketsUpdate();
	}

	else{
		$("#error_container").show()						//shows errors
	}
}

//changes webpage for customer tickets input
function custTicketsUpdate(){
	$("#heading_container").text(heading_container[1]);		//updates heading for customer tickets
	$("#error_container").text(err_msgs[1]);				//updates error message for customer ticket

	$(".input_cont").hide(0);								//hides all inputs
	$(".input_style").val("");								//clears all inputs

	//only shows inputs required for customer tickets to be entered
	for(var i = 0; i < cust_names.length; ++i){
		$("#cust" + (i + 1)).show(200);						//shows input
		$("#cust_input_" + (i + 1)).attr("placeholder", cust_names[i] + "'s tickets");	//changes the inputs placeholder to the customer name
	}

	current_val = function(usr_inpt, cur_id){custTickVal(usr_inpt, cur_id)};			//updates current validation in user for customer tickets
	next_step = function(){custTicketsNext()};											//updates next step for customer tickets
}

//checks that number of tickets entered for each customer is valid, if
//so proceeds to disocunts if not it displays an errror and continues
//to do so until the error is resolved
function custTicketsNext(){
	var legal = 1;

	//checks if the number of tickets for each customer is invalid
	for(var i = 0; i < cust_tickets.length; ++i){
		if(cust_tickets[i] == -1 || cust_tickets[i] == 0){
			legal = 0;
		}
	}

	//checks that each number of tickets entered are valid
	if(legal){
		$("#error_container").hide();						//hides errors
		discounts(0.1);
	}

	else{
		$("#error_container").show();						//shows errors
	}
}

//calculates the discunt price for each customer
//dis is the discount percentage as a decimal
function discounts(dis){
	var ticket_price = 15.00								//the price of a ticket

	//loops throught customer tickets, discounting each one
	for(var i = 0; i < cust_tickets.length; ++i){
		var cost = ticket_price * cust_tickets[i];			//the original price
			discounted = (cost * (1 - dis)).toFixed(2)		//discounted price to 2 d.p
			cust_tickets[i] = discounted;					//updates customer tickets
	}

	prizeDraw();

}

//selects a random customer to win a backstage pass
function prizeDraw(){
	var backstage_pass_index = Math.floor((Math.random() * cust_names.length + 1)) - 1;		//index of prize winner
		backstage_pass_winner = [cust_names[backstage_pass_index], backstage_pass_index];	//backstagepass winner		

	displayDiscounts();
}


//outputs the discounted tickets and prize winner
function displayDiscounts(){
	$("#heading_container").text(heading_container[2]);		//updates heading
	$("#forward_butn_container").hide(0);					//hides next button
	$(".inpt_butn").hide(0);								//hides each clear butn
	$(".intput_style").hide(0);								//hides each input


	//loops through each customer displaying their info
	for(var i = 0; i < cust_names.length; ++i){
		var cust_out = cust_names[i] + ": £" + String(cust_tickets[i]);						//output for customer

		//checks if cur customer is backstage pass winner
		if(backstage_pass_winner[1] === i){
			cust_out = cust_out + " Backstage Pass Winner!";
		}

		//displays customer info and changes input field to div so
		//that if the output can't be displayed on one line instead
		//of going off screen it goes to a new line instead
		$("#cust_input_" + (i + 1)).replaceWith("<div class='input_style'><p id='out_padd'>" +  cust_out + "</p></div>")
	}

	//changes input container height so it adjusts if more than one line is
	//needed to output customer info
	$(".input_cont").height("auto");
	$(".input_style").show(200);							//shows each output

	//changes the styling of the input containers
	$(".input_style").css({"width": "100%",					//changes width output takes up the whole container
		"height": "auto",									//changes height so output adjusts if more than one line is needed
		"padding-top": "15px",
		"padding-bottom": "15px",
		"font-family": "FiraSansLight"});
}
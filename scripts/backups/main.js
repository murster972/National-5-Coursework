//declares global variables
var cust_names = ["", "", "", "", "", "", "", "", "", ""];
	cust_tickets = [];
	headings = ["Customer Names", "Customer Tickets", "Discounts"]
	error_msgs = ["At least one name - forename/s and surname - is required. Name can only be: a-z, A-Z, and space. Surname can be a maximum of 20 chars.",
				  "Each customer must have a minium of 2 and a maximum of 20 tickets."];
	backstage_pass_winner = [];
	current_val = function(val, id){cust_name_val(val, id)};		//function to call for current validation
	next_funct = function(){cust_name_next()};						//function to call to continue with booking


$(document).ready(function(){
	$("#error_container").text(error_msgs[0]);
	$(".input_style").change(function(){
		var id = $(this).attr("id");								//gets id from current input
			usr_inpt = ($("#" + id).val());							//get value from current input

		current_val(usr_inpt, id);
	})

	$(".inpt_butn").click(function(){						
		id = $(this).attr("id");
		inpt_id = "cust_input_" + (id.replace("butn", ""))			//gets butn number and makes corresponding input id
		$("#" + inpt_id).val("");									//resets the input
		current_val("", inpt_id);
	})

	$("#next_butn").click(function(){
		next_funct();
	})
})

function cust_name_next(){
	illegal = 0;
	valid_names = [];

	for(var i = 0; i < cust_names.length; ++i){						//checks if all names are valid
		if(cust_names[i] == -1){
			illegal = 1;
		}

		else if(cust_names[i].length > 0){
			valid_names.push(cust_names[i]);
		}
	}

	if(!(illegal) && valid_names.length > 0){
		$("#error_container").hide();
		cust_tickets_change();
	}

	else{
		$("#error_container").show();
	}
}

function cust_tickets_change(){
	$("#heading_container").text(headings[1]);
	$("#error_container").text(error_msgs[1]);
	var customer_names = [];

	for(var i = 0; i < cust_names.length; ++i){
		if(cust_names[i] != 0){
			customer_names.push(cust_names[i])
		}
	}

	cust_names = customer_names;

	$(".input_cont").hide(0);
	$(".input_style").val("");

	for(var i = 0; i < cust_names.length; ++i){
		cust_tickets.push(0);
		$("#cust" + (i + 1)).show(400);
		$("#cust_input_" + (i + 1)).attr("placeholder", cust_names[i] + "'s tickets");
	}

	current_val = function(val, id){cust_tick_val(val, id)};
	next_funct = function(){cust_tickets_next()};
}

function cust_tickets_next(){
	var legal = 1;

	for(var i = 0; i < cust_tickets.length; ++i){
		if(cust_tickets[i] == -1 || cust_tickets[i] == 0){
			legal = 0;
		}
	}

	if(legal){
		$("#error_container").hide();
		prize_draw();
	}

	else{
		$("#error_container").show();
	}
}

function prize_draw(){
	var backstage_pass_index = Math.floor((Math.random() * cust_names.length) + 1) - 1;
		backstage_pass_winner = [cust_names[backstage_pass_index], backstage_pass_index];

	discounts();
}

function discounts(){
	//10% discount
	var ticket_price = 15.00	//NOT ACTUAL PRICE, TEMP TO GET WORKING

	for(var i = 0; i < cust_tickets.length; ++i){
		var cost = ticket_price * cust_tickets[i];
			discounted = cost * 0.9;
			cust_tickets[i] = discounted;
	}

	display_discounts();
}

function display_discounts(){
	$("#heading_container").text(headings[2]);
	$("#forward_butn_container").hide(0);
	$(".inpt_butn").hide(0);

	for(var i = 0; i < cust_names.length; ++i){
		var cust_out = cust_names[i] + ": £" + String(cust_tickets[i].toFixed(2));
		
		if(backstage_pass_winner[1] == i){
			cust_out = cust_out + " Backstage Pass Winner!"
		}

		$("#cust_input_" + (i + 1)).replaceWith("<div class='input_style'><p id='out_padd'>" +  cust_out + "</p></div>")
		//$("#cust_input_" + (i + 1)).attr("type", "text").prop("disabled", true);
	}

	$(".input_cont").height("auto");
	$(".input_style").css({"width": "100%", "height": "auto", "padding-top": "15px", "padding-bottom": "15px", "font-family": "FiraSansLight"});
}
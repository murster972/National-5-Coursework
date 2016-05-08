$(document).ready(function(){
	$(".input_style").focus(function(){
		var cur_id = $(this).attr("id")
			cust_num = parseInt(cur_id.replace("cust_input_", ""));
			margin = 2 / screen.width * 100;

		$("#butn" + String(cust_num)).hide();
		$("#" + cur_id).css({"float": "right"});
		$("#" + cur_id).css({"width": "99%"});
		$(".input_cont").css({"background-color": "#000"});
	})

	$(".input_style").blur(function(){

	})
})
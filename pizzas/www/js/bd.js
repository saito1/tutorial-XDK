$(function(){
	var i = Number(localStorage.getItem('pizza-counter')) + 1;
	var j, k, orderList;
	var $pizza = $("#PizzaName");
	var $pizzaList = $("#pizzas");
	var order = [];
	orderList = localStorage.getItem('pizza-registration');
	
	if(!orderList){
		$("#noErrors").css("display","block");
	}

	
		// Carregar Lista de Pizzas
		
		orderList = orderList ? orderList.split(',') : [];   
		for( j = 0, k = orderList.length; j < k; j++) {
			$pizzaList.append(
				"<li id='" + orderList[j] + "'>" + "<a class='editable' data-split-theme='c'>"	+ localStorage.getItem(orderList[j])+ "</a> <a href='#' class='close' data-icon='delete' data-theme='c'>X</a></li>"
			);
		}
    
	// Incluir Pizzas 
	$("#IncludePizzas").live("tap", function() {
		if($pizza.val() != ""){
			localStorage.setItem("pizza-"+i, $pizza.val());
			localStorage.setItem("pizza-counter",i);
			$("#noErrors").css("display","none");
			$pizzaList.append(
				"<li id='pizza-" + i + "'>" +  "<a class='editable' data-split-theme='c'>" + localStorage.getItem("pizza-" + i) + " </a><a href='#' data-icon='delete' class='close' data-theme='c'>x</a></li>"
			);
			$.mobile.changePage("#PizzaList", { transition: "slidedown"});		
			listaPizzas();
			$pizza.val("");
			
			i++;
		} 
		return false;
	});	
	
	// Excluir Pizzas
	$("#pizzas li a.close").live("tap", function() {
		//alert($(this).parent().attr("id"));
		localStorage.removeItem($(this).parent().attr("id"));
		 $(this).parent().slideUp('normal', function(){
				$(this).remove();
				listaPizzas();
			});
		 	
		return false;
	});
	
	function listaPizzas(){
		var $pizzaList = $("#PizzaList");
		order.length = 0;
		
		$pizzaList.each(function(){
			var id = $(this).attr("id");
			order.push(id);
		});
		$('ul').listview('refresh');
		localStorage.setItem("pizza-registration", order.join(","));	
	}	
});
// app.js
var proCount=new Array(101);
var toCount=new Array(100);
var TotalMoney=0;

$("#totalmoney").append(TotalMoney);

for(var i=0; i<proCount.length; i++) {
	proCount[i]=0;
}

var i=1;
$(document).ready(function() {
	$.getJSON("data/products.json",function(data){
		for(var i=0;i<data.length;i++){
			$("#productsbox").append(getProductHtml(data[i]));
		}
	});
	function getProductHtml(data){
		if( ! data ) return "";
		var product = "<div class='product' data-id='" + data.id + "'>";
		product += "<p class='product-name'>" + data.product + "</p>";
		product += "<p class='product-price'>" + data.price + "</p>";
		product += "<p class='product-detail'>" + data.detail + "</p>";
		product += "<p class='product-btns'><button class='btn btn-warning btn-sm'><span class='glyphicon glyphicon-trash'></button></p>";
		product += "</div>";
		return product;
	}

	$("body").on("mouseover", ".product", function(){
		$(this).draggable({
			helper: "clone"
		})
	})

	$("#cartbox").droppable({
		drop: function(event, ui) {
			var pro=$(ui.draggable);
			var id=$(pro).attr("data-id");
			var product=$(pro).children(".product-name").text();
			var price=$(pro).children(".product-price").text();
			var detail=$(pro).children(".product-detail").text();

			proCount[id]=proCount[id]+1;

			var reprice = price.split(",").join("");

			if(proCount[id]==1) {
				var cart = "<tr>";
				cart += "<td id='id_" + id + "'>'"+id+"'</td>";
				cart += "<td>"+product+"</td>";
				cart += "<td>"+reprice+"</td>";
				cart += "<td>"+detail+"</td>";
				cart += "<td id='count_" + id + "'>" + proCount[id]+"</td>";
				cart += "<td id='tmoney_" + id + "'>" + (reprice*proCount[id]) + "</td>";
				cart += "</tr>";

				$("#shoppinglist table tr:last").after(cart);
			}

			else {
				$("#count_"+id).text(proCount[id]);
				$("#tmoney_"+id).text((reprice*proCount[id]));
			}
			TotalMoney = parseInt(TotalMoney,10);
			reprice = parseInt(reprice,10);
			TotalMoney=TotalMoney+reprice;
			$("#totalmoney").text(TotalMoney);
		}		
	});
});	
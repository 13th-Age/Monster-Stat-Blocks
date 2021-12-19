var monsterList;
var html_row;
var html_bookOptions = "<option disabled selected></option>";
var html_monsterOptions = [];




function AddRow() {
	$("table#Encounter tbody").append(html_row);

	$("button.DeleteRow").button().click(function(){
		$(this).parents("tr").remove();
	});
	$("input.spinner").spinner();
	$("select.bookList").selectmenu({
		width: 150
	});
	$("select.monsterList").selectmenu()
		.selectmenu("menuWidget")
		.addClass("overflow");
	$("select.bookList").on("selectmenuchange",function(){
		MonsterSelectPopulate(this);
	});
}




function DeleteRow() {
	$(this).parents("tr").remove();
}




function GenerateStatBlocks() {
	if (
		$("#EncounterName").val() == ""
	) {
		alert("Missing Name");
	} else {
		var missingMonster = 0;

		$("table#Encounter tbody tr select.monsterList option:selected").each(function(){
			if ($(this).val() == "") {
				missingMonster = 1;
			}
		});

		if (missingMonster == 1) {
			alert("Missing Monster");
		} else {
			var output = "[";

			output += $("table#Encounter tbody tr").map(function(){
				return (
					'{"book":'
					+ $(this).find("select.bookList option:selected").val()
					+ ',"monster":'
					+ $(this).find("select.monsterList option:selected").val()
					+ "}"
				)
			}).get().join();

			output += "]";

			window.open("Encounter.html?name=" + $("#EncounterName").val() + "&monsters=" + output);
		}
	}
}




function InitialPopulate() {
	// monsterList.forEach(function(item,index){
	// 	html_monsterOptions += "<option value='" + index + "'>" + item.name + "</option>";
	// });

	monsterList.forEach(function(item,i){
		var monsters = "<option disabled selected></option>";

		html_bookOptions += "<option value='" + i + "'>" + item.name + "</option>";

		item.monsters.forEach(function(item,i){
			monsters += "<option value='" + i + "'>" + item.name + "</option>";
		});
		html_monsterOptions.push(monsters);
	});

	html_row
		= "<tr>"
		+ "<td><button class='DeleteRow'>-</button></td>"
		+ "<td><select class='bookList'>" + html_bookOptions + "</select></td>"
		+ "<td><select class='monsterList'><option disabled selected></option></select></td>"
		+ "</tr>";

	AddRow();
}




function MonsterSelectPopulate(ui) {
	$(ui).parent().next().find("select.monsterList").html(html_monsterOptions[$(ui).find("option:selected").val()]).selectmenu("refresh");
}




$(document).ready(function() {
	$("button").button();
});

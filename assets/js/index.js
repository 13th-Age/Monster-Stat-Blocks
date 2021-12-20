var monsterList;
var html_row;
var html_monsterGroupOptions = "<option disabled selected></option>";
var html_monsterOptions = [];




function AddRow() {
	$("table#Encounter tbody").append(html_row);

	$("button.DeleteRow").button().click(function(){
		$(this).parents("tr").remove();
	});
	$("input.spinner").spinner();

	$("select.monsterGroupList").selectmenu({
		width: 200
	});
	$("select.monsterGroupList").on("selectmenuchange",function(){
		MonsterGroupChangeSelectPopulate(this);
	});

	$("select.monsterList").selectmenu({
		width: 400
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
					'{"monsterGroup":'
					+ $(this).find("select.monsterGroupList option:selected").val()
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
	monsterList.forEach(function(item,i){
		var monsterGroup = "<option disabled selected></option>";

		html_monsterGroupOptions += "<option value='" + i + "'>" + item.name + "</option>";

		item.monsters.forEach(function(item,i){
			monsterGroup += "<option value='" + i + "'>" + item.name + " - " + item.source + "</option>";
		});

		html_monsterOptions.push(monsterGroup);
	});

	html_row
		= "<tr>"
		+ "<td><button class='DeleteRow'>-</button></td>"
		+ "<td><select class='monsterGroupList'>" + html_monsterGroupOptions + "</select></td>"
		+ "<td><select class='monsterList'><option disabled selected></option></select></td>"
		+ "</tr>";

	AddRow();
}




function MonsterGroupChangeSelectPopulate(ui) {
	$(ui).parent().next().find("select.monsterList").html(
		html_monsterOptions[
			$(ui).find("option:selected").val()
		]
	).selectmenu("refresh");
}




$(document).ready(function() {
	$("button").button();
});

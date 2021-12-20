var monsterList;
var html_row;
var html_bookOptions = "<option disabled selected></option>";
var html_monsterGroupOptions = [];
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
	$("select.bookList").on("selectmenuchange",function(){
		BookChangeSelectPopulate(this);
	});

	$("select.monsterGroupList").selectmenu({
		width: 200
	})
		.selectmenu("menuWidget")
		.addClass("overflow");
	$("select.monsterGroupList").on("selectmenuchange",function(){
		MonsterGroupChangeSelectPopulate(this);
	});

	$("select.monsterList").selectmenu({
		width: 300
	})
		.selectmenu("menuWidget")
		.addClass("overflow");
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
					+ ',"monsterGroup":'
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
		var monsterGroups = "<option disabled selected></option>";
		var monsters = [];

		html_bookOptions += "<option value='" + i + "'>" + item.name + "</option>";

		item.monsterGroups.forEach(function(item,i){
			var monstersInGroup = "<option disabled selected></option>";

			monsterGroups += "<option value='" + i + "'>" + item.name + "</option>";

			item.monsters.forEach(function(item,i){
				monstersInGroup += "<option value='" + i + "'>" + item.name + "</option>";
			});

			monsters.push(monstersInGroup);
		});

		html_monsterGroupOptions.push(monsterGroups);
		html_monsterOptions.push(monsters);
	});

	html_row
		= "<tr>"
		+ "<td><button class='DeleteRow'>-</button></td>"
		+ "<td><select class='bookList'>" + html_bookOptions + "</select></td>"
		+ "<td><select class='monsterGroupList'><option disabled selected></option></select></td>"
		+ "<td><select class='monsterList'><option disabled selected></option></select></td>"
		+ "</tr>";

	AddRow();
}




function BookChangeSelectPopulate(ui) {
	$(ui).parent().next().find("select.monsterGroupList").html(html_monsterGroupOptions[$(ui).find("option:selected").val()]).selectmenu("refresh");
	$(ui).parent().next().next().find("select.monsterList").html("<option disabled selected></option>").selectmenu("refresh");
}




function MonsterGroupChangeSelectPopulate(ui) {
	$(ui).parent().next().find("select.monsterList").html(
		html_monsterOptions[
			$(ui).parent().prev().find("select.bookList option:selected").val()
		][
			$(ui).find("option:selected").val()
		]
	).selectmenu("refresh");
}




$(document).ready(function() {
	$("button").button();
});

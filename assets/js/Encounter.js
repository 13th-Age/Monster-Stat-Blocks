var monsterList;
var monsterArray = [];
var monsterDetails = [];




var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1)
		, sURLVariables = sPageURL.split('&')
		, sParameterName
		, i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};




function CreateStatBlocks() {
	var html = "";

	monsterArray.forEach(function(item,i){
		var monsterDetails = monsterList[item.book].monsters[item.monster];

		html += "<h2>" + monsterDetails.name + "</h2>"
			+ "<table>"
			+ "<tbody>"
			+ "<tr>"
				+ "<td>AC</td>"
				+ "<td>" + monsterDetails.AC + "</td>"
				+ "<td rowspan='4' style='padding: 5px 10px 5px 30px; text-indent: -20px;'><p>Initiative "
					+ ((monsterDetails.initiative >= 0) ? "+" : "")
					+ monsterDetails.initiative;
					+ "</p>"

		monsterDetails.attacks.forEach(function(attack,i){
			html += "<p>"
				+ ((attack.specialTrigger == true) ? "<em>[Special trigger]</em> " : "")
				+ "<strong>"
					+ ((attack.type == "close") ? "C: " : "")
					+ ((attack.type == "ranged") ? "R: " : "")
					+ attack.name + " "
					+ ((attack.modifier >= 0) ? "+" : "") + attack.modifier
					+ " vs. " + attack.defence
					+ ((attack.target != "") ? " (" + attack.target + ")" : "")
				+ "</strong> - "
				+ attack.damage;

			attack.extraEffects.forEach(function(extraEffect,i){
				html += "<br>"
					+ "<em>" + extraEffect.trigger + "</em>: "
					+ extraEffect.effect;
			});

			html += "</p>";
		});

		if (monsterDetails.abilities.length != 0) {
			monsterDetails.abilities.forEach(function(ability,i){
				html += "<p><em>" + ability.name + "</em>"
					+ ((ability.effect != "") ? ": " + ability.effect : "")
					+ "</p>";
			});
		}

		if (monsterDetails.nastierSpecials.length != 0) {
			html += "<p><strong>Nastier Specials</strong></p>";

			monsterDetails.nastierSpecials.forEach(function(nastierSpecial,i){
				html += "<p><em>" + nastierSpecial.name + "</em>: " + nastierSpecial.effect + "</p>";
			});
		}

		html += "</td>"
				+ "<td>" + Capitalise(monsterDetails.size) + "</td>"
			+ "</tr>"
			+ "<tr>"
				+ "<td>PD</td>"
				+ "<td>" + monsterDetails.PD + "</td>"
				+ "<td>Level " + monsterDetails.level + "</td>"
			+ "</tr>"
			+ "<tr>"
				+ "<td>MD</td>"
				+ "<td>" + monsterDetails.MD + "</td>"
				+ "<td>" + Capitalise(monsterDetails.role) + "</td>"
			+ "</tr>"
			+ "<tr>"
				+ "<td>HP</td>"
				+ "<td>" + monsterDetails.HP + "</td>"
				+ "<td>" + Capitalise(monsterDetails.type) + "</td>"
			+ "</tr>"
			+ "</tbody>"
			+ "</table>"
			+ "<hr>";
	});

	$("#StatBlocks").html(html);
}




function Capitalise(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}




$(document).ready(function() {
	monsterArray = JSON.parse(getUrlParameter('monsters'));
	$("section#title h1").text(getUrlParameter('name'))
});

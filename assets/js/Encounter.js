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




function PopulatePage() {
	var html_monster = "<h1>Monsters</h1>";
	var html_group = "";
	var groupArray = []

	monsterArray.forEach(function(item,i){
		var monsterDetails = monsterList[item.monsterGroup].monsters[item.monster];

		if (groupArray.indexOf(item.monsterGroup) == -1) {
			groupArray.push(item.monsterGroup);
		}

		html_monster += "<h2>" + monsterDetails.name + "</h2>"
			+ "<table>"
			+ "<tbody>"
			+ "<tr>"
				+ "<td>AC</td>"
				+ "<td>" + monsterDetails.AC + "</td>"
				+ "<td rowspan='4' style='padding-left:30px; text-indent: -20px;'><p style='margin-bottom: 0px;'>Initiative "
					+ ((monsterDetails.initiative >= 0) ? "+" : "")
					+ monsterDetails.initiative
					+ "</p>"
					+ ((monsterDetails.vulnerability != "") ? "<p style='margin-top: 0px;'>Vulnerability: " + monsterDetails.vulnerability : "");

		monsterDetails.attacks.forEach(function(attack,i){
			html_monster += "<p>"
				+ ((attack.specialTrigger == true) ? "<em>[Special trigger]</em> " : "")
				+ "<strong>"
					+ ((attack.type == "close") ? "C: " : "")
					+ ((attack.type == "ranged") ? "R: " : "")
					+ attack.name + " "
					+ (
						(attack.defence != "")
						? ((attack.modifier >= 0) ? "+" : "") + attack.modifier
							+ " vs. " + attack.defence
						: ""
					)
					+ ((attack.target != "") ? " (" + attack.target + ")" : "")
				+ "</strong> - "
				+ attack.damage;

			attack.extraEffects.forEach(function(extraEffect,i){
				html_monster += "<br>"
					+ "<em>" + extraEffect.trigger + "</em>: "
					+ extraEffect.effect;
			});

			html_monster += "</p>";
		});

		if (monsterDetails.abilities.length != 0) {
			monsterDetails.abilities.forEach(function(ability,i){
				html_monster += "<p><em>" + ability.name + "</em>"
					+ ((ability.effect != "") ? ": " + ability.effect : "")
					+ "</p>";
			});
		}

		if (monsterDetails.nastierSpecials.length != 0) {
			html_monster += "<p><strong>Nastier Specials</strong></p>";

			monsterDetails.nastierSpecials.forEach(function(nastierSpecial,i){
				html_monster += "<p><em>" + nastierSpecial.name + "</em>: " + nastierSpecial.effect + "</p>";
			});
		}

		html_monster += "</td>"
				+ "<td>"
					+ (
						(
							monsterDetails.sizeStrength === "normal"
						)
						? Capitalise(monsterDetails.threat)
						: Capitalise(monsterDetails.sizeStrength)
							+ (
								(
									monsterDetails.threat === "normal"
								)
								? ""
								: " " + Capitalise(monsterDetails.threat)
							)
					)
				+ "</td>"
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

	if (groupArray.length != 0) {
		groupArray.forEach(function(item,i){
			var groupDetails = monsterList[item];

			if (groupDetails.groupTraits.length != 0) {
				if (html_group == "") {
					html_group += "<h1>Group Abilities</h1>"
				}

				html_group += "<h2>" + groupDetails.name + "</h2>";

				groupDetails.groupTraits.forEach(function(item,i){
					html_group += "<h3>" + item.name + "</h3>"
						+ "<ul style='list-style-type: none; padding: 0px;'>";

					item.traits.forEach(function(item,i){
						html_group += "<li style='padding-left:30px; text-indent: -20px;'><em>"
							+ item.name
							+ "</em>"
							+ ((item.description == "") ? "" : ": " + item.description)
							+ "</li>";
					});

					html_group += "</ul><hr>";
				});
			}
		});
	}

	$("#StatBlocks").html(html_group + html_monster);
}




function Capitalise(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}




$(document).ready(function() {
	monsterArray = JSON.parse(getUrlParameter('monsters'));
	$("section#title h1").text(getUrlParameter('name'))
});

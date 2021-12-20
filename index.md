---
jQueryHead: true
---

This website uses trademarks and/or copyrights owned by Fire Opal Media, which are used under the Fire Opal Media, 13th Age Community Use Policy.
We are expressly prohibited from charging you to use or access this content.
This website is not published, endorsed, or specifically approved by Fire Opal Media.
For more information about Fire Opal Media’s 13th Age Community Use Policy, please visit [www.fireopalmedia.com/13th-age-community-use](//www.fireopalmedia.com/13th-age-community-use).
For more information about Fire Opal Media and 13th Age products, please visit [www.fireopalmedia.com](//www.fireopalmedia.com) and [www.pelgranepress.com](//www.pelgranepress.com).

# Encounter

Name: <input id="EncounterName">

<button onclick="AddRow()">Add Row</button>
<button onclick="GenerateStatBlocks()">Generate</button>

<table id="Encounter">
<thead>
<tr>
	<td></td>
	<td>Book</td>
	<td>Group</td>
	<td>Monster</td>
</tr>
</thead>
<tbody>
</tbody>
</table>




<script src="{{ 'assets/js/index.js?v=' | append: site.github.build_revision }}"></script>

<script>
$(document).ready(function() {
	//Get Monster List Data
	$.get(
		"{{ 'assets/json/MonsterList.json?v=' | append: site.github.build_revision }}"
		,function(data){
			monsterList = $(data).toArray();

			InitialPopulate();
		}
	);
});
</script>

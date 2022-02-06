---
jQueryHead: true
---

<div id="StatBlocks"></div>

<script src="{{ 'assets/js/Encounter.js?v=' | append: site.github.build_revision }}"></script>

<script>
$(document).ready(function() {
	//Get Monster List Data
	$.get(
		"{{ './assets/json/MonsterList.json?v=' | append: site.github.build_revision }}"
		,function(data){
			monsterList = $(data).toArray();

			PopulatePage();
		}
	);
});
</script>

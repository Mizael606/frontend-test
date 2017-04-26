// your code
var persons,
	personsBoxes 	= document.getElementById('list').firstChild.nodeValue,
	list 			= document.getElementById('persons');


function generateRanks(){

	var ranks 		= persons.data,
		indsRanks 	= [],
		personsJson = {},
		templateOfBox;

	ranks.forEach(function(v, k){

		v.positive = (v.positive == null) ? 0: parseInt(v.positive);
		indsRanks.push(v.positive);
		personsJson[v.positive] = ranks[k];


	});

	indsRanks = indsRanks.sort(function(a,b){return b-a;});

	indsRanks.forEach(function(v, k){

		var code,
			object 		   = personsJson[v],
			votes 		   = parseInt(object.positive) + parseInt(object.negative),
			templateConfig = {

				rank 		: (k + 1),
				imagem 		: object.picture,
				nome 		: object.name,
				descricao 	: object.description.replace("&ordm;","°"),
				likes 		: Math.round(parseInt(object.positive) / (votes / 100)),
				unlikes		: Math.round(parseInt(object.negative) / (votes / 100)),
				mark 		: ""

			};

		templateConfig.mark = ((templateConfig.rank % 2) == 0) ? " mark": "";

		templateConfig.likes 	= (isNaN(templateConfig.likes)) ? 0 : templateConfig.likes;
		templateConfig.unlikes 	= (isNaN(templateConfig.unlikes)) ? 0 : templateConfig.unlikes;

		code = Mustache.render(personsBoxes, templateConfig);
		list.innerHTML += code;


	});

}

function init(){

	generateRanks();

}

(function(){
	
	var initAjax = new XMLHttpRequest();
		initAjax.open("GET", "fazenda.json");
		initAjax.onload = function(response){
		
			persons = JSON.parse(response.currentTarget.response);
			init();

		};

		initAjax.send();


}());



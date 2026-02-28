// var words = require('an-array-of-french-words')
// console.log(words.filter(d =>/arb/.test(d)))

// var cases=[];
// var erreurs=0;
// var lettresTrouvees=0;
// var fini=false;function box(alert_string, mot){var box=document.createElement("DIV");
var mot = 'oiseau'
box.id="notice";searchLink="http://google.com/search?q="+mot.toLowerCase()+"+definition";
console.log(box.id)


// if(url !="http://jeudupendu.fr"){searchLink +=url.replace("http://jeudupendu.fr", "+").replace("/", "").replace("-", "+")}box.innerHTML="<h1>"+alert_string+"</h1><div style=\"text-align:center;margin:auto\">"+"<a style=\"font-size:1.3em\" href=\""+url+"\">Nouvelle partie</a><br/><br/>"+"<a style=\"font-size:0.9em\" href=\""+searchLink+"\" target=\"_blank\">Recherche "+"<span style=\"color:#7777FF\">G</span><span style=\"color:#FF7777\">o</span><span style=\"color:#FFFF77\">o</span>"+"<span style=\"color:#7777FF\">g</span><span style=\"color:#77FF77\">l</span><span style=\"color:#FF7777\">e</span> de \""+mot.toLowerCase()+"\"</div>";document.body.appendChild(box);};function input(event){var key=String.fromCharCode(event.keyCode);if(event.keyCode <=90 && event.keyCode >=65){p(key.toUpperCase());}};function p(lettre){var element=document.getElementById(lettre);if(element.style.backgroundColor !="rgb(85, 144, 192)" && !fini){var trouve=false;element.style.backgroundColor="#5590C3";document.getElementById(lettre + "m").style.backgroundColor="#5590C3";for(var i=0;i < l;i++){if(mot[i]==element.innerHTML){cases[i].innerHTML=element.innerHTML;trouve=true;lettresTrouvees++;}}if(!trouve){erreurs++;document.getElementById("pendu").style.backgroundPosition="-"+erreurs*250+"px 0px";if(erreurs==9){box("Vous avez perdu ! Le mot secret était : "+mot+".", mot);for(var i=0;i < l;i++){cases[i].innerHTML=mot[i];}fini=true;}}if(lettresTrouvees==l){box("Bravo, vous avez découvert le mot secret !", mot);fini=true;}}};function init(){document.body.addEventListener("keydown", function(event){input(event);});for(var i=0;i < l;i++){var td=document.createElement("TD");td.id=i;td.innerHTML="_";document.getElementById("mot-tr").appendChild(td);cases[i]=document.getElementById(i);}};
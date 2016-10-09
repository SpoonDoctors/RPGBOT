function help(){
	var returnMsg = "Trying making a character"; 
    	return returnMsg;
}

//Class stufff
function character(){
	this.characterName = "";
	this.characterRace = "";
	this.characterClass = "";
	this.att = 0;
	this.def = 0;
	this.acc = 0
	this.eva = 0;
	this.spd = 0;
	this.hp = 0;
}
	
	//character name functions
character.prototype.setCharacterName = function( characterName ){
	this.characterName = characterName;
}
	
character.prototype.getCharacterName = function(){
	return this.characterName;
}

character.prototype.getCharacterName = function(){
	return this.characterName;
}

character.prototype.setCharacterRace = function( characterRace ){
	this.characterRace = characterRace;
}

character.prototype.getCharacterRace = function(){
	return this.characterRace;
}

character.prototype.setCharacterClass = function( characterClass ){
	this.characterClass = characterClass;
}

character.prototype.getCharacterClass = function(){
	return this.characterClass;
}


character.prototype.setCharacterStats = function( race, className ){
	switch(race){
		case "Human":
			this.att = 60;
			this.def = 50;
			this.acc = 45
			this.eva = 40;
			this.spd = 100;
			this.hp = 50;
			break;
		case "Android":
			this.att = 50;
			this.def = 55;
			this.acc = 60;
			this.eva = 55;
			this.spd = 35;
			this.hp = 50;
			break;
		case "Glorgok":
			this.att = 30;
			this.def = 70;
			this.acc = 40;
			this.eva = 30;
			this.spd = 30;
			this.hp = 75;
			break;
		case "Ikatrians":
			this.att = 30;
			this.def = 70;
			this.acc = 40;
			this.eva = 30;
			this.spd = 30;
			this.hp = 75;
			break;
		case "Zolts":
			this.att = 30;
			this.def = 70;
			this.acc = 40;
			this.eva = 30;
			this.spd = 30;
			this.hp = 75;
			break;
	}
	switch(className){
		case "Warrior":
			this.att = this.att + 10;
			this.def = this.def + 5;
			break;
		case "Rogue":
			this.spd = this.spd + 10;
			this.eva = this.eva + 5;
			break;
		case "Ranger":
			this.acc = this.acc + 10;
			this.att = this.att + 5;
			break;
		case "Berzerker":
			this.att = this.att + 10;
			this.hp = this.hp + 10;
			this.def = this.def - 5;
			break;
		case "Xenomancer":
			this.att = this.att + 10;
			this.acc = this.acc + 5;
			break;
	}
}

character.prototype.getAttack = function(){
	return this.att;
}

character.prototype.getDefense = function(){
	return this.def;
}

character.prototype.getAccuracy = function(){
	return this.acc;
}

character.prototype.getEvasiveness = function(){
	return this.eva;
}

character.prototype.getSpeed = function(){
	return this.spd;
}

character.prototype.getHp = function(){
	return this.hp;
}



module.exports.help=help;
module.exports.character=character;

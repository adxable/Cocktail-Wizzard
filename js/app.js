//***********************
// FUTURE UPGRADE

// 1. More coctails
// 2. Print menu
// 3. Print specs
// 4. Glass
// 5. Improved allerts
// 6. kcall calculation -- CHALANGE



//***************************
// COCTAIL WIZZARD CONTROLLER


var cocktailWizzardController = (function() {

	var CocktailIng = function(id, spiritName, ingrMl, vol, botCost, botMl) {
		this.id = id;
		this.spiritName = spiritName;
		this.ingrMl = ingrMl;
		this.vol = vol;
		this.botCost = botCost;
		this.botMl = botMl;
	};

	var calculateTotal = function() {
		//cocktail cost
		var sumCC = 0;
		var sumV = 0; 
		var sumMl = 0;


		data.allItems.ing.forEach(function(cur) {
			sumCC += cur.botCost / (cur.botMl / cur.ingrMl);
		});

		data.totals.cocktCost = Math.round(sumCC * 100) / 100;

		data.allItems.ing.forEach(function(cur) {
			sumMl += cur.ingrMl;

		});

		data.totals.cocktMl = sumMl;

		data.allItems.ing.forEach(function(cur) {
			sumV += cur.ingrMl * cur.vol;
		});

		if (sumMl !== 0) {
			data.totals.cocktVol = Math.round(sumV / sumMl);
		} else {
			data.totals.cocktVol = 0;
		}
		

	};

	var data = {
		allItems: {
			ing: []
		},
		totals: {
			//sumCC
			cocktCost: 0,
			//sumV
			cocktVol: 0,
			//sumMl
			cocktMl: 0
		},
		newCoctail: true
	};

	return {
		// spiritName, ingrMl, vol, botCost, botMl
		addIngr: function(sn, im, vl, bc, bl) {
			var newIngredient, ID;

			// ID = lastID + 1

			// create new id
			if (data.allItems.ing.length > 0) {
				ID = data.allItems.ing[data.allItems.ing.length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item 
			newIngredient = new CocktailIng(ID, sn, im, vl, bc, bl);

			// Push into data structure
			data.allItems.ing.push(newIngredient);

			// Return the new element
			return newIngredient;

		},

		deleteItem: function(id) {
			var ids, index;

			ids = data.allItems.ing.map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				data.allItems.ing.splice(index, 1);
			}
		},


		calculateCocktail: function() {

			//calculate cost
			calculateTotal('ing');

		},

		
		getCC: function() {
			return {
				totalCost: data.totals.cocktCost,
				totalVol: data.totals.cocktVol,
				totalMl: data.totals.cocktMl
			}

		},

		//cocktailWizzardController.testing()
		 
		testing: function() {
            console.log(data);
        }
	};


})();

//***************************
// UI CONTROLLER

var UIController = (function() {
	//Store DOM
	var DOMstrings = {
		//inputs
		// inputCocktailName: '.add__cocktailname',
		inputSpiritName: '.add__spiritname',
		inputIngrMl: '.add__ingrMl',
		inputVol: '.add__vol',
		inputBottleCost: '.add__bottleCost',
		inputBottleMl: '.add__bottleMl',
		inputSubmitIngr: '.submit__ingr',
		inputCalcCocktail: '.calc__cocktail',
		//add ingredient and delete
		cocktailContainer: '.container__ing__box',
		//display calculations
		costLabel: '.cockt__cost',
		volLabel: '.cockt__vol',
		mlLabel: '.cockt__totalMl'
	};

	return {
		getInput: function() {

			return {

				// cocktailName: document.querySelector(DOMstrings.inputCocktailName).value,
				spiritName: document.querySelector(DOMstrings.inputSpiritName).value,
				ingrMl: parseFloat(document.querySelector(DOMstrings.inputIngrMl).value),
				vol: parseFloat(document.querySelector(DOMstrings.inputVol).value),
				bottleCost: parseFloat(document.querySelector(DOMstrings.inputBottleCost).value),
				bottleMl: parseFloat(document.querySelector(DOMstrings.inputBottleMl).value)
			};

		},

		// function(obj, type) --> If more cocktails // id ??
		addIngItem: function(obj) {
			var html, newHtml, element;

			element = DOMstrings.cocktailContainer;

			html = '<div id="ing-%id%" class="container-flex-ingredient"><div class="ingr-box"><div class="ingr__name ingr-item">Ingredient: %spiritName%</div><div class="ingr__ml ingr-item">ml: %ingrMl%</div><div class="ingr__vol ingr-item">vol%: %vol%</div><div class="ingr__botC ingr-item">Bottle price: %bottleCost%</div><div class="ingr__botMl ingr-item">Bottle capacity: %bottleMl%</div></div><div class="item__delete flex-button"><button class="item__delete--btn"></button></div></div>';


			// replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%spiritName%', obj.spiritName);
			newHtml = newHtml.replace('%ingrMl%', obj.ingrMl);
			newHtml = newHtml.replace('%vol%', obj.vol);
			newHtml = newHtml.replace('%bottleCost%', obj.botCost);
			newHtml = newHtml.replace('%bottleMl%', obj.botMl);
			

			// insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

		},

		deleteIng: function(selectorID) {

			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);

		},

		clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputSpiritName + ', ' + DOMstrings.inputIngrMl + ', ' + DOMstrings.inputVol + ', ' + DOMstrings.inputBottleCost + ', ' + DOMstrings.inputBottleMl);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
            });

            fieldsArr[0].focus();

        },


        displayCalculation: function(obj) {
        	document.querySelector(DOMstrings.costLabel).textContent = obj.totalCost;
        	document.querySelector(DOMstrings.volLabel).textContent = obj.totalVol;
        	document.querySelector(DOMstrings.mlLabel).textContent = obj.totalMl;

        },

		getDOMstrings: function() {
			return DOMstrings;
		}
	};

})();

//***************************
// GLOBAL APP CONTROLLER

var controller = (function(cwCtrl, UICtrl) {
	
	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputSubmitIngr).addEventListener('click', ctrlSubmitIngr);

		document.addEventListener('keypress', function(event) {

			if (event.keyCode === 13 || event.which === 13) {
				ctrlSubmitIngr();
			}
		});

		document.querySelector(DOM.cocktailContainer).addEventListener('click', ctrlDeleteIngr);
	};

	var updateCocktail = function() {

		// 1. Calculate Cocktail Cost
		cwCtrl.calculateCocktail();

		// 4. Return
		var calcReturn = cwCtrl.getCC();

		// 5. Display
		UICtrl.displayCalculation(calcReturn);




	};

	var ctrlSubmitIngr = function() {
		var input, newIngredient;

		// 1. Get the field input data
		input = UICtrl.getInput();

		if (input.spiritName !=='' &&  !isNaN(input.ingrMl) && !isNaN(input.vol) && !isNaN(input.bottleCost) && !isNaN(input.bottleMl) && input.ingrMl > 0 && input.bottleCost > 0 && input.bottleMl > 0 && input.bottleMl > input.ingrMl) {

			// 2. Add the item to the  controller
			// spiritName, ingrMl, vol, bottleCost, bottleMl
			newIngredient = cwCtrl.addIngr(input.spiritName, input.ingrMl, input.vol, input.bottleCost, input.bottleMl);

			// 3. Add the item to the UI
			UICtrl.addIngItem(newIngredient);

			// 4. Clear fields
			UICtrl.clearFields();

			// 5. Calculate 
			cwCtrl.calculateCocktail();

			// 6. Display
			updateCocktail();

		} else if (input.bottleMl < input.ingrMl) {
			alert('check bottle size ml input. Remember to fill bottle capacity input in ml. (1 litre = 1000ml)')

		} else {
			alert('check and fill all inputs correctly ;)')
		}
		 
	};

	var ctrlDeleteIngr = function(event) {
		var itemID, splitID, ID;
		// TEST
		// console.log(event.target.parentNode.parentNode);

		// var a = 'ing-1'
        // a.split('-') --> ['ing', '1']
        // el = splitID[0];
        // ID = splitID[1];

		itemID = event.target.parentNode.parentNode.id;
		splitID = itemID.split('-');
		ID = parseInt(splitID[1]);

		// 1. Delete item from data structure
		cwCtrl.deleteItem(ID);
		// 2. Delete item from user interface
		UICtrl.deleteIng(itemID);
		// 3. Update and show the new budget
		updateCocktail();


	};

	return {
		init: function () {
			console.log('start app');
			UICtrl.displayCalculation({
				totals: {
					cocktCost: 0,
					cocktVol: 0,
					cocktMl: 0
				}
			
			});

			setupEventListeners();
		}
	};


})(cocktailWizzardController, UIController);

// document.querySelector('.new__cocktail--btn').addEventListener('click', controller.init);

controller.init();






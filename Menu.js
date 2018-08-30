window.menu = function(obfuscate, game, options, callbacks) {
	
	var binded = false;
	var menuOpened = false;
	var lastActiveContainer = null;
	var backToGameListener = false;

	var tabs = [
		{
			"name": "Bind Modules"
		},
		{
			"name": "Transparency"
		},
		{
			"name": "Extended config"
		}
	];

	var elements = [
		{
			"type": "slider",
			"description": "Particles transparency level",
			"inputProps": {
				"min": "0",
				"max": "1",
				"step": "0.01",
				"value": "particlesTransparency"
			},
			"callbacks": {
				"value": "particlesTransparencyCb"
			},
			"tabId": 1
		},
		{
			"type": "slider",
			"description": "Ceiling transparency level",
			"inputProps": {
				"min": "0",
				"max": "1",
				"step": "0.01",
				"value": "ceilingTransparency"
			},
			"callbacks": {
				"value": "ceilingTransparencyCb"
			},
			"tabId": 1
		},
		{
			"type": "slider",
			"description": "Big map transparency level",
			"inputProps": {
				"min": "0",
				"max": "1",
				"step": "0.01",
				"value": "bigMapTransparency"
			},
			"callbacks": {
				"value": "bigMapTransparencyCb"
			},
			"tabId": 1
		},
		{
			"type": "slider",
			"description": "Grenade color",
			"inputProps": {
				"min": "0",
				"max": "16777216",
				"step": "1",
				"value": "fragGrenadeColor"
			},
			"callbacks": {
				"value": "grenadePropertiesCb",
				"useInputValueFrom": "fragGrenadeSize",
				"position": 0
			},
			"tabId": 1
		},
		{
			"type": "slider",
			"description": "Grenade size",
			"inputProps": {
				"min": "0.1",
				"max": "0.5",
				"step": "0.01",
				"value": "fragGrenadeSize"
			},
			"callbacks": {
				"value": "grenadePropertiesCb",
				"useInputValueFrom": "fragGrenadeColor",
				"position": 1
			},
			"tabId": 1
		},
		{
			"type": "resetButton",
			"description": "Reset grenade properties",
			"callbacks": {
				"value": "defaultGrenadePropertiesCb"
			},
			"tabId": 1
		},
		{
			"type": "slider",
			"description": "Smoke alpha",
			"inputProps": {
				"min": "0",
				"max": "1",
				"step": "0.01",
				"value": "smokeGrenadeAlpha"
			},
			"callbacks": {
				"value": "smokeGrenadePropertiesCb"
			},
			"tabId": 1
		},
		{
			"type": "checkbox",
			"description": "Auto aim enabled",
			"inputProps": {
				"value": "autoAim.enabled"
			},
			"callbacks": {
				"value": "autoAimEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Target enemy nickname visibility",
			"inputProps": {
				"value": "autoAim.targetEnemyNicknameVisibility"
			},
			"callbacks": {
				"value": "autoAimTargetEnemyVisibilityCb"
			},
			"tabId": 0
		},
		{
			"type": "slider",
			"description": "Forward firing coeff",
			"inputProps": {
				"min": "0.9",
				"max": "1.1",
				"step": "0.01",
				"value": "autoAim.forwardFiringCoeff"
			},
			"callbacks": {
				"value": "forwardFiringCoeffCb"
			},
			"tabId": 1
		},
		{
			"type": "checkbox",
			"description": "Auto loot enabled",
			"inputProps": {
				"value": "autoLoot.enabled"
			},
			"callbacks": {
				"value": "autoLootEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Auto heal enabled",
			"inputProps": {
				"value": "autoHeal.enabled"
			},
			"callbacks": {
				"value": "autoHealEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Auto opening doors enabled",
			"inputProps": {
				"value": "autoOpeningDoors.enabled"
			},
			"callbacks": {
				"value": "autoOpeningDoorsEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Grenade timer enabled",
			"inputProps": {
				"value": "grenadeTimer.enabled"
			},
			"callbacks": {
				"value": "grenadeTimerEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Laser pointer enabled",
			"inputProps": {
				"value": "laserPointer.enabled"
			},
			"callbacks": {
				"value": "laserPointerEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Lines to players enabled",
			"inputProps": {
				"value": "linesToPlayers.enabled"
			},
			"callbacks": {
				"value": "linesToPlayersEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Repeat fire enabled",
			"inputProps": {
				"value": "autoFire.enabled"
			},
			"callbacks": {
				"value": "autoFireEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "checkbox",
			"description": "Zoom changing enabled",
			"inputProps": {
				"value": "zoomRadiusManager.enabled"
			},
			"callbacks": {
				"value": "zoomRadiusManagerEnableCb"
			},
			"tabId": 0
		},
		{
			"type": "select",
			"description": "Automatic weapon(slot 1) pick up",
			"inputProps": {
				"valuesFromFunction": "getAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 1
				},
				"selected": "autoLoot.autoPickUp.weapon1"
			},
			"callbacks": {
				"value": "setAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 1,
					"position": 0
				}
			},
			"tabId": 2
		},
		{
			"type": "select",
			"description": "Automatic weapon(slot 2) pick up",
			"inputProps": {
				"valuesFromFunction": "getAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 2
				},
				"selected": "autoLoot.autoPickUp.weapon2"
			},
			"callbacks": {
				"value": "setAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 2,
					"position": 0
				}
			},
			"tabId": 2
		},
		{
			"type": "select",
			"description": "Automatic weapon(slot 3) pick up",
			"inputProps": {
				"valuesFromFunction": "getAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 3
				},
				"selected": "autoLoot.autoPickUp.weapon3"
			},
			"callbacks": {
				"value": "setAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 3,
					"position": 0
				}
			},
			"tabId": 2
		},
		{
			"type": "select",
			"description": "Automatic skin pick up",
			"inputProps": {
				"valuesFromFunction": "getAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 5
				},
				"selected": "autoLoot.autoPickUp.skin"
			},
			"callbacks": {
				"value": "setAutoLootAutoPickUpCb",
				"functionValue": {
					"value": 5,
					"position": 0
				}
			},
			"tabId": 2
		}
	];

	var addSelect = function(descriptionText, inputProps, callback) {
		var select = document.createElement('div');

		if(callbacks[callback.value]) {
			/* Description */
			var description = document.createElement('p');
			description.className = "slider-text";
			description.innerHTML = descriptionText;

			/* Select element */
			var selectList = document.createElement("select");

			/* Options */
			var inputOptions = [];
			if(typeof inputProps.values != "undefined") {
				inputOptions = fetchFromObject(options, inputProps.values);
			} else {
				if(typeof inputProps.functionValue != "undefined") {
					var v1 = inputProps.functionValue.value;

					inputOptions = fetchFromObject(callbacks, inputProps.valuesFromFunction).call(this, v1);
				} else {
					inputOptions = fetchFromObject(callbacks, inputProps.valuesFromFunction).call(this);
				}
			}

			/* Create and append the options */
			inputOptions.unshift({name: "None", key: ""});
			for(var i = 0 ; i < inputOptions.length ; i++) {
				var option = document.createElement("option");
				option.value = inputOptions[i].key;
				option.text = inputOptions[i].name;
				if(fetchFromObject(options, inputProps.selected)===inputOptions[i].key)option.selected = true;
				selectList.appendChild(option);
			}

			/* Listener */
			selectList.addEventListener("change", function() {
				if(typeof callback.functionValue === "undefined") {
					callbacks[callback.value].call(this);
				} else {
					let v = callback.functionValue.value;
					var val1 = (callback.functionValue.position === 0) ? v : this.value;
					var val2 = (callback.functionValue.position === 1) ? v : this.value;

					callbacks[callback.value].call(this, val1, val2);
				}
				autoSave();
			}, false);

			/* Append */
			select.appendChild(description);
			select.appendChild(selectList);
		}

		return select;
	}

	var fetchFromObject = function(obj, prop) {
		if(typeof obj === 'undefined') {
			return false;
		}

		var _index = prop.indexOf('.');
		if(_index > -1) {
			return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
		}

		return obj[prop];
	}

	var hasClass = function(el, className) {
		if (el.classList)
			return el.classList.contains(className);
		else
			return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}

	var addClass = function(el, className) {
		if (el.classList)
			el.classList.add(className);
		else if (!hasClass(el, className)) el.className += " " + className;
	}

	var removeClass = function(el, className) {
		if (el.classList)
			el.classList.remove(className);
	    else if (hasClass(el, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
			el.className = el.className.replace(reg, ' ');
	    }
	}

	document.getElementsByAttribute=function(attrN,attrV,multi){
		attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
		var
			multi=typeof multi!='undefined'?
				multi:
				false,
			cIterate=document.getElementsByTagName('*'),
			aResponse=[],
			attr,
			re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
			i=0,
			elm;
		while((elm=cIterate.item(i++))){
			attr=elm.getAttributeNode(attrN);
			if(attr &&
				attr.specified &&
				re.test(attr.value)
			)
			aResponse.push(elm);
		}
		return aResponse;
	}

	var autoSave = function() {
		setTimeout(function() {
			callbacks["storeOptionsCb"].call();
		});
	}

	var addSlider = function(descriptionText, inputProps, callback) {
		var slider = document.createElement('div');

		if(callbacks[callback.value]) {
			slider.className = "slider-container ui-slider-container";

			var description = document.createElement('p');
			description.className = "slider-text";
			description.innerHTML = descriptionText;

			var input = document.createElement('input');
			input.className = "slider";
			input.type = "range";
			input.min = inputProps.min;
			input.max = inputProps.max;
			input.step = inputProps.step;
			input.value = fetchFromObject(options, inputProps.value);

			input.addEventListener("input", function() {
				if(typeof callback.useInputValueFrom === "undefined") {
					callbacks[callback.value].call(this, this.value);
				} else {
					let v = fetchFromObject(options, callback.useInputValueFrom);
					var val1 = (callback.position === 0) ? v : this.value;
					var val2 = (callback.position === 1) ? v : this.value;

					callbacks[callback.value].call(this, val1, val2);
				}
				autoSave();
			}, false);

			slider.appendChild(description);
			slider.appendChild(input);
		}

		return slider;
	}

	var changeStatus = function(el, status) {
		if(status) {
			removeClass(el, 'btn-grey');
		} else {
			addClass(el, 'btn-grey');
		}
	}

	var addCheckBox = function(descriptionText, inputProps, callbackName) {
		var checkbox = document.createElement('div');

		if(callbacks[callbackName]) {
			var button = document.createElement('button');
			button.className = "btn-game-menu btn-darken";
			button.style = "display: block";
			button.innerHTML = descriptionText;
			button.setAttribute('data', fetchFromObject(options, inputProps.value));
			changeStatus(button, fetchFromObject(options, inputProps.value));

			button.addEventListener("click", function() {
				callbacks[callbackName].call();
				changeStatus(this, fetchFromObject(options, inputProps.value));
				autoSave();
			}, false);

			checkbox.appendChild(button);
		}

		return checkbox;
	}

	var addResetButton = function(descriptionText, callbackName, tabId) {
		var button = document.createElement('div');

		if(callbacks[callbackName]) {
			button.className = "menu-option btn-darken";
			button.innerHTML = descriptionText;

			button.addEventListener("click", function() {
				callbacks[callbackName].call();

				setTimeout(function() {
					hideMenu();
					showMenu();
					activeTab(tabId);
					autoSave();
				})
			}, false);
		}

		return button;
	}

	var createMainElement = function() {
		var cheatMenuContainer = document.createElement('div');
		cheatMenuContainer.className = "ui-game-menu ui-game-menu-desktop";
		cheatMenuContainer.style = "display: block; float: right;";
		cheatMenuContainer.id = "ui-cheat-menu";

		return cheatMenuContainer;
	}

	var createTabsContainer = function() {
		var cheatTabsContainer = document.createElement('div'); 
		cheatTabsContainer.className = "btn-game-tabs btns-game-double-row";
		cheatTabsContainer.style = "display: flex";

		return cheatTabsContainer;
	}

	var addTab = function(index, name) {
		var tab = document.createElement('div');
		tab.className = "btn-game-container";

		var a = document.createElement('a');
		a.className = "btn-game-settings btn-game-tab-select btn-game-menu btn-darken";
		a.setAttribute("data-cheat-tab", "tab-" + index);
		a.innerHTML = name;

		a.addEventListener("click", function() {
			var index = this.getAttribute('data-cheat-tab').split('-')[1];
			activeTab(index);
		});

		tab.appendChild(a);

		return tab;
	}

	var getTabMenu = function() {
		var cheatTabsContainer = createTabsContainer();

		let i=0;
		for(let obj of tabs) {
			var element = addTab(i, obj.name);
			cheatTabsContainer.appendChild(element);
			i++;
		}

		return cheatTabsContainer;
	}

	var activeTab = function(index) {
		if(lastActiveContainer === index)return;

		// Active button
		var button = document.getElementsByAttribute("data-cheat-tab", "tab-" + index)[0];
		addClass(button, 'btn-game-menu-selected');

		if(lastActiveContainer !== null) {
			var button2 = document.getElementsByAttribute("data-cheat-tab", "tab-" + lastActiveContainer)[0];
			removeClass(button2, 'btn-game-menu-selected');
		}

		// Active container
		var container = document.getElementById("ui-cheat-tab-" + index);
		container.style = "display: block";

		if(lastActiveContainer !== null) {
			var container2 = document.getElementById("ui-cheat-tab-" + lastActiveContainer);
			container2.style = "display: none";
		}
		lastActiveContainer = index;
	}

	var createElementsContainer = function(index) {
		var container = document.createElement('div'); 
		container.className = "ui-list ui-game-tab ui-game-tab-settings-desktop full-height";
		container.style = "display: none;";
		container.id = "ui-cheat-tab-" + index;

		var container2 = document.createElement('div');
		container2.style = "height: 100%;"
		container.appendChild(container2);

		return container;
	}

	var getMenuElement = function(obj) {
		var element = null;
		if(obj.type === "slider") {
			element = addSlider(obj.description, obj.inputProps, obj.callbacks);
		} else if(obj.type === "checkbox") {
			element = addCheckBox(obj.description, obj.inputProps, obj.callbacks.value);
		} else if(obj.type === "resetButton") {
			element = addResetButton(obj.description, obj.callbacks.value, obj.tabId);
		} else if(obj.type === "select") {
			element = addSelect(obj.description, obj.inputProps, obj.callbacks);
		}

		return element;
	}

	var getTabsContainers = function() {
		var containers = [];
		for(let i=0 ; i < tabs.length ; i++) {
			var container = createElementsContainer(i);
			for(let j=0 ; j < elements.length ; j++) {
				if(elements[j].tabId === i) {
					var element = getMenuElement(elements[j])
					if(element != null) {
						container.firstChild.appendChild(element);
					}
				}
			}
			containers.push(container);
		}
		return containers;
	}

	var showMenu = function() {
		removeOldMenu();
		detectMenuStatus();

		var cheatMenuContainer = createMainElement();

		/* Tabs menu */
		var cheatTabs = getTabMenu();
		cheatMenuContainer.appendChild(cheatTabs);

		/* Tabs containers */
		var tabsContainers = getTabsContainers();
		for(let container of tabsContainers) {
			cheatMenuContainer.appendChild(container);
		}

		/* Append all */
		let centerDiv = document.getElementById('ui-center');
		centerDiv.appendChild(cheatMenuContainer);

		/* Listen back to game button */
		document.getElementById('btn-game-resume').addEventListener('click', hideMenu);
		var backToGameListener = true;

		lastActiveContainer = null;
		activeTab(0);
	}

	var hideMenu = function() {
		removeOldMenu();
		if(backToGameListener)document.getElementById('btn-game-resume').removeEventListener("click", hideMenu, false);
		menuOpened = false;
		backToGameListener = false;
		cheatMenuContainer = document.createElement('div');
	}

	var bKeyListener = {
		keyup: function(e) {
			if(event.which == 27) {
				var activePlayer = game.scope[obfuscate.activePlayer];
				menuOpened = !menuOpened;
				if(menuOpened && !activePlayer.N.dead) {
					showMenu();
				} else {
					hideMenu();
				}
			}
		}
	}

	var addBKeyListener = function() {
		window.addEventListener("keyup", bKeyListener.keyup);
	}

	var removeBKeyListener = function() {
		window.removeEventListener("keyup", bKeyListener.keyup);
	}

	var removeElement = function(elementId) {
		var element = document.getElementById(elementId);
		element.parentNode.removeChild(element);
	}

	var removeOldMenu = function() {
		var e = document.getElementById('ui-cheat-menu');
		if(e)removeElement('ui-cheat-menu');
	}

	var detectMenuStatus = function() {
		menuOpened = game.scope[obfuscate.menu].escMenuDisplayed;
	}

	var bind = function() {
		removeOldMenu();
		detectMenuStatus();

		removeBKeyListener();
		addBKeyListener();
		binded = true;
	}

	var unbind = function() {
		if(menuOpened) {
			hideMenu();
			menuOpened = false;
		}

		removeBKeyListener();
		binded = false;
	}

	var isBinded = function() {
		return binded;
	}

	return {
		bind: bind,
		unbind: unbind,
		isBinded: isBinded
	}
}

sap.ui.define([
    "sap/ui/model/json/JSONModel"
  ], function(JSONModel) {
    "use strict";
  
    
  const combatKey = 'com.lonwyr.myranorBot.combat.';
  const emptyCombat = {
      meeleWeapons: [],
      editMeeleWeapons: false,
      selectedMeeleWeapon: undefined,
      rangedWeapons: [],
      editRangedWeapons: false,
      selectedRangedWeapon: undefined,
      dodge: 0
  };

    return JSONModel.extend("com.lonwyr.MyranorBot.model.CombatModel", {
        loadCombat: function (slot) {
            try {
                const combaData = window.localStorage.getItem(combatKey + slot);
                this.setData(JSON.parse(combaData) || emptyCombat);
            } catch {
                this.setData(emptyCombat);
            }
            
        },
        storeCombat: function (slot) {
            window.localStorage.setItem(combatKey + slot, JSON.stringify(this.getData()));
        },
        addMeeleWeapon: function (slot) {
            var aMeeleWeapons = this.getProperty("/meeleWeapons");
            aMeeleWeapons.push({
                name: "",
                at: 10,
                pa: 10,
                type: "meele",
                tp: "1W6+4",
                bf: 2
            });

            this.setProperty("/meeleWeapons", aMeeleWeapons);
            this.storeCombat(slot);
        },
        removeWeapon: function (path, slot) {
            let aWeapons = this.getProperty(path.substring(0, path.lastIndexOf("/")));
            const index = parseInt(path.substring(path.lastIndexOf("/")+1));
            aWeapons.splice(index, 1);
            this.setProperty("/meeleWeapons", aWeapons);
        }
    });
  });
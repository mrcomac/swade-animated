import {
    PATH,
    ANIMATIONTYPE,
    CopyObj,
    debug,
    moduleName,
    setDebug,
    setShapeChangeCompendium,
    SHAPECHANGECOMPENDIUM,
  } from "./constants.js";
  
  import { getItem, getElementItem, ItemData } from "./items.js";
  
  export let ItemConfigModel = {
    isValid: false,
    animationType: -1,
    template: "",
    animation: [],
    sound: [],
    animationEffect: [],
    activeEffects: [],
  };
  
  let UIConfigItemModel = {
    animationType: -1,
    animation: {
      enabled: false,
      isDefault: true,
      isCustom: false,
      file: "",
      defaultOptions: [],
    },
    animationEffect: {
      enabled: false,
      isDefault: true,
      isCustom: false,
      file: "",
      defaultOptions: [],
    },
    sound: {
      enabled: false,
      isDefault: true,
      isCustom: false,
      file: "",
      defaultOptions: [],
    },
  };
  
  function getUIConfigItem(item) {
    let itemConfig = CopyObj(ItemConfigModel);
    let UIConfigItem = CopyObj(UIConfigItemModel);
    let itemRAW = getItem(item);
  
    itemConfig = retrieveItemConfiguration(item);
  
    debug("itemConfig", itemConfig);
    debug("itemRAW", itemRAW);
  
    UIConfigItem.animationType = itemRAW.animationType;
  
    UIConfigItem.animation.enabled = false;
    UIConfigItem.animationEffect.enabled = false;
    UIConfigItem.sound.enabled = false;
  
    if (itemRAW.animations.length > 0) {
      UIConfigItem.animation.enabled = true;
      if (itemConfig.animation[0].isDefault) {
        UIConfigItem.animation.isDefault = true;
        UIConfigItem.animation.isCustom = false;
        itemRAW.animations[0].active = false;
        UIConfigItem.animation.file = "";
      } else {
        UIConfigItem.animation.file = itemConfig.animation[0].file;
        UIConfigItem.animation.isDefault = false;
        UIConfigItem.animation.isCustom = true;
      }
  
      for (let j = 0; j < itemRAW.animations.length; j++) {
        debug(
          itemRAW.animations[j].label + " == " + itemConfig.animation[0].label
        );
        if (itemRAW.animations[j].label == itemConfig.animation[0].label) {
          itemRAW.animations[j].active = true;
        } else {
          itemRAW.animations[j].active = false;
        }
      }
  
      UIConfigItem.animation.defaultOptions = itemRAW.animations;
    }
  
    if (itemRAW.animationEffects.length > 0) {
      if (itemRAW.animationEffects[0]?.params) {
        UIConfigItem.animationEffect.enabled = false;
      } else {
        UIConfigItem.animationEffect.enabled = true;
        if (itemConfig.animationEffect[0].isDefault) {
          UIConfigItem.animationEffect.isDefault = true;
          UIConfigItem.animationEffect.isCustom = false;
          UIConfigItem.animationEffect.file = "";
          if (itemRAW.animationEffects.length > 0) {
            itemRAW.animationEffects[0].active = false;
          }
        } else {
          UIConfigItem.animationEffect.isDefault = false;
          UIConfigItem.animationEffect.isCustom = true;
          UIConfigItem.animationEffect.file = itemConfig.animationEffect[0].file;
          UIConfigItem.animationEffect.name = itemConfig.animationEffect[0].name;
        }
  
        for (let j = 0; j < itemRAW.animationEffects.length; j++) {
          if (
            itemRAW.animationEffects[j].label ==
            itemConfig.animationEffect[0].label
          ) {
            itemRAW.animationEffects[j].active = true;
          }
        }
        if (itemRAW.animationEffects.length) {
          if (itemRAW.animationEffects[0].params) {
            UIConfigItem.animationEffect.enabled = false;
          }
        }
        UIConfigItem.animationEffect.defaultOptions = itemRAW.animationEffects;
      }
    }
  
    if (itemRAW.sounds.length > 0) {
      UIConfigItem.sound.enabled = true;
      if (itemConfig.sound[0].isDefault) {
        UIConfigItem.sound.isDefault = true;
        UIConfigItem.sound.isCustom = false;
        UIConfigItem.sound.file = "";
        itemRAW.sounds[0].active = false;
      } else {
        UIConfigItem.sound.isDefault = false;
        UIConfigItem.sound.isCustom = true;
        UIConfigItem.sound.file = itemConfig.sound[0].file;
      }
  
      for (let j = 0; j < itemRAW.sounds.length; j++) {
        if (itemRAW.sounds[j].label == itemConfig.sound[0].label) {
          itemRAW.sounds[j].active = true;
        }
      }
      UIConfigItem.sound.defaultOptions = itemRAW.sounds;
    }
  
    return UIConfigItem;
  }
  
  export function retrieveItemConfiguration(item, rolls) {
    let itemConfig = CopyObj(ItemConfigModel);
    if (item.flags?.swadeanimated?.config) {
      if (item.flags.swadeanimated.config.isValid) {
        itemConfig = CopyObj(item.flags.swadeanimated.config);
        itemConfig.isValid = true;
        debug("CONFIG FROM ITEM", itemConfig);
        return itemConfig;
      }
    }
    itemConfig = retrieveDefaultItemConfiguration(item, rolls);
    itemConfig.isValid = true;
    debug("CONFIG FROM DEFAULT", itemConfig);
  
    return itemConfig;
  }
  
  export async function my_open_item_config(item) {
    let actor = false;
    //await swim.run_migration(actor, item)
    new DocumentConfigForm(item).render(true);
  }
  
  function retrieveDefaultItemConfiguration(item, rolls) {
    debug("retrieveDefaultItemConfiguration");
  
    let configItem = CopyObj(ItemConfigModel);
    let itemData = CopyObj(ItemData);
  
    itemData = getItem(item);
    debug(itemData);
    if (itemData.animationType < 0) {
      return configItem;
    }
  
    configItem.animationType = itemData.animationType;
    configItem.template = itemData.template;
  
    if (Object.keys(itemData).length === 0) return configItem;
  
    for (let i = 0; itemData?.animations.length; i++) {
      if (itemData.animations[i].active) {
        configItem.animation.push(itemData.animations[i]);
        configItem.animation[0].isDefault = true;
        break;
      }
    }
  
    for (let i = 0; itemData.sounds.length; i++) {
      if (itemData.sounds[i].active) {
        configItem.sound.push(itemData.sounds[i]);
        configItem.sound[0].isDefault = true;
        break;
      }
    }
  
    for (let i = 0; itemData.animationEffects.length; i++) {
      if (itemData.animationEffects[i].active) {
        configItem.animationEffect.push(itemData.animationEffects[i]);
        configItem.animationEffect[0].isDefault = true;
        break;
      }
    }
  
    configItem.activeEffects = itemData.activeEffects;
  
    debug("retrieveDefaultItemConfiguration", configItem);
    return configItem;
  }
  
  const saConfigVersion = 1;
  
  class DocumentConfigForm extends FormApplication {
    static get defaultOptions() {
      let options = super.defaultOptions;
      options.id = "swadeanimated-document-config";
      options.title = "SWADE Animated";
      options.template = PATH.TEMPLATE + "document_config.hbs";
      options.width = "400";
      options.height = "515";
      options.submitOnClose = true; // This will save the flags even if we close the window without hitting "Save"
      return options;
    }
  
    activateListeners(html) {
      super.activateListeners(html);
      html = html[0];
  
      html.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("click", this._onButtonClick.bind(this));
      });
    }
  
    getData() {
      //let data = [];
      /*if(this.object.type== 'consumable') {
              return;
          }*/
      let UIConfigItem = getUIConfigItem(this.object);
      //UIMEnuItem.animation.type;
      debug("UIConfigItem", UIConfigItem);
      //debug(UIConfigItem);
      return { options: UIConfigItem, isEmbedded: this.object.isEmbedded };
    }
  
    async _onButtonClick(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.action;
      if (this[action]) await this[action](event);
    }
  
    async _resetItem() {
      let reset = CopyObj(ItemConfigModel);
      const Data = {
        flags: {
          swadeanimated: {
            config: reset,
          },
        },
      };
  
      try {
        this.object.update(Data);
        // Fallback that deletes all AEs that are marked as temporary:
        debug(`Flags set on ${this.object.name}.`, this.object);
      } catch (err) {
        debug(err);
      }
    }
    async _updateObject(event, formData) {
      //Merge in version
      if (event?.submitter?.innerText.toLowerCase().includes("reset")) {
        this._resetItem();
        return;
      } else if (event?.submitter?.innerText.toLowerCase().includes("save")) {
        debug("SAVE");
        /*if(this.object.type== 'consumable') {
                  return;
              }*/
  
        let itemConfig = CopyObj(ItemConfigModel);
        formData = { ...{ _version: saConfigVersion }, ...formData };
        debug(formData);
        let itemData = getItem(this.object);
        debug("ITEM DATA", itemData);
  
        itemConfig.template = itemData.template;
        itemConfig.animationType = itemData.animationType;
        if (formData.soundType == "default") {
          itemConfig.sound.push(
            getElementItem(this.object, formData.defaultSound, "sound")
          );
          itemConfig.sound[0].isDefault = true;
          debug("Sound is configured from default", itemConfig);
        } else {
          itemConfig.sound = [
            {
              isDefault: false,
              label: "Custom",
              file: formData.customSound,
              duration: 1000,
              active: true,
              delay: 0,
              volume: 1.0,
            },
          ];
        }
  
        if (itemData.animations.length > 0) {
          if (formData.isDefaultAnimation == "true") {
            itemConfig.animation.push(
              getElementItem(this.object, formData.defaultAnimation, "animation")
            );
            itemConfig.animation[0].isDefault = true;
            itemConfig.animation[0].active = true;
            debug("Animation is configured from default", itemConfig);
          } else {
            let animation_on = {}
            itemData.animations.forEach((item) => {
              if (item.active) {
                animation_on = item;
              }
            });
            itemConfig.animation = [
              {
                type: animation_on.type,
                isDefault: false,
                file: formData.customAnimation,
                label: "Custom",
                active: true,
                attachTo: animation_on.attachTo,
                size: 1,
                persist: animation_on.persist,
                filter: "ColorMatrix",
                filterData: {},
                startTime: 0,
              },
            ];
          }
        } else {
          itemConfig.animation = [];
        }
  
        if (formData.effectAnimationType) {
          if (formData.effectAnimationType == "default") {
            itemConfig.animationEffect.push(
              getElementItem(
                this.object,
                formData.defaultEffect,
                "animationEffect"
              )
            );
            itemConfig.animationEffect[0].isDefault = true;
            debug("Effect Animation is configured from default", itemConfig);
          } else {
            let effect_on = {}
            itemData.animationEffects.forEach((item) => {
              if (item.active) {
                effect_on = item;
              }
            });
            itemConfig.animationEffect = [
              {
                type: effect_on.type,
                isDefault: false,
                file: formData.customEffectAnimation,
                label: "Custom",
                active: true,
                attachTo: effect_on.attachTo,
                size: 1,
                persist: effect_on.persist,
                filter: "ColorMatrix",
                filterData: {},
                startTime: 0,
              },
            ];
          }
        } else if (itemData.animationEffects.length > 0) {
          if (itemData.animationEffects[0].params)
            itemConfig.animationEffect.push(itemData.animationEffects[0]);
        }
  
        itemConfig.activeEffects = itemData.activeEffects;
  
        itemConfig.isValid = true;
        debug("Item ready to save", itemConfig);
  
        const Data = {
          flags: {
            swadeanimated: {
              config: itemConfig,
            },
          },
        };
  
        try {
          this.object.update(Data);
          // Fallback that deletes all AEs that are marked as temporary:
          debug(`Flags set on ${this.object.name}.`, this.object);
        } catch (err) {
          debug(err);
        }
      }
    }
  }
  
  export function registerSettings() {
    game.settings.register(moduleName, "debug_mode", {
      name: "Debug Mode",
      hint: "Enable debug mode to troubleshoot.",
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
      requiresReload: false,
      onChange: (value) => {
        //debug("DEBUG SET: "+Debug);
        setDebug(value);
      },
    });
  
    let def_value;
    if (SHAPECHANGECOMPENDIUM.length == 0) {
      def_value = "SWADE Animated - Bestiary";
    } else {
      def_value = SHAPECHANGECOMPENDIUM;
    }
  
    game.settings.register(moduleName, "shape_change_folder", {
      name: "Shape Change Compendium",
      hint: "Fill it up with the compendium to use with Shape Change",
      scope: "world",
      config: true,
      default: def_value,
      type: String,
      requiresReload: false,
      onbChange: (value) => {
        //debug("New Compendium: "+SHAPECHANGECOMPENDIUM);
        setShapeChangeCompendium(value);
      },
    });
  }
  
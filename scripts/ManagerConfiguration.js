import {
    PATH,
    ANIMATIONTYPE
} from './constants.js';

import {
    getItem,
    getElementItem,
    ItemData
} from './items.js'


export let ItemConfigModel = {
    isValid: false,
    animationType: -1,
    template: "",
    animation: {
        file: "",
        isDefault: true,
        label: "",
        size: 0,
        filter: "ColorMatrix", 
        filterData: { }
    },
    sound: {
        file: PATH.AUDIO + "empty_audio.ogg",
        delay: 0,
        volume: 1,
        label: "",
        isDefault: true
    },
    animationEffect: {
        name: "",
        file: "",
        size: 0,
        label: "",
        isDefault: true,
        attachTo: false
    },
    activeEffects: [],

}

let UIConfigItemModel = {
    animationType: -1,
    animation: {
        enabled: false,
        isDefault: true,
        isCustom: false,
        file: "",
        defaultOptions: []
    },
    animationEffect: {
        enabled: false,
        isDefault: true,
        isCustom: false,
        file: "",
        defaultOptions: []
    },
    sound: {
        enabled: false,
        isDefault: true,
        isCustom: false,
        file: "",
        defaultOptions: []
    }
}

function getUIConfigItem(item) {
    
    //let itemConfig = item.flags?.swadeanimated;
    let itemConfig = {}; //Object.assign({},ItemConfigModel);
    itemConfig = retrieveItemConfiguration(item);
    let UIConfigItem = {}; //Object.assign({},UIConfigItemModel);
    let itemRAW = {}; //Object.assign({},ItemData);
    console.log("getUIConfigItem ");
    console.log("IMTECONFIG");
    console.log(itemConfig);
    let itemData = [];
    
    itemRAW = getItem(item);
    console.log("ITEMRAW");
    console.log(itemRAW);
    UIConfigItem.animationType = itemRAW.animationType;
    
    
    if(itemRAW.animations.length > 0) UIConfigItem.animation.enabled = true;
    if(itemRAW.animationEffects.length > 0) UIConfigItem.animationEffect.enabled = true;
    if(itemRAW.sounds.length > 0) UIConfigItem.sound.enabled = true;
        //console.log(power);
    if(itemConfig.animation.isDefault) {
        UIConfigItem.animation.isDefault = true;
        UIConfigItem.animation.isCustom = false;
        itemRAW.animations[0].active = false;
        UIConfigItem.animation.file = "";
    } else {
        UIConfigItem.animation.file = itemConfig.animation.file;
        UIConfigItem.animation.isDefault = false; 
        UIConfigItem.animation.isCustom = true;
    }
    
    for(let j = 0; j< itemRAW.animations.length; j++) {
        console.log(itemRAW.animations[j].label+" == "+itemConfig.animation.label);
        if(itemRAW.animations[j].label == itemConfig.animation.label) {
            itemRAW.animations[j].active = true;
        } else {
            itemRAW.animations[j].active = false;
        }
    }

    UIConfigItem.animation.defaultOptions = itemRAW.animations;
    

    if(itemConfig.sound.isDefault) {
        UIConfigItem.sound.isDefault = true;
        UIConfigItem.sound.isCustom = false;
        UIConfigItem.sound.file = "";
        itemRAW.sounds[0].active = false;
    } else {
        UIConfigItem.sound.isDefault = false; 
        UIConfigItem.sound.isCustom = true; 
        UIConfigItem.sound.file = itemConfig.sound.file;
    }
    
    for(let j = 0; j< itemRAW.sounds.length; j++) {
        if(itemRAW.sounds[j].label == itemConfig.sound.label) {
            itemRAW.sounds[j].active = true;
        }
    }
    
    UIConfigItem.sound.defaultOptions = itemRAW.sounds;
        
        
    if(itemConfig.animationEffect.isDefault) {

        UIConfigItem.animationEffect.isDefault = true;
        UIConfigItem.animationEffect.isCustom = false;
        UIConfigItem.animationEffect.file = "";
        if(itemRAW.animationEffects.length > 0) {
            itemRAW.animationEffects[0].active = false;
        }
        
    } else {  
        UIConfigItem.animationEffect.isDefault = false; 
        UIConfigItem.animationEffect.isCustom = true; 
        UIConfigItem.animationEffect.file = itemConfig.animationEffect.file;
        UIConfigItem.animationEffect.name = itemConfig.animationEffect.name;
        
    }

    for(let j = 0; j< itemRAW.animationEffects.length; j++) {
        if(itemRAW.animationEffects[j].label == itemConfig.animationEffect.label) {
            itemRAW.animationEffects[j].active = true;
        }
    }

    UIConfigItem.animationEffect.defaultOptions = itemRAW.animationEffects;
    
    return UIConfigItem;
    
}

export function retrieveItemConfiguration(item,rolls) {
    let itemConfig = {};//Object.assign({},ItemConfigModel);
    if(item.flags?.swadeanimated?.config) {
        console.log("HABEMUS CONFI}G NO ITEM");
        itemConfig = item.flags.swadeanimated.config;
        itemConfig.isValid = true;

    } else {
        console.log("METODO DE SEMPRE");
        itemConfig = retrieveDefaultItemConfiguration(item,rolls);
        itemConfig.isValid = true;
    }
    return itemConfig;
}

export async function my_open_item_config(item) {
    let actor = false
    //await swim.run_migration(actor, item)
    new DocumentConfigForm(item).render(true);
}


function retrieveDefaultItemConfiguration(item,rolls) {
    
    let configItem = {};//Object.assign({}, ItemConfigModel);
    let itemData = {};//Object.assign({},ItemData);
    //let item = [];
    
    itemData = getItem(item);
    if(itemData.animationType < 0 ) {
        return configItem;
    }
    console.log("IMTE");
    console.log(itemData);
    //console.log(power);
    //configItem.isValid = true;
    configItem.animationType = itemData.animationType;
    configItem.template = itemData.template;
    for( let i = 0; itemData.animations.length; i++) {
        if(itemData.animations[i].active) {
            configItem.animation = itemData.animations[i];
            configItem.animation.isDefault = true;
            break;
        }
    }
    
    for( let i = 0; itemData.sounds.length; i++) {
        if(itemData.sounds[i].active) {
            configItem.sound = itemData.sounds[i];
            configItem.sound.isDefault = true;
            break;
        }
    }

    if(configItem?.animationEffect) {
        configItem.animationEffect.file = "";
    } else {
        configItem.animationEffect = {};
        configItem.animationEffect.file = "";
    }
    for( let i = 0; itemData.animationEffects.length; i++) {
        if(itemData.animationEffects[i].active) {
            configItem.animationEffect = itemData.animationEffects[i];
            configItem.animationEffect.isDefault = true;
            break;
        }
    }

    configItem.activeEffects = itemData.activeEffects;
          
   
    console.log("retrieveDefaultItemConfiguration");
    console.log(configItem);
    return configItem;
}


const saConfigVersion  = 1;

class DocumentConfigForm extends FormApplication {

    static get defaultOptions() {
        let options = super.defaultOptions;
        options.id = 'swadeanimated-document-config';
        options.title = "SWADE Animated"
        options.template = PATH.TEMPLATE + "document_config.hbs";
        options.width = "400";
        options.height = "510";
        options.submitOnClose = true; // This will save the flags even if we close the window without hitting "Save"
        return options;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html = html[0];

        html.querySelectorAll("[data-action]").forEach(button => {
            button.addEventListener("click", this._onButtonClick.bind(this));
        });
    }

    getData() {
        //let data = [];
        if(this.object.type== 'consumable') {
            return;
        }
        let UIConfigItem = getUIConfigItem(this.object);
        //UIMEnuItem.animation.type;
        console.log("GETDFATA");
        console.log(UIConfigItem);
        return { options: UIConfigItem, isEmbedded: this.object.isEmbedded };
    }

    async _onButtonClick(event) {
        event.preventDefault();
        const action = event.currentTarget.dataset.action;
        if (this[action])
            await this[action](event);
    }

    async _updateObject(_, formData) {
        //Merge in version
        console.log("SAVE");
        if(this.object.type== 'consumable') {
            return;
        }
        
        let itemConfig = {};
        formData = { ...{ _version: saConfigVersion }, ...formData };
        console.log(formData);

        itemConfig.animationType = parseInt(formData.animationType);
        if(formData.soundType == "default") {
            itemConfig.sound = getElementItem(this.object,formData.defaultSound,'sound');
            console.log("SOUND");
            console.log(itemConfig.sound);
            itemConfig.sound.isDefault = true;
        } else {
            itemConfig.sound.file = formData.customSound;
            itemConfig.sound.isDefault = false;
        }

        if(formData.isDefaultAnimation == "true") {
            console.log("ANIMACAO DEFAUT");
            //PRECISO DO TYPO E NOME DO ELEMENTO
            itemConfig.animation = getElementItem(this.object,formData.defaultAnimation,'animation');
            itemConfig.animation.isDefault = true;
            itemConfig.animation.active = true;
            //itemConfig.animation.isDefault = true;
        } else {
            itemConfig.animation.file = formData.customAnimation;
            itemConfig.animation.isDefault = false;
        }

        if(formData.effectAnimationType == "default") {
            itemConfig.animationEffect = getElementItem(this.object,formData.defaultEffect,'animationEffect');
            itemConfig.animationEffect.isDefault = true;
        } else {
            itemConfig.animationEffect.file = formData.customAnimation;
            itemConfig.animationEffect.isDefault = false;
        }
        
      console.log("ITEM TO SAVE");
      itemConfig.isValid = true;
      console.log(itemConfig.animation.filterData);

      const Data = {
        flags: {
            swadeanimated: {
                config: itemConfig 
            }
        }
    }
    
    
    try {
        this.object.update(Data);
        // Fallback that deletes all AEs that are marked as temporary:
        console.log(`Flags set on ${this.object.name}.`, this.object);
    } catch (err) {
        console.log(err)
    }
    }
}
import {
    moduleName,
} from '../constants.js';



function registerArraySettings(settingArr) {
  //const debouncedReload = foundry.utils.debounce(window.location.reload, 100);

  Object.keys(settingArr).forEach(key => {
    let setting = settingArr[key].setting;
    debug('registering setting ' + setting);
    game.settings.register(moduleName, setting, {
      name: SETTING_PREFIX + setting + '.name',
      hint: SETTING_PREFIX + setting + '.hint',
      scope: 'world',
      config: false,
      default: settingArr[key].default,
      type: String
      //onChange: debouncedReload
    });
  });
}

export function registerSettings() {
    // Menus
    game.settings.registerMenu(moduleName, 'swadeAnimatedMenu', {
        name: 'animationFiles.name',
        label: 'animationFiles.label',
        hint: 'animationFiles.hint',
        icon: "fas fa-edit", // A Font Awesome icon used in the submenu button
        type: animationFilesConfiguration,
        restricted: true
    });

    // Configurable features.
    let setting = 'debugmod';
    
    game.settings.register(moduleName, setting, {
      name: 'Debug',
      hint: 'Enable DEbug',
      scope: 'world',
      config: true,
      default: false,
      type: Boolean
    });
}

export function checkForDebug(dict) {
  if (game.settings.get(moduleName, 'debugmod')) {
    DEBUG=true;
    
  } else {
    DEBUG=false;
  }
}


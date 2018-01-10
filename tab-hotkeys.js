const webExtName = 'Control+<number> Tab switcher';
const queryInfo = { windowId: browser.windows.WINDOW_ID_CURRENT };

browser.commands.onCommand.addListener((command) => {
  if (command === 'activate-last-tab') {
      browser.tabs.query(queryInfo).then(tabs => {
        let lastTab = tabs.reduce((latestTabSoFar, tab) => {
          return tab.index > latestTabSoFar.index ? tab : latestTabSoFar;
        });
        browser.tabs.update(lastTab.id, { active: true });
      }, reason => {
        console.log(`${webExtName}: failed to get the list of tabs in the current window' - ${reason}`);
      });
  } else {
    try {
      let tabIndexToSelect = parseInt(command.replace(/[^0-9]/g, ''));
      browser.tabs.query(queryInfo).then(tabs => {
        let filteredTabs = tabs.filter(t => t.index === tabIndexToSelect);
        if (filteredTabs.length > 0) {
          browser.tabs.update(filteredTabs[0].id, { active: true });
        }
      });
    } catch (e) {
      console.log(`${webExtName}: failed to handle hotkey '${command}' - ${e.message}`);
    }
  }
});

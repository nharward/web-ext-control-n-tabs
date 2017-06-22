browser.commands.onCommand.addListener((command) => {
    try {
        let tabIndexToSelect = parseInt(command.replace(/[^0-9]/g, ""));
        browser.tabs.query({}).then((tabs) => {
            for (tab of tabs) {
                if (tab.index == tabIndexToSelect) {
                    browser.tabs.update(tab.id, { active: true });
                    break;
                }
            }
        });
    } catch (e) {
        console.log(`Failed to handle hotkey ${command}; ${e.message}`);
    }
});

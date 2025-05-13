function generate() {
    const customNamesEnabled = document.getElementById('customNamesEnabled').checked;
    const alsoIncludeDefaultNames = document.getElementById('alsoIncludeDefaultNames').checked;

    const firstNames = document.getElementById('firstNames').value
        .split('\n')
        .filter(name => name !== "");

    const lastNames = document.getElementById('lastNames').value
        .split('\n')
        .filter(name => name !== "");

    const fullNames = document.getElementById('fullNames').value
        .split('\n')
        .filter(name => name !== "");

    const jsonData = {
        customNamesEnabled: customNamesEnabled,
        alsoIncludeDefaultNames: alsoIncludeDefaultNames,
        firstNames: firstNames,
        lastNames: lastNames,
        fullNames: fullNames
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "RandomNameSettings.json";
    a.click();
    URL.revokeObjectURL(url);
}

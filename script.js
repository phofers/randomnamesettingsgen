function pickFile() {
    document.getElementById('jsonFileInput').click();
}

document.getElementById('jsonFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const json = JSON.parse(e.target.result);
            populate(json); 
        } catch (err) {
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
});

function populate(json) {
    document.getElementById('customNamesEnabled').checked = json.customNamesEnabled || false;
    document.getElementById('alsoIncludeDefaultNames').checked = json.alsoIncludeDefaultNames || false;
    document.getElementById('firstNames').value = (json.firstNames || []).join('\n');
    document.getElementById('lastNames').value = (json.lastNames || []).join('\n');
    document.getElementById('fullNames').value = (json.fullNames || []).join('\n');
    document.getElementById('allianceNames').value = (json.allianceNames || []).join('\n');
}

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
    
    const allianceNames = document.getElementById('allianceNames').value
        .split('\n')
        .filter(name => name !== "");
    

    const jsonData = {
        customNamesEnabled: customNamesEnabled,
        alsoIncludeDefaultNames: alsoIncludeDefaultNames,
        firstNames: firstNames,
        lastNames: lastNames,
        fullNames: fullNames,
        allianceNames: allianceNames
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "RandomNameSettings.json";
    a.click();
    URL.revokeObjectURL(url);
}

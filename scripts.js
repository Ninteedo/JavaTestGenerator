const maxTests = 10;

function generateTestForms() {
    //clones template called "divTestX" maxTests times, replacing the placeholder X with the test number (i)
    let testFormExample = document.getElementById("divTestX");

    for (let i = 1; i <= maxTests; i++) {
        let testForm = testFormExample.content.cloneNode(true);
        testForm.innerHTML = testFormExample.innerHTML.replaceAll("X", i.toString());
        let testFormDiv = document.createElement("div");
        testFormDiv.id = "testForm" + i;
        testFormDiv.innerHTML = testForm.innerHTML;
        document.getElementById("divTests").appendChild(testFormDiv);
    }
}

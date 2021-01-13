const maxTests = 10;
var testCount = 1;

function generateTestForms() {
    //clones template called "divTestTemplate" maxTests times, replacing the placeholder X with the test number (i)
    let testFormExample = document.getElementById("divTestTemplate");

    for (let i = 1; i <= maxTests; i++) {
        let testForm = testFormExample.content.cloneNode(true);
        testForm.innerHTML = testFormExample.innerHTML.replaceAll("X", i.toString());
        let testFormDiv = document.createElement("div");
        testFormDiv.id = "testForm" + i;
        testFormDiv.innerHTML = testForm.innerHTML;
        testFormDiv.style.display = "none";
        document.getElementById("divTests").appendChild(testFormDiv);
    }

    updateTestsVisible();
}

function updateTestsVisible() {
    //updates the number of testForms visible when the user changes the testCount

    testCount = document.getElementById("testCount").value;
    for (let i = 1; i <= maxTests; i++) {
        let testForm = document.getElementById("testForm" + i);
        if (i <= testCount) {
            testForm.style.display = "inline";
        } else {
            testForm.style.display = "none";
        }
    }
}
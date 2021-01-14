const maxTests = 10;

function generateTestForms() {
    //clones template called "divTestTemplate" maxTests times, replacing the placeholder X with the test number (i)

    let testFormExample = document.getElementById("divTestTemplate");

    for (let i = 1; i <= maxTests; i++) {
        let testForm = testFormExample.content.cloneNode(true);
        testForm.innerHTML = testFormExample.innerHTML.replaceAll("X", i.toString());
        let testFormDiv = document.createElement("div");
        testFormDiv.id = "testForm" + i;
        testFormDiv.className = "testForm";
        testFormDiv.innerHTML = testForm.innerHTML;
        testFormDiv.style.display = "none";
        document.getElementById("divTests").appendChild(testFormDiv);
    }

    updateTestsVisible();
}

function updateTestsVisible() {
    //updates the number of testForms visible when the user changes the testCount

    let testCount = document.getElementById("testCount").value;

    for (let i = 1; i <= maxTests; i++) {
        let testForm = document.getElementById("testForm" + i);
        if (i <= testCount) {
            testForm.style.display = "block";
        } else {
            testForm.style.display = "none";
        }
    }
}

window.onload = function setupTestCountInput() {
    // sets up dynamic functionality of testCount input

    let testCountElement = document.getElementById("testCount");
    testCountElement.setAttribute("max",maxTests.toString());
    testCountElement.addEventListener("change", updateTestsVisible);
}

// inspired by https://stackoverflow.com/a/42571423

function saveFile(filename, text) {
    let downloadBtn = document.createElement("a");
    downloadBtn.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    downloadBtn.setAttribute("download", filename);
    downloadBtn.style.display = "none";

    document.body.appendChild(downloadBtn);
    downloadBtn.click();
    document.body.removeChild(downloadBtn);

    return false; // returns false so submitting form will not cause page to reload
}

function formInputToTestFile(form) {
    let testTargetName = form["testTargetName"].value;
    let testClassName = form["testClassName"].value;
    let testCount = form["testCount"].value;
    let testNames = [], testArgs = [], testTargets = [];

    for (let i = 1; i <= 10; i++) {
        testNames[i-1] = form["testName" + i].value;
        testArgs[i-1] = form["arguments" + i].value.split(" ");
        testTargets[i-1] = form["target" + i].value;
    }

    return (createTestFile(testTargetName, testClassName, testCount, testNames, testArgs, testTargets));
}

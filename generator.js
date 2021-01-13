const tab = "    "; // 4 spaces
const quote = '"';

function createTestFile(testTargetName, testClassName, testCount, testNames, testArgs, testTargets)
{
    let result = "";
    result += imports;
    result += classLine(testClassName);
    result += "\n";
    result += captureOutputFunction(testTargetName);
    result += convertUnixFunction;
    result += testFunctions(testCount, testNames, testArgs, testTargets);
    result += "}\n";
    return result;
}

function classLine(testClassName)
{
    return "public class " + testClassName + " {\n";
}

function testFunctions(testCount, testNames, testArgs, testTargets)
{
    let result = "";
    for (let i = 0; i < testNames.length; i++) {
        if (i < testCount) {
            result += testToString(testNames[i], testArgs[i], testTargets[i]);
        }
    }
    return result;
}

const imports =
    "import static org.junit.Assert.assertEquals;\n" +
    "\n" +
    "import java.io.ByteArrayOutputStream;\n" +
    "import java.io.OutputStream;\n" +
    "import java.io.PrintStream;\n" +
    "\n" +
    "import org.junit.Test;" +
    "\n";

function captureOutputFunction(testTargetName)
{
    let result = "";
    result +=
        "    private String captureOutputOfMain(String args[]) {\n" +
        "        OutputStream outputStream = new ByteArrayOutputStream();\n" +
        "        PrintStream originalOut = System.out;\n" +
        "        System.setOut(new PrintStream(outputStream));\n" +
        "        try {\n";
    result += tab + tab + tab + testTargetName + ".main(args);\n";
    result +=
        "        }\n" +
        "        finally {\n" +
        "            System.setOut(originalOut);\n" +
        "        }\n" +
        "        return convertToUnix(outputStream.toString().trim());\n" +
        "    }" +
        "\n";
    return result;
}

const convertUnixFunction =
    "    private String convertToUnix(String input) {\n" +
    "        if (input == null) {\n" +
    "            return null;\n" +
    "        }\n" +
    "        return input.replaceAll(\"\\r\\n\", \"\\n\").replaceAll(\"\\r\", \"\\n\");\n" +
    "    }\n" +
    "\n";

function testToString(testName, inputArgs, targetOutput)
{
    let result = tab + functionHeader(testName);
    result += tab + tab + argsToCode(inputArgs);
    result += tab + tab + targetToCode(targetOutput);
    result += tab + "}" + "\n";
    result += "\n";
    return result;
}

function functionHeader(testName)
{
    return "@Test\n" + tab + "public void " + testName + "() {\n";
}

function argsToCode(inputArgs)
{
    let result;
    if (inputArgs.length === 0)
    {
        result = "String[] args = null;\n";
    } else {
        result = "String[] args = {";
        for (let i = 0; i < inputArgs.length; i++) {
            result += quote + inputArgs[i] + quote;
            if (i < inputArgs.length - 1) {
                result += ",";
            }
        }
        result += "};\n";
    }
    return result;
}

function targetToCode(targetOutput)
{
    let result = "assertEquals(" + quote;
    /*if (targetOutput.length > 0) {
        for (let i = 0; i < targetOutput.length; i++) {
            result += targetOutput[i];
            if (i < targetOutput.length - 1) {
                result += "\\n";
            }
        }
    }*/
    result += targetOutput;
    result += quote + ", captureOutputOfMain(args));\n";
    return result;
}
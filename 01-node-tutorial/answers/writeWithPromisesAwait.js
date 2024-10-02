const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("temp.txt", "Line 1\nLine 2\nLine 3");
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

const reader = async () => {
  try {
    const content = await readFile("temp.txt", "utf8");
    console.log(content);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();

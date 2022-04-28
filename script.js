const World = document.querySelector("section");
let selectedTool = "pickaxe";
let inventoryblocks = document.querySelectorAll("h3");
const blocks = {
  grassblock: "shovel",
  dirt: "shovel",
  stone: "pickaxe",
  cobblestone: "pickaxe",
  OakLog: "axe",
  "OakLog-leaves": "axe",
};
let inventory = {
  "OakLog-leaves": 0,
  OakLog: 0,
  grassblock: 0,
  dirt: 0,
  cobblestone: 0,
};
function Worldgen() {
  World.innerText = "";
  for (let i = 0; i < 150; i++) {
    const blocks = document.createElement("div");
    blocks.classList.add("block");
    blocks.id = i;
    World.append(blocks);
    if (i < 90) blocks.classList.add("skyblock");
    else if (i >= 90 && i < 105) blocks.classList.add("grassblock");
    else if (i >= 105 && i < 120) blocks.classList.add("dirt");
    else blocks.classList.add("stone");
    document.querySelectorAll(".block").forEach((block) => {
      if (block.className.includes("skyblock"))
        block.addEventListener("click", placeblock);
      else block.addEventListener("click", mineblock);
    });
  }
  changeBlock([25, 26, 27, 39, 40, 41, 42, 43], "OakLog-leaves");
  changeBlock([56, 71, 86], "OakLog");
  changeBlock([17, 18, 31, 32, 33, 34], "cloud");
}
Worldgen();
function updateCounters() {
  inventoryblocks.forEach((h2) => {
    h2.innerText = inventory[h2.parentElement.classList[0]];
  });
}
function mineblock(event) {
  if (event.target.classList[1] !== "skyblock") {
    if (blocks[event.target.classList[1]] === selectedTool) {
      if (event.target.classList[1] === "stone") inventory["cobblestone"]++;
      else inventory[event.target.classList[1]]++;
      updateCounters();

      event.target.className = "block skyblock";
      event.target.addEventListener("click", placeblock);
    }
  }
}
function pickTool(event) {
  selectedTool = event.target.getAttribute("data-tool");
  const previousTool = document.querySelector(".selected");
  const currentTool = event.target;
  previousTool.classList.remove("selected");
  currentTool.classList.add("selected");
}
document.querySelectorAll(".tool").forEach((tool) => {
  tool.addEventListener("click", pickTool);
});
function changeBlock(id, block) {
  if (typeof id === "string") {
    document.getElementById(id).className = `block ${block}`;
  } else
    id.forEach((currentId) => {
      document.getElementById(currentId).className = `block ${block}`;
    });
}

function placeblock(event) {
  const currentTool = document.querySelector(".selected");
  let invblock = currentTool.classList[0];

  if (selectedTool === "inventory") {
    if (event.target.classList[1] === "skyblock") {
      if (inventory[invblock] > 0) {
        changeBlock(event.target.id, invblock);
        inventory[invblock]--;
        updateCounters();
        event.target.addEventListener("click", mineblock);
      }
    }
  }
}

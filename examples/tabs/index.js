function load() {
  table1.style.display = "block";
  table2.style.display = "none";
  table3.style.display = "none";
}
function Vis1() {
  // Style.display makes them disapear, and they dont take up space
  // Block means appear
  table1.style.display = "block";
  // none means disappear
  table2.style.display = "none";
  table3.style.display = "none";
};
function Vis2() {
  table1.style.display = "none";
  table2.style.display = "block";
  table3.style.display = "none";
};
function Vis3() {
  table1.style.display = "none";
  table2.style.display = "none";
  table3.style.display = "block";
};

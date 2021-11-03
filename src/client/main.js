// import '@mdi/font/css/materialdesignicons.css';
import "./main.css";
// import button from "../_includes/button/button";
import dialog from "../_includes/dialog/dialog";
import discount from "../_includes/discount/discount";

async function run() {
  await dialog();
  await discount();
}

document.addEventListener("DOMContentLoaded", function (event) {
  run();
});
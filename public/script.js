document.addEventListener("DOMContentLoaded", (event) => {
  const autoClickButton = document.getElementById("getLocationBtn");

  autoClickButton.addEventListener("mouseover", () => {
    autoClickButton.click(); // คลิกปุ่มโดยอัตโนมัติ
  });

  autoClickButton.addEventListener("click", () => {
    console.log("Auto Click Button Clicked!");
    // ทำการกระทำที่ต้องการเมื่อปุ่มถูกคลิก
  });
});

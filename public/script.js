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

const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// ใช้ cookie-parser
app.use(cookieParser());

// ใช้ CSRF protection middleware
app.use(csrf({ cookie: true }));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

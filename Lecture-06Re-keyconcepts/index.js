const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.get("/files/:filesname", (req, res) => {
  fs.readFile(`./files/${req.params.filesname}`, "utf-8", (err, data) => {
    res.render("show", { filesname: req.params.filesname, data: data });
  });
});


app.get("/edit/:filesname", (req, res) => {
    res.render('edit', {filesname: req.params.filesname})
  });

  app.post("/edit", (req, res) => {
    // console.log(req.body);

    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}` , (err) => {
        res.redirect('/')
    });
  });

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log(" app listening on port 3000!");
});

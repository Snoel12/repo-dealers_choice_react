const path = require("path");
const express = require("express");
const volleyball = require("volleyball");
const app = express();
const {
  syncAndSeed,
  models: { Country, Snack },
} = require("./db");

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/countries", async (req, res) => {
  res.send(await Country.findAll({}));
});

app.get("/countries/:id", async (req, res) => {
  res.send(
    await Country.findByPk(req.params.id, {
      //include: [Snack],
    })
  );
});
app.delete("/countries/:id", async (req, res, next) => {
  try {
    const trash = await Country.findByPk(req.params.id);
    if (!trash) {
      res.sendStatus(404);
    }
    await trash.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const flip = await User.create({ name: req.body.name });
    res.status(201).send(flip);
  } catch (err) {
    res.sendStatus(409);
  }
});

const doIt = async () => {
  await syncAndSeed();
  const port = 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

doIt();

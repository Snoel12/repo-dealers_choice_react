const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/reactDealer"
);

const countries = [
  "Pakistan",
  "Venezuela",
  "South Africa",
  "Greece",
  "Brazil",
  "India",
];

const snacks = [
  "Samosa",
  "Arepas",
  "koeksisters",
  "Loukoumades",
  "Coxinhas",
  "Vada Pav",
];

const Country = db.define("country", {
  name: {
    type: STRING,
    allowNull: false,
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  snack: {
    type: STRING,
  },
});

const Snack = db.define("snack", {
  name: {
    type: STRING,
    allowNull: false,
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
});

Country.hasMany(Snack);
Snack.belongsTo(Country);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [Pakistan, Venezuela, South_Africa, Greece, Brazil, India] =
    await Promise.all(countries.map((name) => Country.create({ name })));

  const [Samosa, Arepas, koeksisters, Loukoumades, Coxinhas, Vada_Pav] =
    await Promise.all(snacks.map((name) => Snack.create({ name })));

  // Samosa.countryId = Pakistan.id;
  // Arepas.countryId = Venezuela.id;
  // koeksisters.countryId = South_Africa.id;
  // Loukoumades.countryId = Greece.id;
  // Coxinhas.countryId = Brazil.id;
  // Vada_Pav.countryId = India.id;

  // await Promise.all([
  //   Samosa.save(),
  //   Arepas.save(),
  //   koeksisters.save(),
  //   Loukoumades.save(),
  //   Coxinhas.save(),
  //   Vada_Pav.save(),
  // ]);
  Pakistan.snack = "Samosa";
  Venezuela.snack = "Arepas";
  South_Africa.snack = "Koeksisters";
  Greece.snack = "Loukoumades";
  Brazil.snack = "Coxinhas";
  India.snack = "Vada_Pav";
  await Promise.all([
    Pakistan.save(),
    Venezuela.save(),
    South_Africa.save(),
    Greece.save(),
    Brazil.save(),
    India.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    Country,
    Snack,
  },
};

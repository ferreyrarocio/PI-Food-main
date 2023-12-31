const { Recipe, Diet } = require("../db");

const getInfoDb = async () => {
  const res = await Recipe.findAll({
    attributes: [
      "id",
      "title",
      "summary",
      "healthScore",
      "steps",
      "image",
      "createdInDb",
    ],
    include: { model: Diet },
  });

  return await res.map((x) => {
    return {
      id: x.dataValues.id,
      title: x.dataValues.title,
      summary: x.dataValues.summary,
      healthScore: x.dataValues.healthScore,
      image: x.dataValues.image,
      steps: x.dataValues.steps,
      diets: x.dataValues.diets.map((y) => {
        return { name: y.name };
      }),
      createdInDb: x.dataValues.createdInDb,
    };
  });
};

module.exports = getInfoDb;

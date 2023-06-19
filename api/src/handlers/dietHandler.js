const {getAllDiets} = require("../controllers/getAllDiets");

const getDietHandler = async (req, res) => {
  try {
    const diets = await getAllDiets();
    res.status(200).json(diets);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
};

module.exports = {getDietHandler};

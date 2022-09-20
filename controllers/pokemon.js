

let jsonData = require("../poker.json");

const get_all_pokemon= async (req, res, next) => {
//  console.log(jsonData);
  try {
    return res.status(200).send(jsonData);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_all_pokemon_id = async (req, res, next) => {
    console.log("Hello");
    console.log(req.params.id);

    const { id } = req.params;

    let result = jsonData.filter(data => id == data.id)
    console.log(result)

     try {
       return res.status(200).send(result);
     } catch (err) {
       console.log(err);
       next(err);
     }
   };
   

   const get_all_pokemon_id_info = async (req, res, next) => {
    const { info, id } = req.params;
    let result = jsonData.filter(data => id == data.id)

    let finalResult = [];

    result.map(data => {
      if(info =='name') finalResult = data.name;
      else if(info =='base')  finalResult = data.base;
      else if(info =='type')finalResult = data.type;
      else console.log("Wrong value")
    });

     try {
       return res.status(200).send(finalResult);
     } catch (err) {
       console.log(err);
       next(err);
     }
   }; 


module.exports = {
    get_all_pokemon,
    get_all_pokemon_id,
    get_all_pokemon_id_info
};

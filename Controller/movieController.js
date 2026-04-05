const Movie = require("../Database/movie_schema");

//console.log("Movie schema imported successfully:", movieSchema) // Add this line to check if the schema is imported correctly
const getMovies = async (req, res) => {
  let data = await Movie.findOne({
    rated: "TV-PG",
  });

  //console.log("Data fetched successfully:", JSON.stringify(JSON.parse(JSON.stringify(data)))); // Add this line to check if the data is fetched correctly
  res.json({
    message: "Data fetched successfully",
    data: data,
  });
};

module.exports = { getMovies };

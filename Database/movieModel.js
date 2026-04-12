const connection= require("./connection")

const mongoose= require("mongoose")

///to set strict query for read operations which means that only fields defined in the schema will be considered for filtering and querying, while any fields not defined in the schema will be ignored. This can help prevent unintended consequences and improve security by ensuring that only expected fields are used in queries.
mongoose.set("strictQuery", true)

const movieSchema= {
  plot: String,
  genres: [String],
  runtime: Number,

  cast: [String],
  poster: String,
  title: String,
  fullplot: String,

  languages: [String],
  released: Date,

  directors: [String],
  rated: String,

  awards: {
    wins: Number,
    nominations: Number,
    text: String
  },

  lastupdated: String,
  year: Number,

  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },

  countries: [String],
  type: String,

  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number
    },
    critic: {
      rating: Number,
      numReviews: Number
    }
  },

  num_mflix_comments: Number
}

//this is schema defining part, we are defining the structure of the document that will be stored in the collection. It specifies the fields and their data types, as well as any additional options or constraints for those fields. In this case, we are defining a schema for a movie document, which includes fields such as plot, genres, runtime, cast, poster, title, fullplot, languages, released date, directors, rated, awards, last updated date, year, imdb rating and votes, countries, type, tomatoes viewer and critic ratings and number of reviews, and number of mflix comments.
const m_schema= new mongoose.Schema(movieSchema, {strict: false})

//this is how we connect to a collection and also create a model based on defined schema. 
const Movie= mongoose.model("Movie", m_schema, "movies")

module.exports= Movie

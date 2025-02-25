import { Schema, model } from "mongoose"

const blogsSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readTime: {
      value: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true
      },
    }
  },
  { collection: "blogs" }
)

export default model("Blogs", blogsSchema)

import { Router } from "express"
import Author from "./model.js"
import Blog from "../blogs/model.js"
export const authorRoute = Router()

//Questa rotta gestisce la richiesta GET per ottenere tutti gli autori.
authorRoute.get("/", async (req, res, next) => {

  try {

    const page = req.query.page || 1

    //Utilizzo il metodo find() di Mongoose per trovare tutti gli autori nel database.
    let authors = await Author.find()

      //Applico la paginazione limitando il risultato a 20 autori per pagina e saltando gli autori delle pagine precedenti.
      .limit(20)
      .skip(20 * (page - 1))

    res.send(authors)

  } catch (error) {
    next(error)
  }
})

//Questa rotta gestisce la richiesta GET per ottenere un autore specifico in base all'ID.
authorRoute.get("/:id", async (req, res, next) => {

  try {

    //Utilizzo il metodo findById() di Mongoose per trovare l'autore nel database utilizzando l'ID fornito nella richiesta.
    let author = await Author.findById(req.params.id)

    res.send(author)

  } catch (error) {
    next(error)
  }
})

//Questa rotta gestisce la richiesta GET per ottenere tutti i post di blog di un autore specifico in base all'ID.
authorRoute.get("/:id/blogPosts", async (req, res, next) => {

  try {

    //Utilizzo il metodo findById() di Mongoose per trovare l'autore nel database utilizzando l'ID fornito nella richiesta.
    let author = await Author.findById(req.params.id)

    //Utilizzo il metodo find() di Mongoose per trovare tutti i post di blog dell'autore trovato.
    let posts = await Blog.find({

      author: author.email,

    })

    res.send(posts)

  } catch (error) {
    next(error)
  }
})

//Questa rotta gestisce la richiesta PUT per aggiornare un autore esistente in base all'ID.
authorRoute.put("/:id", async (req, res, next) => {

  try {

    //Utilizzo il metodo findByIdAndUpdate() di Mongoose per trovare e aggiornare l'autore nel database utilizzando
    //l'ID fornito nella richiesta e i dati forniti nel corpo della richiesta.
    let author = await Author.findByIdAndUpdate(req.params.id, req.body, {

      new: true,
    })

    res.send(author)

  } catch (error) {
    next(error)
  }
})

//Questa rotta gestisce la richiesta DELETE per eliminare un autore esistente in base all'ID.
authorRoute.delete("/:id", async (req, res, next) => {

  try {

    //Utilizzo il metodo deleteOne() di Mongoose per eliminare l'autore nel database utilizzando l'ID fornito nella richiesta.
    await Author.deleteOne({

      _id: req.params.id,
    })

    //Restituisce una risposta vuota con il codice di stato 204 (No Content) per indicare che l'eliminazione è avvenuta con successo
    res.send(204)

  } catch (error) {
    next(error)
  }
})

//Questa rotta gestisce la richiesta POST per creare un nuovo autore.
authorRoute.post("/", async (req, res, next) => {

  try {

    //Utilizzo il metodo create() di Mongoose per creare un nuovo autore nel database utilizzando i dati forniti nel corpo della richiesta.
    let author = await Author.create(req.body)
    res.send(author)

  } catch (error) {
    next(error)
  }
})

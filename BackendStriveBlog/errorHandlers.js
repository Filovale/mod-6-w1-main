

//Questo gestore di errori gestisce gli errori di richiesta non valida (codice di stato HTTP 400).
export const badRequestHandler = (err, req, res, next) => {

  if (err.status === 400) {

    res.status(400).send({

      message: err.message,
      errorsList: err.errorsList.map((e) => e.msg),
    })

  } else {
    next(err)
  }
}

//Questo gestore di errori gestisce gli errori di autorizzazione non riuscita (codice di stato HTTP 401).
export const unauthorizedHandler = (err, req, res, next) => {

  if (err.status === 401) {

    res.status(401).send({ message: err.message })

  } else {
    next(err)
  }
}

//Questo gestore di errori gestisce gli errori di risorsa non trovata (codice di stato HTTP 404).
export const notfoundHandler = (err, req, res, next) => {

  console.log(err)

  if (err.status === 404 || res.status === 404) {

    res.status(404).send({ message: err.message })

  } else {
    next(err)
  }
}

//Questo gestore di errori gestisce qualsiasi altro tipo di errore non gestito.
export const genericErrorHandler = (err, req, res, next) => {

  console.log("ERROR:", err)

  res.status(500).send({
    
    message: "Something happened on our side! we will fix that ASAP!",
  })
}

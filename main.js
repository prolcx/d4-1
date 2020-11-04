
const express = require('express')
const handlebars = require('express-handlebars')
const PORT = parseInt(process.argv[2])||parseInt(process.env.PORT)||3000

const app = express()

app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

//POST application/x-www.form-urlencoded, application/json
//form data is in req.body
app.post('/register',
express.urlencoded({extended: true}),
express.json(),
(req,resp,next)=>{
    const name = req.body.name.toLowerCase().trim()
    if(name =='fred')
    return next()
    resp.status(403)
    resp.type('text/html')
    resp.end('<h1>You shall not pass</h1>')
},
    (req, resp) => {
        console.info('body :', req.body)
        resp.status(201)
        resp.type('text/html')
        resp.render('thankyou',{
            name: req.body.name,
            available: req.body['available-date'] //or req.body.available-date
        }

        )
    }
)

app.use(express.static(__dirname + '/static'))

app.listen(PORT,()=>{
    console.info(`Application started at ${PORT} at ${new Date()}`)
})
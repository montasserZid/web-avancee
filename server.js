const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))


app.get("/", (req, res,next) => {
    res.sendFile(path.resolve(__dirname,'frontend', 'index.html'))
  
})
const test = async function(param){  

    async function getData(url){
        const response = await fetch(url)
        return response.json()
    }
   
    const data = await getData('https://wizard-world-api.herokuapp.com/Elixirs?Difficulty' + param)


        fs.writeFile(param+'.json', JSON.stringify(data), err =>{
            if(err) throw err
            console.log('sucess')
        })
}
app.get("/Elixirs*", (req, res,next) => {
    res.sendFile(path.resolve(__dirname,'frontend', 'index.html'))
  test(req.params[0])
})



app.listen(8080, () => console.log('server running...'))

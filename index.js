const fs = require('fs')
const http = require('http')
const url = require('url')

//////////////////////////////////////
// FILE
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on: ${Date.now()}.`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('Text written!')


// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('File written successfully ! 😁')
//             })
//         })
//     })
// })

// console.log('File is reading......')

//////////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(new RegExp("\\{\\$PRODUCTNAME\\$\\}", "g"), product.productName)
    output = output.replace(new RegExp("\\{\\$IMAGE\\$\\}", "g"), product.image)
    output = output.replace(new RegExp("\\{\\$QUANTITY\\$\\}", "g"), product.quantity)
    output = output.replace(new RegExp("\\{\\$PRICE\\$\\}", "g"), product.price)
    output = output.replace(new RegExp("\\{\\$DESCRIPTION\\$\\}", "g"), product.description)
    output = output.replace(new RegExp("\\{\\$NUTRIENTS\\$\\}", "g"), product.nutrients)
    output = output.replace(new RegExp("\\{\\$FROM\\$\\}", "g"), product.from)
    output = output.replace(new RegExp("\\{\\$ID\\$\\}", "g"), product.id)

    if (!product.organic) output = output.replace(new RegExp("\\{\\$NOT_ORGANIC\\$\\}", "g"), 'not-organic')

    return output
}


const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {

    const { query, pathname } = (url.parse(req.url, true))

    // OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{$PRODUCT_CARDS$}', cardsHtml)
        res.end(output)

    // PRODUCT PAGE
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    // API PAGE
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data)

    // NOT FOUND PAGE
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-header': 'hello, this is a test !'
        })
        res.end('<h1>Page not found !</h1>')
    }
})

server.listen(8000, () => {
    console.log('Server listening on port 8000. ✅')
})
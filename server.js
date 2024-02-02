const { users, books, lendBook } = require('./my-pkg/book')
const http = require('http'); // מודול ליצירת שרת
const url = require('url'); // url מודול לפירוק כתובת
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    const myUrl = url.parse(req.url, true)
    switch (myUrl.pathname) {
        case '/':
            res.end(JSON.stringify(users))
            break;
        case '/users':
            if (myUrl.query.id) {
                let user = users.find(x => x.id == myUrl.query.id);
                //res.end(JSON.stringify(users.find(x => x.id == myUrl.query.id)));
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(`<h5>${user.id}</h5><br/><h1>${user.name}</h1><br/><p>${user.type}</p>`)
            }
            else
                res.end(JSON.stringify(users))
            break;
        case '/books':
            if (myUrl.query.id) {
                //res.end(JSON.stringify(books.find(x => x.id == myUrl.query.id)));
                let book = books.find(x => x.id == myUrl.query.id);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(`<h5>${book.id}</h5><br/><h1>${book.name}</h1><br/><p>${book.type}</p><br/><p>${book.lended}</p><br/><img src="./my-pkg/${book.img}"></img><br/>`);
                res.end();
                // try {
                //     const img = await fs.readFile(`./my-pkg/${book.img}`);
                //     res.end(img);
                // }
                // catch (error) {
                //     res.end(error.message);
                // }
                //<img src="./my-pkg/${book.img}"/>
                //res.end();
            }
            else
                res.end(JSON.stringify(books))
            break;
        case '/lend':
            if (req.method === 'POST') {
                if (users.find(x => x.id === myUrl.query.userId).lended === false &&
                    books.find(x => x.id === myUrl.query.bookId).lended === false) {
                    //res.end(JSON.stringify(books.find(x => x.id == myUrl.query.bookId)));
                    let user = users.find(x => x.id == myUrl.query.bookId);
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(`<h5>${user.id}</h5><br/><h1>${user.name}</h1><br/><p>${user.type}</p>`)
                }
                else
                    res.end(JSON.stringify(users))
                break;
            }
        default:
            break;
    }
}).listen(8080);
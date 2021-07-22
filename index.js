const server = require ('./api/server');

const PORT = process.env.PORT || 3000;

server.get('/',(req,res)=>{
    res.send('Hello!')
})

server.listen(PORT,() => {
    console.log(`n== API running on port ${PORT} ==\n`);
});
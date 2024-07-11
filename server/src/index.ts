import server from "./server";
import colors from 'colors'
server.listen(4000,()=>{
    const PORT = process.env.PORT  ||4000
    console.log(colors.cyan.bold( `server on port${PORT}`));
    
})
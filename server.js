const http = require("http")
const fs = require("fs")

const app = http
    .createServer((request, response)=>{
        if(request.url === `/create-directory`){
            fs.mkdir('content', (error)=>{
                if(error){
                    response.end(error)
                }else{
                    response.end('content folder created')
                }
            })
        }else if(request.url === '/create-text'){
            fs.writeFile(`randomText.txt`, 'hello, world', (error)=>{
                if(error){
                    response.end(error)
                }else{
                    response.end('randomText.txt created')
                }
            })
        }else if(request.url === '/new-file-and-folder'){
            fs.mkdir('content', (error)=>{
                if(error){
                    response.end(error)
                }else{
                    response.end('folder and file created')
                    setTimeout(()=>{
                        fs.unlinkSync('./content/verbage.text')
                        fs.rmdir('content', (error)=>{
                            if(error){
                                response.end(error)
                            }else{
                                response.end('content directory deleted')
                            }
                        })
                    
                    }, 7000);
                }
            })
        }
    })
    .listen(3001, ()=>{
        console.log('server started')
       
    })


// http
//     .createServer(function(request, response){
//         console.log(request)
//         if(request.url === "/create-directory" && request.method === "GET"){
//             let body = ""
//             request.on("data", function(data){
//                 body += data.toString()
//             })
//             request.on("end", function(){
//                 let parsedBody = JSON.parse(body)
//                 fs.mkdir(parsedBody.folderName, function(error){
//                     if(error){
//                         response.end(error)
//                     }else{
//                         response.end("content folder created")
//                     }
//                 })
//             })
//         }else if(request.url === "/create-text" && request.method === "GET"){
//             let body = ""
//             request.on("data", function (data){
//                 body += data.toString()
//             })
//             request.on("end", function(){
//                 let parsedBody = JSON.parse(body)
//                 fs.writeFile(parsedBody.fileName, parsedBody.randomText, function(error){
//                     if(error){
//                         response.end(error)
//                     }else{
//                         response.end(parsedBody.randomText)
//                     }
//                 })
//             })
//         }else if(request.url === "/new-folder-and-file" && request.method === "GET"){
//             let body = ""
//             request.on("data", function(data){
//                 body += data.toString()
//             })
//             request.on("end", function(){
//                 let parsedBody = JSON.parse(body)
//                 fs.mkdir(parsedBody.folderName, function(error){
//                     if(error){
//                         response.end(error)
//                     }else{
//                         fs.writeFile(`./content/${parsedBody.secondFileName}`, parsedBody.secondFileName, parsedBody.randomText, function(error){
//                             if(error){
//                                 response.end(error)
//                             }else{
//                                 response.end(parsedBody.randomText)
//                                 setTimeout(function(){
//                                     fs.rmdir(parsedBody.folderName, {recursive:true}, function(error){
//                                         if(error){
//                                             response.end(error)
//                                         }else{
//                                             response.end("File Deleted")
//                                         }
//                                     })
//                                 },7000)
//                             }
//                         })
//                     }
//                 })
//             })
//         }
//     })
//     .listen(3001, function(){
//         // console.log("Hello, World")
//         console.log("Server Started!!!")
//     })
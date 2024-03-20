const http = require('http')
const fs = require('fs')
http
    .createServer(function(request, response){
        console.log(request)
        if(request.url === "/create-directory" && request.method === "GET"){
            let body = ''
            request.on('data',function(data){
                body += data.toString()
            })
            request.on("end",function(){
                let parsedBody = JSON.parse(body)
                fs.mkdir(parsedBody.folderName,function(error){
                    if(error){
                        response.end(error)
                    } else {
                        response.end("content folder created")
                    }
                })
            })
        } else if(request.url === "/create-text" && request.method === "GET"){
            let body = ''
            request.on("data",function (data){
                body += data.toString()
            })
            request.on('end',function(){
                let parsedBody = JSON.parse(body)
                fs.writeFile(parsedBody.fileName,parsedBody.randomText,function(error){
                    if(error){
                        response.end(error)
                    } else {
                        response.end(parsedBody.randomText)
                    }
                })
            })
        } else if(request.url === "/new-folder-and-file" && request.method === "GET"){
            let body = ''
            request.on("data",function (data){
                body += data.toString()
            })
            request.on("end",function(){
                let parsedBody = JSON.parse(body)
                fs.mkdir(parsedBody.folderName, function(error){
                    if(error){
                        response.end(error)
                    } else {
                        fs.writeFile(parsedBody.secondFileName,parsedBody.randomText,function(error){
                            if(error){
                                response.end(error)
                            } else {
                                response.end(parsedBody.randomText)
                                setTimeout(function(){
                                    fs.rmdir(parsedBody.folderName,{recursive:true},function(error){
                                        if(error){
                                            response.end(error)
                                        } else {
                                            response.end("File is Deleted")
                                        }
                                    })
                                },7000)
                            }
                        })
                    }
                })
            })
        }
    })
    .listen(3001,function(){
        // console.log("HelloWorld")
        console.log("Server Started!!!")
    })
const http = require('http')
const fs = require('fs')

http
    .createServer(function(request, response){
        console.log(request)
        if(request.url === "/create-directory"){
            fs.mkdir('content', function(error,){
                console.log(error)
                if(error){
                    response.end()
                } else {
                    response.end('content folder created')
                }
            })
        }else if (request.url === "/create-text"){
                fs.writeFile('randomText.txt', function(error, data){
                    if(error){
                        response.end()
                    } else{
                        
                        response.end('randomtext.txt created')
                    }
                })
            
            }else{
                return response.end()
        } 
    })
    .listen(3001,function(){
        // console.log("HelloWorld")
        console.log("Server Started!!!")
    })
       
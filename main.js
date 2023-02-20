const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const {
  HTTP2_HEADER_PATH,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR
} = http2.constants

const server = http2.createServer()

const assetsRoot = './dist'

server.on('stream', (stream, headers) => {
  let reqPath = headers[HTTP2_HEADER_PATH]  
  
  const fullPath = path.join(assetsRoot, reqPath == '/' ? 'index.html' : reqPath)
  const responseMimeType = mime.lookup(fullPath)
  
  stream.respondWithFile(
    fullPath,
    {
      'content-type': responseMimeType
    }, {
      onError: err => {
        console.error(err)

        if(err.code === 'ENOENT') {
          stream.respond({ ":status": HTTP_STATUS_NOT_FOUND })
        } else {
          stream.respond({ ":status": HTTP_STATUS_INTERNAL_SERVER_ERROR })
        }

        stream.end()
      }
    }
  )
})

const port = +(process.env.PORT ?? 3000)

server.listen(port)

console.log('listen port', port)
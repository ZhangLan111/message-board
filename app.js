const http = require('http')
const fs = require('fs')
const url = require('url')
var template=require('art-template');

let comments=[
  {name:"赵一",message:"你用什么编辑器？",datetime:"2018-1-1"},
  {name:"孙二",message:"今天天气真好",datetime:"2018-1-1"},
  {name:"张三",message:"飞流直下三千只",datetime:"2018-1-1"},
  {name:"李四",message:"哈哈哈哈哈",datetime:"2018-1-1"},
  {name:"王五",message:"楼上是傻逼",datetime:"2018-1-1"}
]


http
  .createServer()
  .on('request',function (req,res){
    let parse = url.parse(req.url,true)
    let comment = parse.query
    let urlParse = parse.pathname
    console.log(req.url);
    if (urlParse === '/') {
      fs.readFile('./views/index.html',function (err,data) {
        if (err) {
          console.log("读取文件出错了："+err);
        }else{
          //res.end(data.toString())
          var htmlStr = template.render(data.toString(),{
            comments:comments
          });
          res.end(htmlStr);
        }
      })
    }else if (urlParse === '/liuyan') {
      fs.readFile('./views/comment.html',function (err,data) {
        if (err) {
          console.log("读取文件出错了："+err);
        }else{
          res.end(data.toString())
        }
      })
    }else if (urlParse.indexOf('/public') === 0) {
      fs.readFile('.'+urlParse,function (err,data) {
        if (err) {
          console.log("读取文件出错了："+err)
        }else{
          res.end(data.toString())
        }
      })
    }else if (urlParse === '/say') {
      
      console.log(comment);
      
      comment.datetime='2018-2-10'
      comments.unshift(comment)
      console.log(comment);
      res.statusCode=302
      res.setHeader('Location','/');
      res.end();
    }else{
      fs.readFile('./views/404.html',function (err,data) {
        if (err) {
          console.log("读取文件出错了："+err)
        }else{
          res.end(data.toString())
        }
      })
      
    }

  
    
  })
  .listen(3000,function () {
    console.log('server is running....');
    
  })
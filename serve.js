import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.mp4':'video/mp4','.webm':'video/webm'};
http.createServer(async(req,res)=>{try{const url=decodeURIComponent(new URL(req.url||'/', 'http://localhost').pathname);const relative=url.replace(/^\/+/, '');const target=path.resolve(root,relative);if(!target.startsWith(root+path.sep)&&target!==root){res.writeHead(403);res.end();return}let file=target;let data;try{data=await fs.readFile(file)}catch{file=path.join(root,'index.html');data=await fs.readFile(file)}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data)}catch(error){res.writeHead(500);res.end(String(error))}}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Site em http://localhost:'+(process.env.PORT||3000)));

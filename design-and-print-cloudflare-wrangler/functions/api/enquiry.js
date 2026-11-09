export async function onRequestPost({ request, env }) {
  const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
  if(!env.DB)return json({error:"The enquiry database is not configured."},503);
  if(!(request.headers.get("content-type")||"").includes("application/json"))return json({error:"Invalid request format."},415);
  let data;try{data=await request.json()}catch{return json({error:"Please check the form and try again."},400)}
  if(typeof data.website==="string"&&data.website.trim())return json({ok:true});
  const name=typeof data.name==="string"?data.name.trim():"",email=typeof data.email==="string"?data.email.trim():"",phone=typeof data.phone==="string"?data.phone.trim():"",service=typeof data.service==="string"?data.service.trim():"",message=typeof data.message==="string"?data.message.trim():"";
  if(!name||name.length>120)return json({error:"Please enter your name (up to 120 characters)."},400);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>190)return json({error:"Please enter a valid email address."},400);
  if(phone.length>40||service.length>100)return json({error:"One of the fields is too long."},400);
  if(!message||message.length>5000)return json({error:"Please enter an enquiry (up to 5,000 characters)."},400);
  try{
    await env.DB.prepare("INSERT INTO enquiries (full_name,email,telephone,service,message,created_at) VALUES (?,?,?,?,?,datetime('now'))").bind(name,email,phone||null,service||null,message).run();
    return json({ok:true},201);
  }catch(error){console.error("D1 insert failed",error);return json({error:"We could not save your enquiry. Please try again later."},500)}
}

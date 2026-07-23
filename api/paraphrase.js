export default async function handler(req,res){

if(req.method!=="POST"){

return res.status(405).json({
error:"Method Not Allowed"
});

}

try{

const{text}=req.body;

const response=await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{

method:"POST",

headers:{

"Authorization":
`Bearer ${process.env.GROQ_API_KEY}`,

"Content-Type":"application/json"

},

body:JSON.stringify({

model:"llama-3.3-70b-versatile",

messages:[

{

role:"system",

content:`Paraphrase the user's text.

Rules:

- Keep the same meaning.
- Use different wording.
- Make it natural.
- Improve readability.
- Return only the rewritten text.`

},

{

role:"user",

content:text

}

],

temperature:0.9

})

}

);

const data=await response.json();

res.status(200).json({

result:data.choices[0].message.content

});

}

catch(err){

res.status(500).json({

error:err.message

});

}

}

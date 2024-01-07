const apikey = "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"


const OpenAI = require('openai');
   const openai = new OpenAI('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');
  
   
    
     const gptResponse = openai.complete({
      engine: 'text-davinci-003',
      prompt: 'Translate the following English sentence to French: "{sentence}"',
      max_tokens: 60
   }); 
   
   
   console.log(gptResponse.choices[0].text);
   

const mumaker = require("mumaker");

async function texpro1(logo, texto) {
    let result;
    switch (logo) {
        case 'batman':
            result = await mumaker.textpro("https://textpro.me/make-a-batman-logo-online-free-1066.html", texto);
            break;
        case 'magma':
            result = await mumaker.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", texto);
            break;
        case 'sangre':
            result = await mumaker.textpro("https://textpro.me/horror-blood-text-effect-online-883.html", texto);
            break;
        case 'joker':
            result = await mumaker.textpro("https://textpro.me/create-logo-joker-online-934.html", texto);
            break;
            case 'pokemon':
            result = await mumaker.textpro("https://textpro.me/create-pokemon-logo-style-text-effect-online-1134.html", texto);
            break;
            case 'liquid':
            result = await mumaker.textpro("https://textpro.me/create-3d-liquid-metal-text-effect-1112.html", texto);
            break;
            case 'hallowen':
            result = await mumaker.textpro("https://textpro.me/halloween-fire-text-effect-940.html", texto);
            break;
            case 'toxic':
            result = await mumaker.textpro("https://textpro.me/toxic-text-effect-online-901.html", texto);
            break;
            case 'naruto':
            result = await mumaker.textpro("https://textpro.me/generate-naruto-logo-style-text-effect-online-1125.html", texto);
            break;
            case 'spooky':
            result = await mumaker.textpro("https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html", texto);
            break;
            case 'oso':
            result = await mumaker.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", texto);
            break;
            case 'madera':
            result = await mumaker.textpro("https://textpro.me/wood-text-effect-856.html", texto);
            break;
            case 'blackwall':
            result = await mumaker.textpro("https://textpro.me/break-wall-text-effect-871.html", texto);
            break;
            case 'lapiz':
            result = await mumaker.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", texto);
            break;
            case 'shuek':
            result = await mumaker.textpro("https://textpro.me/create-green-slime-text-effect-online-1097.html", texto);
            break;
            case 'dia':
            result = await mumaker.textpro("https://textpro.me/1917-style-text-effect-online-980.html", texto);
            break;
            case 'lava':
            result = await mumaker.textpro("https://textpro.me/lava-text-effect-online-914.html", texto);
            break;
            
            
            
            
            
        
        default:
            throw new Error(`Logo desconocido: ${logo}`);
    }
    return result;
}



module.exports = texpro1

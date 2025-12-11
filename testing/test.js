// const fetchData = async (pokemonCharacter, func) => {
//     try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`);
//         if (!response.ok) {
//             throw new Error("Could not fetch resource");
//         } else {
//             const data = await response.json();
//             return data;
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

// fetchData('pikachu', () => {
// //     console.log(data);
// // })

// const fetchData = async (pokemonCharacter, callback) => {
//     try {
//         const response = await fetch(
//             `https://pokeapi.co/api/v2/pokemon-species/charizard`
//         );

//         if (!response.ok) throw new Error("Could not fetch resource");

//         const data = await response.json();

//         callback(data); // <-- this is what you were missing
//     } catch (error) {
//         console.error(error);
//     }
// };

// fetchData("pikachu", (callback) => {
//     console.log("Received Pokémon data:", callback.weight);
// });




const reqData = async (pokemonCharacter) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`)
        if(!res.ok){
            throw new Error('req failed');
        }
        return res.json()
    }
    catch(error){
        console.error(error);
    }
}

const displayCharacterInfo = async () => {
    const data = await reqData('charizard')
    
    const {name, weight} = data;
    console.log(name, weight);
}

displayCharacterInfo()
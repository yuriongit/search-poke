const div = document.getElementById('mainDiv')
const inputEl = document.getElementById('pokeInput');
const buttonEl = document.getElementById('pokeButton');
const pokeImg = document.getElementById("pokeImg");
const pokeImg2 = document.getElementById("pokeImg2");
const pokePTag = document.getElementById("pokeP");
const pokeUlTag = document.getElementById("pokePhys");
const pokeUlTag2 = document.getElementById("pokeOther");
const pokePhysLabel = document.getElementById("pokePhysLabel");
const pokeOtherLabel = document.getElementById("pokeOtherLabel");
const validPokemonCharacters = [
    "pikachu",
    "charizard",
    "squirtle",
    "charmander",
    "gengar",
    "bulbasaur",
    "eevee",
    "ditto",
    "blastoise",
    "jigglypuff",
    "snorlax",
];


const fetchData = async (pokemonCharacter) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const sprite_front = data.sprites.other.showdown.front_default;
        const sprite_back = data.sprites.other.showdown.back_default;

        const pokeInfo = [
            {
                physicalStats: [
                    {
                        label: "weight",
                        stat: `${data.weight} lbs`,
                    },
                    {
                        label: "height",
                        stat: `${data.height} ft`,
                    },
                    {
                        label: "ability",
                        stat: data.abilities.map((i) => " " + i.ability.name),
                    },
                    {
                        label: "moves",
                        stat: data.moves.map((i) => " " + i.move.name),
                    },
                    {
                        label: "forms",
                        stat: data.forms.map((i) => " " + i.name),
                    },
                    {
                        label: "type slot",
                        stat: data.types.map((i) => " " + i.slot),
                    },
                    {
                        label: "type name",
                        stat: data.types.map((i) => " " + i.type.name),
                    },
                ],
                OtherInfo: [
                    {
                        label: "base experience",
                        stat: data.base_experience,
                    },
                    {
                        label: "base stat",
                        stat: data.stats.map((i) => " " + i.base_stat),
                    },
                    {
                        label: "stat type",
                        stat: data.stats.map((i) => " " + i.effort),
                    },
                ],
            },
        ];
        
        pokeInfo.map(i => {
            i.physicalStats.map(i => {
                const li = document.createElement("li");
                li.classList.add("text-zinc-300/85");
                li.classList.add("overflow-none");
                li.classList.add("overflow-y-auto");
                li.classList.add("max-h-20");
                li.classList.add("text-zinc-300/85");
                li.classList.add(`[&::-webkit-scrollbar-track]:rounded-full`);
                li.classList.add(`[&::-webkit-scrollbar]:w-2`);
                li.classList.add(`[&::-webkit-scrollbar-thumb]:bg-purple-500`);
                li.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag.appendChild(li);
            })
            i.OtherInfo.map((i) => {
                const li2 = document.createElement("li");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add("overflow-none");
                li2.classList.add("overflow-y-auto");
                li2.classList.add("max-h-14");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add("[&::-webkit-scrollbar-track]:rounded-full");
                li2.classList.add("[&::-webkit-scrollbar]:w-1");
                li2.classList.add("[&::-webkit-scrollbar-thumb]:bg-purple-600");
                li2.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag2.appendChild(li2);
            });
        })
        
        ;
        
        pokeImg.src = sprite_front;
        pokeImg2.src = sprite_back;
        
        inputEl.textContent = '';
    } catch (error) {
        inputEl.textContent = error;
    }
};

buttonEl.addEventListener('click', () => {
    
    const pokemonCharacter = inputEl.value;
    
    if (validPokemonCharacters.includes(pokemonCharacter.toLowerCase())) {
        pokePTag.textContent = `${pokemonCharacter.toUpperCase()}`;
        pokePhysLabel.textContent = `Physical Stats`;
        pokeOtherLabel.textContent = `Other Info`;
        inputEl.value = ""
        fetchData(pokemonCharacter);
    } else {
        return
    }
})

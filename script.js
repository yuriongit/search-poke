const inputEl = document.getElementById('pokeInput');
const buttonEl = document.getElementById('pokeButton');
const pokeImg = document.getElementById("pokeImg");
const pokeImg2 = document.getElementById("pokeImg2");
const pokePTag = document.getElementById("pokeP");

const pokeUlTag = document.getElementById("pokePhys");
const pokeUlTag3 = document.getElementById("pokeMovesAndAbilities");
const pokeUlTag2 = document.getElementById("pokeOther");

const pokePhysLabel = document.getElementById("pokePhysLabel");
const pokeOtherLabel = document.getElementById("pokeOtherLabel");
const pokeMovesAndAbilitesLabel = document.getElementById("pokeMovesAndAbilitesLabel");

const popularPokemonsBtnsDiv = document.getElementById('popularPokemonsBtnsDiv')

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
    "umbreon",
    "mimikyu",
    "dragapult",
    "dragonite",
    "mudkip",
    "garchomp",
    "arcanine",
    "lugia",
    "greninja",
    "wartortle",
    "poliwrath",
    "lickitung",
    "rayquaza",
    "haunter",
    "meowth",
];

const handlePopularPokes = () => {
    const mostPopularPokes = [
        "Charizard",
        "Gengar",
        "Gardevoir",
        "Umbreon",
        "Lucario",
        "Rayquaza",
    ];

    mostPopularPokes.map((i) => {
        const popularBtns = document.createElement("button");
        popularBtns.textContent = i;
        popularBtns.classList.add(
            ...[
                "cursor-pointer",
                "p-2",
                "rounded",
                "w-full",
                "hover:bg-white/2.5",
                'hover:text-purple-500',
                "duration-325",
                'hover:px-3',
                'ease-in-out',
                "text-zinc-300/85",
                'transition-all',
                'hover:font-black'
            ]
        );
        popularPokemonsBtnsDiv.appendChild(popularBtns);
        popularBtns.addEventListener('click', () => {
            pokePTag.textContent = i;
            pokePTag.classList.add('uppercase')
            fetchData(i);
            
        })
    });

    
}

handlePopularPokes()

const pageNum = document.getElementById("pageNum");

const blurredPreviewPoke = async () => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/gengar`
        );
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const sprite_front = data.sprites.other.showdown.front_default;
        const sprite_back = data.sprites.other.showdown.back_default;
        pokeImg.src = sprite_front;
        pokeImg2.src = sprite_back;
        pokeImg.classList.add('brightness-0')
        pokeImg2.classList.add('brightness-0')
        const pokeInfo = [
            {
                physicalStats: [
                    {
                        label: "height",
                        stat: `${data.height} ft`,
                    },
                    {
                        label: "weight",
                        stat: `${data.weight} lbs`,
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
                movesAndAbilities: [
                    {
                        label: "ability",
                        stat: data.abilities.map((i) => " " + i.ability.name),
                    },
                    {
                        label: "moves",
                        stat: data.moves.map((i) => " " + i.move.name),
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
        pokeInfo.map((i) => {
            pokePhysLabel.textContent = `Physical Stats`;
            pokeOtherLabel.textContent = `Other Info`;
            pokeMovesAndAbilitesLabel.textContent = `Moves & Abilities`;

            pokeUlTag.appendChild(pokePhysLabel);
            i.physicalStats.map((i) => {
                const li = document.createElement("li");
                li.classList.add("text-zinc-300/85");
                li.classList.add("overflow-none");
                li.classList.add("overflow-y-auto");
                li.classList.add("max-h-16.5");
                li.classList.add("text-zinc-300/85");
                li.classList.add(`[&::-webkit-scrollbar-track]:rounded-full`);
                li.classList.add(`[&::-webkit-scrollbar]:w-2`);
                li.classList.add(`[&::-webkit-scrollbar-thumb]:bg-purple-500`);
                li.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag.appendChild(li);
            });
            pokeUlTag2.appendChild(pokeMovesAndAbilitesLabel);
            i.movesAndAbilities.map((i) => {
                const li2 = document.createElement("li");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add("overflow-none");
                li2.classList.add("overflow-y-auto");
                li2.classList.add("max-h-16.5");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add(`[&::-webkit-scrollbar-track]:rounded-full`);
                li2.classList.add(`[&::-webkit-scrollbar]:w-2`);
                li2.classList.add(`[&::-webkit-scrollbar-thumb]:bg-purple-500`);
                li2.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag2.appendChild(li2);
            });
            pokeUlTag3.appendChild(pokeOtherLabel);
            i.OtherInfo.map((i) => {
                const li3 = document.createElement("li");
                li3.classList.add("text-zinc-300/85");
                li3.classList.add("overflow-none");
                li3.classList.add("overflow-y-auto");
                li3.classList.add("max-h-14");
                li3.classList.add("text-zinc-300/85");
                li3.classList.add("[&::-webkit-scrollbar-track]:rounded-full");
                li3.classList.add("[&::-webkit-scrollbar]:w-1");
                li3.classList.add("[&::-webkit-scrollbar-thumb]:bg-purple-600");
                li3.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag3.appendChild(li3);
            });
        });
        pokeUlTag.classList.add('blur-xs')
        pokeUlTag2.classList.add('blur-xs')
        pokeUlTag3.classList.add('blur-xs')
    }
    catch(error){
        console.error(error)
    }
}
blurredPreviewPoke()

const fetchData = async (pokemonCharacter) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const sprite_front = data.sprites.other.showdown.front_default;
        const sprite_back = data.sprites.other.showdown.back_default;

        pokeUlTag.textContent = "";
        pokeUlTag2.textContent = "";
        pokeUlTag3.textContent = "";

        pageNum.textContent = "1"

        const pokeInfo = [
            {
                physicalStats: [
                    {
                        label: "height",
                        stat: `${data.height} ft`,
                    },
                    {
                        label: "weight",
                        stat: `${data.weight} lbs`,
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
                movesAndAbilities: [
                    {
                        label: "ability",
                        stat: data.abilities.map((i) => " " + i.ability.name),
                    },
                    {
                        label: "moves",
                        stat: data.moves.map((i) => " " + i.move.name),
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

            pokePhysLabel.textContent = `Physical Stats`;
            pokeOtherLabel.textContent = `Other Info`;
            pokeMovesAndAbilitesLabel.textContent = `Moves & Abilities`;

            pokeUlTag.appendChild(pokePhysLabel);
            i.physicalStats.map((i) => {
                const li = document.createElement("li");
                li.classList.add("text-zinc-300/85");
                li.classList.add("overflow-none");
                li.classList.add("overflow-y-auto");
                li.classList.add("max-h-16.5");
                li.classList.add("text-zinc-300/85");
                li.classList.add(`[&::-webkit-scrollbar-track]:rounded-full`);
                li.classList.add(`[&::-webkit-scrollbar]:w-2`);
                li.classList.add(`[&::-webkit-scrollbar-thumb]:bg-purple-500`);
                li.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag.appendChild(li);
            });
            pokeUlTag2.appendChild(pokeMovesAndAbilitesLabel);
            i.movesAndAbilities.map((i) => {
                const li2 = document.createElement("li");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add("overflow-none");
                li2.classList.add("overflow-y-auto");
                li2.classList.add("max-h-16.5");
                li2.classList.add("text-zinc-300/85");
                li2.classList.add(`[&::-webkit-scrollbar-track]:rounded-full`);
                li2.classList.add(`[&::-webkit-scrollbar]:w-2`);
                li2.classList.add(`[&::-webkit-scrollbar-thumb]:bg-purple-500`);
                li2.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag2.appendChild(li2);
            });
            pokeUlTag3.appendChild(pokeOtherLabel);
            i.OtherInfo.map((i) => {
                const li3 = document.createElement("li");
                li3.classList.add("text-zinc-300/85");
                li3.classList.add("overflow-none");
                li3.classList.add("overflow-y-auto");
                li3.classList.add("max-h-14");
                li3.classList.add("text-zinc-300/85");
                li3.classList.add("[&::-webkit-scrollbar-track]:rounded-full");
                li3.classList.add("[&::-webkit-scrollbar]:w-1");
                li3.classList.add("[&::-webkit-scrollbar-thumb]:bg-purple-600");
                li3.textContent = `${i.label}: ${i.stat}`;
                pokeUlTag3.appendChild(li3);
            });
        });
        
        const imagesBox = document.getElementById("imagesBox");
        imagesBox.classList.remove("flex-row-reverse");

        pokeImg.classList.remove("brightness-0");
        pokeImg2.classList.remove("brightness-0");
        pokeUlTag.classList.remove("blur-xs");
        pokeUlTag2.classList.remove("blur-xs");
        pokeUlTag3.classList.remove("blur-xs");
        pokeImg.src = sprite_front;
        pokeImg2.src = sprite_back;

        

        const prevImgBtn = document.getElementById("prevImg");
        const nextImgBtn = document.getElementById("nextImg");
        prevImgBtn.addEventListener("click", () => {
            imagesBox.classList.remove("flex-row-reverse");
            pokeImg.src = sprite_front;
            pokeImg2.src = sprite_back;
            pageNum.textContent = "1";
            
        });
        
        nextImgBtn.addEventListener("click", () => {
            imagesBox.classList.add("flex-row-reverse");
            const sprite_frontAlt = data.sprites.other.showdown.front_shiny;
            const sprite_backAlt = data.sprites.other.showdown.back_shiny;

            pokeImg.src = sprite_frontAlt
            pokeImg2.src = sprite_backAlt
            pageNum.textContent = '2'
        });
        
        inputEl.textContent = '';
    } catch (error) {
        inputEl.textContent = error;
    }
};

buttonEl.addEventListener('click', () => {
    
    const pokemonCharacter = inputEl.value;
 
    if (validPokemonCharacters.includes(pokemonCharacter.toLowerCase())) {
        pokePTag.textContent = `${pokemonCharacter.toUpperCase()}`;
        inputEl.value = ""
        fetchData(pokemonCharacter);
    } else {
        null
    }
})

inputEl.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        const pokemonCharacter = inputEl.value;

        if (validPokemonCharacters.includes(pokemonCharacter.toLowerCase())) {
            pokePTag.textContent = `${pokemonCharacter.toUpperCase()}`;
            inputEl.value = "";
            fetchData(pokemonCharacter);
        } else {
            return;
        }
    }
});
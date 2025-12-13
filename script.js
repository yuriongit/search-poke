const inputSearch = document.getElementById("pokeInput");
const searchBtn = document.getElementById("pokeButton");
const pokeImg = document.getElementById("pokeImg");
const pokeImg2 = document.getElementById("pokeImg2");
const pokePTag = document.getElementById("pokeP");

const pokePhysLabel = document.getElementById("pokePhysLabel");


const pokeOtherLabel = document.getElementById("pokeOtherLabel");
const pokeMovesAndAbilitesLabel = document.getElementById("pokeMovesAndAbilitesLabel");

let detailsDiv = document.getElementById("purplePreviewDiv");

// IMAGES DIV AND ELEMENTS
const imagesBox = document.getElementById("imagesBox");
const prevImgBtn = document.getElementById("prevImg");
const nextImgBtn = document.getElementById("nextImg");
// IMAGES DIV AND ELEMENTS

// PAGE-NUM
const pageNum = document.getElementById("pageNum");
// PAGE-NUM

const popularPokemonsBtnsDiv = document.getElementById(
    "popularPokemonsBtnsDiv"
);

// LIST FORMATTER
const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
});

const numFormatter = new Intl.NumberFormat("en-US");
// LIST FORMATTER

// VALID POKEMONS
const validPokemonCharacters = [
    "pikachu",
    "pikachu-pop-star",
    "ivysaur",
    "venusaur",
    "caterpie",
    "metapod",
    "butterfree",
    "weedle",
    "kakuna",
    "beedrill",
    "pidgey",
    "pidgeotto",
    "pidgeot",
    "rattata",
    "raticate",
    "spearow",
    "fearow",
    "ekans",
    "arbok",
    "raichu",
    "sandshrew",
    "sandslash",
    "nidoran-f",
    "nidorina",
    "nidoqueen",
    "nidoran-m",
    "nidorino",
    "nidoking",
    "clefairy",
    "cleffa",
    "clefable",
    "vulpix",
    "wigglytuff",
    "igglybuff",

    "pichu",
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
    "munchlax",
    "umbreon",
    "dragapult",
    "dragonite",
    "dragonair",
    "mudkip",
    "garchomp",
    "arcanine",
    "growlithe",
    "lugia",
    "wartortle",
    "poliwrath",
    "lickitung",
    "rayquaza",
    "haunter",
    "drakloak",
    "dreepy",
    "meowth",
    "tyranitar",
    "gastly",
    "pupitar",
    "larvitar",
    "charmeleon",
];
// VALID POKEMONS

// STYLINGS
const wrapperDivStyles = ["uppercase", "h-fit"];
const headerStyles = [
    "text-2xl",
    "font-bold",
    "underline",
    "decoration-1",
    "decoration-purple-500",
    "underline-offset-4",
];
const ulStyles = ["flex", "flex-col", "text-wrap", "gap-4", "max-w-md"];
const liStyles = [
    "[&::-webkit-scrollbar-thumb]:bg-purple-600",
    "[&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar]:w-2",
    "max-h-18",
    "overflow-y-auto",
    "overflow-hidden",
    "font-normal",
    "text-base",
    "text-zinc-300/90",
    "font-medium",
    "items-center",
];
const liSpanStyles = ["text-purple-600", "font-light"];
// STYLINGS

// API CALL 1
const reqData1 = async (pokemonCharacter) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`
        );
        if (!response.ok) {
            throw new Error(`Could not fetch ${pokemonCharacter}`);
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
};
// API CALL 1

// API CALL 2
const reqData2 = async (pokemonCharacter) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonCharacter}`
        );
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    } catch (error) {
        inputSearch.value = error;
    }
};
// API CALL 2

// POPULAR POKEMONS ARRAY
const mostPopularPokes = [
    "charizard",
    "gengar",
    "tyranitar",
    "umbreon",
    "rayquaza",
    "mudkip",
];
// POPULAR POKEMONS ARRAY

const previewPokemon = async () => {
    const data = await reqData1(mostPopularPokes[Math.floor(Math.random() * mostPopularPokes.length)]);
    pokeImg.src = data.sprites.other.showdown.front_default;
    pokeImg2.src = data.sprites.other.showdown.back_default;
};
previewPokemon();

// MYSTERY POKEMON INITIAL LOAD
pokeImg.classList.add("brightness-0");
pokeImg2.classList.add("brightness-0");
prevImgBtn.classList.add("hover:cursor-not-allowed");
nextImgBtn.classList.add("hover:cursor-not-allowed");
// MYSTERY POKEMON INITIAL LOAD

// EXECUTE POKEMON SEARCH
const searchPokemon = async () => {
    const pokemonCharacter = inputSearch.value;
    inputSearch.textContent = "";

    // IF POKEMON SUBMITED IN VALIDPOKEMONS RUN SEARCH
    if (validPokemonCharacters.includes(pokemonCharacter.toLowerCase())) {
        togglePageCursor(prevImgBtn);
        togglePageCursor(nextImgBtn);
        pageNum.textContent = "1";
        pokePTag.textContent = `${pokemonCharacter.toUpperCase()}`;
        inputSearch.value = "";
        reqData1(pokemonCharacter);

        const data = await reqData1(pokemonCharacter);
        const data2 = await reqData2(pokemonCharacter)

        detailsDiv.textContent = "";
        // IF POKEMON SUBMITED IN VALIDPOKEMONS RUN SEARCH

        // POKEMON DETAILS UL
        const pokeDetails = (obj) => {
            const wrapperDiv = document.createElement("div");
            const pokeUl = document.createElement("ul");

            const pokeLatestCryAudio = document.createElement('audio');
            const pokeLatestCryPlayBtn = document.createElement("button");

            const pokeLegacyCryAudio = document.createElement("audio");
            const pokeLegacyCryPlayBtn = document.createElement("button");

            obj.map((i) => {
                const header = document.createElement("label");
                const pokeLi = document.createElement("li");
                const pokeLiSpan = document.createElement("span");

                header.textContent = i.header;
                pokeLi.textContent = i.label;
                pokeLiSpan.textContent = i.stat;

                if(i.label == 'cries: '){
                    const liStylesForBtns = ["items-center", 'flex', 'gap-2.5']
                    const playBtnsStyles = [
                        "bx",
                        "bx-play",
                        "text-xl",
                        "border",
                        "rounded-full",
                        "p-1",
                        "cursor-pointer",
                        "hover:bg-white/5",
                        "transition-all",
                        "border-zinc-800",
                        "text-purple-600",
                    ];

                    const hasCry = (info, playBtn) => {
                        if(info.textContent == "") {
                            playBtn.classList.add("hidden");
                        }
                    }
                    hasCry(i.stat, pokeLatestCryPlayBtn);
                    hasCry(i.stat2, pokeLegacyCryPlayBtn);  
                        
                    pokeLatestCryPlayBtn.classList.add(...playBtnsStyles);
                    pokeLegacyCryPlayBtn.classList.add(...playBtnsStyles);

                    pokeLi.classList.add(...liStylesForBtns);

                    pokeLi.appendChild(pokeLatestCryPlayBtn);
                    pokeLi.appendChild(pokeLegacyCryPlayBtn);
                    pokeLiSpan.classList.add('hidden');

                    pokeLatestCryAudio.src = i.stat;
                    pokeLegacyCryAudio.src = i.stat2;
                }
                
                wrapperDiv.classList.add(...wrapperDivStyles);
                header.classList.add(...headerStyles);
                pokeUl.classList.add(...ulStyles);
                pokeLi.classList.add(...liStyles);
                pokeLiSpan.classList.add(...liSpanStyles);

                pokeLi.appendChild(pokeLiSpan);
                pokeUl.appendChild(pokeLi);
                wrapperDiv.appendChild(header);
                wrapperDiv.appendChild(pokeUl);
                detailsDiv.appendChild(wrapperDiv);
            });
            const audioPlayer = (audio, audioBtn) => {
                audioBtn.addEventListener("click", () => {
                    audio.play();
                    audioBtn.classList.remove("bx-play");
                    audioBtn.classList.add("bx-pause");
                });
                audio.addEventListener("ended", () => {
                    audioBtn.classList.remove("bx-pause");
                    audioBtn.classList.add("bx-play");
                });
            }
            audioPlayer(pokeLatestCryAudio, pokeLatestCryPlayBtn)
            audioPlayer(pokeLegacyCryAudio, pokeLegacyCryPlayBtn)
        };
        // POKEMON DETAILS UL

        // POKEMON INFO ARRAY
        const pokeInfo = {
            physicalStats: [
                {
                    header: "physical attributes",
                },
                {
                    label: "height: ",
                    stat: `${data.height}' ft | ${(data.height * 30.48).toFixed(
                        2
                    )} cm`,
                },
                {
                    label: "weight: ",
                    stat: `${numFormatter.format(data.weight)} lbs | ${numFormatter.format((data.weight / 2.2).toFixed(2))} kg`,
                },
                {
                    label: "forms: ",
                    stat: data.forms.map((i) => i.name).join(", "),
                },
                {
                    label: "forms switchable: ",
                    stat: data2.forms_switchable,
                },
                {
                    label: "type: ",
                    stat: listFormatter.format(data.types.map((i) => i.type.name)),
                },
                {
                    label: "growth rate: ",
                    stat: data2.growth_rate.name,
                },
                {
                    label: "shape: ",
                    stat: data2.shape.name,
                },
            ],
            movesAndAbilities: [
                {
                    header: "moves & abilities",
                },
                {
                    label: "moves: ",
                    stat: listFormatter.format(data.moves.map(i => i.move.name)),
                    // listFormatter.format(data.moves.map((i) => i.move.name))
                },
                {
                    label: "ability: ",
                    stat: listFormatter.format(data.abilities.map((i) => i.ability.name))
                },
            ],
            species: [
                {
                    header: "species",
                },
                {
                    label: "egg group: ",
                    stat:
                        listFormatter.format(
                            data2.egg_groups.map((i) => i.name)
                        ) || "N/A",
                },
                {
                    label: "habitat: ",
                    stat: data2.habitat?.name || "N/A",
                },
                {
                    label: "capture rate: ",
                    stat: `${data2.capture_rate}/255`,
                },
            ],
            history: [
                {
                    header: "history",
                },
                {
                    label: "evolves from: ",
                    stat: data2.evolves_from_species?.name || "N/A",
                },
                {
                    label: "generation: ",
                    stat: data2.generation.name,
                },
            ],
            otherInfo: [
                {
                    header: "other info",
                },
                {
                    label: "base experience: ",
                    stat: `${data.base_experience} exp`,
                },
                {
                    label: "base happiness: ",
                    stat: `${data2.base_happiness} / 255`,
                },
                {
                    label: "base stat: ",
                    stat: data.stats.map((i) => i.base_stat).join(", "),
                },
                {
                    label: "stat type: ",
                    stat: data.stats.map((i) => i.effort).join(", "),
                },
                {
                    label: "gender rate: ",
                    stat: data2.gender_rate,
                },
            ],
            itemsAndMisc: [
                {
                    header: "held items & misc",
                },
                {
                    label: "held items: ",
                    stat:
                        data.held_items.length > 0
                            ? listFormatter.format(
                                  data.held_items.map((i) => i.item.name)
                              )
                            : "None",
                },
                {
                    label: 'cries: ',
                    stat: data.cries.latest,
                    stat2: data.cries.legacy,
                }
            ],
        };
        // POKEMON INFO ARRAY

        // POKEMON IMAGE SETTER
        const pokeImgSetter = (imgEl, sprite) => {
            imgEl.src = sprite;
        };
        // POKEMON IMAGE SETTER

        // POKEMON IMAGES
        const spriteFront = data.sprites.other.showdown.front_default;
        const spriteBack = data.sprites.other.showdown.back_default;
        const spriteFrontAlt = data.sprites.other.showdown.front_shiny;
        const spriteBackAlt = data.sprites.other.showdown.back_shiny;
        // POKEMON IMAGES

        pokeImg.classList.remove("brightness-0");
        pokeImg2.classList.remove("brightness-0");
        prevImgBtn.classList.remove("hover:cursor-not-allowed");
        nextImgBtn.classList.remove("hover:cursor-not-allowed");

        // POKEMON IMAGES SET
        pokeImgSetter(pokeImg, spriteFront);
        pokeImgSetter(pokeImg2, spriteBack);
        imagesBox.classList.remove(...["flex-row-reverse", "gap-4"]);
        pokeImgSetter(pokeImg, spriteFront);
        pokeImgSetter(pokeImg2, spriteBack);
        // POKEMON IMAGES SET

        // CREATE POKEMON DETAILS
        pokeDetails(pokeInfo.physicalStats);
        pokeDetails(pokeInfo.movesAndAbilities);
        pokeDetails(pokeInfo.otherInfo);
        pokeDetails(pokeInfo.history);
        pokeDetails(pokeInfo.species);
        pokeDetails(pokeInfo.itemsAndMisc);
        // CREATE POKEMON DETAILS

        // PAGE-SWITCHERS BUTTON EVENT LISTENERS
        nextImgBtn.addEventListener("click", () => {
            pageNum.textContent = "2";
            pokeImgSetter(pokeImg, spriteFrontAlt);
            pokeImgSetter(pokeImg2, spriteBackAlt);
            imagesBox.classList.add(...["flex-row-reverse", "gap-4"]);
        });
        prevImgBtn.addEventListener("click", () => {
            pageNum.textContent = "1";
            pokeImgSetter(pokeImg, spriteFront);
            pokeImgSetter(pokeImg2, spriteBack);
            imagesBox.classList.remove(...["flex-row-reverse", "gap-4"]);
        });
        // PAGE-SWITCHERS BUTTON EVENT LISTENERS
    } else return;
};
// EXECUTE POKEMON SEARCH

// POPULAR POKEMONS BUTTONS AND SEARCH EXECUTION
const popularPokemons = async () => {
    mostPopularPokes.map(async (i) => {
        const popularBtns = document.createElement("button");
        popularBtns.textContent = i;
        popularBtns.classList.add(
            ...[
                "cursor-pointer",
                "p-2",
                "rounded",
                "w-full",
                "h-fit",
                "hover:bg-white/2.5",
                "hover:font-black",
                "hover:text-purple-600",
                "hover:px-4",
                "duration-250",
                "ease-in-out",
                "text-zinc-300/85",
                "transition-all",
                "uppercase",
            ]
        );

        popularPokemonsBtnsDiv.appendChild(popularBtns);
        popularBtns.addEventListener("click", async () => {
            inputSearch.value = i;
            await searchPokemon();
        });
    });
};
popularPokemons();
// POPULAR POKEMONS BUTTONS AND SEARCH EXECUTION

// EVENT LISTENERS - CLICK, ENTER, PREV + NEXT IMG
searchBtn.addEventListener("click", () => {
    if (inputSearch.value == "") { 
        return;
    } searchPokemon();
});
inputSearch.addEventListener("keydown", (e) => {
    if (inputSearch.value == "") {
        return;
    } if (e.key === "Enter") {
        searchPokemon();
    }
    
});
// EVENT LISTENERS - CLICK, ENTER, PREV + NEXT IMG

// TOGGLE PAGE-SWITCH CURSOR
const togglePageCursor = (el) => {
    el.classList.remove("hover:cursor-not-allowed");
    el.classList.add("hover:cursor-pointer");
};
// TOGGLE PAGE-SWITCH CURSOR
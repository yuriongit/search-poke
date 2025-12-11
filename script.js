const inputSearch = document.getElementById("pokeInput");
const searchBtn = document.getElementById("pokeButton");
const pokeImg = document.getElementById("pokeImg");
const pokeImg2 = document.getElementById("pokeImg2");
const pokePTag = document.getElementById("pokeP");

const pokePhysLabel = document.getElementById("pokePhysLabel");
const pokeOtherLabel = document.getElementById("pokeOtherLabel");
const pokeMovesAndAbilitesLabel = document.getElementById("pokeMovesAndAbilitesLabel");

let detailsDiv = document.getElementById("purplePreviewDiv");

const imagesBox = document.getElementById("imagesBox");
const prevImgBtn = document.getElementById("prevImg");
const nextImgBtn = document.getElementById("nextImg");

// PAGE-NUM
const pageNum = document.getElementById("pageNum");
// PAGE-NUM

const popularPokemonsBtnsDiv = document.getElementById(
    "popularPokemonsBtnsDiv"
);

// VALID POKEMONS
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
    "dragapult",
    "dragonite",
    "mudkip",
    "garchomp",
    "arcanine",
    "lugia",
    "lucario",
    "greninja",
    "wartortle",
    "poliwrath",
    "lickitung",
    "rayquaza",
    "haunter",
    "meowth",
    "tyranitar",
];
// VALID POKEMONS

// STYLINGS
const wrapperDivStyles = ["uppercase", "h-fit"];
const headerStyles = ["text-2xl", "font-semibold"];
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

// API CALL
const reqData = async (pokemonCharacter) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}`
        );
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    } catch (error) {
        inputSearch.value = error;
    }
};
// API CALL

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
    const data = await reqData("gengar");
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

    pokeImg.classList.remove("brightness-0");
    pokeImg2.classList.remove("brightness-0");
    prevImgBtn.classList.remove("hover:cursor-not-allowed");
    nextImgBtn.classList.remove("hover:cursor-not-allowed");

    // IF POKEMON SUBMITED IN VALIDPOKEMONS RUN SEARCH
    if (validPokemonCharacters.includes(pokemonCharacter.toLowerCase())) {
        togglePageCursor(prevImgBtn);
        togglePageCursor(nextImgBtn);
        pageNum.textContent = "1";
        pokePTag.textContent = `${pokemonCharacter.toUpperCase()}`;
        inputSearch.value = "";
        reqData(pokemonCharacter);

        const data = await reqData(pokemonCharacter);

        detailsDiv.textContent = "";
        // IF POKEMON SUBMITED IN VALIDPOKEMONS RUN SEARCH

        // POKEMON DETAILS UL
        const pokeDetails = (obj) => {
            const wrapperDiv = document.createElement("div");
            const pokeUl = document.createElement("ul");

            obj.map((i) => {
                const header = document.createElement("label");
                const pokeLi = document.createElement("li");
                const pokeLiSpan = document.createElement("span");

                header.textContent = i.header;
                pokeLi.textContent = i.label;
                pokeLiSpan.textContent = i.stat;

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
                    stat: `${data.height} ft`,
                },
                {
                    label: "weight: ",
                    stat: `${data.weight} lbs`,
                },
                {
                    label: "forms: ",
                    stat: data.forms.map((i) => " " + i.name),
                },
                {
                    label: "type slot: ",
                    stat: data.types.map((i) => " " + i.slot),
                },
                {
                    label: "type name: ",
                    stat: data.types.map((i) => " " + i.type.name),
                },
            ],
            movesAndAbilities: [
                {
                    header: "moves & abilities",
                },
                {
                    label: "moves: ",
                    stat: data.moves.map((i) => " " + i.move.name),
                },
                {
                    label: "ability: ",
                    stat: data.abilities.map((i) => " " + i.ability.name),
                },
            ],
            OtherInfo: [
                {
                    header: "other info",
                },
                {
                    label: "base experience: ",
                    stat: data.base_experience + " exp",
                },
                {
                    label: "base stat: ",
                    stat: data.stats.map((i) => " " + i.base_stat),
                },
                {
                    label: "stat type: ",
                    stat: data.stats.map((i) => " " + i.effort),
                },
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
        pokeDetails(pokeInfo.OtherInfo);
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
searchBtn.addEventListener("click", searchPokemon);
inputSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchPokemon();
        imagesBox.classList.add(...["flex-row-reverse", "gap-7.5"]);
        if (pokePTag != inputSearch) {
            pageNum.textContent = "1";
            inputSearch.value = "";
        } else {
            return;
        }
    } else {
        return;
    }
});
// EVENT LISTENERS - CLICK, ENTER, PREV + NEXT IMG

// TOGGLE PAGE-SWITCH CURSOR
const togglePageCursor = (el) => {
    el.classList.remove("hover:cursor-not-allowed");
    el.classList.add("hover:cursor-pointer");
};
// TOGGLE PAGE-SWITCH CURSOR
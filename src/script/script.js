let url = "https://character-database.becode.xyz/characters";


// display templates
async function getCharacters() {
    try {
        const response = await fetch(url);
        const heroes = await response.json();
        //console.log(heroes);

        const template = document.querySelector("#template");
        const target = document.querySelector("#target");

        heroes.forEach(({ shortDescription, image, name, id }) => {
            const hero = template.cloneNode(true).content;

            hero.querySelector(".heroName").innerText = name;
            hero.querySelector(".heroDescription").innerText = shortDescription;
            hero.querySelector(".heroImg").setAttribute("src", `data:image/jpg;base64,${image}`);
            hero.querySelector(".edit").setAttribute("id", id);
            hero.querySelector(".delete").setAttribute("id", id);
            hero.querySelector(".display").setAttribute("id", id);

            target.appendChild(hero);
        });
    } catch (err) {
        console.error(err);
    }
}

getCharacters();

// add character
async function addCharacter() {
    //document.querySelector("#form").style.display = "block"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: "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",
                name: "CC",
                description: "I am a description",
                shortDescription: "SAVA FRR ????"
            }),
        });
        const heroID = await response.json();
        console.log(heroID);
    } catch (err) {
        console.error(err);
    }
}

//addCharacter();

// edit character
async function editHero(id) {
    try {
        const response = await fetch(url);
        const hero = await response.json();
        document.querySelector("#form").style.display = "block"
    } catch (err) {
        console.error(err);
    }
}

// delete a character
async function deleteHero(id) {
    if (confirm("Do you really want to delete ?")) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE"
            });
            document.location.reload();
        } catch (err) {
            console.error(err);
        }
    }
}

// display full character

// addd default if
async function displayHero(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        const hero = await response.json();
        document.querySelector("#card-open").style.display = "block"

        document.querySelector(".displayName").innerText = hero.name;
        document.querySelector(".displayShort").innerText = hero.shortDescription;
        document.querySelector(".displayDescription").innerText = hero.description;
        document.querySelector(".displayImg").setAttribute("src", `data:image/jpg;base64,${hero.image}`);

    } catch (err) {
        console.error(err);
    }
}

// close tabs
document.querySelector(".close.form").addEventListener("click", () => {
    document.querySelector("#form").style.display = "none"
});
document.querySelector(".close.display").addEventListener("click", () => {
    document.querySelector("#card-open").style.display = "none"
});
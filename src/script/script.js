let url = "https://character-database.becode.xyz/characters";
let image = "";


// display templates
async function getCharacters() {
    try {
        const response = await fetch(url);
        const heroes = await response.json();

        const template = document.querySelector("#template");
        const target = document.querySelector("#target");

        heroes.forEach(({ shortDescription, image, name, id }) => {
            const hero = template.cloneNode(true).content;

            hero.querySelector(".heroName").innerText = name;
            hero.querySelector(".heroDescription").innerText = shortDescription;
            hero.querySelector(".heroImg").setAttribute("src", `data:image;base64,${image}`);
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


document.querySelector("input[type=file]").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});

// add character
document.querySelector("#create").addEventListener("click", () => {
    document.querySelector("#form").style.display = "block";
    document.querySelector('#submit').addEventListener("click", async () => {

        const inputs = Array.from(document.querySelectorAll("input[type=text], textarea"));
        const values = inputs.map(({ value }) => value.trim());

        const [name, shortDescription, description] = values;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    shortDescription,
                    description,
                    image

                }),
            });
            document.location.reload();
        } catch (err) {
            console.error(err);
        }
    });
});


// edit character
async function editHero(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        const hero = await response.json();

        //change values of the form
        document.querySelector("#description").innerText = hero.description;
        document.querySelector("#shortdescription").value = hero.shortDescription;
        document.querySelector("#name").value = hero.name;
        // set default image
        image = hero.image;

        // display form
        document.querySelector("#form").style.display = "block";

        //get new form and put
        document.querySelector("#submit").addEventListener("click", async () => {
            const inputs = Array.from(document.querySelectorAll("input[type=text], textarea"));
            const values = inputs.map(({ value }) => value.trim());
            const [name, shortDescription, description] = values;



            const change = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    shortDescription,
                    description,
                    image
                }),
            });
            document.location.reload();
        });

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

// close/display tabs
document.querySelector(".close.form").addEventListener("click", () => {
    document.querySelector("#form").style.display = "none";
});
document.querySelector(".close.display").addEventListener("click", () => {
    document.querySelector("#card-open").style.display = "none";
});
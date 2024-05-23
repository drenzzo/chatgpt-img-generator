const API_KEY = "YOUR_CHATGPT_API_KEY";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".images-section");
const loader = document.querySelector("#loading");

// showing spinner
function displayLoading() {
    loader.classList.add("display");
    //to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 9000);
}

//hidding loading
function hideLoading() {
    loader.classList.remove("display");
}

const getImages = async() => {

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 4,
            "size": "1024x1024"
        })
    };

    displayLoading();


    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data = await response.json();
        hideLoading();

        data?.data.forEach(obj => {

            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", obj.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)

        });

    } catch (error) {
        console.error(error)
    };
}


submitIcon.addEventListener("click", getImages)
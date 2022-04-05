let rhymes = [];
let related = [];
let result = [];
let activeWord = '';

const drawRhymes = () => {
    rhymes = [];
    let list = document.querySelector("#rhymesList")
    fetch(`https://api.datamuse.com/words?rel_rhy=${activeWord}&max=300&md=df`).then(response =>{
        return response.json();
    }).then(data => {
        result = data
            .sort((a, b) => a.numSyllables - b.numSyllables)
            .forEach(element => {
                let frequency = parseFloat(element.tags[0].substr(2), 10);
                if(!element.word.includes(" ") && frequency > 0.1) {
                    rhymes.push(" " + element.word);
                }
            });
        list.innerHTML = rhymes.length > 0 ? rhymes : "We're out of rhyme.";
    })
}

const drawRelated = () => {
    related = [];
    let list = document.querySelector("#relatedList");
    fetch(`https://api.datamuse.com/words?rel_syn=${activeWord}&max=300`).then(response =>{
        return response.json();
    }).then(data =>{
        result = data
            .sort((a, b) => b.score - a.score)
            .forEach(element => {
                related.push(" " + element.word);
            });
        list.innerHTML = related.length > 0 ? related : "This word is truly synless.";
    })
}

document.querySelector("#rhymesCall").onclick = () => {
    if(activeWord) {
        drawRhymes();
    }
}

document.querySelector("#relatedCall").onclick = () => {
    if(activeWord) {
        drawRelated();
    }
}

document.querySelectorAll(".selToRhyme").forEach(item => {
    item.addEventListener("mouseup", () => {
    activeWord = window.getSelection().toString().trim();
    })
})
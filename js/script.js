document.addEventListener("DOMContentLoaded", function(){

    //Words
    let words = ["acknowledgement","complement","staid","consign","contusion","toad","trip","bible","bane","derivative","discomfit","vestige","maverick","neophyte","tangent",'dick',"pervert","duplicate","electric","emulate","exploit","foil","obstruct","fortune","aberration","abjure","victory","yawn","cogent","knell","knock","leverage","relegate","potential","cobbler","gratitude","gallop","heterogenous","identical","invoke","inoculate","insidious","sex","partnership","provoke","quilt","relegate","winsome","reproduce","wily","yoke","silly","bitch"];
    let question_word = words[(Math.floor(Math.random() * words.length))];

    let blanks = question_word.length;
    let question_map = new Map();
    for(let i = 0; i < blanks; i++){
        let char = question_word.charAt(i);
        let arr = [];
        arr.push(i);
        if (question_map.has(char) == false){
            question_map.set(char, arr);
        }else{
            question_map.get(char).push(i);
        }
    }

    //Question shown
    let word_element = document.getElementById('word');
    let question_shown_array = Array(blanks).fill("_");
    let question_shown;


    //Correct Letters
    let letters = [];
    for(let i = 0; i < blanks; i++){
        if (letters.includes(question_word[i])){
            continue;
        }else{
            letters.push(question_word[i]);
        }
    }

    let nmbr_of_btns = letters.length;
    const ansr_btns = [];
    for(let i = 0; i < nmbr_of_btns; i++){
        ansr_btns[i] = document.getElementById(letters[i]);
    }

    //Wrong Letters
    const wrng_btns = [];

    // let temp_string = "";
    // for(let i = 0; i < nmbr_of_btns; i++){
    //    temp_string += ":not(#" + ansr_btns[i].id + ")";
    // }
    // let string_for_wrng_btns = "input" + temp_string + ":not(#play-button)";

    // const wrng_btns = document.querySelectorAll(string_for_wrng_btns);

    for(let i = 0; i<26; i++){
        var ltr = String.fromCharCode(97+i);
        if(ansr_btns.includes(document.getElementById(ltr)) == false){
            wrng_btns.push(document.getElementById(ltr));
        }else{
            continue;
        }
    }

    //Play
    question_shown = question_shown_array.join("");
    word_element.innerHTML = `<br><br><br>${question_shown}`;

    //If correct button is clicked
    for(let i = 0; i < letters.length; i++){
        ansr_btns[i].addEventListener("click", function(){
            this.setAttribute('disabled', 'true');
            let ltr = this.id;
            let positions = question_map.get(ltr);
            for(let j = 0; j < positions.length; j++){
                question_shown_array[positions[j]] = ltr;
            }
            question_shown = question_shown_array.join("");
            word_element.innerHTML = `<br><br><br>${question_shown}`;
            if (question_shown_array.includes("_") == false){
                document.getElementById('keyboard').setAttribute('hidden', 'true');
                word_element.innerHTML += "<br><br> You won!"
            }else{
            }
        })
    }

    //If wrong button is clicked
    for(let i = 0; i < wrng_btns.length; i++){
        wrng_btns[i].addEventListener("click",function() {
            this.setAttribute('disabled', 'true');
            let image = document.getElementById('hangman-game');
            switch (image.getAttribute('src')) {
                case "/images/initial.jpg":
                    image.setAttribute('src', "/images/next1.jpg");
                    break;
                case "/images/next1.jpg":
                    image.setAttribute('src', "/images/next2.jpg");
                    break;
                case "/images/next2.jpg":
                    image.setAttribute('src', "/images/next3.jpg");
                    break;
                case "/images/next3.jpg":
                    image.setAttribute('src', "/images/next4.jpg");
                    break;
                case "/images/next4.jpg":
                    image.setAttribute('src', "/images/next5.jpg");
                    break;
                case "/images/next5.jpg":
                    image.setAttribute('src', "/images/next6.jpg");
                    break;
                case "/images/next6.jpg":
                    image.setAttribute('src', "/images/next7.jpg");
                    break;
                case "/images/next7.jpg":
                    image.setAttribute('src', "/images/lost.jpg");
                    document.getElementById('keyboard').setAttribute('hidden', 'true');
                    word_element.innerHTML += "<br><br> Sorry! You lost."
                    break;
            }
        })
    }
    

    //Play Again Button
    document.getElementById('play-button').onclick = () => {
        window.location.href = "/index.html";
    }
})
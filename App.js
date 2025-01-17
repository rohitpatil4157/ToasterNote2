console.log('Hello');

showNote();
clipBoard();

let Music = new Audio('./Popup.mp3');
let Whoosh = new Audio('./Wooosh3.mp3');
let addBtn = document.querySelector('#addBtn');
// let Video = document.querySelector('.Video').children[0];
let AddXt = document.querySelector('#AddXt');
AddXt.focus()

class f1noter {
    constructor(name) {
        this.name = name;
    }
    notify(text) {
        let warningBox = document.querySelector('.warning');
        warningBox.children[1].innerText = text
        warningBox.classList.add('warningX')

        setTimeout(() => {
            warningBox.classList.remove('warningX')
        }, 1500)
    }
}

let f1 = new f1noter();
// console.log(f1.notify('tere Wadil'))
// function 

function sleep(ms) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}

function debounce(fn, delay) {
    let timeId;
    return function (...args) {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}

AddXt.addEventListener('blur', () => {
    addBtn.focus()
})


addBtn.addEventListener('click', () => {
    let notes = localStorage.getItem('notes');

    if (AddXt.value) {
        Music.play()

        let notesObj;
        if (notes === null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes);
        }

        //Wrap your whole data in One single Object Literal :))
        let MyObj = {
            text: AddXt.value,
            time: getTime(),
        }

        notesObj.push(MyObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        AddXt.value = ""
        setTimeout(() => {
            showNote();
            clipBoard()
        }, 0);
        return;  // Guard Clause saves us from writing else below
    }

    // Video.pause()
    debounce(() => f1.notify("Empty Notes aren't allowed :)"), 350)()


})


function clipBoard() {
    let Notes = document.querySelectorAll('.notes');
    let notesTxt = document.querySelectorAll('.notesTxt');
    let copyBtn = document.querySelectorAll('.material-symbols-outlined')

    Array.from(Notes).forEach((e, index) => {
        Notes[index].addEventListener('dblclick', () => {
            let copiedText = notesTxt[index].innerText;

            copyBtn[index].classList.toggle('goUp');
            navigator.clipboard.writeText(copiedText);
            navigator.vibrate([0, 50, 90])

            setTimeout(() => {
                copyBtn[index].classList.remove('goUp');
            }, 1200)
        })

    })

}


function showNote() {
    let notes = localStorage.getItem('notes');
    let AddXt = document.querySelector('#AddXt')

    let notesObj;
    if (notes === null && AddXt.value == "") {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach((element, index) => {
        let elemText = element.text;
        if (elemText.includes('<') || elemText.includes('>')) {
            elemText = elemText.replaceAll('<', '&lt;');
            elemText = elemText.replaceAll('>', '&gt;')
        }

        // // <h2>Note </h2>
        // <button id="${index}" onclick="deleteNote(this.id)"><i class="fa-solid fa-xmark"></i></button>
        html += `<div class="notes">
                    <div class="titleCircle">
                        <p>${index + 1}</p>
                    </div>
                    
                    <section class="notesTxt">
                        <pre>${elemText}</pre>
                    </section>
                    <button id="${index}" onclick="deleteNote(this.id)"><i class="fa-solid fa-minus"></i></button>
                    <span class="time">${element.time}</span>
                    <p><span class="material-symbols-outlined ">content_copy</span></p>
                </div>`

    });

    let Container = document.querySelector('.container');
    Container.innerHTML = html

}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    let notesObj;
    if (notes === null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let deleteWrapper = document.querySelector('.delelteWrapper');
    deleteWrapper.classList.add('show')

    deleteWrapper.children[1].children[0].addEventListener('click', () => {
        deleteWrapper.classList.remove('show')
        //back button
    });


    deleteWrapper.children[1].children[1].addEventListener('click', (e) => {
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        deleteWrapper.classList.remove('show');

        setTimeout(() => {
            showNote()
            navigator.vibrate(90)
            Whoosh.play()
            f1.notify(`Your Note Has been deleted`);
            clipBoard();
        }, 1);

    })

    // document.addEventListener('dblclick', () => {
    //     clearTimeout(setVal)
    //     f1.notify('Cancelled')
    // })

}


function getTime() {

    let date = new Date();
    let dateForum = `${date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })} | 
                    ${date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' })}`;

    return dateForum;

}

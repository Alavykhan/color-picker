const colorPickerBtn = document.querySelector('#color-picker');
const colorList = document.querySelector('.all-colors');
const clearAll = document.querySelector('.clear-all');
const pickedColors = JSON.parse(localStorage.getItem('picked-color') || '[]');

const copyColor = elem =>{
    navigator.clipboard.writeText(elem.dataset.color)
    // console.log(elem);
    elem.innerText ='Copied';
    setTimeout(()=> elem.innerText = elem.dataset.color, 1000)
}


const showColors = ()=>{
    if(!pickedColors.length) return; //Returning if there are no picked color 
    colorList.innerHTML = pickedColors.map(color=> `
        <li class="color">
                    <span class="react" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
                    <span class="value" data-color="${color}">${color}</span>
        </li>
    `).join(''); // generating li for the picked color and adding it to the colorList 
    

    document.querySelector('.picked-color').classList.remove('hide');

    // Add a click event listener to each color element to copy the color code
    document.querySelectorAll(".color").forEach(li =>{
        li.addEventListener('click', e=>copyColor(e.currentTarget.lastElementChild))
    })
}

showColors();

const activateEyeDropper = async ()=>{
    try{
        // opening the eye dropper and getting the selected color
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);
            localStorage.setItem('picked-color', JSON.stringify(pickedColors))
            showColors();
        }

    }catch(error){
        console.log(error);
    }
}

// clearing all picked colors, updating localStorage, and hiding the pickedColors element
const clearAllColors =()=>{
    pickedColors.length = 0;
    localStorage.setItem('picked-color', JSON.stringify(pickedColors));
    document.querySelector('.picked-color').classList.add('hide');
}


clearAll.addEventListener('click', clearAllColors)
colorPickerBtn.addEventListener('click', activateEyeDropper);
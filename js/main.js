let slider = document.getElementById("price-slider");
let toggleSwitch = document.getElementById("toggle-switch");
let maxSliderValue = slider.getAttribute("max");
let isCheck;

let priceText = document.querySelector(".price span");
let views = document.getElementsByClassName("views")[0];
let color;
let percentageVal;
let clicked=false;

percentageVal = (slider.value / maxSliderValue) * 100;

color = `linear-gradient(90deg,hsl(174, 77%, 80%) ${percentageVal}% ,hsl(224, 65%, 95%) ${percentageVal}%)`;
slider.style.background = color;

const viewsCalculator = (price) => {
    const percentage = ((price / maxSliderValue) * 100).toFixed(2);
    const exactViews = Number(200 * percentage) / 100;
    return exactViews;
};

priceText.textContent = `$${(Number(slider.value * 1.00)).toFixed(2)}`;

slider.oninput = function () {
    isCheck = toggleSwitch.checked;
    let sliderCurrentValue=(Number(slider.value * 1.00)).toFixed(2);
    if(isCheck){
        let calculatedPrice=(sliderCurrentValue -((sliderCurrentValue * 25) / 100)).toFixed(2);
        priceText.textContent = `$${calculatedPrice}`;
    }
    else{
        priceText.textContent = `$${sliderCurrentValue}`;
    }
    views.textContent = viewsCalculator(slider.value) + 'K';
    percentageVal = (slider.value / maxSliderValue) * 100;
    color = `linear-gradient(90deg,hsl(174, 77%, 80%) ${percentageVal}% ,hsl(224, 65%, 95%) ${percentageVal}%)`;
    slider.style.background = color;
}

slider.addEventListener('pointermove', (e) => {
    // priceText.textContent = `$${sliderCurrentValue}`; 
    views.textContent = viewsCalculator(slider.value) + 'K';
    percentageVal = (e.target.value / maxSliderValue) * 100;
    color = `linear-gradient(90deg,hsl(174, 77%, 80%) ${percentageVal}% ,hsl(224, 65%, 95%) ${percentageVal}%)`;
    e.target.style.background = color;
})

toggleSwitch.addEventListener("click", (e) => {
    isCheck = e.target.checked;
    let price=priceText.textContent.split('$')[1];
    let calculatedPrice=(price -((price * 25) / 100)).toFixed(2);
    if (isCheck) {
        clicked=true;
        priceText.textContent="$"+calculatedPrice;
        e.target.style.backgroundColor="hsl(174, 86%, 45%)";
    }
    else{
        clicked=false;
        e.target.style.backgroundColor="hsl(223, 50%, 87%)";
        priceText.textContent = "$"+(Number(slider.value * 1.00)).toFixed(2);
    }
})

toggleSwitch.addEventListener("mouseleave", (e) => {
    e.target.style.backgroundColor="hsl(174, 86%, 45%)";
    if(!clicked){
        e.target.style.backgroundColor="hsl(223, 50%, 87%)";
    }
})

toggleSwitch.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor="hsl(174, 86%, 45%)";
});

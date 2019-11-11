let EPLUS_SlideConfiguration = {
  mainDiv: "selector",
  arrowImage: 'left-arrow.png',
  boxSlideClass: "EPLUS-box-slide",
  itemSlideClass: "EPLUS-slide-item",
  inicialSelectText: "Escolha",
  zebraColor: ["#eee", "#fff"],
  arrowSelect: "arrow-select",
};

function EPLUS_select(info) {
  let container = document.querySelector('.' + info.mainDiv);
  container.style.position = 'relative';
  container.style.width = '10em';
  container.style.height = 'fit-content';

  let boxSelect = document.createElement('div');
  boxSelect.classList.add('EPLUS-box-select');
  boxSelect.style.maxHeight = info.minHeight;

  let selectText = document.createElement('span');
  selectText.classList.add('select-text');
  selectText.textContent = info.inicialSelectText;

  let arrowImage = document.createElement('img');
  arrowImage.classList.add('arrow-select');
  arrowImage.src = info.arrowImage;
  arrowImage.alt = 'Seta seletor';

  let slideToggleDiv = document.createElement('div');
  slideToggleDiv.classList.add('EPLUS-box-slide');

  boxSelect.appendChild(selectText);
  boxSelect.appendChild(arrowImage);
  boxSelect.appendChild(slideToggleDiv);
  container.appendChild(boxSelect);


  boxSelect.addEventListener("click", function() {
    let itemsSlide = document.querySelectorAll("." + info.itemSlideClass);
    let boxSlide = document.querySelectorAll("." + info.boxSlideClass);
    let open = boxSlide[1] ? true : false;

    arrowImage.classList.toggle('EPLUS-arrow-rotate');
    if (open) {
      Array.from(itemsSlide).map(function(item, index) {
        item.style.transitionDuration = index * 30 + "ms";
        item.classList.add("item-slide-closed");
        setTimeout(function() {
          item.classList.remove("item-slide-closed");
          boxSlide[0].appendChild(item);
        }, 500);
      });
      boxSlide[1].classList.add("box-slide-closed");
      setTimeout(function() {
        boxSlide[1].classList.remove("box-slide-closed");
        boxSlide[1].remove();
      }, 700);
      return;
    }

    
    let newBoxSlide = document.createElement("div");
    newBoxSlide.classList.add(info.boxSlideClass);
    
    Array.from(itemsSlide).map(function(item, index) {
      item.classList.add(info.itemSlideClass);
      item.style.backgroundColor = index % 2 == 0 ? info.zebraColor[0] : info.zebraColor[1];
      item.style.animationDelay = index * 30 + "ms";
      
      item.addEventListener("click", function(e) {
        e.target.classList.remove("item-slide-closed");
        selectText.textContent = e.target.textContent;
      });

      newBoxSlide.appendChild(item);
    });
    boxSelect.appendChild(newBoxSlide);
  });
}

EPLUS_select(EPLUS_SlideConfiguration);


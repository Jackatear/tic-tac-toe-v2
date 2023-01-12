function initialise() {
    const heading = document.querySelector('.announce')
    const tiles = document.querySelectorAll('.tile')
    const tileArray = Array.from(tiles)
    const remainder = [0,1,2,3,4,5,6,7,8]
    const cover = document.querySelector('.cover');


    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            console.log(remainder)
            if (tile.classList.contains('clicked')){
                console.log('clicked')
                return
            }
            // Player One Move
            let indexClicked = tileArray.indexOf(e.target);
            tiles[indexClicked].classList.add('clicked');
            tiles[indexClicked].textContent = "x"

            

            // Remove from remainder
            let toRemove = remainder.indexOf(indexClicked)
            remainder.splice(toRemove, 1);

            // Check Draw
            if (remainder.length == 0){
                heading.textContent = 'Draw'
                cover.style.display = 'block'
                return
            }

            // Check for Winner
            if (checkWinner('x', tiles)) {
                heading.textContent = 'x Wins!'
                let grid = document.querySelector('.grid')
                grid.style.backgroundColor = 'white';
                
                cover.style.display = 'block'
                return;
            }


            /// Computer Move
            let random = Math.floor(Math.random()*remainder.length);

            tiles[remainder[random]].textContent = 'o';
            tiles[remainder[random]].classList.add('clicked');
            remainder.splice(random, 1);


            // Check for Winner
            if (checkWinner('o', tiles)) {
                heading.textContent = 'o Wins!'
                let grid = document.querySelector('.grid')
                grid.style.backgroundColor = 'white';
                cover.style.display = 'block'
                return;
            }

        })
    })
}
initialise();

function checkWinner(marker, tiles){
    function check(pos1, pos2, pos3) {
        if (
          (tiles[pos1].textContent == marker) &
          (tiles[pos2].textContent == marker) &
          (tiles[pos3].textContent == marker)
        ) {
          return true;
        } else {
          return false;
        }
      }
    
      if (check(0, 3, 6)) return true;
      if (check(1, 4, 7)) return true;
      if (check(2, 5, 8)) return true;
      if (check(0, 1, 2)) return true;
      if (check(3, 4, 5)) return true;
      if (check(6, 7, 8)) return true;
      if (check(0, 4, 8)) return true;
      if (check(2, 4, 6)) return true;
}


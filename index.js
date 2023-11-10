let colors = ['green', 'red', 'yellow', 'blue'];
let userClicked =[];
let order = [];
let theRandomNumber;
let count = 0;
let btnCount = 0;
let lvl = 0;

$(document).on('keydown click', function() {
    count++;
        if (count === 1 ){
            randomNumber();   
        }
});

function randomNumber() {
    lvl++;
    $('#level-title').text('Level ' + lvl);
    let theRandomNumber = Math.floor(Math.random() * 4 + 1);
    order.push(colors[theRandomNumber - 1]);

    $('#' + order[order.length-1]).addClass("pressed").delay(300).queue(function(next){
    $(this).removeClass("pressed");
    next();
    
    });

    let defaultSound = new Audio("./sounds/" + order[order.length -1] + ".mp3");
    defaultSound.play();
    btnCount = 0;
    userClicked = [];
};

$('.btn').on('click', function( event ) {
    if (count == btnCount){ ;}
    
    else {
        let clickedId = event.target.id;
        userClicked.push(clickedId);
        btnCount++;

        $('#' + clickedId).addClass("pressed").delay(300).queue(function(next){
            $(this).removeClass("pressed");
            next();
        });

        let userSound = new Audio("./sounds/" + clickedId + ".mp3");
        userSound.play();

        checker();
    }
});

function checker () {

    if (btnCount == order.length) {
        if (order == userClicked.toString()) {
            setTimeout(function() {
                randomNumber.call(this);
            }, 1000);
        }
        else {
            wrong();
        }
    }

    else {
        for (i =0 ; i < userClicked.length; i++ ){
            if (order[i] != userClicked[i]) {
                wrong();
            }
        }
    }

}

function wrong () {
    $('body').addClass("game-over");
    $('#level-title').html('<img src="./istockphoto-993792612-612x612.jpg" alt="game over image">')
    let wrongSound = new Audio('./sounds/wrong.mp3');
    wrongSound.play();
    $('.restart').html('<p>Click Here to Restart</p>')
}

$('.restart').on('click', function(){

    $('.restart').addClass("pressed").delay(300).queue(function(next){
        $(this).removeClass("pressed");
        next();
    })


    location.reload();
})
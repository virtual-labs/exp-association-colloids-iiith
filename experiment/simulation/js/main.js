let detergentAddCounter = 1;

// disable onclick of all components except of spoon and detergent
if(document.getElementsByClassName("clothWithStain")[0]){
    document.getElementsByClassName("clothWithStain")[0].style.pointerEvents = 'none';
}
if(document.getElementsByClassName("glassRod")[0]){
    document.getElementsByClassName("glassRod")[0].style.pointerEvents = 'none';
}
if(document.getElementsByClassName("spoon2")[0]){
    document.getElementsByClassName("spoon2")[0].style.pointerEvents = 'none';
}
if(document.getElementsByClassName("detergent2")[0]){
    document.getElementsByClassName("detergent2")[0].style.pointerEvents = 'none';
}
if(document.getElementsByClassName("spoon3")[0]){
    document.getElementsByClassName("spoon3")[0].style.pointerEvents = 'none';
}
if(document.getElementsByClassName("detergent3")[0]){
    document.getElementsByClassName("detergent3")[0].style.pointerEvents = 'none';
}


// Functions for structure of soap part.
// below function shows information about micelle parts when hovered upon
function showMicelleInformation(part){
    'use strict';
    let tailInfo = document.getElementsByClassName("micelle-information")[0];
    let info = "";
    if(part === 'tail'){
        info = "Hydrocarbon Chain(C<sub>7</sub>H<sub>35</sub>) </br> </br> Hydrophobic </br> (Water Repelling)";
    }else if(part === 'head'){
        info = "Ionic End(COO<sup>-</sup>Na<sup>+</sup>) </br> </br> Hydrophilic </br> (Water Attracting)";
    }
    tailInfo.innerHTML = info;
}
// The below functions hide the information about the micelle parts 
// when cursor is not above them.
function hideTailInformation(){
    'use strict';
    let tailInfo = document.getElementsByClassName("micelle-information")[0];
    tailInfo.innerHTML = "";
}

function hideHeadInformation(){
    'use strict';
    let headInfo = document.getElementsByClassName("micelle-information")[0];
    headInfo.innerHTML = "";
}

// Functions of Cleansing action
// Below function moves the spoon and detergent from 
// top right corner towards the beaker.
function moveSpoon(){
    'use strict';
    let procedureMessage = document.getElementsByClassName("procedureMessage")[0]
    let SCREENWIDTH = window.innerWidth
    let changeYForDetergent = '24vw';
    if(SCREENWIDTH > 1200){
        changeYForDetergent = '19vw';
    }

    // disable onclick of spoon and detergent
    document.getElementsByClassName("spoon"+detergentAddCounter)[0].style.pointerEvents = 'none';
    document.getElementsByClassName("detergent"+detergentAddCounter)[0].style.pointerEvents = 'none';
    
    // enable onclick of glass rod
    document.getElementsByClassName("glassRod")[0].style.pointerEvents = 'auto';
    
    let a1 = anime.timeline({
        duration: 800,
        easing: 'linear'
    });
    a1.add({
        targets: '.spoon'+detergentAddCounter+', .detergent'+detergentAddCounter,
        translateX: '-45vw',
        translateY: '10vw',
    }).add({
        targets: '.spoon'+detergentAddCounter+', .detergent'+detergentAddCounter,
        rotateX: '30'
    }).add({
        targets: '.detergent'+detergentAddCounter,
        translateY: changeYForDetergent,
        opacity: '0.5'
    }).add({
        targets: '.spoon'+detergentAddCounter,
        translateX: '0vw',
        opacity:'0'
    }).add({
        update: function(anim) {
            let message = "Mix the detergent by clicking on the glass rod";
            procedureMessage.innerHTML = message;
        }
    }).add({
        duration:'1',
        targets:'.glassRod',
        opacity:'0.6'
    });

    
}

// This function simulates the action of mixing the solution with a glass rod.
function moveGlassRod(expName){
    'use strict';
    let procedureMessage = document.getElementsByClassName("procedureMessage")[0]; 
    let videoMessage = document.getElementsByClassName("videoMessage")[0];
    let videos = document.getElementsByClassName("videos")[0];
    
    // disable onclick of glass rod
    document.getElementsByClassName("glassRod")[0].style.pointerEvents = 'none';

    let a1=anime.timeline({
        duration: 1000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: 4
    });
    a1.add({
        targets: '.glassRod',
        rotate: [10, -10]
    });
    let a2 = anime({
        targets: ".detergent"+detergentAddCounter,
        delay: '3000',
        easing: 'linear',
        opacity: '0'
    });
    let a3 = anime({
        targets: '.glassRod',
        delay: '4000',
        easing: 'linear',
        opacity: '0',
    });

    // There are two experiments which use the same function and hence this if else conditions.
    if (expName === "cleansingAction"){
        // enable onclick of stained cloth
        document.getElementsByClassName("clothWithStain")[0].style.pointerEvents = 'auto';
        setTimeout(function(){
            let message = "Watch the molecular view of soap molecules in water below and then click on the dirty cloth";
            videoMessage.style.display = 'block';
            videos.style.display = 'block';
            procedureMessage.innerHTML = message;
        },4000);
        let a4 = anime({
            targets : ".clothWithStain",
            delay: '4000',
            easing: 'linear',
            opacity: '1'
        });
    }
    else if(expName === "micelleFormation"){
        let videoSource = document.getElementsByClassName("videoSource")[0];
        if(detergentAddCounter === 1){
            let spoon2 = document.getElementsByClassName("spoon2")[0];
            let detergent2 = document.getElementsByClassName("detergent2")[0];
            setTimeout(function(){
                spoon2.style.opacity = '1';
                spoon2.style.pointerEvents = 'auto';
                detergent2.style.opacity = '1';
                detergent2.style.pointerEvents = 'auto';
                detergentAddCounter++;
                procedureMessage.innerHTML = "watch the molecular view below and add some more detergent.";
                videoMessage.style.display = 'block';
                videos.style.display = 'block';
                videoMessage.innerHTML = "molecular view of soap molecules at low concentration:";
            },4500);
        }else if(detergentAddCounter === 2){
            let spoon3 = document.getElementsByClassName("spoon3")[0];
            let detergent3 = document.getElementsByClassName("detergent3")[0];
            setTimeout(function(){
                spoon3.style.opacity = '1';
                spoon3.style.pointerEvents = 'auto';
                detergent3.style.opacity = '1';
                detergent3.style.pointerEvents = 'auto';
                detergentAddCounter++;
                procedureMessage.innerHTML = "watch the molecular view below and add some more detergent.";
                videoMessage.innerHTML = "Molecular view of soap molecules at medium concentration.";
                videos.pause();
                videoSource.setAttribute('src','./images/videos/MolecularView.mp4');
                videos.load();
                videos.play();
            },4500);
        }else if(detergentAddCounter === 3){
            setTimeout(function(){
                document.getElementsByClassName("instructions")[0].innerHTML = "Observations:";
                procedureMessage.innerHTML = "Watch the micelle formation below. Critical Micelle Concentration(CMC) achieved";
                videoMessage.innerHTML = "molecular view of soap molecules at critical micelle concentration:";
                videos.pause();
                videoSource.setAttribute('src','./images/videos/HighConc.mp4');
                videos.load();
                videos.play();
            })
        }
        
    }
}

// This function simulates the movement of the cloth with stain into the detergent solution
function moveClothWithStain(){
    'use strict';
    let videos = document.getElementsByClassName("videos")[0];
    let videoSource = document.getElementsByClassName("videoSource")[0];
    let videoMessage = document.getElementsByClassName("videoMessage")[0];
    let procedureMessage = document.getElementsByClassName("procedureMessage")[0];
    let SCREENWIDTH = window.innerWidth;
    let changeYForCloth = '28vw';
    if(SCREENWIDTH > 1200){
        changeYForCloth = '22vw';
    }

    procedureMessage.innerHTML = "Watch the molecular view of cleaning action of soap below";

    // disable onclick of stained cloth.
    document.getElementsByClassName("clothWithStain")[0].style.pointerEvents = 'none';

    let a1 = anime.timeline({
        duration: '1000',
        easing: 'linear'
    });
    a1.add({
        targets:'.clothWithStain',
        rotateX:'40',
        translateY: changeYForCloth,
        opacity: '0.6'
    });
    setTimeout(function(){
        videos.pause();
        videoSource.setAttribute('src','./images/videos/cleaningcloth.mp4');
        videos.load();
        videos.play();
        videoMessage.innerHTML = "Cleansing action of soap molecules and formation of micelle:";
    },800);
    setTimeout(function(){
        let a2 = anime.timeline({
            duration: '0',
            easing:'linear'
        })
        a2.add({
            targets: '.clothWithStain',
            opacity:'0'
        }).add({
            targets:'.plainCloth',
            opacity:'0.6'
        })
        .add({
            duration: '2000',
            targets: '.plainCloth',
            translateY: '-17vw',
            opacity:'1'
        });
        let message = "We get the clean cloth.";
        document.getElementsByClassName("instructions")[0].innerHTML = "Observations:";
        document.getElementsByClassName("procedureMessage")[0].innerHTML = message;
    },8000);
    
}

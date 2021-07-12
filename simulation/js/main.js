'use strict';
let detergentAddCounter = 1;

// disable onclick of all components except of spoon and detergent
if(document.getElementById("cloth-with-stain")){
    document.getElementById("cloth-with-stain").style.pointerEvents = 'none';
}
if(document.getElementById("glass-rod")){
    document.getElementById("glass-rod").style.pointerEvents = 'none';
}

// Functions for structure of soap part.
// below function shows information about micelle parts when hovered upon
function showMicelleInformation(part){
    'use strict';
    const tailInfo = document.getElementById("micelle-information");
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
function hideInformation(){
    'use strict';
    const info = document.getElementById("micelle-information");
    info.innerHTML = "";
}

// Functions of Cleansing action
// Below function moves the spoon and detergent from 
// top right corner towards the beaker.
function moveSpoon(){
    'use strict';
    const procedureMessage = document.getElementsByClassName("procedure-message")[0]
    const screenWidth = window.innerWidth
    let changeYForDetergent = '24vw';
    if(screenWidth > 1200){
        changeYForDetergent = '19vw';
    }

    // disable onclick of spoon and detergent
    document.getElementById("spoon").style.pointerEvents = 'none';
    document.getElementById("detergent").style.pointerEvents = 'none';
    
    // enable onclick of glass rod
    document.getElementById("glass-rod").style.pointerEvents = 'auto';
    
    const a1 = anime.timeline({
        duration: 800,
        easing: 'linear'
    });
    a1.add({
        targets: '#spoon, #detergent',
        translateX: '-45vw',
        translateY: '10vw',
    }).add({
        targets: '#spoon, #detergent',
        rotateX: '30'
    }).add({
        targets: '#detergent',
        translateY: changeYForDetergent,
        opacity: '0.5'
    }).add({
        targets: '#spoon',
        translateX: '0vw',
        opacity:'0'
    }).add({
        update: function(anim) {
            const message = "Mix the detergent by clicking on the glass rod";
            procedureMessage.innerHTML = message;
        }
    }).add({
        duration:'0.1',
        targets:'#glass-rod',
        opacity:'0.6'
    }).add({
        targets: '#spoon',
        translateY: '0vw',
        rotateX:'0'
    });

    
}

// This function simulates the action of mixing the solution with a glass rod.
function moveGlassRod(expName){
    'use strict';
    const procedureMessage = document.getElementsByClassName("procedure-message")[0]; 
    const videoMessage = document.getElementsByClassName("video-message")[0];
    const videos = document.getElementsByClassName("videos")[0];
    
    // disable onclick of glass rod
    document.getElementById("glass-rod").style.pointerEvents = 'none';

    const a1=anime.timeline({
        duration: 1000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: 4
    });
    a1.add({
        targets: '#glass-rod',
        rotate: [10, -10]
    });
    const a2 = anime({
        targets: "#detergent",
        delay: '3000',
        easing: 'linear',
        opacity: '0'
    })
    const detergentAnime = anime({
        targets: "#detergent",
        delay:'3700',
        translateY:'0vw',
        translateX:'0vw',
        rotateX:'0'
    });
    const a3 = anime({
        targets: '#glass-rod',
        delay: '4000',
        easing: 'linear',
        opacity: '0',
    });

    // There are two experiments which use the same function and hence this if else conditions.
    if (expName === "cleansingAction"){
        // enable onclick of stained cloth
        document.getElementById("cloth-with-stain").style.pointerEvents = 'auto';
        setTimeout(function(){
            const message = "Watch the molecular view of soap molecules in water. Click on the dirty cloth";
            videoMessage.style.display = 'block';
            videos.style.display = 'block';
            procedureMessage.innerHTML = message;
        },4000);
        const a4 = anime({
            targets : "#cloth-with-stain",
            delay: '4000',
            easing: 'linear',
            opacity: '1'
        });
    }
    else if(expName === "micelleFormation"){
        const videoSource = document.getElementsByClassName("videoSource")[0];
        if(detergentAddCounter === 1 || detergentAddCounter === 2){
            const spoon = document.getElementById("spoon");
            const detergent = document.getElementById("detergent");
            setTimeout(function(){
                spoon.style.opacity = '1';
                spoon.style.pointerEvents = 'auto';
                detergent.style.opacity = '1';
                detergent.style.pointerEvents = 'auto';
                procedureMessage.innerHTML = "watch the molecular view below and add some more detergent.";
                videoMessage.style.display = 'block';
                videos.style.display = 'block';
                if(detergentAddCounter === 1){
                    videoMessage.innerHTML = "molecular view of soap molecules at low concentration:";
                }else if(detergentAddCounter === 2){
                    videoMessage.innerHTML = "Molecular view of soap molecules at medium concentration.";
                    videos.pause();
                    videoSource.setAttribute('src','./images/videos/MolecularView.mp4');
                    videos.load();
                    videos.play();
                }
                detergentAddCounter++;
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
    const videos = document.getElementsByClassName("videos")[0];
    const videoSource = document.getElementsByClassName("videoSource")[0];
    const videoMessage = document.getElementsByClassName("video-message")[0];
    const procedureMessage = document.getElementsByClassName("procedure-message")[0];
    const screenWidth = window.innerWidth;
    let changeYForCloth = '28vw';
    if(screenWidth > 1200){
        changeYForCloth = '22vw';
    }

    procedureMessage.innerHTML = "Watch the molecular view of cleaning action of soap below";

    // disable onclick of stained cloth.
    document.getElementById("cloth-with-stain").style.pointerEvents = 'none';

    const a1 = anime.timeline({
        duration: '1000',
        easing: 'linear'
    });
    a1.add({
        targets:'#cloth-with-stain',
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
        const a2 = anime.timeline({
            duration: '0',
            easing:'linear'
        })
        a2.add({
            targets: '#cloth-with-stain',
            opacity:'0'
        }).add({
            targets:'#plain-cloth',
            opacity:'0.6'
        })
        .add({
            duration: '2000',
            targets: '#plain-cloth',
            translateY: '-17vw',
            opacity:'1'
        });
        const message = "We get the clean cloth.";
        document.getElementsByClassName("instructions")[0].innerHTML = "Observations:";
        document.getElementsByClassName("procedure-message")[0].innerHTML = message;
    },8000);
    
}

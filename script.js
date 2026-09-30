const canva = document.getElementById("bonhomme");


/* SCÈNE */

const scene = new THREE.Scene();


/* CAMÉRA */

const camera = new THREE.PerspectiveCamera(
    75,
    canva.clientWidth / canva.clientHeight,
    0.1,
    1000
);

camera.position.z = 4;


/* RENDERER */

const rendu = new THREE.WebGLRenderer({
    canvas: canva,
    alpha: true
});

rendu.setSize(
    canva.clientWidth,
    canva.clientHeight
);



/* COULEURS */

const cyan = new THREE.MeshBasicMaterial({
    color: 0x00E5FF
});

const bleuFonce = new THREE.MeshBasicMaterial({
    color: 0x0B1F3A
});

const bleu = new THREE.MeshBasicMaterial({
    color: 0x155EEF
});

const blanc = new THREE.MeshBasicMaterial({
    color: 0xF5F7FA
});


/* TÊTE */

const formeTete = new THREE.SphereGeometry(
    0.93,
    32,
    32
);

const tete = new THREE.Mesh(
    formeTete,
    cyan
);

tete.position.x = 0;
tete.position.y = 2;

scene.add(tete);


/* YEUX */

const formeOeil = new THREE.SphereGeometry(
    0.15,
    16,
    16
);

const oeilGauche = new THREE.Mesh(
    formeOeil,
    blanc
);

oeilGauche.position.x = -0.32;
oeilGauche.position.y = 2;
oeilGauche.position.z = 0.95;

scene.add(oeilGauche);


const oeilDroit = new THREE.Mesh(
    formeOeil,
    blanc
);

oeilDroit.position.x = 0.32;
oeilDroit.position.y = 2;
oeilDroit.position.z = 0.95;

scene.add(oeilDroit);


/* SOURIRE */

const formeSourire = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.4, 1.70, 0.95),
    new THREE.Vector3(0, 1.50, 1),
    new THREE.Vector3(0.4, 1.70, 0.95)
);

const pointsSourire = formeSourire.getPoints(20);

const geometrieSourire = new THREE.BufferGeometry().setFromPoints(
    pointsSourire
);

const materiauSourire = new THREE.LineBasicMaterial({
    color: 0xF5F7FA
});

const sourire = new THREE.Line(
    geometrieSourire,
    materiauSourire
);

scene.add(sourire);


/* CORPS */

const formeCorps = new THREE.CapsuleGeometry(
    0.9,
    0.9,
    8,
    16
);

const corps = new THREE.Mesh(
    formeCorps,
    bleuFonce
);

corps.position.x = 0;
corps.position.y = 0;

scene.add(corps);


/* BRAS GAUCHE */

const formeBrasGauche = new THREE.CapsuleGeometry(
    0.22,
    0.8,
    8,
    16
);

const brasGauche = new THREE.Mesh(
    formeBrasGauche,
    bleuFonce
);

brasGauche.position.x = -1.2;
brasGauche.position.y = 0.1;
brasGauche.rotation.z = -0.15;

scene.add(brasGauche);


/* BRAS DROIT */

const brasDroit = new THREE.Group();

brasDroit.position.x = 1.1;
brasDroit.position.y = 0.8;

const formeAvantBras = new THREE.CapsuleGeometry(
    0.22,
    0.8,
    8,
    16
);

const avantBras = new THREE.Mesh(
    formeAvantBras,
    bleuFonce
);

avantBras.position.y = -0.36;
avantBras.rotation.z = -0.4;

brasDroit.add(avantBras);


/* MAIN DROITE */

const formeMain = new THREE.SphereGeometry(
    0.3,
    16,
    16
);

const main = new THREE.Mesh(
    formeMain,
    cyan
);

main.position.x = 0.25;
main.position.y = 0.35;

brasDroit.add(main);

scene.add(brasDroit);


/* JAMBE GAUCHE */

const formeJambeGauche = new THREE.CapsuleGeometry(
    0.25,
    0.7,
    8,
    16
);

const jambeGauche = new THREE.Mesh(
    formeJambeGauche,
    bleu
);

jambeGauche.position.x = -0.45;
jambeGauche.position.y = -1.35;

scene.add(jambeGauche);


/* JAMBE DROITE */

const formeJambeDroite = new THREE.CapsuleGeometry(
    0.25,
    0.7,
    8,
    16
);

const jambeDroite = new THREE.Mesh(
    formeJambeDroite,
    bleu
);

jambeDroite.position.x = 0.45;
jambeDroite.position.y = -1.35;

scene.add(jambeDroite);


/* OMBRE */

const formeOmbre = new THREE.CircleGeometry(
    1,
    32
);

const ombre = new THREE.Mesh(
    formeOmbre,
    new THREE.MeshBasicMaterial({
        color: 0x0A0A0A,
        transparent: true,
        opacity: 0.1
    })
);

ombre.scale.set(2.6, 0.5, 1);
ombre.position.y = -2.45;
ombre.position.z = -0.5;

scene.add(ombre);


/* ANIMATION */

function animer() {

    brasDroit.rotation.z =
        Math.sin(Date.now() * 0.005) * 0.35;

    rendu.render(scene, camera);

    requestAnimationFrame(animer);
}

animer();
/*
///////////////////////////////
//             BULLES        //
//////////////////////////////
const canvasAnimation = document.getElementById("animation");
const dessiner = canvasAnimation.getContext("2d");

const couleurs = [
    "#6B8FB3", // bleu
    "#416B91", // bleu profond
    "#8B6F5A", // marron doux
    "#6F4E37", // marron
    "#4A3428", // marron foncé
    "#4B4F9A", // indigo
    "#34356F", // indigo profond
    "#26264F"  // indigo très foncé
];


canvasAnimation.width = window.innerWidth;
canvasAnimation.height = window.innerHeight;
const petiteDimension = Math.min(
    canvasAnimation.width,
    canvasAnimation.height
);

const bulles = [];
const nombreBulles = Math.max(
    9,
    Math.floor(
        canvasAnimation.width * canvasAnimation.height / 70000
    )
);
for (let i = 0; i < nombreBulles; i++) {
    const bulle = {
    x: Math.random() * canvasAnimation.width,
    y: Math.random() * canvasAnimation.height,
    rayon: petiteDimension * (0.22 + Math.random() * 0.20),
    vitesseX: (Math.random() - 0.5) * 1.8,
    vitesseY: (Math.random() - 0.5) * 1.8,
    couleur: couleurs[Math.floor(Math.random() * couleurs.length)]
};

    bulles.push(bulle);
}
function dessinerBulles() {

    dessiner.clearRect(
        0,
        0,
        canvasAnimation.width,
        canvasAnimation.height
    );

    for (const bulle of bulles) {

        dessiner.beginPath();

        dessiner.arc(
            bulle.x,
            bulle.y,
            bulle.rayon,
            0,
            Math.PI * 2
        );

      const gradient = dessiner.createRadialGradient(
    bulle.x,
    bulle.y,
    0,
    bulle.x,
    bulle.y,
    bulle.rayon
);
   gradient.addColorStop(0, bulle.couleur + "DD");
  gradient.addColorStop(1, bulle.couleur + "00");

        dessiner.fillStyle = gradient;
        dessiner.fill();
            }
}
dessinerBulles();
function animerBulles() {

    for (const bulle of bulles) {
        bulle.x += bulle.vitesseX;
        bulle.y += bulle.vitesseY;
    }

    dessinerBulles();

    requestAnimationFrame(animerBulles);
}

animerBulles();*/
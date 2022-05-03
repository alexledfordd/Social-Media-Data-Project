

let lockScreenImage;
let homeScreenImage;
let swipeUp;
let messagesIcon;
let snapchatIcon;
let instagramIcon;
let tiktokIcon;
const phoneDimensions = {x: 324, y: 700};
let table;
let iconSizeBase=80;
let iconSize=iconSizeBase;
let badgeSize=25;
let badgeTextSize=15;
let redraw=0;
let index=0;
let sound;

//booleans
let swipeScreenBool = true;
let swipeBool = false;
let homeScreenBool = false;

function preload(){
  //change to your images
  lockScreenImage = loadImage("images/lockscreen.PNG");
  homeScreenImage = loadImage("images/homescreen.png");
  messagesIcon = loadImage("images/messageIcon.png");
  snapchatIcon=loadImage("images/snapchat.png");
  instagramIcon=loadImage("images/Instagram.png")
  tiktokIcon=loadImage("images/TikTok.png")
  table = loadTable('js/myData.csv', 'csv', 'header');

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)
  textAlign(CENTER)
  swipeUp = phoneDimensions.y/2;
sound=loadSound('Sounds/Notification Sound.m4a')
}




function draw(){
  //using our booleans to trigger events
  //the functions are below



  //this will run right away because swipeScreenBool is set to true right away
  if(swipeScreenBool == true){
    swipeScreen()
  }

  //this checks to see if we're swiping. swipeBool is activated in the swipeScreen function
  //if we release the mouse, the lock screen image snaps back down
  //if we swipe up enough and mouseY is less than zero, swipeBool is false
  //and we trigger the homeScreenBool to true
  if(swipeBool == true){
    swipeUp = mouseY - lockScreenImage.height/2;
    if(mouseIsPressed === false){
      swipeBool = false;
      swipeUp = phoneDimensions.y/2;
    }
    if(mouseY < 0 ){
      swipeBool = false;
      swipeScreenBool = false;
      homeScreenBool = true;
    }
  }


  //if homeScreenBool is true, run the homeScreen function
  if(homeScreenBool == true){
    homeScreen()
  }

}

function touchMoved(event){
  swipeBool = true;
}

function swipeScreen(){
  background(255);

  //here I manually added the sizes, you may have to adjust
  image(homeScreenImage, phoneDimensions.x/2, phoneDimensions.y/2, 324, 700);
  image(lockScreenImage, phoneDimensions.x/2, swipeUp, 324, 700);

  //checking to see if we've  clicked at the bottom of the lock screen image
  //if we did, activate the swipeBool
  if(mouseIsPressed === true && mouseY > lockScreenImage.height/2+200 && mouseY< lockScreenImage.height/2+300){
    swipeBool = true;
  }
}



//this is where your game will be
function homeScreen(){

  redraw++
  iconSize++
  if(redraw % 40 === 0) {
    index++
    sound.play()
  }
  badgeText = table.getString(index, 'Messages')
  badgeSize = badgeSize + (iconSize - iconSizeBase)/1000
  badgeTextSize= badgeTextSize + (iconSize - iconSizeBase)/2000
  background(255);
  const phoneCenter = {x: 324/2, y: phoneDimensions.y/2};

  image(homeScreenImage, 324/2, phoneDimensions.y/2, 324, 700);


  image(messagesIcon, phoneCenter.x-108, phoneCenter.y+303, iconSize, iconSize)
  messagesBadgeX=phoneCenter.x-82+(iconSize-iconSizeBase)/3
  messagesBadgeY=phoneCenter.y+270-(iconSize-iconSizeBase)/3
  ellipse(messagesBadgeX, messagesBadgeY, badgeSize, badgeSize)
  textSize(badgeTextSize);
  fill(255)
  text(badgeText,messagesBadgeX, messagesBadgeY+(badgeTextSize/2)-4)




  image(snapchatIcon, phoneCenter.x+115, phoneCenter.y+290, iconSize, iconSize)
  image(instagramIcon,phoneCenter.x-112, phoneCenter.y-275, iconSize, iconSize)
  image(tiktokIcon,phoneCenter.x+120, phoneCenter.y-260, iconSize, iconSize)
  fill(255, 0, 0)

  if(iconSize === phoneDimensions.y){
    alert('Screen time exceeded!');
  }
}

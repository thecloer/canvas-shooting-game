import gameStart from '../lib/game.js';

function Canvas() {
  const canvas = document.createElement('canvas');
  canvas.classList.add('bg-black');
  canvas.addEventListener(gameStart);
  return canvas;
}

export default Canvas;

// "use strict";

// const canvas = document.querySelector("canvas");
// const c = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// /*
//  * Game
//  */
// class Circle {
//   constructor(x, y, r, color) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.color = color;
//   }
//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//     c.fillStyle = this.color;
//     c.fill();
//   }
// }

// // player
// const playerSize = 20;
// const playerColor = "white";
// class Player extends Circle {
//   constructor(x, y, r, color) {
//     super(x, y, r, color);
//     this.score = 0;
//   }
// }

// // bullet
// const bulletSpeed = 6;
// const bulletSize = 5;
// const bulletColor = "white";
// class Bullet extends Circle {
//   constructor(x, y, r, color, directionVector) {
//     super(x, y, r, color);
//     this.dV = directionVector;
//     this.speed = bulletSpeed;
//   }
//   update() {
//     this.x += this.speed * this.dV.x;
//     this.y += this.speed * this.dV.y;
//     this.draw();
//   }
// }

// // enemy
// const enemySpeedInit = 1.4;
// let enemySpeed = enemySpeedInit;
// const enemySizeMin = 30;
// const enemySizeMax = 10;
// class Enemy extends Circle {
//   constructor(x, y, r, color, directionVector) {
//     super(x, y, r, color);
//     this.dV = directionVector;
//     this.speed = enemySpeed;
//   }
//   update() {
//     this.x += this.speed * this.dV.x;
//     this.y += this.speed * this.dV.y;
//     this.draw();
//   }
// }

// // particle
// const friction = 0.99;
// const particleSpeed = 5;
// const particleSizeMax = 3;
// class Particle extends Circle {
//   constructor(x, y, r, color, directionVector) {
//     super(x, y, r, color);
//     this.dV = directionVector;
//     this.speed = particleSpeed;
//     this.alpha = 0.8;
//   }
//   update() {
//     c.save();
//     c.globalAlpha = this.alpha;
//     this.draw();
//     c.restore();
//     this.x += friction * this.speed * this.dV.x;
//     this.y += friction * this.speed * this.dV.y;
//     this.alpha -= 0.01;
//   }
// }

// // Instance
// const playerLoc = { x: canvas.width / 2, y: canvas.height / 2 };
// const player = new Player(playerLoc.x, playerLoc.y, playerSize, playerColor);

// let bullets = [];
// let enemies = [];
// let particles = [];

// // Functions
// const getDirection = (fromX, fromY, toX, toY) => {
//   const angle = Math.atan2(toY - fromY, toX - fromX);
//   return {
//     x: Math.cos(angle),
//     y: Math.sin(angle),
//   };
// };

// let spawnInterver = null;
// const spawnEnemies = () => {
//   const spawnInterverTime = 1000;
//   spawnInterver = setInterval(() => {
//     const enemyR = enemySizeMin + (enemySizeMax - enemySizeMin) * Math.random();
//     const enemyLoc = { x: null, y: null };
//     if (Math.random() < 0.5) {
//       enemyLoc.x = Math.random() < 0.5 ? -enemyR : canvas.width + enemyR;
//       enemyLoc.y = Math.random() * canvas.height;
//     } else {
//       enemyLoc.x = Math.random() * canvas.width;
//       enemyLoc.y = Math.random() < 0.5 ? -enemyR : canvas.height + enemyR;
//     }
//     const enemyDirection = getDirection(enemyLoc.x, enemyLoc.y, playerLoc.x, playerLoc.y);
//     const enemyColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
//     const enemy = new Enemy(enemyLoc.x, enemyLoc.y, enemyR, enemyColor, enemyDirection);
//     enemies.push(enemy);
//   }, spawnInterverTime);
// };

// const backgroundColor = "rgba(0,0,0,0.1)";
// let animationId = null;
// const animate = () => {
//   animationId = requestAnimationFrame(animate);

//   // background
//   c.fillStyle = backgroundColor;
//   c.fillRect(0, 0, canvas.width, canvas.height);

//   // player
//   player.draw();

//   // bullets
//   bullets.forEach((bullet, bulletIdx) => {
//     bullet.update();

//     // remove bullets out of canvas
//     if (
//       bullet.x - bulletSize < 0 ||
//       bullet.x + bulletSize > canvas.width ||
//       bullet.y - bulletSize < 0 ||
//       bullet.y + bulletSize > canvas.height //
//     ) {
//       bullets.splice(bulletIdx, 1);
//     }
//   });
//   // enemies
//   enemies.forEach((enemy, enemyIdx) => {
//     enemy.update();

//     // Crash enemy to player -> Game Over
//     const distEnemyPlayer = Math.hypot(enemy.x - playerLoc.x, enemy.y - playerLoc.y);
//     if (distEnemyPlayer < enemy.r + playerSize + 1) {
//       cancelAnimationFrame(animationId);
//       clearInterval(spawnInterver);
//       Controller.gameOver(player.score);
//     }
//     // Crash bullet to enemy
//     bullets.forEach((bullet, bulletIdx) => {
//       const distEnemybullet = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
//       if (distEnemybullet < enemy.r + bulletSize + 1) {
//         setTimeout(() => {
//           // make particles
//           for (let i = 0; i < enemy.r; i++) {
//             particles.push(
//               new Particle(
//                 bullet.x,
//                 bullet.y,
//                 particleSizeMax * Math.random(),
//                 enemy.color,
//                 {
//                   x: (Math.random() - 0.5) * Math.random(),
//                   y: (Math.random() - 0.5) * Math.random(),
//                 } //
//               )
//             );
//           }
//           // remove bullet crashed to enemy
//           bullets.splice(bulletIdx, 1);

//           // remove or resize enemy
//           if (enemy.r < 20) {
//             enemies.splice(enemyIdx, 1);
//             gsap.to(enemy, {
//               r: enemy.r - 10,
//             });
//             enemySpeed += 0.02;
//             player.score += 100;
//           } else {
//             enemy.r -= 10;
//             enemySpeed += 0.013;
//             player.score += 50;
//           }
//           Controller.scoreSpanUpdate(player.score);
//         }, 0);
//       }
//     });
//   });
//   // Particles
//   particles.forEach((particle, particleIdx) => {
//     if (particle.alpha < 0) particles.splice(particleIdx, 1);
//     else particle.update();
//   });
// };

// const init = () => {
//   Controller.gameReady();
//   player.score = 0;
//   bullets = [];
//   enemies = [];
//   particles = [];
//   enemySpeed = enemySpeedInit;
// };
// const gameStart = () => {
//   init();
//   spawnEnemies();
//   animate();
// };

// // Control
// const shootBullets = function (e) {
//   const directionVector = getDirection(playerLoc.x, playerLoc.y, e.clientX, e.clientY);
//   const bullet = new Bullet(playerLoc.x, playerLoc.y, bulletSize, bulletColor, directionVector);
//   bullets.push(bullet);
// };
// window.addEventListener("click", shootBullets); // TODO: 끊었다가 게임 시작 시 다시 연결 -> pop up 에서 이벤트발생안하게

// export default gameStart;

import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color('ForestGreen');

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

//rendering of the goal skeleton
let goal = new THREE.Object3D();

// shrink_matrix is used to shrink the goal
const shrink_matrix = new THREE.Matrix4();
shrink_matrix.makeScale(0.95,0.95,0.95);

const crossbar_matrix = new THREE.Matrix4();
const crossbar_rotation_matrix = new THREE.Matrix4();
const crossbar_translation_matrix = new THREE.Matrix4();

crossbar_rotation_matrix.makeRotationZ(degrees_to_radians(90));
crossbar_translation_matrix.makeTranslation(0,19.5,0);
crossbar_matrix.multiplyMatrices(crossbar_translation_matrix, crossbar_rotation_matrix);

const crossbar_geometry = new THREE.CylinderGeometry(1, 1, 120, 15);
const crossbar_material = new THREE.MeshBasicMaterial({color: 'white'} );
const crossbar = new THREE.Mesh(crossbar_geometry, crossbar_material);

crossbar.applyMatrix4(crossbar_matrix);

const post1_matrix = new THREE.Matrix4();
const post1_translation_matrix = new THREE.Matrix4();
post1_translation_matrix.makeTranslation(59.5,0,0);
post1_matrix.multiply(post1_translation_matrix);

const post2_matrix = new THREE.Matrix4();
const post2_translation_matrix = new THREE.Matrix4();
post2_translation_matrix.makeTranslation(-59.5,0,0);
post2_matrix.multiply(post2_translation_matrix);

const post_geometry = new THREE.CylinderGeometry(1, 1, 40, 15);
const post_material = new THREE.MeshBasicMaterial( {color: 'white'});
const post1 = new THREE.Mesh( post_geometry, post_material );
const post2 = new THREE.Mesh( post_geometry, post_material );

post1.applyMatrix4(post1_matrix);
post2.applyMatrix4(post2_matrix);

const back_support1_matrix = new THREE.Matrix4();
const back_support1_translation_matrix = new THREE.Matrix4();
const back_support1_rotation_matrix = new THREE.Matrix4();
back_support1_rotation_matrix.makeRotationX(degrees_to_radians(30));
back_support1_translation_matrix.makeTranslation(59.5,0,-11.547);
back_support1_matrix.multiplyMatrices(back_support1_translation_matrix, back_support1_rotation_matrix);

const back_support2_matrix = new THREE.Matrix4();
const back_support2_translation_matrix = new THREE.Matrix4();
const back_support2_rotation_matrix = new THREE.Matrix4();
back_support2_rotation_matrix.makeRotationX(degrees_to_radians(30));
back_support2_translation_matrix.makeTranslation(-59.5,0,-11.547);
back_support2_matrix.multiplyMatrices(back_support2_translation_matrix, back_support2_rotation_matrix);

const back_support_geometry = new THREE.CylinderGeometry( 1, 1, 46.188, 15 );
const back_support_material = new THREE.MeshBasicMaterial( {color: 'white'} );
const back_support1 = new THREE.Mesh( back_support_geometry, back_support_material );
const back_support2 = new THREE.Mesh( back_support_geometry, back_support_material );

back_support1.applyMatrix4(back_support1_matrix);
back_support2.applyMatrix4(back_support2_matrix);

goal.add(post1);
goal.add(post2);
goal.add(crossbar);
goal.add(back_support1);
goal.add(back_support2);

//rendering the net
const back_net_matrix = new THREE.Matrix4();
const back_net_translation_matrix = new THREE.Matrix4();
const back_net_rotation_matrix = new THREE.Matrix4();
back_net_rotation_matrix.makeRotationX(degrees_to_radians(30));
back_net_translation_matrix.makeTranslation(0,0,-11.547);
back_net_matrix.multiplyMatrices(back_net_translation_matrix, back_net_rotation_matrix);

const back_net_geometry = new THREE.PlaneGeometry( 120, 46.188 );
const back_netmaterial = new THREE.MeshBasicMaterial( {color: 'lightgrey', side: THREE.DoubleSide} );
const back_net = new THREE.Mesh( back_net_geometry, back_netmaterial );

back_net.applyMatrix4(back_net_matrix);
goal.add( back_net );

const triangle_shape = new THREE.Shape();
// Start at the first point
triangle_shape.moveTo(0, 0);
// Draw lines to subsequent points
triangle_shape.lineTo(0, 40);
triangle_shape.lineTo(23.094, 0);
triangle_shape.lineTo(0, 0);

const triangle_rotation_matrix = new THREE.Matrix4();
triangle_rotation_matrix.makeRotationY(degrees_to_radians(90));

const triangle1_matrix = new THREE.Matrix4();
const triangle1_translation_matrix = new THREE.Matrix4();
triangle1_translation_matrix.makeTranslation(-59.5,-20,0);
triangle1_matrix.multiplyMatrices(triangle1_translation_matrix, triangle_rotation_matrix);

const triangle2_matrix = new THREE.Matrix4();
const triangle2_translation_matrix = new THREE.Matrix4();
triangle2_translation_matrix.makeTranslation(59.5,-20,0);
triangle2_matrix.multiplyMatrices(triangle2_translation_matrix, triangle_rotation_matrix);

const triangle_geometry = new THREE.ShapeGeometry( triangle_shape );
const triangle_material = new THREE.MeshBasicMaterial( { color: "lightgrey", side: THREE.DoubleSide } );
const triangle1 = new THREE.Mesh( triangle_geometry, triangle_material ) ;
const triangle2 = new THREE.Mesh( triangle_geometry, triangle_material ) ;

triangle1.applyMatrix4(triangle1_matrix);
goal.add( triangle1 );

triangle2.applyMatrix4(triangle2_matrix);
goal.add( triangle2 );

const ring1_matrix = new THREE.Matrix4();
const ring1_translation_matrix = new THREE.Matrix4();
const ring1_rotation_matrix = new THREE.Matrix4();
ring1_rotation_matrix.makeRotationX(degrees_to_radians(90));
ring1_translation_matrix.makeTranslation(0,-20,0)
ring1_matrix.multiplyMatrices(ring1_translation_matrix, ring1_rotation_matrix)

const ring2_matrix = new THREE.Matrix4();
const ring2_translation_matrix = new THREE.Matrix4();
const ring2_rotation_matrix = new THREE.Matrix4();
ring2_rotation_matrix.makeRotationX(degrees_to_radians(90));
ring2_translation_matrix.makeTranslation(0,-20,0)
ring2_matrix.multiplyMatrices(ring2_translation_matrix, ring2_rotation_matrix)

const ring3_matrix = new THREE.Matrix4();
const ring3_translation_matrix = new THREE.Matrix4();
const ring3_rotation_matrix = new THREE.Matrix4();
ring3_rotation_matrix.makeRotationX(degrees_to_radians(60));
ring3_translation_matrix.makeTranslation(0,-23.094,0)
ring3_matrix.multiplyMatrices(ring3_translation_matrix, ring3_rotation_matrix)

const ring4_matrix = new THREE.Matrix4();
const ring4_translation_matrix = new THREE.Matrix4();
const ring4_rotation_matrix = new THREE.Matrix4();
ring4_rotation_matrix.makeRotationX(degrees_to_radians(60));
ring4_translation_matrix.makeTranslation(0,-23.094,0)
ring4_matrix.multiplyMatrices(ring4_translation_matrix, ring4_rotation_matrix)

const ring_geometry = new THREE.TorusGeometry( 1, 1, 15, 40 );
const ring_material = new THREE.MeshBasicMaterial( { color: "white", side: THREE.DoubleSide } );
const ring1 = new THREE.Mesh( ring_geometry, ring_material );
const ring2 = new THREE.Mesh( ring_geometry, ring_material );
const ring3 = new THREE.Mesh( ring_geometry, ring_material );
const ring4 = new THREE.Mesh( ring_geometry, ring_material );

ring1.applyMatrix4(ring1_matrix);
post1.add( ring1 );

ring2.applyMatrix4(ring2_matrix);
post2.add( ring2 );

ring3.applyMatrix4(ring3_matrix);
back_support1.add( ring3 );

ring4.applyMatrix4(ring4_matrix);
back_support2.add( ring4 );


//Create flag on top of the goal
const flag = new THREE.Object3D();
const stick_matrix = new THREE.Matrix4();
const stick_translation_matrix = new THREE.Matrix4();
stick_translation_matrix.makeTranslation(59,30,0);
stick_matrix.multiply(stick_translation_matrix);
const stick_geometry = new THREE.CylinderGeometry(1, 1, 20, 15);
const stick_material = new THREE.MeshBasicMaterial( {color: 'black'});
const stick = new THREE.Mesh( stick_geometry, stick_material );
stick.applyMatrix4(stick_matrix);


const flag_plane_matrix = new THREE.Matrix4();
const flag_plane_translation_matrix = new THREE.Matrix4();
const flag_plane_rotation_matrix = new THREE.Matrix4();
flag_plane_translation_matrix.makeTranslation(40,50,0);
flag_plane_matrix.multiplyMatrices(flag_plane_translation_matrix, flag_plane_rotation_matrix);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png');
const flag_plane_material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const flag_plane_geometry = new THREE.PlaneGeometry( 40, 20 );
const flag_plane = new THREE.Mesh( flag_plane_geometry, flag_plane_material );
flag_plane.applyMatrix4(flag_plane_matrix);

flag.add(stick);
flag.add(flag_plane);
goal.add(flag);

// add the goal to the scene
scene.add(goal);

//rendering of the ball
const ball_matrix = new THREE.Matrix4();
const ball_translation_matrix = new THREE.Matrix4();
ball_translation_matrix.makeTranslation(0, 0, 30);
ball_matrix.multiply(ball_translation_matrix);

const ball_geometry = new THREE.SphereGeometry( 2.5, 30, 15 );
const ball_material = new THREE.MeshBasicMaterial( { color: "black" } );
const ball = new THREE.Mesh( ball_geometry, ball_material );

ball.applyMatrix4(ball_matrix);
scene.add( ball );

// This defines the initial distance of the camera
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0,0,100);
camera.applyMatrix4(cameraTranslate)

renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );

let isOrbitEnabled = true;
let animationxEnabled = false;
let animationyEnabled = false;
let speedFactor = 2;

function toggleWireframe() {
    crossbar_material.wireframe = !crossbar_material.wireframe;
    post_material.wireframe = !post_material.wireframe;
    back_support_material.wireframe = !back_support_material.wireframe;
    back_netmaterial.wireframe = !back_netmaterial.wireframe;
    triangle_material.wireframe = !triangle_material.wireframe;
    ring_material.wireframe = !ring_material.wireframe;
    ball_material.wireframe = !ball_material.wireframe;
}

const toggleOrbit = (e) => {
	if (e.key == "o"){
		isOrbitEnabled = !isOrbitEnabled;
	}
}
const keyPressed = (e) => {
	if (e.key == "w"){
		toggleWireframe();
	}
	if (e.key == "+" || e.key == "ArrowUp"){
		speedFactor *= 1.1;
	}
	else if (e.key == "-"|| e.key == "ArrowDown"){
		speedFactor *= 0.9;
	}
	else if (e.key == "1"){
		animationxEnabled = !animationxEnabled;
	}
	else if (e.key == "2"){
		animationyEnabled = !animationyEnabled;
	}
	else if (e.key == "3"){
		goal.applyMatrix4(shrink_matrix);
	}
}

document.addEventListener('keydown',toggleOrbit)
document.addEventListener('keydown',keyPressed)

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function xRotation(angle){
	let rotation_matrix = new THREE.Matrix4();
	rotation_matrix.makeRotationX(degrees_to_radians(angle));
	return rotation_matrix;
}

function yRotation(angle){
	let rotation_matrix = new THREE.Matrix4();
	rotation_matrix.makeRotationY(degrees_to_radians(angle));
	return rotation_matrix;
}

function ballAnimation(){
	if (animationxEnabled){
		ball.applyMatrix4(xRotation(speedFactor));
	}
	if (animationyEnabled){
		ball.applyMatrix4(yRotation(speedFactor));
	}
}

function animate() {

	requestAnimationFrame( animate );

	controls.enabled = isOrbitEnabled;
	ballAnimation();
	controls.update();

	renderer.render( scene, camera );

}
animate()
//Imports for Angular
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import gsap from 'gsap';

//Imports for our components 
import { HeaderComponent } from '../../components/header/header.component';
 

@Component({
  selector: 'app-ambiente',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './ambiente.component.html',
  styleUrl: './ambiente.component.scss'
})


export class AmbienteComponent implements OnInit{
  ngOnInit(): void {
    this.createThreeJsBox();
  }
  createThreeJsBox(): void {
    if(typeof document !== 'undefined'){
      const canvas = <HTMLCanvasElement>document.getElementById('webgl');
      
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f2f4f5')
   
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
    ambientLight.position.set(100,0,0).normalize()
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(-100, 90,  40).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4024
    directionalLight.shadow.mapSize.height = 4024
    directionalLight.shadow.camera.top = 20
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.bottom = -20
    directionalLight.shadow.camera.left = -16
    directionalLight.shadow.camera.near = -29
    directionalLight.shadow.camera.far = 50
 
    console.log("aqui é a sombra")
    console.log(directionalLight.shadow)
 
    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
   
    // scene.add(directionalLightCameraHelper)
 
    scene.add(directionalLight)
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 8)
    // scene.add(directionalLightHelper)
 
 
    //Textures
    const textureLoader = new THREE.TextureLoader()
    const colorTexture = textureLoader.load('assets/textures/Chão.png')
    colorTexture.colorSpace = THREE.SRGBColorSpace
    const paredeColorTexture = textureLoader.load('assets/textures/FundoLab04.png')
    paredeColorTexture.colorSpace = THREE.SRGBColorSpace
    const paredeColor = new THREE.MeshStandardMaterial({map: paredeColorTexture})
    const chaoColor = new THREE.MeshStandardMaterial({map:colorTexture})
    const wallColor = new THREE.MeshStandardMaterial({color:'#b7cee4'})
    const tableColor = new THREE.MeshStandardMaterial({color: '#edede9'})
    const DoorColor = new THREE.MeshStandardMaterial({color:'#ffffff'})
    const WindowDoorColor = new THREE.MeshStandardMaterial({color:'#dae2e6'})
    const cabinetColor = new THREE.MeshStandardMaterial({color:'#ffffff'})
    const lokersColor = new THREE.MeshStandardMaterial({color:'#ffffff'})
    const TvsColor = new THREE.MeshStandardMaterial({color:'#000000'})
    const superiorColor = new THREE.MeshStandardMaterial({color:'#b7cee4'})
    const pontoColor = new THREE.MeshStandardMaterial({color:'#f05056'})
 
    paredeColorTexture.minFilter = THREE.NearestFilter
 
 
    //
    const worldPosition = new THREE.Vector3();
    scene.getWorldPosition( worldPosition );
    //rotação da imagem
    // paredeColorTexture.rotation = Math.PI * 0.5
   
 
    const sizes = {
      width: 1000,
      height: 700
    }
7
 
    const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 550)
    camera.position.x = 40
    camera.position.y = 32
    camera.position.z = 45
   
    scene.add(camera)
    scene.background = new THREE.Color( '#dfe9f2');
 
 
    const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true
    // controls.enablePan = false
    // controls.enableRotate = false
    // controls.enableZoom = false
 
 
    const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })
 
 
 
  // renderer.setSize(sizes.width, sizes.height)
  renderer.setSize(sizes.width, sizes.height) // a gente é mto burro né?
  // querendo limtar tamanho renderizando o bagulho 100% da tela
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
 
 
  const gltfLoader = new GLTFLoader();
 
  gltfLoader.load(
    './assets/lab_04_05_final_master.gltf', 
    
    (gltf) => {
      console.log(gltf.scene.children[0])
      gltf.scene.position.y = 9
      gltf.scene.position.x = 3.5
      
      const children0 = gltf.scene.children[0]?.children[0];
 
      gltf.scene.traverse(function(node){
        if(node instanceof THREE.Mesh){
          node.castShadow = true
          node.receiveShadow = true
        }
      })
      gltf.scene.receiveShadow = true
      gltf.scene.castShadow = true
      scene.add(gltf.scene)
      
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let selectedPoint: THREE.Mesh | null = null;
 
      //Textura do chão
      const chao = (children0?.children.find((child)=> child.name === 'floor') as THREE.Mesh)
      chao!.material = chaoColor;
      chao.receiveShadow = true

      console.log(chao)
          
       
      //cores das paredes da entrada
      const entryWall = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'entryWall') as THREE.Mesh)
      entryWall!.material = wallColor
      entryWall.receiveShadow = true
      const wallExtension = (entryWall?.children.find((child) => child.name === 'wallExtension') as THREE.Mesh)
      wallExtension!.material = wallColor
      wallExtension.receiveShadow = true
      wallExtension.castShadow = true
 
      //Textura da parede
      const wall = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'wall') as THREE.Mesh)
      wall!.material = paredeColor
      wall.castShadow = true
     
 
      //todas as mesas
      const table1 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow1') as THREE.Mesh)
      table1!.material = tableColor
      table1.castShadow = true
      const table2 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow2') as THREE.Mesh)
      table2!.material = tableColor
      table2.castShadow = true
      const table3 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow3') as THREE.Mesh)
      table3!.material = tableColor
      table3.castShadow = true
      const table4 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow4') as THREE.Mesh)
      table4!.material = tableColor
      table4.castShadow = true
      const table5 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow5') as THREE.Mesh)
      table5!.material = tableColor
      table5.castShadow = true
      table5.receiveShadow = true
      const table6 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow6') as THREE.Mesh)
      table6!.material = tableColor
      table6.castShadow = true
      const table7 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow7') as THREE.Mesh)
      table7!.material = tableColor
      table7.castShadow = true
      const table8 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow8') as THREE.Mesh)
      table8!.material = tableColor
      table8.castShadow = true
      const table9 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow9') as THREE.Mesh)
      table9!.material = tableColor
      table9.castShadow = true
      const table10 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'tableRow10') as THREE.Mesh)
      table10!.material = tableColor
      table10.castShadow = true
 
     
 
      //Mesa dos instrutores
      const tableInstrutor1 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'table1') as THREE.Mesh)
      tableInstrutor1!.material = tableColor
      tableInstrutor1.castShadow = true
      tableInstrutor1.receiveShadow = true
      const tableInstrutor2 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'table2') as THREE.Mesh)
      tableInstrutor2!.material = tableColor
      tableInstrutor2.castShadow = true
      tableInstrutor2.receiveShadow= true
 
 
      const leftDoor = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftDoor') as THREE.Mesh)
      leftDoor!.material = DoorColor
 
      const leftDoorWindow = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftDoorWindow') as THREE.Mesh)
      leftDoorWindow!.material = WindowDoorColor
 
      const leftCabinet1 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftCabinet1') as THREE.Mesh)
      leftCabinet1!.material = lokersColor
      leftCabinet1.receiveShadow = true
      const leftCabinet2 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftCabinet2') as THREE.Mesh)
      leftCabinet2!.material = lokersColor
      leftCabinet2.receiveShadow = true
      const leftCabinet3 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftCabinet3') as THREE.Mesh)
      leftCabinet3!.material = lokersColor
      leftCabinet3.receiveShadow = true
 
      const rightDoor = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'rigthDoor') as THREE.Mesh)
      rightDoor!.material = DoorColor
 
      const rightDoorWindow = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'rigthDoorWindow') as THREE.Mesh)
      rightDoorWindow!.material = WindowDoorColor
 
      const rigthCabinet1 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === '_rigthCabinet1') as THREE.Mesh)
      rigthCabinet1!.material = cabinetColor
      const rigthCabinet2 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'rigthCabinet_2') as THREE.Mesh)
      rigthCabinet2!.material = cabinetColor
      const rigthCabinet3 = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'rigthCabinet_3') as THREE.Mesh)
      rigthCabinet3!.material = cabinetColor
 
      const lokers = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'lokers') as THREE.Mesh)
      lokers!.material = lokersColor
 
      const rightTv = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'rigthTv') as THREE.Mesh)
      rightTv!.material = TvsColor
      const leftTv = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'leftTv') as THREE.Mesh)
      leftTv!.material = TvsColor
 
      //parte superior onde fica a textura
      const superior = (gltf.scene.children[0]?.children[0]?.children.find((child)=> child.name === 'Superior1') as THREE.Mesh)
      superior!.material = superiorColor
     
      //pontos
      // const ponto = (children0?.children.find((child)=> child.name === 'Shape') as THREE.Mesh)
      // ponto!.material = pontoColor
      const ponto2 = (children0?.children.find((child)=> child.name === 'Shape_2') as THREE.Mesh)
      ponto2!.material = pontoColor
      console.log(ponto2)
      const ponto3 = (children0?.children.find((child)=> child.name === 'Shape_3') as THREE.Mesh)
      ponto3!.material = pontoColor
      const ponto4= (children0?.children.find((child)=> child.name === 'Shape_4') as THREE.Mesh)
      ponto4!.material = pontoColor
      const ponto5= (children0?.children.find((child)=> child.name === 'Shape_5') as THREE.Mesh)
      ponto5!.material = pontoColor
      const ponto6= (children0?.children.find((child)=> child.name === 'Shape_6') as THREE.Mesh)
      ponto6!.material = pontoColor
      const ponto7= (children0?.children.find((child)=> child.name === 'Shape_7') as THREE.Mesh)
      ponto7!.material = pontoColor
      const ponto8= (children0?.children.find((child)=> child.name === 'Shape_8') as THREE.Mesh)
      ponto8!.material = pontoColor
      const ponto9= (children0?.children.find((child)=> child.name === 'Shape_9') as THREE.Mesh)
      ponto9!.material = pontoColor
      const ponto10= (children0?.children.find((child)=> child.name === 'Shape_10') as THREE.Mesh)
      ponto10!.material = pontoColor
      const ponto11= (children0?.children.find((child)=> child.name === 'Shape_11') as THREE.Mesh)
      ponto11!.material = pontoColor
      const ponto12= (children0?.children.find((child)=> child.name === 'Shape_12') as THREE.Mesh)
      ponto12!.material = pontoColor
      const ponto13= (children0?.children.find((child)=> child.name === 'Shape_13') as THREE.Mesh)
      ponto13!.material = pontoColor
      const ponto14= (children0?.children.find((child)=> child.name === 'Shape_14') as THREE.Mesh)
      ponto14!.material = pontoColor
      const ponto15= (children0?.children.find((child)=> child.name === 'Shape_15') as THREE.Mesh)
      ponto15!.material = pontoColor
      const ponto16= (children0?.children.find((child)=> child.name === 'Shape_16') as THREE.Mesh)
      ponto16!.material = pontoColor
      const ponto17= (children0?.children.find((child)=> child.name === 'Shape_17') as THREE.Mesh)
      ponto17!.material = pontoColor
      const ponto18= (children0?.children.find((child)=> child.name === 'Shape_18') as THREE.Mesh)
      ponto18!.material = pontoColor
      const ponto19= (children0?.children.find((child)=> child.name === 'Shape_19') as THREE.Mesh)
      ponto19!.material = pontoColor
      const ponto20= (children0?.children.find((child)=> child.name === 'Shape_20') as THREE.Mesh)
      ponto20!.material = pontoColor
      const ponto21= (children0?.children.find((child)=> child.name === 'Shape_21') as THREE.Mesh)
      ponto21!.material = pontoColor
      const ponto22= (children0?.children.find((child)=> child.name === 'Shape_22') as THREE.Mesh)
      ponto22!.material = pontoColor
      const ponto23= (children0?.children.find((child)=> child.name === 'Shape_23') as THREE.Mesh)
      ponto23!.material = pontoColor
      const ponto24= (children0?.children.find((child)=> child.name === 'Shape_24') as THREE.Mesh)
      ponto24!.material = pontoColor
      const ponto25= (children0?.children.find((child)=> child.name === 'Shape_25') as THREE.Mesh)
      ponto25!.material = pontoColor
      const ponto26= (children0?.children.find((child)=> child.name === 'Shape_26') as THREE.Mesh)
      ponto26!.material = pontoColor
      const ponto27= (children0?.children.find((child)=> child.name === 'Shape_27') as THREE.Mesh)
      ponto27!.material = pontoColor
      const ponto28= (children0?.children.find((child)=> child.name === 'Shape_28') as THREE.Mesh)
      ponto28!.material = pontoColor
      const ponto29= (children0?.children.find((child)=> child.name === 'Shape_29') as THREE.Mesh)
      ponto29!.material = pontoColor
      const ponto30= (children0?.children.find((child)=> child.name === 'Shape_30') as THREE.Mesh)
      ponto30!.material = pontoColor
      const ponto31= (children0?.children.find((child)=> child.name === 'Shape_31') as THREE.Mesh)
      ponto31!.material = pontoColor
      const ponto32= (children0?.children.find((child)=> child.name === 'Shape_32') as THREE.Mesh)
      ponto32!.material = pontoColor
      const ponto33= (children0?.children.find((child)=> child.name === 'Shape_33') as THREE.Mesh)
      ponto33!.material = pontoColor
      const ponto34= (children0?.children.find((child)=> child.name === 'Shape_34') as THREE.Mesh)
      ponto34!.material = pontoColor
      const ponto35= (children0?.children.find((child)=> child.name === 'Shape_35') as THREE.Mesh)
      ponto35!.material = pontoColor
      const ponto36= (children0?.children.find((child)=> child.name === 'Shape_36') as THREE.Mesh)
      ponto36!.material = pontoColor
      const ponto37= (children0?.children.find((child)=> child.name === 'Shape_37') as THREE.Mesh)
      ponto37!.material = pontoColor
      const ponto38= (children0?.children.find((child)=> child.name === 'Shape_38') as THREE.Mesh)
      ponto38!.material = pontoColor
      const ponto39= (children0?.children.find((child)=> child.name === 'Shape_39') as THREE.Mesh)
      ponto39!.material = pontoColor
      const ponto40= (children0?.children.find((child)=> child.name === 'Shape_40') as THREE.Mesh)
      ponto40!.material = pontoColor
      const ponto41= (children0?.children.find((child)=> child.name === 'Shape_41') as THREE.Mesh)
      ponto41!.material = pontoColor
      const ponto42= (children0?.children.find((child)=> child.name === 'Shape_42') as THREE.Mesh)
      ponto42!.material = pontoColor
      const ponto43= (children0?.children.find((child)=> child.name === 'Shape_43') as THREE.Mesh)
      ponto43!.material = pontoColor
      const ponto44= (children0?.children.find((child)=> child.name === 'Shape_44') as THREE.Mesh)
      ponto44!.material = pontoColor
      const ponto45= (children0?.children.find((child)=> child.name === 'Shape_45') as THREE.Mesh)
      ponto45!.material = pontoColor
      const ponto46= (children0?.children.find((child)=> child.name === 'Shape_46') as THREE.Mesh)
      ponto46!.material = pontoColor
      const ponto47= (children0?.children.find((child)=> child.name === 'Shape_47') as THREE.Mesh)
      ponto47!.material = pontoColor
      const ponto48= (children0?.children.find((child)=> child.name === 'Shape_48') as THREE.Mesh)
      ponto48!.material = pontoColor
      const ponto49= (children0?.children.find((child)=> child.name === 'Shape_49') as THREE.Mesh)
      ponto49!.material = pontoColor
      const ponto50= (children0?.children.find((child)=> child.name === 'Shape_50') as THREE.Mesh)
      ponto50!.material = pontoColor
      const ponto51= (children0?.children.find((child)=> child.name === 'Shape_51') as THREE.Mesh)
      ponto51!.material = pontoColor
      const ponto52= (children0?.children.find((child)=> child.name === 'Shape_52') as THREE.Mesh)
      ponto52!.material = pontoColor
      const ponto53= (children0?.children.find((child)=> child.name === 'Shape_52') as THREE.Mesh)
      ponto53!.material = pontoColor

      
      window.addEventListener('click', (event) => {
        // Converta a posição do mouse para coordenadas normalizadas de dispositivo
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        // Atualize o raycaster com a posição da câmera e a posição do mouse
        raycaster.ray.origin.copy(camera.position);
        raycaster.ray.direction.set(mouse.x, mouse.y, 1).unproject(camera).sub(raycaster.ray.origin).normalize();
    
        // Verifique quais objetos foram atingidos pelo raio
        const intersects = raycaster.intersectObject(ponto2);
        const intersectsWall = raycaster.intersectObject(entryWall);
    
        console.log('Intersects with ponto2:', intersects);
        // console.log('Intersects with entryWall:', intersectsWall);
    
        if (intersects.length >= 0) {
            selectedPoint = ponto2;
            (document.getElementById('getPointInfo') as HTMLButtonElement).disabled = false;
            console.log('primeiro ponto click!');
        }else{
          selectedPoint = null;
          (document.getElementById('getPointInfo') as HTMLButtonElement).disabled = true;
        }
       
    

    });
    
 
    }
  )
 
 
 
 
  const clock = new THREE.Clock()
 
  const tick = () =>
  {
      const elapsedTime = clock.getElapsedTime()
      // console.log('X: ', camera.position.x)
      // console.log('Y: ', camera.position.y)
      // console.log('Z: ', camera.position.z)
 
      // Update controls
      controls.update()
     
 
   
      // Render
      renderer.render(scene, camera)
 
      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
  }
 
  tick()
     
 
  }
}
}

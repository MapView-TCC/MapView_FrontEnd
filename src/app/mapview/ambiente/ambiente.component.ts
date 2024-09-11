import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui';
import gsap from 'gsap';
 
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
 
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./assets/draco/')

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader)
 
  gltfLoader.load(
    './assets/sala.glb', 
    
    (gltf) => {
      // console.log(gltf.scene.children[0])
      gltf.scene.position.y = 9
      gltf.scene.position.x = 3.5
      
      const meshes: THREE.Mesh[] = (gltf.scene.children[0] as THREE.Group).children[0].children as THREE.Mesh[];
 
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
      
      // Lista para armazenar os meshes que têm o material alterado
      const meshList: THREE.Mesh[] = [];
      const findMeshes = gltf.scene.children[0]?.children[0]

      // Iterate through all meshes
    
          meshes.forEach((mesh: THREE.Mesh) => {
            if (mesh.name.includes('Shape')) {
            // Create and assign a new material
              const pointerMaterial = new THREE.MeshStandardMaterial({ color: '#f05056' });
              mesh.material = pointerMaterial;
                meshList.push(mesh);
            }else if (mesh.name.includes('tableRow')) {
              // //todas as mesas
              const tableMaterial = new THREE.MeshStandardMaterial({ color: '#edede9' });
              mesh.material = tableMaterial;
            }
          });

 
      //Textura do chão
      const chao = (findMeshes?.children.find((child)=> child.name === 'floor') as THREE.Mesh)
      chao!.material = chaoColor;
      chao.receiveShadow = true

      // console.log(chao)
          
       
      //cores das paredes da entrada
      const entryWall = (findMeshes?.children.find((child)=> child.name === 'entryWall') as THREE.Mesh)
      entryWall!.material = wallColor
      entryWall.receiveShadow = true
      const wallExtension = (entryWall?.children.find((child) => child.name === 'wallExtension') as THREE.Mesh)
      wallExtension!.material = wallColor
      wallExtension.receiveShadow = true
      wallExtension.castShadow = true
 
      //Textura da parede
      const wall = (findMeshes?.children.find((child)=> child.name === 'wall') as THREE.Mesh)
      wall!.material = paredeColor
      wall.castShadow = true
     
 
      //Mesa dos instrutores
      const tableInstrutor1 = (findMeshes?.children.find((child)=> child.name === 'table1') as THREE.Mesh)
      tableInstrutor1!.material = tableColor
      tableInstrutor1.castShadow = true
      tableInstrutor1.receiveShadow = true
      const tableInstrutor2 = (findMeshes?.children.find((child)=> child.name === 'table2') as THREE.Mesh)
      tableInstrutor2!.material = tableColor
      tableInstrutor2.castShadow = true
      tableInstrutor2.receiveShadow= true
 
 
      const leftDoor = (findMeshes?.children.find((child)=> child.name === 'leftDoor') as THREE.Mesh)
      leftDoor!.material = DoorColor
 
      const leftDoorWindow = (findMeshes?.children.find((child)=> child.name === 'leftDoorWindow') as THREE.Mesh)
      leftDoorWindow!.material = WindowDoorColor
 
      const leftCabinet1 = (findMeshes?.children.find((child)=> child.name === 'leftCabinet1') as THREE.Mesh)
      leftCabinet1!.material = lokersColor
      leftCabinet1.receiveShadow = true
      const leftCabinet2 = (findMeshes?.children.find((child)=> child.name === 'leftCabinet2') as THREE.Mesh)
      leftCabinet2!.material = lokersColor
      leftCabinet2.receiveShadow = true
      const leftCabinet3 = (findMeshes?.children.find((child)=> child.name === 'leftCabinet3') as THREE.Mesh)
      leftCabinet3!.material = lokersColor
      leftCabinet3.receiveShadow = true
 
      const rightDoor = (findMeshes?.children.find((child)=> child.name === 'rigthDoor') as THREE.Mesh)
      rightDoor!.material = DoorColor
 
      const rightDoorWindow = (findMeshes?.children.find((child)=> child.name === 'rigthDoorWindow') as THREE.Mesh)
      rightDoorWindow!.material = WindowDoorColor
 
      const rigthCabinet1 = (findMeshes?.children.find((child)=> child.name === '_rigthCabinet1') as THREE.Mesh)
      rigthCabinet1!.material = cabinetColor
      const rigthCabinet2 = (findMeshes?.children.find((child)=> child.name === 'rigthCabinet_2') as THREE.Mesh)
      rigthCabinet2!.material = cabinetColor
      const rigthCabinet3 = (findMeshes?.children.find((child)=> child.name === 'rigthCabinet_3') as THREE.Mesh)
      rigthCabinet3!.material = cabinetColor
 
      const lokers = (findMeshes?.children.find((child)=> child.name === 'lokers') as THREE.Mesh)
      lokers!.material = lokersColor
 
      const rightTv = (findMeshes?.children.find((child)=> child.name === 'rigthTv') as THREE.Mesh)
      rightTv!.material = TvsColor
      const leftTv = (findMeshes?.children.find((child)=> child.name === 'leftTv') as THREE.Mesh)
      leftTv!.material = TvsColor
 
      //parte superior onde fica a textura
      const superior = (findMeshes?.children.find((child)=> child.name === 'Superior1') as THREE.Mesh)
      superior!.material = superiorColor
     
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(sizes.width, sizes.height);
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.pointerEvents = 'none';
      document.body.appendChild(labelRenderer.domElement);

      const paragrafo = document.createElement('p');
      paragrafo.className = 'tooltip';
      const pointContainer = document.createElement('div');
      pointContainer.appendChild(paragrafo);
      const pointLabel = new CSS2DObject(pointContainer);
      scene.add(pointLabel);

        window.addEventListener('mousemove', (event)=>{
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
      

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshList);
      if(intersects.length > 0) {
          const pointerMesh = intersects[0].object;
  
          const position = new THREE.Vector3();
          position.setFromMatrixPosition(pointerMesh.matrixWorld);
  
          paragrafo.className = 'tooltip show';
          pointLabel.position.set(10,1,1);
          console.log(pointLabel)
          paragrafo.textContent = pointerMesh.name;
      } else {
        paragrafo.className = 'tooltip hide';
      }

    })


    });
    

  
 
 
 
 
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

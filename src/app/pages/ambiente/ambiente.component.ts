//Imports for Angular
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js'
import { InventarioService } from '../../services/equipaments/inventario.service';
import { TranslateModule } from '@ngx-translate/core';

import GUI from 'lil-gui';
import gsap from 'gsap';

//Imports for our components 
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { CarroselComponent } from '../../components/carrosel/carrosel.component';
import { Equipment } from '../../models/Equipment';
import { GeneralService } from '../../services/general/general.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { WrongLocation } from '../../models/WrongLocation';
import { CarrosselService } from '../../services/carrossel/carrossel.service';

@Component({
  selector: 'app-ambiente',
  standalone: true,
  imports: [HeaderComponent, CommonModule, CarroselComponent, FooterComponent, TranslateModule],
  templateUrl: './ambiente.component.html',
  styleUrl: './ambiente.component.scss',

})


export class AmbienteComponent implements OnInit{ 
  equipments: Equipment[] = []
  wrongLocation: WrongLocation[]=[]


  constructor(public equipmentService: InventarioService,
    public generalService: GeneralService,
    public wrongLocationEquipment: CarrosselService){

  }


  ngOnInit(): void {
    this.createThreeJsBox();
    this.loadEquipments();
    console.log(this.equipments)
  }

  loadEquipments(): void {
    this.equipmentService.getEquipments().subscribe((data) => {
      this.equipments = data;
      // this.equipments.splice(0,2)
    });
  }

  getWrongLocation(): void{
    this.wrongLocationEquipment.getEquipamentos().subscribe((data) => {
      this.wrongLocation = data;
      console.log("Equipamentos no lugar errado", this.wrongLocationEquipment)
    });
  }

  createThreeJsBox(): void {
    if (typeof document !== 'undefined') {
      const canvas = <HTMLCanvasElement>document.getElementById('webgl');
      const meshList: THREE.Mesh[] = [];

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#f2f4f5')

      const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
      ambientLight.position.set(100, 0, 0).normalize()
      scene.add(ambientLight)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(-100, 90, 40).normalize();
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 4024
      directionalLight.shadow.mapSize.height = 4024
      directionalLight.shadow.camera.top = 20
      directionalLight.shadow.camera.right = 10
      directionalLight.shadow.camera.bottom = -20
      directionalLight.shadow.camera.left = -16
      directionalLight.shadow.camera.near = -29
      directionalLight.shadow.camera.far = 50

      scene.add(directionalLight)

      const textureLoader = new THREE.TextureLoader();

      const loadTexture = (path: string) => {
        const texture = textureLoader.load(path);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.NearestFilter;
        return texture;
      };

      const shapeColor = new THREE.MeshStandardMaterial({ color: '#f05056' });
      const tableColor = new THREE.MeshStandardMaterial({ color: '#edede9' });
      const tableBase = new THREE.MeshStandardMaterial({ color: '#000000' });
      const floorTexture = new THREE.MeshStandardMaterial({ map: loadTexture('./assets/textures/Chão.png') });
      const lockerColor = new THREE.MeshStandardMaterial({ color: '#ffffff' });
      const wallColor = new THREE.MeshStandardMaterial({ color: '#b7cee4' });
      const wallTexture = new THREE.MeshStandardMaterial({ map: loadTexture('./assets/textures/FundoLab04.png') })
      const tvColor = new THREE.MeshStandardMaterial({ color: '#000000' });
      const doorColor = new THREE.MeshStandardMaterial({ color: '#ffffff' });
      const windowDoorColor = new THREE.MeshStandardMaterial({ color: '#dae2e6' });
      const superiorColor = new THREE.MeshStandardMaterial({ color: '#b7cee4' });

      const materialMap: { [key: string]: { material: THREE.MeshStandardMaterial, canReceiveShadow: boolean, canCastShadow: boolean } } = {
        'Shape': {
          material: shapeColor,
          canReceiveShadow: false,
          canCastShadow: false,
        },
        'floor': {
          material: floorTexture,
          canReceiveShadow: true,
          canCastShadow: false
        },
        'table': {
          material: tableColor,
          canReceiveShadow: true,
          canCastShadow: true
        },
        'tableBase': {
          material: tableBase,
          canReceiveShadow: false,
          canCastShadow: false
        },
        'lockerNoShadow': {
          material: lockerColor,
          canReceiveShadow: false,
          canCastShadow: false
        },
        'lockerShadow': {
          material: lockerColor,
          canReceiveShadow: true,
          canCastShadow: false
        },
        'entryWall': {
          material: wallColor,
          canReceiveShadow: true,
          canCastShadow: false
        },
        'wallTexture': {
          material: wallTexture,
          canReceiveShadow: false,
          canCastShadow: true
        },
        'Tv': {
          material: tvColor,
          canReceiveShadow: false,
          canCastShadow: false
        },
        'DoorRec': {
          material: doorColor,
          canReceiveShadow: false,
          canCastShadow: false
        },
        'DoorWindow': {
          material: windowDoorColor,
          canReceiveShadow: false,
          canCastShadow: false
        },
        'Superior': {
          material: superiorColor,
          canReceiveShadow: false,
          canCastShadow: false
        }
      };

      const sizes = {
        width: 1000,
        height: 700
      };

      const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 550)
      camera.position.x = 40
      camera.position.y = 32
      camera.position.z = 45

      scene.add(camera)
      scene.background = new THREE.Color('#dfe9f2');

      const controls = new OrbitControls(camera, canvas)
      controls.enableRotate = false
      controls.enableZoom = false
      controls.enablePan = false

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference:'low-power',
        preserveDrawingBuffer: false, // Tente 'true' se precisar manter o conteúdo
        failIfMajorPerformanceCaveat: true
      });

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowMap

      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('./assets/draco/')

      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader)

      gltfLoader.load(
        './assets/sala.glb',

        (gltf: GLTF) => {
          gltf.scene.position.y = 9
          gltf.scene.position.x = 3.5

          console.log(gltf.scene)

          const meshes: THREE.Mesh[] = (gltf.scene.children[0] as THREE.Group).children[0].children as THREE.Mesh[];

          gltf.scene.traverse(function (node: { castShadow: boolean; receiveShadow: boolean; }) {
            if (node instanceof THREE.Mesh) {
              node.castShadow = true
              node.receiveShadow = true
            }
          })
          gltf.scene.receiveShadow = true
          gltf.scene.castShadow = true
          scene.add(gltf.scene)


          meshes.forEach((mesh: THREE.Mesh) => {
            const meshConfig = Object.keys(materialMap).find(key => mesh.name.includes(key));

            if (meshConfig) {
              const { material, canReceiveShadow, canCastShadow } = materialMap[meshConfig];

              mesh.material = material;
              mesh.receiveShadow = canReceiveShadow;
              mesh.castShadow = canCastShadow;

              if (meshConfig === 'Shape') meshList.push(mesh);
              else if (meshConfig === 'entryWall') {
                const wallExtension = mesh.children[0] as THREE.Mesh;
                wallExtension.material = wallColor;
                wallExtension.castShadow = true;
                wallExtension.receiveShadow = true;
              }
            }
          });
        });

      const divContainer = document.getElementById('webglContainer') as HTMLDivElement;
      
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(sizes.width, sizes.height);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.pointerEvents = 'none';
      divContainer!.appendChild(labelRenderer.domElement);

      const paragraph = document.createElement('p');
      paragraph.className = 'tooltip';
      const pContainer = document.createElement('div');
      pContainer.appendChild(paragraph);
      const pointLabel = new CSS2DObject(pContainer);
      scene.add(pointLabel);

      const mousePos = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mousePos, camera);
        const intersects = raycaster.intersectObjects(meshList);
        console.log(intersects);
        // console.log("SAAAAAAAAAAAAAAAAAA")
        if (intersects.length > 0) {
          const pointerMesh = intersects[0].object;
          console.log(pointerMesh);
          const position = new THREE.Vector3();
          position.setFromMatrixPosition(pointerMesh.matrixWorld);

          pointLabel.position.set(position.x, position.y, position.z);

          // const elementBackend = [
          //   {
          //     id: 1,
          //     pcName: "Pc teste1"
          //   },
          //   {
          //     id: 2,
          //     pcName: 'Pc teste2',
          //   },
          // ]

          // this.equipments.forEach(e => {
          //   e.location.post.id_post++;
          // })
          
          console.log("os equipamentos",this.equipments)
          this.equipments.splice(this.equipments.length-2, 2)
          //ele compara o nome do shape com a string 'Shape_' + cada id recebido pelo backend+1
          // ao fazer this.equipments.filter ele entra dentro do array de Equipments e percorre os equipamentos dentro dela
          console.log( "OI",pointerMesh.name); // Verifica o valor do nome do pointerMesh
          this.equipments.forEach((pc) => {
            console.log(`Comparando: ${pointerMesh.name} com Shape_${pc.location.post.id_post + 1}`);
            console.log(pointerMesh.name == 'Shape_'+(pc.location.post.id_post + 1));
          });
          const element = this.equipments.filter((pc) => pointerMesh.name == `Shape_${pc.location.post.id_post + 1}`);
          
          
          
          console.log("os elementos",element)

          //colocando o 0 entre colchetes eu estou pegando o primeiro elemento de um array
          paragraph.innerHTML = `<strong>${element[0].name_equipment}</strong> <p><strong>ID Notebook:</strong>${element[0].id_equipment}<strong><br>Nome:</strong> ${element[0].name_equipment}<br><strong>Responsável:</strong> ${element[0].owner.id_owner}</p>`;
          paragraph.style.display = 'flex'
          // paragraph.style.flexDirection = 'column'
          // paragraph.style.zIndex = '5'
          // paragraph.style.width = '100px'
          // paragraph.style.marginTop = '100px'
          
          
          paragraph.className = 'tooltip show';
        } else {
          paragraph.className = 'tooltip hide';
        }
      });

      const clock = new THREE.Clock()

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        controls.update();

        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);

        window.requestAnimationFrame(tick)
      }

      tick();
    }
  }
}

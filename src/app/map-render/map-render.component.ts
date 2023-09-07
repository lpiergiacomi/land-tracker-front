import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as THREE from "three";
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {LoteService} from '../backend/services/lote.service';
import {Lote} from '../backend/model/lote';
import {Observable, map} from 'rxjs';
import TWEEN from '@tweenjs/tween.js'
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Vector3} from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";


@Component({
  selector: 'app-map-render',
  templateUrl: './map-render.component.html',
  styleUrls: ['./map-render.component.css']
})
export class MapRenderComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', {static: true})
  private rendererContainer: ElementRef;
  private fieldOfView: number = 11;
  private nearClippingPane: number = 1;
  private farClippingPane: number = 9999;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private controls: OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private model: any;
  private directionalLight: THREE.DirectionalLight;
  private loaderGLTF = new GLTFLoader();
  private annotationMarkers: THREE.Sprite[] = [];

  private lotes: Lote[] = [];
  public loteSeleccionado: Lote | undefined;

  constructor(private loteService: LoteService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createRenderer();
    this.createLabelRenderer();
    this.createControls();
    this.loadMeshFloor();
    this.loadLotes();
    this.animate();

    this.renderer.domElement.addEventListener('click', this.onClick, false);

  }

  private animate(): void {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
    this.controls.update();
    TWEEN.update();
    requestAnimationFrame(() => this.animate());
  }

  private loadLotes() {
    this.getLotes().subscribe({
      next: (response) => {
        this.lotes = response;
        this.lotes.forEach(lote => {
          this.loadMeshLote(lote);
        })
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private createControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.dampingFactor = 0.2
    this.controls.enableDamping = true
    this.controls.target.set(8, 3, 4)
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.update();
  };

  private createLights() {
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  private createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.getAspectRatio(),
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.set(-100, 170, 400);
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private loadMeshLote(lote: Lote) {
    this.loaderGLTF.load('assets/map_pin.glb', (gltf: GLTF) => {
        const circleTexture = new THREE.TextureLoader().load('assets/img/circle.png')

        const annotationSpriteMaterial = new THREE.SpriteMaterial({
          map: circleTexture,
          depthTest: false,
          depthWrite: false,
          sizeAttenuation: false,
        })
        const annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
        annotationSprite.scale.set(0.0066, 0.0066, 0.0066)
        let positionLote = new Vector3(lote.posicionLote.x, lote.posicionLote.y, lote.posicionLote.z);
        annotationSprite.position.copy(positionLote)
        annotationSprite.userData['id'] = lote['id'];

        this.scene.add(annotationSprite)
        this.annotationMarkers.push(annotationSprite);

        const annotationDiv = document.createElement('div');
        annotationDiv.innerHTML = lote.id.toLocaleString();
        annotationDiv.setAttribute("style", "color: #ffffff;font-family: monospace;font-size: 17px;")

        const annotationLabel = new CSS2DObject(annotationDiv);
        annotationLabel.position.copy(positionLote);
        this.scene.add(annotationLabel);

        // Info del lote
        const annotationDescriptionDiv = this.createAnnotationDescription(lote);
        annotationDiv.appendChild(annotationDescriptionDiv);
        lote.descriptionDomElement = annotationDescriptionDiv;

        this.model = gltf.scene.children[0];
        this.model.position.x = lote.posicionLote.x + 5;
        this.model.position.y = lote.posicionLote.y;
        this.model.position.z = lote.posicionLote.z;
        this.model.scale.set(5, 5, 5)

        this.model.traverse((object) => {
          if (object.isMesh) {
            this.setColorObject(lote, object);
          }
        })

        this.scene.add(this.model);

      }
    );
  }

  private loadMeshFloor() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./js/libs/draco/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load('assets/test.glb', (gltf: GLTF) => {
        this.scene.add(gltf.scene.children[0]);
      }
    );
  }

  private getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  private getLotes(): Observable<Lote[]> {
    return this.loteService.getLotes()
      .pipe(
        map((response: any) => {
          return response as Lote[];
        })
      );
  }

  private tween(posicionLote) {
    let {x, y, z} = posicionLote;
    new TWEEN.Tween(this.camera.position)
      .to(
        {
          x: x - 5,
          y: y + 40,
          z: z + 110,
        },
        500
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()

    new TWEEN.Tween(this.controls.target)
      .to(
        {
          x: x,
          y: y,
          z: z,
        },
        500
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }

  private createLabelRenderer(): void {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    this.rendererContainer.nativeElement.appendChild(this.labelRenderer.domElement);
  }

  onClick = (event: MouseEvent) => {
    event.preventDefault();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.annotationMarkers);
    if (intersects.length > 0) {
      const intersection = intersects[0];
      const idLoteSeleccionado = intersection.object.userData['id']
      this.loteSeleccionado = this.lotes.find(lote => lote.id == idLoteSeleccionado);
      this.tween(intersection.object.position);
      this.showTooltip()
    }
  };

  private createAnnotationDescription(lote: Lote) {
    const annotation = document.createElement('div')
    annotation.innerHTML = `<b>${lote.nombre}</b><br><b>Superficie: </b>${lote.superficie}<br><a href="/detalle-lote/${lote.id}" target="_blank">Ver más</a>`;
    annotation.setAttribute("style", "pointer-events: auto;color:#ffffff; font-family: monospace; font-size: 14px; position: absolute; left: 25px; padding: 1em; width: 200px; background: rgba(0, 0, 0, 0.66); border-radius: .5em; transition: opacity .5s; display: none;");
    return annotation;
  }

  private showTooltip() {
    this.lotes.forEach(lote => {
      if (lote.descriptionDomElement) {
        (lote.descriptionDomElement as HTMLElement).style.display = 'none'
      }
    })

    if (this.loteSeleccionado!.descriptionDomElement) {
      this.loteSeleccionado!.descriptionDomElement.style.display = 'block'
    }
  }

  private setColorObject(lote, object) {
    let color = 0x28a745;
    if (lote.estadoLote == 'RESERVADO')
      color = 0xffc107;
    if (lote.estadoLote == 'VENDIDO')
      color = 0xdc3545;
    object.material.color.set(color);
  }
}



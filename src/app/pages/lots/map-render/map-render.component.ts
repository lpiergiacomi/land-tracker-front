import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren, QueryList
} from '@angular/core';
import * as THREE from "three";
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {LotService} from '../../../backend/services/lot.service';
import {Lot} from '../../../backend/model/lot';
import TWEEN from '@tweenjs/tween.js'
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import {Vector3, ACESFilmicToneMapping, EquirectangularReflectionMapping, Color} from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';

@Component({
  selector: 'app-map-render',
  templateUrl: './map-render.component.html',
  styleUrls: ['./map-render.component.css']
})
export class MapRenderComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', {static: true})
  rendererContainer: ElementRef;
  @ViewChildren('childElement', {read: ElementRef}) childElements: QueryList<ElementRef>;
  private fieldOfView: number = 11;
  private nearClippingPane: number = 1;
  private farClippingPane: number = 9999;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private controls: OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private annotationMarkers: THREE.Sprite[] = [];

  public lots: Lot[] = [];
  public selectedLot: Lot;
  public tooltipLot: Lot;

  private width = 800;
  private height = 600;
  private cardContainer;
  private circleGroup = new THREE.Group();
  private originalLots: Lot[];
  panelOpenState = true;

  constructor(private lotService: LotService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {

  }

  async ngAfterViewInit() {
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createRenderer();
    this.createLabelRenderer();
    this.createControls();
    this.loadMeshFloor();
    await this.loadLots();
    this.animate();

    this.renderer.domElement.addEventListener('click', this.onClick, false);
    this.renderer.domElement.addEventListener('mousemove', this.onHover, false);

    window.addEventListener('resize', this.onWindowResize, false);

  }

  private animate(): void {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
    this.controls.update();
    TWEEN.update();
    requestAnimationFrame(() => this.animate());
  }

  private async loadLots() {
    const response = await this.getLots();
    this.originalLots = response;
    this.lots = response;
    this.lots.forEach((lot) => {
      this.loadMeshLot(lot);
    })
    this.scene.add(this.circleGroup);
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
    this.camera.position.set(25, 896, 858);
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
    this.cardContainer = this.elementRef.nativeElement.querySelector('.divRendererContainer');
    this.width = this.cardContainer.offsetWidth - 15;
  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement); //canvas
  }

  private loadMeshLot(lot: Lot) {
    const circleTexture = new THREE.TextureLoader().load('assets/img/circle.png')

    const annotationSpriteMaterial = new THREE.SpriteMaterial({
      map: circleTexture,
      depthTest: false,
      depthWrite: false,
      sizeAttenuation: false,
      color: this.setColorObject(lot)
    })
    const annotationSprite = new THREE.Sprite(annotationSpriteMaterial)
    annotationSprite.scale.set(0.0115, 0.0115, 0.0115)
    let positionLot = new Vector3(lot.position.x, lot.position.y, lot.position.z);
    annotationSprite.position.copy(positionLot)
    annotationSprite.userData['id'] = lot['id'];
    this.annotationMarkers.push(annotationSprite);
    this.circleGroup.add(annotationSprite);


    this.childElements.changes.subscribe((changes: QueryList<ElementRef>) => {
      const changedRefs = changes.toArray();
      let annotationDiv = changedRefs.find(x => x.nativeElement.id == lot.id)?.nativeElement.children[0]
      let annotationLabel = new CSS2DObject(annotationDiv);
      annotationLabel.position.copy(positionLot);
      annotationLabel.userData['id'] = lot['id'];

      annotationDiv.id = `annotationDivLot${lot.id}`;
      annotationDiv.style.marginTop = '4rem';
      this.scene.add(annotationLabel);


    })
  }

  private loadMeshFloor() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./js/libs/draco/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load('assets/plano3d4kv9.glb', (gltf: GLTF) => {
        this.scene.add(gltf.scene);
      }
    );

    new RGBELoader()
      .load("assets/env.hdr", (texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      })
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.6;
  }

  private getAspectRatio() {
    return this.width / this.height;
  }

  private async getLots() {
    return await this.lotService.getAllLots();
  }

  private tween(positionLot) {
    let {x, y, z} = positionLot;
    new TWEEN.Tween(this.camera.position)
      .to(
        {
          x: x,
          y: y + 22,
          z: z + 188,
        },
        1000
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
        1000
      )
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }

  private createLabelRenderer(): void {
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(this.width, this.height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    //this.labelRenderer.domElement.id = 'idLabelRenderer';
    this.rendererContainer.nativeElement.appendChild(this.labelRenderer.domElement)
  }

  onClick = (event: MouseEvent) => {
    event.preventDefault();
    this.selectedLot = null;
    const intersects = this.createRaycaster(event);
    if (intersects.length > 0) {
      const intersection = intersects[0];
      const idSelectedLot = intersection.object.userData['id']
      this.selectedLot = this.lots.find(lot => lot.id == idSelectedLot);
      this.tween(intersection.object.position);
    }
  };

  onHover = (event: MouseEvent) => {
    event.preventDefault();
    this.tooltipLot = null;
    document.body.style.cursor = 'default'
    const intersects = this.createRaycaster(event);

    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer'
      const intersection = intersects[0];
      const idLotForTooltip = intersection.object.userData['id']
      this.tooltipLot = this.lots.find(lot => lot.id == idLotForTooltip);
    }
  };

  private createRaycaster(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);
    return raycaster.intersectObjects(this.annotationMarkers.filter(marker => marker.visible));
  }

  private setColorObject(lot) {
    let color = 0x28a745;
    if (lot.state == 'RESERVADO')
      color = 0xffc107;
    if (lot.state == 'VENDIDO')
      color = 0xdc3545;
    return color;
  }


  onWindowResize = () => {
    this.width = this.cardContainer.offsetWidth - 15;
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.labelRenderer.setSize(this.width, this.height);
  }

  showFilteredLots(lots: Lot[]) {
    this.lots = this.originalLots;
    const idsLots = lots.map(l => l.id);

    // Label
    this.lots.forEach(lot => {
      const newTextContent = idsLots.includes(lot.id) ? lot.id.toString() : ''
      document.getElementById(`annotationDivLot${lot.id}`).firstChild.textContent = newTextContent;
    })

    // Circles
    this.circleGroup.children.forEach(sprite => {
      sprite.visible = idsLots.includes(sprite.userData['id']);
    });

    // Raycaster
    this.annotationMarkers.forEach(marker => {
      marker.visible = idsLots.includes(marker.userData['id']);
    })

    if (!idsLots.includes(this.selectedLot.id)){
      this.selectedLot = null;
    }
  }

  changeStateLotToReserved() {
    this.selectedLot.state = 'RESERVADO';
    const marker = this.annotationMarkers.find(marker => marker.userData['id'] == this.selectedLot.id)
    marker.material.color = new Color(0xffc107);
  }
}



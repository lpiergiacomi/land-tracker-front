import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { InteractionManager } from 'three.interactive';
import { LoteService } from '../backend/services/lote.service';


@Component({
  selector: 'app-map-render',
  templateUrl: './map-render.component.html',
  styleUrls: ['./map-render.component.css']
})
export class MapRenderComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  @Input() public fieldOfView: number = 11;
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 9999;

  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private model: any;
  private directionalLight: THREE.DirectionalLight;
  private loaderGLTF = new GLTFLoader();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private interactionManager: InteractionManager;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor(private loteService: LoteService) { 

  }

  ngOnInit(): void {
    this.getLotes();
  }

  ngAfterViewInit() {
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createInteractionManager();
    this.createControls();
    this.loadGLTFModel();

    const marker1 = this.createBoxClickeable();


    let component: MapRenderComponent = this;
    const animate = () => {
      requestAnimationFrame(animate);
      component.interactionManager.update();
      component.renderer.render(component.scene, component.camera);
      // component.animateModel();
    };

    animate();



    marker1.addEventListener('click', (event) => {
      console.log(event);
      event.target.scale.set(1.0, 1.0, 1.0);
    });

  }

  private createInteractionManager() {
    this.interactionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );
  }

  private createControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
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
    //this.camera.position.set(100, 100, 100);
    this.camera.position.set(-100, 170, 400);
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);
  }

  private createRenderer() {
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
  }

  private createBoxClickeable() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const marker1 = new THREE.Mesh(geometry, material);
    marker1.position.set(0, 20, 0);
    this.scene.add(marker1);
    this.interactionManager.add(marker1);
    return marker1;
  }

  private loadGLTFModel() {
    this.loaderGLTF.load('assets/field/scene.glb', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      //this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);

      this.model.traverse((child) => {

        this.interactionManager.add(child);

        child.addEventListener('mouseover', (event) => {
    
        });

        child.addEventListener('mouseout', (event) => {
          //console.log('mouseout', event);
        });

        child.addEventListener('mousedown', (event) => {
          //console.log(this.model);
          event.stopPropagation();
        });
      });
    }
    );
  }




  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private getLotes() {
    this.loteService.getLotes()
        .subscribe(
          response => {
            console.table(response);
          },
          error => {
            console.error(error);
          },
        );
  }
}



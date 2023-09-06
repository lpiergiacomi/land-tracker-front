import {Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import * as THREE from "three";
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {InteractionManager} from 'three.interactive';
import {LoteService} from '../backend/services/lote.service';
import {Lote} from '../backend/model/lote';
import {Observable, map} from 'rxjs';
import TWEEN from '@tweenjs/tween.js'


@Component({
  selector: 'app-map-render',
  templateUrl: './map-render.component.html',
  styleUrls: ['./map-render.component.css']
})
export class MapRenderComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  private fieldOfView: number = 11;
  private nearClippingPane: number = 1;
  private farClippingPane: number = 9999;

  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private ambientLight: THREE.AmbientLight;
  private model: any;
  private directionalLight: THREE.DirectionalLight;
  private loaderGLTF = new GLTFLoader();
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private interactionManager: InteractionManager;
  private lotes: Lote[] = [];

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor(private loteService: LoteService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createInteractionManager();
    this.createControls();
    this.loadMeshFloor();
    this.loadLotes();

    let component: MapRenderComponent = this;
    const animate = () => {
      requestAnimationFrame(animate);
      component.interactionManager.update();
      this.controls.update();
      TWEEN.update();
      component.renderer.render(component.scene, component.camera);
    };

    animate();

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

  private createInteractionManager() {
    this.interactionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );
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
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.shadowMap.enabled = true;
  }

  private loadMeshLote(lote: Lote) {
    this.loaderGLTF.load('assets/map_pin.glb', (gltf: GLTF) => {
        this.model = gltf.scene.children[0];
        this.model.position.x = lote.posicionLote.x;
        this.model.position.y = lote.posicionLote.y;
        this.model.position.z = lote.posicionLote.z;
        this.model.scale.set(5, 5, 5)

        this.scene.add(this.model);

        this.model.traverse((child) => {

          this.interactionManager.add(child);

          child.addEventListener('mouseover', (event) => {
            document.body.style.cursor = 'pointer';
          });

          child.addEventListener('mouseout', (event) => {
            document.body.style.cursor = 'default';
          });

          child.addEventListener('mousedown', (event) => {
            this.tween(lote.posicionLote);
            event.stopPropagation();
          });
        });
      }
    );
  }

  private loadMeshFloor() {
    this.loaderGLTF.load('assets/test.glb', (gltf: GLTF) => {
        this.model = gltf.scene.children[0];
        this.scene.add(this.model);
      }
    );
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
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
          y: y + 100,
          z: z + 100,
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
}



import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';

@Component({
  selector: 'app-test-event',
  templateUrl: './test-event.component.html',
  styleUrls: ['./test-event.component.css']
})
export class TestEventComponent implements AfterViewInit {


  @ViewChild('canvas') private canvasRef: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {

    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.0, 0.0, 10.0);

    const interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();

    const cube = new THREE.Mesh(geometry, material);
    cube.addEventListener('mouseover', (event) => {
      event.target.material.color.set(0xff0000);
      document.body.style.cursor = 'pointer';
    });
    cube.addEventListener('mouseout', (event) => {
      event.target.material.color.set(0xffffff);
      document.body.style.cursor = 'default';
    });
    cube.addEventListener('mousedown', (event) => {
      event.target.scale.set(1.1, 1.1, 1.1);
    });
    cube.addEventListener('click', (event) => {
      event.target.scale.set(1.0, 1.0, 1.0);
      console.log("asd");
      
    });
    scene.add(cube);
    interactionManager.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      interactionManager.update();

      renderer.render(scene, camera);
    };

    animate();
  }





}

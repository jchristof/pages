import { Component, OnInit, Input } from '@angular/core';
export class NewPrimitive{
//https://github.com/angular/angular/issues/5415
    static metaData = {
        inputs: ['position', 'name'],
        //outputs: ['someOutput']
    };

      @Input() position:BABYLON.Vector3;
      @Input() name:string;
}
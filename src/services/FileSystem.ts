import { Injectable } from '@angular/core';

@Injectable()
export class FileSystem{
    constructor(){
        this.files = new Array<File>();
    }

    readonly files:File[];

    addFiles(fileList:FileList){
        if(fileList == null || fileList.length === 0)
        return;

        for(let i=0; i<fileList.length; i++){
            this.files.push(fileList.item(i));
        }
    }

    getFile(filename:string):File{
        return this.files.find(x=>x.name === filename);
    }

    loadImage(url: any, onload: any, onerror: any, database: any):HTMLImageElement{
      if(!url)
        return null;
      const img = new Image();

      img.onload = (event:Event) => {
        onload(img);
        window.URL.revokeObjectURL(img.src);
      };

      img.onerror = (event:ErrorEvent) => {
        window.URL.revokeObjectURL(img.src);
        onerror(event);
      }
        
      const imageFile = this.files.find(x=>x.name === url);
      img.src = window.URL.createObjectURL(imageFile);
      
      return img;
    }
}
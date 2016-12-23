import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})
//declare var ace;
export class AceEditorComponent implements OnInit {

constructor() { }

editor:any;

public aceId = "";
  ngOnInit() {

    this.aceId = "editor";
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/chrome");
    this.editor.getSession().setMode("ace/mode/glsl");
  }

}

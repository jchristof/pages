import { Component, OnInit } from '@angular/core';
declare var ace;
@Component({
  selector: 'ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css']
})

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

import { Component, OnInit } from '@angular/core';

import 'fabric';
import { element } from 'protractor';
declare const fabric: any;
 

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private canvas: any;
  private crop_canvas: any;
  private path_width: any;
  private path_height: any;
  private props: any = {
    caetgories: ['Screens', 'Accessories', 'Plants', 'Foreground', 'Background', 'Text','Upload item'],
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    TextDecoration: ''
  };
  private desk: any = {
    surface: '../assets/img/desk/Table-Surfaces/Surface  6.png',
    leg: '../assets/img/desk/Table-Legs/Leg 1.png',
    background: '../assets/img/desk/Table Background.png'
  };
  private ind_lbl : any  = [-1, -1, -1, -1, -1, -1, -1];
  private indexes : any  = [0,0,0,0,0,0,0 ]; // [-1, -1, -1, -1, -1, -1, -1];
                      //    sc, ac, pl, up, fg1,fg2,te 
  private screens: any = {
    // origin_left: {
    //   'apple-cinema-display' : 300, '50inch-tv':300, 'asus-laptop-facing-left':300, 'asus-laptop-facing-right':300,
    // },
    // origin_top: {
    //   'apple-cinema-display' : 300,'50inch-tv':300, 'asus-laptop-facing-left':300,
    // },
    
    paths: {
      // '50inch-tv': [0, 0, 1022, 0, 1022, 585, 0, 585],
      '50inch-tv': [20, 20, 1022, 20, 1022, 585, 20, 585],
      'apple-cinema-display' : [20, 20, 552, 20, 552, 320, 20, 320], 
      'asus-laptop-facing-left': [125, 15, 300, 15, 300, 126, 125, 122],
      'asus-laptop-facing-right': [35, 15, 195, 17, 198, 132, 37, 137],
      'asus-laptop-front': [30, 15, 235, 15, 235, 135, 30, 135],
      'cintiq-down-facing-right': [190, 30, 620, 33, 640, 228, 185, 240],
      'cintiq-facing-left': [150, 55, 585, 52, 590, 315, 140, 300],
      'cintiq-facing-right': [156, 50, 562, 52, 565, 302, 150, 320],
      'cintiq-front': [142, 53, 611, 57, 618, 310, 130, 305],
      'cintiq-front-flat': [166, 18, 650, 20, 650, 125, 126, 125],
      'dell-xps-facing-left': [145, 15, 340, 15, 345, 150, 150, 145],
      'dell-xps-facing-right': [40, 25, 242, 30, 232, 158, 31, 155],
      'dell-xps-front': [30, 22, 268, 20, 270, 150, 32, 152],
      'ipad-sitting': [35, 27, 190, 17, 186, 136, 30, 150],
      'ipad-standing': [30, 20, 150, 19, 150, 195, 30, 200],
      'iphone-in-stand-facing-right': [22, 21, 53, 20, 53, 96, 22, 96],
      'mbp-front': [50, 24, 326, 25, 328, 186, 45, 185],
      'mbp-left': [150, 22, 390, 18, 390, 170, 146, 170],
      'mbp-right': [50, 20, 265, 31, 249, 182, 33, 180],
      'pc-laptop': [35, 20, 339, 20, 340, 185, 34, 185],
      'pc-screen': [22, 22, 554, 22, 556, 320, 22, 320],
      'windows-tablet-facing-left': [165, 18, 307, 18, 311, 133, 169, 127],
      'windows-tablet-facing-right': [32, 20, 193, 21, 198, 134, 35, 134],
      'windows-tablet-front': [28, 18, 247, 18, 249, 130, 28, 130],
      'imac': [22, 22, 552, 22, 554, 320, 22, 320],
    },
    transformMatrix: {
      '50inch-tv':[ 1, 0, 0, 1, 0, 0 ],
      'apple-cinema-display' :[ 1, 0, 0, 1, 0, 0 ],
      'asus-laptop-facing-left':[ 1, 0.03, -0.25, 1, 0, 0 ],
      'asus-laptop-facing-right': [1, -0.08, 0.32, 1, 0, 0],
      'asus-laptop-front':[ 1, 0, 0, 1, 0, 0 ],
      'cintiq-down-facing-right': [1, -0.015, 0.6, 1, 0, 0],
      'cintiq-facing-left': [1, 0, -0.3, 1, 0, 0],
      'cintiq-facing-right': [1, 0.02, 0.32, 1, 0, 0],
      'cintiq-front': [1, 0, 0, 1, 0, 0],
      'cintiq-front-flat': [1, 0, 0.22, 1, 0, 0],
      'dell-xps-facing-left':  [1, 0.03, -0.25, 1, 0, 0],
      'dell-xps-facing-right': [1, -0.08, 0.28, 1, 0, 0],
      'dell-xps-front': [ 1, 0, 0, 1, 0, 0 ],
      'ipad-sitting': [1, 0.03, 0.25, 1, 0, 0],
      'iphone-in-stand-facing-right': [1, -0.08, 0.08, 1, 0, 0],
      'mbp-front':  [ 1, 0, 0, 1, 0, 0 ],
      'mbp-left': [1, 0.03, -0.14, 1, 0, 0],
      'mbp-right': [1, -0.08, 0.34, 1, 0, 0],
      'windows-tablet-facing-left': [1, 0.06, -0.38, 1, 0, 0],
      'windows-tablet-facing-right': [1, -0.08, 0.28, 1, 0, 0],
    },
    // camera_left: { 'apple-cinema-display' : 290,  } ,
    // camera_top: {    'apple-cinema-display' : 180,   } ,
    logo_pos: {
      '50inch-tv': [0, 25],
      'apple-cinema-display' : [0, 5],
      'asus-laptop-facing-left':  [-20, 0],
      'asus-laptop-facing-right': [25, 0],
      'asus-laptop-front': [-46, -65],
      'cintiq-down-facing-right': [85, 35],
      'cintiq-facing-left': [-40, 38],
      'cintiq-facing-right': [45, 45],
      'cintiq-front': [10, 30],
      'cintiq-front-flat': [40, 10],
      'dell-xps-facing-left': [-25, 3],
      'dell-xps-facing-right':[30, 0],
      'dell-xps-front': [0, 2],
      'ipad-sitting': [0, 0],
      'ipad-standing': [0, 0],
      'iphone-in-stand-facing-right':[0, 0],
      'mbp-front': [0, 0],
      'mbp-left': [0, 0],
      'mbp-right': [0, 0],
      'pc-laptop': [0, 3],
      'pc-screen': [0, 2],
      'windows-tablet-facing-left': [-30, 5],
      'windows-tablet-facing-right': [27, 0],
      'windows-tablet-front': [0, 1],
      'imac': [0, 30],
 
    },
  };

  private textString: string;
  private url: string = '';
  private size: any = {
    width: 1250,
    height: 690
  };
  private ratio: any;
  private json: any;
  private globalEditor: boolean = false;
  private textEditor: boolean = false;
  private imageEditor: boolean = false;
  private figureEditor: boolean = false;
  private selected: any;

  private ctx: any;
  private img1: any;
  private img2: any;
  private screen_path: any;
  private screen_group: any;
  private pot_group: any;
  private desk_id: any;
  private desk_surface: any;
  private selected_screen_id: any;
  constructor() { }
  private crop_img: any;

  private crop_fx: any;
  private crop_fy: any;
  private crop_lx: any;
  private crop_ly: any;

  ngOnInit() {

    var self =this;
    //setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      
      selectionBorderColor: 'blue',
      preserveObjectStacking: true });
    // this.crop_canvas = new fabric.Canvas('crop_canvas_dom', {
    //   hoverCursor: 'pointer',
    //   selection: true,
      
    //   selectionBorderColor: 'blue',
    //   preserveObjectStacking: true });
    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {
        var d = document.getElementsByClassName('sceneProperties')[0];
          d.className = 'editorSceneProperties sceneProperties';
        var d1 = document.getElementsByClassName('deskProperties')[0];
          d1.className = 'editorSceneProperties deskProperties';
          
        let selectedObject = e.target;
        this.selected = selectedObject
        selectedObject.hasRotatingPoint = false;
        // selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

        this.resetPanels();
        console.log('id : ' + selectedObject.id);
        var activeObj = self.canvas.getActiveObject();
        console.log('index : ' + activeObj && self.canvas.getObjects().indexOf(activeObj));
        self.selected_screen_id = selectedObject.id;

        if (self.selected_screen_id == 1000 || self.selected_screen_id == 1001) {
          //desk 
          var d = document.getElementsByClassName('deskProperties')[0];
          d.className += ' show';
        }
        if (selectedObject.type !== 'group' && selectedObject) {
          var obj_id = this.getId();
          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              break;
          }
        }
         
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });
    var ww = 0 , hh= 0;
    ww = window.innerWidth;
    hh = window.innerHeight;
    if (ww>hh*3/2) ww = hh*3/2;
    else hh = ww*2/3;
    this.canvas.setWidth(ww); //this.size.width);
    this.canvas.setHeight(hh); //(this.size.height);
    this.ratio = ww/1500;
    
    //////////////
    this.canvas.backgroundColor = this.props.canvasFill;
    this.props.canvasImage = './assets/img/scene-backgrounds/regular-white-old-wall/background.jpg';
    this.setCanvasImage();
    this.addDeskSurface(this.desk.leg, 1001);
    this.addDeskSurface(this.desk.surface, 1000);
    this.canvas.renderAll();

     
  }
   
  changeDeskSurface(num) {
    this.editDeskSurface('../assets/img/desk/Table-Surfaces/Surface  ' + num + '.png', 1000);
  }
  changeDeskLeg(num) {
    this.editDeskSurface('../assets/img/desk/Table-Legs/Leg ' + num + '.png', 1001);
  }

  addDeskSurface(imageLink, id) {
    var self = this;
    var deskImage = fabric.Image.fromURL(imageLink, function(img) {
        var group_width = img.width*self.ratio;
        var group_height = img.height*self.ratio;
        var hh = window.innerHeight;
        img.set({
          id: id,
          left: 0,
          top: hh-group_height,
          width: group_width ,
          height: group_height,
          selectable: true,
          hasControls: false,
          movable:false
        });
        img.on('selected', (e) => {
          
        });
        self.canvas.add(img);
    });
  }
  editDeskSurface(imageLink, id) {
    var self = this;
    var deskImage = fabric.Image.fromURL(imageLink, function(img) {
        var group_width = img.width*self.ratio;
        var group_height = img.height*self.ratio;
        var hh = window.innerHeight;
        img.set({
          id: 1000,
          left: 0,
          top: hh-group_height,
          width: group_width ,
          height: group_height,
          selectable: true,
          hasControls: false,
          movable:false
        });
        var objs = self.canvas.getObjects();
            objs.forEach(function(e) {
                if (e && e.id === id) {
                    e._element.src = imageLink;
                    self.canvas.renderAll();
                }
            });
    });
  }

  //Block "Upload Desk Image"
  addDeskOnCanvas(url, left, top) {
    var id: any;
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        var group_width = image.width*this.ratio;
        var group_height = image.height*this.ratio;
        var hh = window.innerHeight;
        image.set({
          left: 0,
          top: hh-group_height,
          width: group_width ,
          height: group_height,
          selectable: true,
          hasControls: false,
          movable:false
        });
        image.on('selected', (e) => {
          var d = document.getElementsByClassName('deskProperties')[0];
          d.className += ' show';
        });
        id = this.randomId();
        this.extend(image, id);
        this.canvas.add(image);
        this.bringToFront();
      });
    }
    return id;
  }

  changed(event: any) {
    if (event.which in [8, 46])
      this.removeSelected();
  }

  /*------------------------Block elements------------------------*/
  //Block "Size"
  changeSize(event: any) {
    var ww = 0 , hh= 0;
    ww = window.innerWidth;
    hh = window.innerHeight;
    if (ww>hh*3/2) ww = hh*3/2;
    else hh = ww*2/3;
    this.canvas.setWidth(ww); //this.size.width);
    this.canvas.setHeight(hh); //(this.size.height);
  }

  //Block "Add text"
  addText() {
    var ty = 'te';
    let textString = this.textString;
    let text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.setIndex(ty, text);
    this.textString = '';
    document.getElementById('text_container').style.visibility = 'hidden';
  }
 
  //setBackground
  setBackground(event: any) {
    let el = event.target;
    var src_1 : any;
    var src_2 : any;
    var ind_1 : any;
    src_1 = el.src;
    ind_1 = src_1.lastIndexOf('\/');
    src_2 = src_1.slice(0, ind_1) + "\/background.jpg";
    this.props.canvasImage = src_2;
    this.setCanvasImage();
  }

  // Foreground
  getImgForeground(event: any, ty: any) {
    if (ty==0) ty='fg1'; else ty='fg2';
    let el = event.target;
    var src_1 : any;
    var src_2 : any;
    var ind_1 : any;
    var dir_1 : any;
    var dir_2 : any;
    src_1 = el.src;
    ind_1 = src_1.lastIndexOf('\/');
    src_2 = src_1.slice(0, ind_1) + "\/item.png";
    dir_1 = src_1.slice(0, ind_1);
    ind_1 = dir_1.lastIndexOf('\/');
    dir_1 = dir_1.slice(ind_1+1);
    var self = this;
    fabric.Image.fromURL(src_2, (image) => {
      var group_width = image.width*this.ratio;
      var group_height = image.height*this.ratio;
      image.set({
        left: self.canvas.width/2,
        top: self.canvas.height - group_height,
        width: group_width ,
        height: group_height,
        selectable: true,
        hasControls: false,
        originX : 'center',
        padding: 10,
        originY : 'top'
      });
      this.canvas.add(image);
      this.setIndex(ty, image);
      this.selectItemAfterAdded(image);
    });
  }

  //Block "Add images"
  getImgPolaroid(event: any, ty: any) {
    let el = event.target;
    var src_1 : any;
    var src_2 : any;
    var ind_1 : any;
    var dir_1 : any;
    var dir_2 : any;
    src_1 = el.src;
    ind_1 = src_1.lastIndexOf('\/');
    src_2 = src_1.slice(0, ind_1) + "\/item.png";
    dir_1 = src_1.slice(0, ind_1);
    ind_1 = dir_1.lastIndexOf('\/');
    dir_1 = dir_1.slice(ind_1+1);
    
    var self = this;

    if (ty=='pl') {
      fabric.Image.fromURL('https://mockupeditor.com/static/images/items/white-plant-holder/item.png', (pot_img) => {
        var group_width = pot_img.width*this.ratio;
        var group_height = pot_img.height*this.ratio;
        pot_img.set({
          padding: 0, 
          left: self.canvas.width/2,
          top: self.canvas.height - 190*self.ratio - pot_img.height*self.ratio,
          width: group_width,
          height: group_height,
          selectable: true,
          hasControls: false,
          originX : 'center',
          originY : 'top'
        });
        fabric.Image.fromURL(src_2, (image) => {
          var group_width = image.width*this.ratio;
          var group_height = image.height*this.ratio;
          var radius = 50;
          image.set({
            left: self.canvas.width/2,
            top:  pot_img.top - group_height + 20*self.ratio,
            width: group_width ,
            height: group_height,
            selectable: true,
            hasControls: false,
            originX : 'center',
            originY : 'top',
            padding: 0, 
          });
          self.pot_group = new fabric.Group([ pot_img, image], {      });
          
          
          self.pot_group.set({
            id: self.randomId(),
            selectable: true,
            hasControls: false,
            subTargetCheck: true, 
            padding:10,
            
          });

          
          self.canvas.add(self.pot_group);
          self.setIndex(ty, self.pot_group);
        });
      });
    }
    else {
      fabric.Image.fromURL(src_2, (image) => {
        var group_width = image.width*this.ratio;
        var group_height = image.height*this.ratio;
        var radius = 50;
        image.set({
          left: self.canvas.width/2,
          top: self.canvas.height - 190*self.ratio - image.height*self.ratio,
          width: group_width ,
          height: group_height,
          selectable: true,
          hasControls: false,
          originX : 'center',
          originY : 'top',
          padding: 0, 
        });
        
        self.canvas.add(image);
        self.setIndex(ty, image);
      });
    }
  }
  
  //Block "Add images"
  // changeAttr() {
  //   var self = this;
  //   console.log(self.selected_screen_id);
  //   self.canvas.getObjects().forEach(function(o) {
  //     console.log(o.id);
  //     if(o.id === self.selected_screen_id) {
  //         console.log(document.querySelector('#a_val').value);
  //           o.item(1).transformMatrix[0]  = parseFloat(document.querySelector('#a_val').value, 10);
  //           o.item(1).transformMatrix[1]  = parseFloat(document.querySelector('#b_val').value, 10);
  //           o.item(1).transformMatrix[2]  = parseFloat(document.querySelector('#c_val').value, 10);
  //           o.item(1).transformMatrix[3]  = parseFloat(document.querySelector('#d_val').value, 10);
  //           o.item(1).transformMatrix[4]  = parseFloat(document.querySelector('#tx_val').value, 10);
  //           o.item(1).transformMatrix[5]  = parseFloat(document.querySelector('#ty_val').value, 10);

  //           var x1 = parseFloat(document.querySelector('#x1').value, 10);
  //           var y1 = parseFloat(document.querySelector('#y1').value, 10);
  //           var x2 = parseFloat(document.querySelector('#x2').value, 10);
  //           var y2 = parseFloat(document.querySelector('#y2').value, 10);
  //           var x3 = parseFloat(document.querySelector('#x3').value, 10);
  //           var y3 = parseFloat(document.querySelector('#y3').value, 10);
  //           var x4 = parseFloat(document.querySelector('#x4').value, 10);
  //           var y4 = parseFloat(document.querySelector('#y4').value, 10);

  //           document.getElementById('pos').value = "'" + o.id + "': " + '[' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 +', ' + x3 + ', ' + y3 +', ' + x4 + ', ' + y4 +'],';
  //           document.getElementById('tran').value = "'" + o.id + "': " + '[' + parseFloat(document.querySelector('#a_val').value, 10) + ', ' 
  //                                     + parseFloat(document.querySelector('#b_val').value, 10) + ', '
  //                                     + parseFloat(document.querySelector('#c_val').value, 10) + ', '
  //                                     + parseFloat(document.querySelector('#d_val').value, 10) + ', '
  //                                     + parseFloat(document.querySelector('#tx_val').value, 10) + ', '
  //                                     + parseFloat(document.querySelector('#ty_val').value, 10) + '],';
  //           document.getElementById('screen_title').value = o.id;
                                                
             
  //           o.item(1).path[1][1]  = x1; 
  //           o.item(1).path[1][2]  = y1; 
  //           o.item(1).path[2][1]  = x2; 
  //           o.item(1).path[2][2]  = y2; 
  //           o.item(1).path[3][1]  = x3; 
  //           o.item(1).path[3][2]  = y3; 
  //           o.item(1).path[4][1]  = x4; 
  //           o.item(1).path[4][2]  = y4; 
  //           self.canvas.renderAll();
  //     }
  //   });
  //   self.canvas.renderAll();
  // }
  setIndex(ty: any, obj: any) {
    var ind;
    var self = this;
    if (ty=='sc') ind = 0;
    else if (ty=='ac') ind = 1;
    else if (ty=='pl') ind = 2;
    else if (ty=='up') ind = 3;
    else if (ty=='fg1') ind = 4;
    else if (ty=='fg2') ind = 5;
    else if (ty=='te') ind = 6;
    else ind = 6;

    var len = self.canvas.getObjects().length;
    console.log('ty: ' + ty);
    console.log('ind: ' + ind);

    // var obj = self.canvas.getActiveObject();
    self.canvas.moveTo(obj, self.indexes[ind] + 2);

      // for (var i=self.indexes[ind+1]+2; i>=self.indexes[ind] + 3; i--) {
      //   console.log("sorted " + i);
      //   var obj = self.canvas.item(i);
      //   self.canvas.moveTo(obj, i+1);

      //   console.log("objegt " + obj);
      //   // self.canvas.setActiveObject(obj);
      //   // self.bringToFront();      
      // }
      for (var j=ind; j<7; j++) {
        self.indexes[j]++;
      }
      console.log(self.indexes);
  }
  getImgScreen(event: any) {
    var ty = 'sc';

    let el = event.target;
    var src_1 : any;
    var src_2 : any;
    var ind_1 : any;
    var dir_1 : any;
    var dir_2 : any;
    src_1 = el.src;
    ind_1 = src_1.lastIndexOf('\/');

    src_2 = src_1.slice(0, ind_1) + "\/item.png";
    var src_logo = src_1.slice(0, ind_1) + "\/logo.png";

    dir_1 = src_1.slice(0, ind_1);
    ind_1 = dir_1.lastIndexOf('\/');
    dir_1 = dir_1.slice(ind_1+1);
    
    var self = this;
    var ratio = this.ratio;
    fabric.Image.fromURL(src_2, (image) => {
      var group_width = image.width*this.ratio;
      var group_height = image.height*this.ratio;

      var origin_left = 300; // self.screens.origin_left[dir_1]*this.ratio;
      var origin_top = 300; //self.screens.origin_top[dir_1]*this.ratio;
      image.scale(this.ratio).set({
        left: origin_left,
        top: origin_top,
      });
      var x1, y1, x2, y2, x3, y3, x4, y4;
      if (!self.screens.paths[dir_1]){
        self.screens.paths[dir_1] = [20, 20, 300, 20, 300, 300, 20, 300];
      }
      if (!self.screens.transformMatrix[dir_1]){
        self.screens.transformMatrix[dir_1] = [ 1, 0, 0, 1, 0, 0 ];
      }

        x1 = self.screens.paths[dir_1][0]; 
        y1 = self.screens.paths[dir_1][1]; 
        x2 = self.screens.paths[dir_1][2]; 
        y2 = self.screens.paths[dir_1][3]; 
        x3 = self.screens.paths[dir_1][4]; 
        y3 = self.screens.paths[dir_1][5]; 
        x4 = self.screens.paths[dir_1][6]; 
        y4 = self.screens.paths[dir_1][7]; 
      
      var path = 'M0 0 M'+ x1 + ' ' + y1 + 'L'+ x2 + ' ' + y2 + 'L'+ x3 + ' ' + y3 + 'L'+ x4 + ' ' + y4 + 'z';

      var min_x = x1;
      if (min_x>x3) min_x = x3;
      var min_y = y1;
      if (min_y>y3) min_y = y3;

      var max_x = x2;
      if (max_x<x4) max_x = x4;
      var max_y = y2;
      if (max_y<y4) max_y = y4;

      var min_y_3_4 = y3;
      if (min_y_3_4>y4) min_y_3_4 = y4;

      // var path="M0 0M20 20L552 15L555 320L17 320z";
      self.screen_path = new fabric.Path(path, { id: 'screen_path:'+self.randomId(),  left: image.left, top: image.top, fill:"#28705D"}); //,    strokeWidth: 1, stroke:"red"
      self.screen_path.transformMatrix = self.screens.transformMatrix[dir_1];

      console.log('screen_path_ww : ' + self.screen_path.width);
      console.log('screen_path_hh : ' + self.screen_path.height);


      self.screen_path.scale(self.ratio);
      console.log('ratio : '  + self.ratio);
      console.log('screen_path_ww : ' + self.screen_path.width);
      console.log('screen_path_hh : ' + self.screen_path.height);

      var camera_left = image.left + (min_x*self.ratio) + (max_x-min_x)*self.ratio/2; // self.screens.camera_left[dir_1]*this.ratio;
      var camera_top = image.top + (min_y*self.ratio) + (max_y-min_y)*self.ratio/2; //self.screens.camera_top[dir_1]*this.ratio;
      var logo_left = image.left +  (x4*self.ratio) + (max_x-min_x)*self.ratio/2; // self.screens.logo_left[dir_1]*this.ratio;
      var logo_top = image.top + (min_y_3_4*self.ratio) + Math.abs(y3-y4)*self.ratio/2 + 7 * self.ratio; //+ self.screens.logo_top[dir_1]*this.ratio;


      if (!self.screens.logo_pos[dir_1]){        
      } else {
        logo_left += self.screens.logo_pos[dir_1][0]*this.ratio;
        logo_top += self.screens.logo_pos[dir_1][1]*this.ratio/0.974;
      }
        
        
      var circle = new fabric.Circle({ 
        opacity:0,
        radius: 40, fill: '#28C090',
        left: camera_left,
        top: camera_top,
        originX : 'center',
        originY : 'center'
      });
      circle.scale(this.ratio);
       
      var path_camera="M0 0M37.4,32H3.6c-2,0-3.6-1.6-3.6-3.6V8.9c0-2,1.6-2.9,3.6-2.9c0,0,2,0,6.2,0C11.4,5.9,14.1,0,16,0c3.2,0,6.6,0,9.7,0c1.6,0,4.1,5.9,5.5,5.9c4.1,0,6.1,0,6.1,0c2,0,3.6,1,3.6,2.9v19.6C41,30.4,39.4,32,37.4,32z M20.5,10c-4.7,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S25.2,10,20.5,10z M36.7,7.9c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2C38.7,8.8,37.8,7.9,36.7,7.9z M20.5,25c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5s6.5,2.9,6.5,6.5S24.1,25,20.5,25z";
      var p_camera = new fabric.Path(path_camera, { 
        opacity:0,
        originX:'center', originY:'center',  left: camera_left, top: camera_top, fill:"white",    strokeWidth: 1, stroke:"white"});
      p_camera.scale(this.ratio);
      this.extend(p_camera, this.randomId());

      fabric.Image.fromURL(src_logo, function(img_logo) {
        var logo = img_logo.scale(ratio).set({ originX:'center', originY:'center', left: logo_left, top: logo_top });
        // 
        self.screen_group = new fabric.Group([image,  self.screen_path, circle, p_camera, logo], {      });
        // circle.on('mousedown', function(e) { 
        //     self.cleanSelect();
        //     document.getElementById('screen_upload').click();
        //     e.preventDefault();
        //   });
        // p_camera.on('mousedown', function(e) { 
        //   self.cleanSelect();
        //   document.getElementById('screen_upload').click();
        //   e.preventDefault();
        // });
        // circle.on('mouseover', function(e) { 
        //   self.cleanSelect();
        //   circle.setRadius(50);
        //   e.preventDefault();
        // });
        
        self.screen_group.set({
          id: self.randomId(),
          selectable: true,
          hasControls: false,
          subTargetCheck: true, 
          padding:10,
        });
        self.extend(self.screen_group, self.randomId());
        self.canvas.add(self.screen_group);
        self.setIndex('sc', self.screen_group);

        self.screen_group.on('selected', (e) => {
          var d = document.getElementsByClassName('sceneProperties')[0];
          d.className += ' show';
          self.showLogoStatus();
        });
        self.selectItemAfterAdded(self.screen_group);
        // self.showLogoStatus();
        self.bringToFront();
      });
    });
  }

  //Block "Upload Image"
  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          selectable: true,
          hasControls: false,
        });
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }
  showLogoStatus() {
    var self = this;
    self.canvas.getObjects().forEach(function(o) {
        if(o.id === self.selected_screen_id) {
          var cur = o.item(4).opacity;
          
          if (!cur) {
            document.getElementById('hide_logo').innerHTML = "Show logo";
          }
          else 
            document.getElementById('hide_logo').innerHTML = "Hide logo";
        }
    })
  }
  hideLogo() {
    var self = this;
    self.canvas.getObjects().forEach(function(o) {
        if(o.id === self.selected_screen_id) {
          var cur = o.item(4).opacity;
          o.item(4).set('opacity', (1+cur)%2); 
              self.canvas.renderAll();
          if (cur) {
            document.getElementById('hide_logo').innerHTML = "Show logo";
          }
          else 
            document.getElementById('hide_logo').innerHTML = "Hide logo";
        }
    })
  }

    

  // myToSvg() {
  //   var self = this;
  //   // self.crop_canvas.getObjects().forEach(function(o) {
  //   //   if(o.id === self.selected_screen_id) {
  //       document.getElementById('svg').innerHTML = self.crop_canvas.toSVG();
  //   //   }
  //   // });
  // }
  
  
  getSelectedPathSize() {
    var self =this;
    self.canvas.getObjects().forEach(function(o) {
      if(o.id === self.selected_screen_id) {
        console.log('self.ratio');
        console.log(self.ratio);
        console.log(o.item(1).path[1][1]);
        console.log(o.item(1).path[1][2]);
        self.path_width = o.item(1).width - o.item(1).path[1][1]; // * self.ratio;
        self.path_height = o.item(1).height - o.item(1).path[1][2];// * self.ratio;
        console.log('ratio : ' + self.ratio);
      }
    });
  }
  readScreenUrl(event) {
    event.preventDefault();
    var self = this;
    self.cleanSelect();
    var d = document.getElementsByClassName('imageCropper')[0];

    d.className += ' show1';
    self.getSelectedPathSize();
    document.getElementById('crop_ww').value = self.path_width;
    document.getElementById('crop_hh').value = self.path_height;

    document.getElementById('cropit_start').click();
  }
  crop_ang(event) {
    var self = this;
    // var img_data;  
    var img_data = document.querySelector('#hidden_image_data').value;  
    // var img_data =  document.getElementsByClassName('cropit-preview-image')[0];

    var img = document.createElement("img");
    img.src = img_data;

    img.onload = function () {
      var d = document.getElementsByClassName('imageCropper')[0];
      d.className = 'imageCropper';
      self.canvas.getObjects().forEach(function(o) {
          if(o.id === self.selected_screen_id) {
  
              o.item(1).set('fill', 
                new fabric.Pattern({
                  source : img, 
                  top: 200, 
                  left: 200
                  // repeat : 'repeat',
                })
              );
              self.cleanSelect();

              self.canvas.renderAll();
            
          }
      })
    };
  }
  

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
        // document.getElementById('crop_canvas').add(this.url);
        // this.addImageOnCanvas(this.url);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeWhite(url) {
    this.url = '';
  };

  //Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.deactivateAllWithDispatch().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.deactivateAllWithDispatch().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage() {
    let self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor({ source: this.props.canvasImage, width: this.canvas.width, height:this.canvas.height, repeat: 'repeat' }, function () {
        // self.props.canvasFill = '';
        self.canvas.renderAll();
      });
      
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }


  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
      var style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    }
    else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    var object = this.canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    let val = this.props.id;
    let complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }


  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, "g"), "");
    } else {
      iclass += ` ${value}`
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }


  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/

  
  removeSelected() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      let self = this;
      objectsInGroup.forEach(function (object) {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.bringForward();
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.bringForward();
      });
    }
  }

  sendToBack() {
    let activeObject = this.canvas.getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();

    if (activeObject) {
      activeObject.sendBackwards();
      // activeObject.sendToBack();
      
      // activeObject.opacity = 1;
    }
    else if (activeGroup) {
      let objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach((object) => {
        object.sendBackwards();
      // object.sendToBack();
      });
    }
  }

  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
      this.canvas.backgroundColor = this.props.canvasFill;
    }
    this.canvas.backgroundColor = this.props.canvasFill;
    this.canvas.renderAll();
  }

  rasterize() {
    alert();
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      console.log(this.canvas.toDataURL('png'))
      //window.open(this.canvas.toDataURL('png'));
      var image = new Image();
      image.src = this.canvas.toDataURL('png')
      
      var w = window.open("");
      w.document.write(image.outerHTML);
    }
  }

  rasterizeSVG() {
    console.log(this.canvas.toSVG())
    // window.open(
    //   'data:image/svg+xml;utf8,' +
    //   encodeURIComponent(this.canvas.toSVG()));
    // console.log(this.canvas.toSVG())
    // var image = new Image();
    // image.src = this.canvas.toSVG()
    var w = window.open("");
    w.document.write(this.canvas.toSVG());
  };


  saveCanvasToJSON() {
    var can = this.canvas;
    console.log(can);
    let json = JSON.stringify(this.canvas);

    localStorage.setItem('Kanvas', json);
    console.log('json');
    console.log(json);
  }

  loadCanvasFromJSON() {
    let CANVAS = localStorage.getItem('Kanvas');
    console.log('CANVAS');
    console.log(CANVAS);

    // and load everything from the same json
    this.canvas.loadFromJSON(CANVAS, () => {
      console.log('CANVAS untar');
      console.log(CANVAS);

      // making sure to render canvas at the end
      // this.canvas.renderAll();

      // and checking if object's "name" is preserved
      console.log('this.canvas.item(0).name');
      console.log(this.canvas);
    });
  };

  rasterizeJSON() {
    this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

}

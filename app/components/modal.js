import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';


const MyModal = React.createClass({

  container: undefined,
  stat: undefined,
  camera: undefined,
  cameraTarget: undefined,
  scene: undefined,
  renderer: undefined,
  view_controls: undefined,
  material: undefined,

  getInitialState: function() {
        return {
            showLoader: true,
        }
  },

  updateDimensions: function() {
    var self = this;
    if(document.getElementById("file-container") && typeof(self.renderer) != "undefined" ){

      var VIEWER_WIDTH = document.getElementById('file-container').clientWidth - 60;
      var VIEWER_HEIGHT = window.innerHeight*0.55;

  		self.camera.aspect	= VIEWER_WIDTH / VIEWER_HEIGHT;
  		self.camera.updateProjectionMatrix();
      self.renderer.setSize( VIEWER_WIDTH, VIEWER_HEIGHT );
    }
  },

  componentWillMount: function() {
      if(this.view_controls){
        this.view_controls.dispose();
      }
      this.updateDimensions();
  },
  componentDidMount: function() {
      window.addEventListener("resize", this.updateDimensions, false);

      this.init_plyLoader(this.props.docURL);
      if (typeof(this.view_controls) == "undefined")
      this.createControls();
      this.animate_frame();
  },
  componentWillUnmount: function() {
      window.removeEventListener("resize", this.updateDimensions, false);
  },

  animate_frame : function(){
   requestAnimationFrame( this.animate_frame );
   this.view_controls.update();
  },

  createControls: function() {
        var self = this;
        this.view_controls = new THREE.TrackballControls( this.camera );
        this.view_controls.dynamicDampingFactor = 0.3;
        this.view_controls.rotateSpeed = 6.0;
        this.view_controls.addEventListener('change', this.render_file);
        this.view_controls.enabled = false;
        let parent_obj = this;
        document.getElementById("file-container").addEventListener("touchstart",function(){
            if (parent_obj.view_controls) {
                parent_obj.view_controls.enabled = true;
            }
        });

        document.getElementById("file-container").addEventListener("touchend",function(){
            if (parent_obj.view_controls) {
                parent_obj.view_controls.enabled = false;
            }
        });

        document.getElementById("file-container").addEventListener("mousedown",function(){
            if (parent_obj.view_controls) {
                parent_obj.view_controls.enabled = true;
            }
        });

        document.getElementById("file-container").addEventListener("mouseup",function(){
            if (parent_obj.view_controls) {
                parent_obj.view_controls.enabled = false;
            }
        });
  },

  render_file: function() {
        this.renderer.render( this.scene, this.camera );
  },

  render_obj_file: function() {

        this.camera.position.x = -2;
        this.camera.position.y = 0;

		this.camera.lookAt( this.scene.position );
        this.renderer.render( this.scene, this.camera );
  },

  animate_obj_frame: function() {
      requestAnimationFrame( this.animate_obj_frame );
      this.view_controls.update();
      this.render_obj_file();
  },

  init_plyLoader: function(document_url){

        var VIEWER_WIDTH = document.getElementById('file-container').clientWidth - 60;
        var VIEWER_HEIGHT = window.innerHeight*0.5;


        if (!this.scene)
            this.scene = new THREE.Scene();
        else
            this.scene.children.splice(1,1);


        // Set up the camera
        if (!this.camera) {
            this.camera = new THREE.PerspectiveCamera( 75, VIEWER_WIDTH/VIEWER_HEIGHT, 1, 10000 );
            (window.mobilecheck()) ? this.camera.position.set(0, 400, 0) : this.camera.position.set(0, 200, 0);
            this.camera.up = new THREE.Vector3(0, 0, 1);
            this.scene.add(this.camera);
        }

        var geometry = new THREE.Geometry();
        var parent_obj = this;

        if( document_url.endsWith("ply") ){
            var loader = new THREE.PLYLoader();
            loader.load( document_url,function ( geometry ){
                parent_obj.setState({
                    showLoader: false
                });
                geometry.center();

                // Set up the dots
                if ( typeof(parent_obj.material) == "undefined" )
                    parent_obj.material = new THREE.PointsMaterial({ size : 1, sizeAttenuation : false });
                var dots = new THREE.Points(geometry, parent_obj.material);
                parent_obj.scene.add(dots);

                // Set up the renderer
                if ( typeof(parent_obj.renderer) == "undefined" )
                    parent_obj.renderer = new THREE.WebGLRenderer();
                parent_obj.renderer.setSize( VIEWER_WIDTH, VIEWER_HEIGHT );

                var view = document.getElementById('file-container');
                view.appendChild(parent_obj.renderer.domElement);

                if ( typeof(parent_obj.view_controls) == "undefined" )
                    parent_obj.createControls();
                parent_obj.render_file();
                parent_obj.animate_frame();

         });

        } else if( document_url.endsWith("obj") ){

            var ambient = new THREE.AmbientLight( 0x101030 );
				parent_obj.scene.add( ambient );

            var directionalLight = new THREE.DirectionalLight( 0xffeedd );
			directionalLight.position.set( 0, 0, 1 );
			parent_obj.scene.add( directionalLight );

            var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

            var texture = new THREE.Texture();
            var image_loader = new THREE.ImageLoader( manager );
				image_loader.load( './public/images/UV_Grid_Sm.jpg', function ( image ) {

					texture.image = image;
					texture.needsUpdate = true;

				} );

            var loader = new THREE.OBJLoader( manager );
            loader.load( document_url,function ( object ){
                parent_obj.setState({
                    showLoader: false
                });

                object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture;

						}

					} );

					object.position.y = 0;
					parent_obj.scene.add( object );

                // Set up the renderer
                if ( typeof(parent_obj.renderer) == "undefined" )
                    parent_obj.renderer = new THREE.WebGLRenderer();
                parent_obj.renderer.setSize( VIEWER_WIDTH, VIEWER_HEIGHT );

                var view = document.getElementById('file-container');
                view.appendChild(parent_obj.renderer.domElement);

                if ( typeof(parent_obj.view_controls) == "undefined" )
                    parent_obj.createControls();
                parent_obj.render_obj_file();
                parent_obj.animate_obj_frame();

         });

        } else if( document_url.endsWith("gif") ){
            let image_tag = document.createElement('img');
            image_tag.onload = function() {
                    parent_obj.setState({
                        showLoader: false
                    });
                    image_tag.style.display = "block";
                } ;
            image_tag.src= document_url;
            image_tag.style.display = "none";
            image_tag.setAttribute("class","rv-gif-loader");
            document.getElementById('file-container').appendChild(image_tag);
        }

 },

  render: function() {

      let popup_width = "50%";
      if( window.mobilecheck() ){
          popup_width = "90%";
      }

      let custom_style = {
                              overlay: {
                                position        : 'fixed',
                                top             : 0,
                                left            : 0,
                                right           : 0,
                                bottom          : 0,
                                zIndex          : 99999999,
                                overflow        : 'hidden',
                                perspective     :  1300,
                                backgroundColor : 'rgba(0, 0, 0, 0.3)'
                              },

                              content: {
                                position                : 'relative',
                                margin                  : '8% auto',
                                width                   : popup_width,
                                border                  : '1px solid rgba(0, 0, 0, .2)',
                                background              : '#fff',
                                overflow                : 'auto',
                                borderRadius            : '4px',
                                outline                 : 'none',
                                boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
                              }
                        };

    return (
      <Modal
            onRequestClose={this.props.onRequestClose}
            effect={Effect.ScaleUp} style={custom_style}>
            { (this.state.showLoader) ? <div className="rv-loader"></div> : "" }
            <div id="file-container">{this.props.text}</div>
            { (this.state.showLoader) ? "" : <a href={this.props.docURL} className="btn btn-primary rv-ply-download" target="_blank">Download</a> }
            <span className="glyphicon glyphicon-remove" onClick={ModalManager.close}></span>
         </Modal>
    );
  }

});

export default MyModal;

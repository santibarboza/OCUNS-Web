var EventBus = new Vue;
var idUsuario="IdDefault";

//Objeto Vue Principal
var vm=new Vue({
  el:"#panelIde",
  created:function () {
    var i;
    for (i = 0; i < 16; i++) {
      this.panelSimulacion.registros.value.push({contenido:"00"});
    } 
    for (i = 0; i < 256; i++) {
      this.panelSimulacion.memorias.value.push({contenido:"00"});
    }
    this.pc=this.panelCode.direccionInicio;
    this.ir=this.panelCode.direccionInicio;
  },
  data:{
      panelCode:{
        value:"",
        direccionInicio:"00",
        size:4,
        ver:true
      },
      panelCompilado:{
        value:"Codigo Compilado", 
        size:3,
        ver:true,
        tipoEjecucion:0,
        habilitaEjecucion:false
      },
      panelSimulacion:{
        size:5,
        ver:true,
        registros:{
          value:[],
          desplegado:true
          },
        memorias:{
          value:[],
          desplegado:false
          },
        logs:{
          value:"Logs:\n",
          desplegado:false
        }
      },
      modal:{
        mensaje:"Mensaje Default"
      },
      botoneraEjecucion:{
        ejecutando:false,
        habilita_PAP:false
      },
      distribucionVentanas:[
        [0,0,0],  //0- no hayVentanas
        [0,0,12], //1- Panel Simulacion
        [0,12,0], //2- Panel Compilado
        [0,4,8],  //3- Panel Simulacion y Panel Compilado
        [12,0,0], //4- Panel Code
        [7,0,5],  //5- Panel Code y Panel Simulacion
        [8,4,0],  //6- Panel Code y Panel Compilado
        [4,3,5]   //7- Los 3 Paneles
      ],
      example:"Cuadrado(Sqr).ocuns",
      id:"noID",
      pc:0,
      ir:0,
  },
  methods:{
      updateRegistros: function(cambios){
        var registros=this.panelSimulacion.registros.value
        var keys=[];
        $.each(cambios, function( index, cambio ) {
            registros[cambio.key].contenido=cambio.value;
            keys.push(cambio.key);
        });
        EventBus.$emit('ultimoCambioRegistro', keys);
    },
    updateMemoria: function(cambios){
        var memorias=this.panelSimulacion.memorias.value;
        var keys=[];
        $.each(cambios, function( index, cambio ) {
            memorias[cambio.key].contenido=cambio.value;
            keys.push(cambio.key);
        });
        EventBus.$emit('ultimoCambioMemoria', keys);
    },
    resetMemoria: function(){
        EventBus.$emit('reset_Memoria');
    },
    resetRegistros: function(){
        EventBus.$emit('reset_Registro');
    },
    resetIR: function(){
      this.ir=this.panelCode.direccionInicio;
    },
    resetAll: function(){
      this.resetRegistros();
      this.resetMemoria();
      this.pc=this.panelCode.direccionInicio;
      this.ir=this.panelCode.direccionInicio;
    },
    updatePC: function(pc){
        EventBus.$emit('nuevopc', parseInt(pc.pc));
        this.pc=pc.pc;
    },
    updateIR: function(ir){
        EventBus.$emit('nuevoir', parseInt(ir.ir));
    },
    updateSizePaneles: function(index,ver){
        this.getPanel(index).ver=ver;
        this.updateSizes();
    },
    habilitarTodos:function(){
        this.panelCode.ver=true;
        this.panelCompilado.ver=true;
        this.panelSimulacion.ver=true;
        this.updateSizes();
    },
    habilitarEjecucion: function(){
        this.panelCompilado.habilitaEjecucion=true;
    },
    habilita_EjecucionPAP:function(cond){
      this.botoneraEjecucion.habilita_PAP=cond;
    },
    updateTipoEjecucion:function(index){
      this.panelCompilado.tipoEjecucion=index;
    },
    updateExample:function(newValue){
      console.log(newValue);
      this.example=newValue;
    },
    setearEjecutando:function(cond){
      this.botoneraEjecucion.ejecutando=cond;
    },
    agregarLog:function(logNuevo){
      this.panelSimulacion.logs.value+=logNuevo+'\n';
    },
    mostrarMensaje:function(mensaje){
      this.modal.mensaje=mensaje;
      $("#mostrarmodal").modal("show");
    },
    getPanel:function(i){
      switch(i){
        case 0:
          return this.panelCode;
        case 1:
          return this.panelCompilado;
        case 2:
          return this.panelSimulacion;
      }
    },
    updateSizes: function(){
        var opcion=0;
        if(this.panelSimulacion.ver) opcion+=1;
        if(this.panelCompilado.ver) opcion+=2;
        if(this.panelCode.ver) opcion+=4;
        EventBus.$emit('newSize', this.distribucionVentanas[opcion]);        
    }
  }
});

var EventBus = new Vue;
var idUsuario="IdDefault";

//Componente de Registro
Vue.component('registro-app',{
  template: '#registroTemplate',
  props: ['registro', 'index'],
  computed:{
      getTitulo: function(){
        return "Registro R"+this.index.toString(16).toUpperCase();
      }
  },
  data:function(){
      return {
          ultimoCambio:false
      }
  },
  created: function () {
    EventBus.$on('ultimoCambioRegistro', function (cambios) {
      this.ultimoCambio=cambios.includes(this.index) ;
    }.bind(this));
    EventBus.$on('reset_Registro', function (cambios) {
      this.registro.contenido="00";
    }.bind(this));
  }  
});

//Componente Tabla de Registro
Vue.component('registro-table-app',{
  template: '#registroTableTemplate',
  props: ['registros','inicio','fin'],
  methods:{
      enRango: function(i){
        return i>=this.inicio && i<this.fin;
      },
      getTitulo: function(i){
        return "R"+i.toString(16).toUpperCase();
      }
  }  
});

//Componente Panel de Registros
Vue.component('registro-panel-app',{
  template: '#registroPanelTemplate',
  props: ['registros']  
});

//Componente Memoria
Vue.component('memoria-app',{
  template: '#memoriaTemplate',
  props: ['memoria', 'index'],
  computed:{
      getTitulo: function(){
        return "Memoria: Direccion 0x"+this.index.toString(16).toUpperCase();
      },
      clasesMemoria:function(){
        return {
          ultimaMemoria: this.ultimoCambio,
          pcMemoria: this.esPC,
          irMemoria: this.esIR,
        }
      },
  },
  data:function(){
      return {
          ultimoCambio:false,
          esPC:false,
          esIR:false
      }
  },
  created: function () {
    EventBus.$on('ultimoCambioMemoria', function (cambios) {
      this.ultimoCambio=cambios.includes(this.index) ;
    }.bind(this));
    EventBus.$on('nuevopc', function (pc) {
      this.esPC=(pc==this.index)||(pc+1==this.index);
    }.bind(this));
    EventBus.$on('nuevoir', function (ir) {
      this.esIR=(ir==this.index)||(ir+1==this.index);
    }.bind(this));
    EventBus.$on('reset_Memoria', function (cambios) {
      this.memoria.contenido="00";
    }.bind(this));
  }  
});

//Componente Tabla de Memoria
Vue.component('memoria-table-app',{
  template: '#memoriaTableTemplate',
  props: ['memorias','cantxfilas'], 
  computed:{
      cantfilas: function(){
        return this.memorias.length/this.cantxfilas;
      }
  },
  methods:{
    getMemoria: function(i,j){
      var indice=this.getIndex(i,j);
      return this.memorias[indice];
    },
    getIndex: function(i,j){
      var fila=i-1;
      var columna=j-1;
      var indice=fila*this.cantxfilas+columna; 
      return indice;
    }
  }
});

//Componente Panel de Memoria
Vue.component('panelmemoria-app',{
  template: '#memoriaPanelTemplate',
  props: ['memorias'],
  computed:{
    getMemoria: function(){
        return this.memorias;
      }
  }  
});

//Componente Panel de Logs
Vue.component('panellogs-app',{
  template: '#logsTemplate',
  props: ['logs'],
  computed:{
    getLogs: function(){
        return this.logs;
      }
  },
  methods:{
    descargarLogs:function(){
      descargarArchivo(generarTexto(this.logs.value), 'logs.txt');
    },
    borrarLogs:function(){
      this.logs.value="Logs:\n";
    }   
  }
});

//Componente Boton de Desplegar
Vue.component('botonDesplegar',{
  template: '#botonDesplegarTemplate',
  props: ['targets', 'desplegado'],
  data:function(){
      return {
          desp:this.desplegado
      };
  },
  computed:{
      getTitle: function(){
        if(this.desp)
          return "Colapsar Panel";
        else
          return "Desplegar Panel";
      },
      getTarget: function(){
        return this.targets;
      },
      getIcono: function(){
        return{
          'glyphicon-collapse-up':this.desp,
          'glyphicon-collapse-down':!this.desp,
        };
      }
  }, 
  methods:{
    toogle:function(){
      this.desp=!this.desp;
    } 
  }
});
//Componente Heading de Panel
Vue.component('panelheading',{
  template: '#headingTemplate',
  props: ['targets', 'titulo','desplegado'],
  computed:{
      getTarget: function(){
        return this.targets;
      },
      getTitulo: function(){
        return this.titulo;
      }
  }  
});

//Componente Panel de Simulacion
Vue.component('panelsimulacion-app',{
  template: '#simulacionTemplate',
  props: ['panel','index'],
  computed:{
    getPanel: function(){
        return this.panel;
      },
    getBigSize: function(){
        return "col-md-"+this.panel.size;
      },
  } ,
  created: function () {
    EventBus.$on('cambioSizePanel', function (cambios) {
      if(cambios.index == this.index)
        this.panel.ver=cambios.ver;
    }.bind(this));
    EventBus.$on('newSize', function (sizes) {
        this.panel.size=sizes[this.index];
    }.bind(this));
  }  
});

//Componente Panel de Compilacion
Vue.component('panelcompilado-app',{
  template: '#compiladoTemplate',
  props: ['panel','index'],
  computed:{
    getPanel: function(){
        return this.panel;
      },
    getBigSize: function(){
        return "col-md-"+this.panel.size;
      },
    getPanel: function(){
        return this.panel;
      }
  },
  created: function () {
    EventBus.$on('cambioSizePanel', function (cambios) {
      if(cambios.index == this.index)
        this.panel.ver=cambios.ver;
    }.bind(this));
    EventBus.$on('newSize', function (sizes) {
        this.panel.size=sizes[this.index];
    }.bind(this));
  },
  methods:{
    descargarCompilado:function(){
      descargarArchivo(generarTexto(this.panel.value), 'compilado.txt');
    },
    ejecutar: function(){
      //controlar si es ejecucion paso a paso
      this.iniciarEjecucion();
    },
    iniciarEjecucion:function(){
      $.ajax({
        method: "GET",
        url: "/iniciarEjecucion?id="+vm.id, 
        success: function(data,textStatus){
         console.log("Respuesta del server en /IniciarEjecucion: \n"+JSON.stringify(data));
         interpretarData(data);
        },
        error:function(textStatus,errorThrown){
          console.log("Error "+errorThrown+"... "+textStatus);
        }
      });
    }
  }
});

//Componente Panel de Codigo
Vue.component('panelcode-app',{
  template: '#codeTemplate',
  props: ['panel','index'],
  computed:{
    getPanel: function(){
        return this.panel;
      },
    getBigSize: function(){
        return "col-md-"+this.panel.size;
      },
  },
  created: function () {
    EventBus.$on('cambioSizePanel', function (cambios) {
      if(cambios.index == this.index)
        this.panel.ver=cambios.ver;
    }.bind(this));
    EventBus.$on('newSize', function (sizes) {
      if(this.panel.size!=sizes[this.index])
        this.panel.size=sizes[this.index];
    }.bind(this));
  },
  methods:{
    Compilar:function(){
      compilarCodigoFuente(this.panel.value,this.panel.direccionInicio);
    },
    descargarFuente:function(){
      descargarArchivo(generarTexto(this.panel.value), 'archivo.ocuns');
    }
  }      
});

//Componente BotoneraEjecucion (Siguiente, Detener)
Vue.component('botonera-ejecucion-app',{
  template: '#botoneraEjecuccionTemplate',
  props: ['botonera'] ,
  methods:{
    obtenerSiguientePaso:function(){
      getSiguientePaso();
    },
    detenerEjecucion:function(){
      detener();
    }    
  }
});
//Componente Ventanas
Vue.component('botonera-ventanas-app',{
  template: '#botoneraVentanasTemplate'
});
//Componente ModalMensaje
Vue.component('modal-mensaje-app',{
  template: '#modalTemplate',
  props: ['modal']  
});

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
        value:"Codigo Fuente",
        direccionInicio:"00",
        size:4,
        ver:true
      },
      panelCompilado:{
        value:"Codigo Compilado", 
        size:3,
        ver:true,
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
    habilitarEjecucion: function(){
        this.panelCompilado.habilitaEjecucion=true;
    },
    habilita_EjecucionPAP:function(cond){
      this.botoneraEjecucion.habilita_PAP=cond;
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

//Configuracion de Seleccion de Ventanas
$( document ).ready(function() {
  $('#ventanas').selectpicker('selectAll');
  $("select").on("changed.bs.select", 
    function(e, clickedIndex, newValue, oldValue) {
      if(e.currentTarget.id=="ventanas")
        vm.updateSizePaneles(clickedIndex,newValue);
      else
        console.log("Tipos de Ejecucion:"+clickedIndex+"-"+newValue);
  });
});

package model;

import model.*;
import model.Analizadores.*;
import model.Archivos.*;
import model.Ejecucion.*;
import model.Mapeo.*;
import model.RepresentacionMemoria.*;
import model.MemoriaMongo.*;

public class OCModelServerModule {
	private static OCModelServerModule instance;
	  private OCModel ocModel;
	  private MemoriaMongo memoriaMongo;
	  private EjecucionServer ejecucion;

	  private OCModelServerModule() {
		Memoria memoria=new MemoriaImpl(new MapFactoryImpl<Integer,String>());
		TabladeEtiquetas tablaDeEtiquetas=new TabladeEtiquetasImpl();
		AnalizadorLexico analizadorLexico= new AnalizadorLexicoImpl(ReglasImpl.getInstance());
		RepresentacionDeLaMemoria representacion= 
		  new RepresentacionDeLaMemoriaImpl(memoria,tablaDeEtiquetas);
		AnalizadorSintacticoySemantico analizadorSintacticoySemantico=
				new AnalizadorSintacticoySemanticoImpl(analizadorLexico,representacion);
		ArchivoAbstractFactory archivosFactory= new ArchivoConcreteFactory();
		ejecucion=new EjecucionServerImp(memoria);
	    ocModel =  new OCModelImpl(analizadorLexico,
	    		analizadorSintacticoySemantico,archivosFactory,ejecucion);
	    ejecucion.setModel(ocModel);
	  }

	  public static OCModelServerModule getInstance() {
	    if(instance == null) {
	      instance =  new OCModelServerModule();
	    }
	    return instance;
	  }

	  public OCModel getOCModel() {
	    return ocModel;
	  }
	  
	  public  void setMongoID(String id){
	  	MemoriaMongoFactoryImp memoriafactory=new MemoriaMongoFactoryImp();
	  	memoriaMongo= memoriafactory.crearMemoriaMongo(ejecucion,id);
	  }
	  public  MemoriaMongo getMemoriaMongo(){
	  	return memoriaMongo;
	  }

}

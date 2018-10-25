package view;

import presenter.OCPresenter;
import server.Accion.*;


public class OCViewServerModule {
	  private static OCViewServerModule instance;
	  private OCViewServer ocView ;

	  private OCViewServerModule() { }

	  public static OCViewServerModule getInstance() {
	    if (instance == null) {
	      instance = new OCViewServerModule();
	    }
	    return instance;
	  }

	  public OCView openOCWindow(OCPresenter ocPresenter) {
	  	AccionFactory accionFactory= new AccionFactoryImp();
	    ocView= new OCViewServerImp(ocPresenter,accionFactory);
	    return ocView;
	  }
	  public  OCViewServer getOCView(){
	  	return ocView; 
	  }
}

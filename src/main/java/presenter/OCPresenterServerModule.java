package presenter;

import model.*;
import model.MemoriaMongo.*;
import view.*;
import model.RepresentacionMemoria.*;

public class OCPresenterServerModule {
	private static OCPresenterServerModule instance;

	  private OCPresenterServerModule() { }

	  public static OCPresenterServerModule getInstance() {
	    if (instance == null) {
	      instance = new OCPresenterServerModule();
	    }
	    return instance;
	  }
	  public OCPresenter  startApplication(String id) {
	    OCPresenter presenter = getOCPresenter();
	    OCView view = openOCWindowAndGetView(presenter);
	    presenter.setEnableLog(true);
	    presenter.setOCView(view);
	    setPresenterToModel(presenter);
	    setIDToModel(id);
	    resetMemoriaView(id);
	    return presenter;
	  }
	  private OCPresenter getOCPresenter() {
	    return new OCPresenterImpl(OCModelServerModule.getInstance().getOCModel());
	  }
	  private OCView openOCWindowAndGetView(OCPresenter presenter) {
	    return OCViewServerModule.getInstance().openOCWindow(presenter);
	  }
	  private void setPresenterToModel(OCPresenter presenter) {
		  OCModelServerModule.getInstance().getOCModel().setOCPresenter(presenter);
	  }
	  private void setIDToModel(String id) {
		  OCModelServerModule.getInstance().setMongoID(id);
	  }
	  private void resetMemoriaView(String id) {
		  OCViewServer view=getOCView();
		  view.obtenerAcciones(id);
	  }
	  public static MemoriaMongo getMemoriaMongo(){
	  	return OCModelServerModule.getInstance().getMemoriaMongo();
	  }

	  public static OCViewServer getOCView(){
	  	return OCViewServerModule.getInstance().getOCView();
	  }

}

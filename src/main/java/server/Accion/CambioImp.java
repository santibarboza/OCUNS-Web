package server.Accion;

public class CambioImp implements Cambio{
	private final String key;
	private final String value;
	public CambioImp(String key,String value){
		this.key=key;
		this.value=value;
	}
    public String getKey(){
    	return key;
    }
    public String getValue(){
    	return value;
    }
}

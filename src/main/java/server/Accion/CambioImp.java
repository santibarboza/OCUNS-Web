package server.Accion;

public class CambioImp implements Cambio{
	private final Integer key;
	private final String value;
	public CambioImp(Integer key,String value){
		this.key=key;
		this.value=value;
	}
    public Integer getKey(){
    	return key;
    }
    public String getValue(){
    	return value;
    }
}

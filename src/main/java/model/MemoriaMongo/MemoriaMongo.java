package model.MemoriaMongo;
import model.RepresentacionMemoria.Memoria;

public interface MemoriaMongo{
	public Memoria getMemoria();
	public void iniciar();
	public void guardarMemoria();
	public void reiniciarMemoria();
}
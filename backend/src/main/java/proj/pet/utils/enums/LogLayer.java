package proj.pet.utils.enums;

public abstract class LogLayer {

	public static final String CONTROLLER_EXPR = "execution(* proj.pet..*Controller.*(..))";
	public static final String SERVICE_EXPR = "execution(* proj.pet..*Service.*(..))";

}

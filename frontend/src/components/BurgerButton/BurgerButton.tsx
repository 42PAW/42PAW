import "./BurgetButton.css";

interface props {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

function BurgerButton({ isToggled, setIsToggled }: props) {
  return (
    <label className={`burger ${isToggled ? "checked" : ""}`} htmlFor="burger">
      <input
        type="checkbox"
        id="burger"
        checked={isToggled}
        onClick={() => setIsToggled(!isToggled)}
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
}

export default BurgerButton;

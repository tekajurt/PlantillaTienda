import style from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={style.menuContainer}>
      <div className={style.logo}></div>
      <div className={style.menu}>
        <div className={style.menuItem}>Home</div>
        <div className={style.menuItem}>Home</div>
        <div className={style.menuItem}>Home</div>
        <div className={style.menuItem}>Home</div>
        <div className={style.menuItem}>Home</div>
      </div>
    </div>
  );
};
export default Navbar;

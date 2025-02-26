import headerStyles from './header.module.css';
import {BaselineCheck} from "../Icons";


const Menu = () => {
  return (
      <nav className={headerStyles.nav}>
          <button className={headerStyles.button}>Главная</button>
          <button className={headerStyles.button}>Мои задачи</button>
          <button className={headerStyles.button}>Сегодня</button>
          <button className={headerStyles.button}>Неделя</button>
          <button className={headerStyles.button}>Важное</button>
      </nav>
  );
};

const Header = () => {
    return (
        <header className={headerStyles.header}>
          <BaselineCheck width="32" height="32" style={{color: 'white'}}/>
          <h1 className={headerStyles.title}>To Do</h1>
          <div className={headerStyles.separator}></div>
          <Menu/>
      </header>
  );
};


export {Header, Menu};
import styles from "../page.module.css";
import { 
    Component,
    Button 
} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Game() {

    const navigate = useNavigate();

    const handleClick = event => {
        if (event.target.style.textDecoration) {
          event.target.style.removeProperty('text-decoration');
        } else {
          event.target.style.setProperty('text-decoration', 'line-through');
        }
      };

        return(
            <main className={styles.main}>
                <div className={styles.row}> <p className={styles.title}><a onClick={() => { navigate("/") }}> SpyGoon </a></p> </div>    

                <div className={styles.row}> <h3> Role: </h3> <p> Spy/Not-spy </p></div>

                <div className={styles.row}> <h2> Location List </h2> </div>

                <table className={styles.row} style={{width:'25%', margin:'0% auto'}}>
                    <tr>
                        <td onClick={handleClick}>a</td>
                        <td onClick={handleClick}>b</td>
                        <td onClick={handleClick}>c</td> 
                    </tr>
                    <tr>
                        <td onClick={handleClick}>d</td>
                        <td onClick={handleClick}>e</td>
                        <td onClick={handleClick}>f</td> 
                    </tr>
                </table>

            </main>
        );

}

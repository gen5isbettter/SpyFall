import styles from "./page.module.css";
import { 
    Component,
    Button 
} from 'react';
export default class Home extends Component {

    constructor(props){
        super(props);
        this.state= {

        }
    }

    loadPage(url) {
        window.open(url);
    }

    render(){
        return(
            <main className={styles.main}>
                <div className={styles.row}> <p className={styles.title}><a href="index.html"> SpyGoon </a></p> </div>    

                <div className={styles.row}> <h3> Role: </h3> <p> Spy </p></div>

                <div className={styles.row}> <h2> Location List </h2> </div>

                <table className={styles.row} style={{width:'25%', margin:'0% auto'}}>
                    <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td> 
                    </tr>
                    <tr>
                        <td>d</td>
                        <td>e</td>
                        <td>f</td> 
                    </tr>
                </table>

            </main>
        );

    }

}
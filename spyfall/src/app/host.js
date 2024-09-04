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
        
                <div className={styles.row}> <h3 style={{paddingRight: '5px', display:'inline'}}> Hosting lobby code: </h3> <h2 style={{fontWeight: 'bold', display:'inline'}}>69XD</h2></div>
        
                <div className={styles.row}> <h3 style={{paddingRight: '10px', display:'inline'}}> Your name (Be racist): </h3> <input type="text" placeholder="Where you get that cheese Danny"/> </div>

                <div className={styles.row}> <h2> Lobby Members </h2></div>

                <table className={styles.row} style={{width:'25%', margin:'0% auto'}}>
                    <tr>
                        <td>Player 1</td>
                        <td>Player 2</td>
                    </tr>
                    <tr>
                        <td>Jeff</td>
                        <td>George Droyd</td>
                    </tr>
                </table>

                <div className={styles.row}> <button onClick={() => {this.loadPage("./src/gamestart.js")}}> Start Game </button> </div>

            </main>
        );
    }
}
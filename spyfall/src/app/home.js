import { 
    Component,
    Button 
} from 'react';

import styles from './page.module.css';

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
            <div>
                <div className={styles.row}> <p className={styles.title}><a href="index.html"> SpyGoon </a></p> </div>    

                <div className={styles.row}> <button onClick={() => {this.loadPage("./src/host.js")}}> Host Game </button> </div>

                <div className={styles.row}> <h3> OR </h3> </div>

                <div className={styles.row}> <h3 style={{paddingRight: '10px', display:'inline'}}> I have a lobby code: </h3> <input type="text" placeholder="I'm makin em at night"/> </div>
            </div>
        );
    }
}